<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Str;

class MakeFullApi extends Command
{
    protected $signature = 'make:fullapi {name} {--fields=}';
    protected $description = 'Créer un modèle, migration, controller, resource, request, factory, seeder et DTO avec champs dynamiques';

    public function handle()
    {
        $name = $this->argument('name');
        $fields = $this->option('fields');

        if (!$fields) {
            $this->error('Vous devez spécifier des champs avec l\'option --fields="champ:type,champ:type"');
            return;
        }

        $fieldsArray = $this->parseFields($fields);
        $pluralName = Str::plural(Str::lower($name));

        $this->info("Création des fichiers pour l'API: {$name}");

        // Créer le modèle avec la migration et le factory
        Artisan::call("make:model {$name} -mf");
        $this->info("Modèle, migration et factory créés.");

        // Ajouter les champs dans la migration
        $this->updateMigration($name, $fieldsArray);

        // Créer le contrôleur avec CRUD
        Artisan::call("make:controller {$name}Controller");
        $this->info("Contrôleur API créé.");

        // Créer la resource
        Artisan::call("make:resource {$name}Resource");
        $this->info("Resource créée.");

        // Créer la requête (FormRequest)
        Artisan::call("make:request {$name}Request");
        $this->updateRequest($name, $fieldsArray);
        $this->info("Requête créée.");

        // Créer le seeder
        Artisan::call("make:seeder {$name}Seeder");
        $this->updateSeeder($name, $fieldsArray);
        $this->info("Seeder créé.");

        // Créer un DTO
        $this->createDTO($name, $fieldsArray);
        $this->info("DTO créé.");

        // Ajouter les méthodes CRUD au contrôleur
        $this->addCrudToController($name, $pluralName);

        $this->info("API complète créée pour : {$name} !");
        $this->updateFactory($name, $fieldsArray);
    }
    private function updateFactory($name, $fieldsArray)
    {
        $factoryPath = database_path("factories/{$name}Factory.php");

        if (!file_exists($factoryPath)) {
            $this->error("Le fichier Factory pour {$name} n'existe pas.");
            return;
        }

        $factoryFile = file_get_contents($factoryPath);

        $fields = [];
        foreach ($fieldsArray as $field => $type) {
            $value = match ($type) {
                'string' => "fake()->word()",
                'integer' => "fake()->randomNumber()",
                'boolean' => "fake()->boolean()",
                'text' => "fake()->sentence()",
                'datetime', 'timestamp' => "fake()->dateTime()",
                default => "fake()->word()"
            };
            $fields[] = "'{$field}' => {$value}";
        }

        $fieldsContent = implode(",\n            ", $fields);

        $factoryFile = preg_replace(
            "/return \[.*?\];/s",
            "return [\n            {$fieldsContent}\n        ];",
            $factoryFile
        );

        file_put_contents($factoryPath, $factoryFile);

        $this->info("Factory mis à jour : {$factoryPath}");
    }


    private function parseFields($fields)
    {
        $fieldsArray = [];
        foreach (explode(',', $fields) as $field) {
            [$name, $type] = explode(':', $field);
            $fieldsArray[$name] = $type;
        }
        return $fieldsArray;
    }

    private function updateMigration($name, $fieldsArray)
    {
        // Recherche le fichier de migration correspondant
        $pluralName = Str::plural(Str::snake($name));
        $migrations = glob(database_path("migrations/*_create_{$pluralName}_table.php"));

        if (empty($migrations)) {
            $this->error("Impossible de trouver une migration pour {$name}.");
            return;
        }

        $migrationPath = $migrations[0]; // On suppose qu'il n'y a qu'une seule migration correspondante
        $migrationFile = file_get_contents($migrationPath);

        $fieldLines = '';
        foreach ($fieldsArray as $field => $type) {
            $fieldLines .= "\$table->{$type}('{$field}');\n            ";
        }

        // Injecter les champs dans la migration
        $migrationFile = preg_replace(
            "/Schema::create\('.*', function \(Blueprint \$table\) \{.*?\n.*?\n.*?\};/s",
            "Schema::create('{$pluralName}', function (Blueprint \$table) {\n            \$table->id();\n            {$fieldLines}\$table->timestamps();\n        });",
            $migrationFile
        );

        // Sauvegarder la migration mise à jour
        file_put_contents($migrationPath, $migrationFile);

        $this->info("Migration mise à jour : {$migrationPath}");
    }
    private function updateRequest($name, $fieldsArray)
    {
        $requestPath = app_path("Http/Requests/{$name}Request.php");
        $requestFile = file_get_contents($requestPath);

        $rules = '';
        foreach ($fieldsArray as $field => $type) {
            $rule = match ($type) {
                'string' => "'required|string|max:255'",
                'integer' => "'required|integer'",
                'boolean' => "'required|boolean'",
                'text' => "'required|string'",
                default => "'required'"
            };
            $rules .= "'{$field}' => {$rule},\n            ";
        }

        $requestFile = preg_replace(
            "/public function rules\(\).*?\{.*?\n.*?\}/s",
            "public function rules()\n    {\n        return [\n            {$rules}\n        ];\n    }",
            $requestFile
        );

        file_put_contents($requestPath, $requestFile);
    }
    private function addCrudToController($name, $pluralName)
    {
        $controllerPath = app_path("Http/Controllers/{$name}Controller.php");

        if (!file_exists($controllerPath)) {
            $this->error("Le contrôleur {$name}Controller n'existe pas.");
            return;
        }

        $content = file_get_contents($controllerPath);

        $methods = <<<EOD

        public function index()
        {
            return {$name}Resource::collection({$name}::all());
        }

        public function store({$name}Request \$request)
        {
            \$validated = \$request->validated();
            \$model = {$name}::create(\$validated);
            return new {$name}Resource(\$model);
        }

        public function show({$name} \$model)
        {
            return new {$name}Resource(\$model);
        }

        public function update({$name}Request \$request, {$name} \$model)
        {
            \$validated = \$request->validated();
            \$model->update(\$validated);
            return new {$name}Resource(\$model);
        }

        public function destroy({$name} \$model)
        {
            \$model->delete();
            return response(null, 204);
        }

    EOD;

        $content = str_replace(
            'use Illuminate\Http\Request;',
            "use App\\Http\\Requests\\{$name}Request;\nuse App\\Models\\{$name};\nuse App\\Http\\Resources\\{$name}Resource;",
            $content
        );

        $content = str_replace('}', $methods . "\n}", $content);

        file_put_contents($controllerPath, $content);

        $this->info("CRUD ajouté au contrôleur : {$controllerPath}");
    }


    private function updateSeeder($name, $fieldsArray)
    {
        $seederPath = database_path("seeders/{$name}Seeder.php");
        $seederFile = file_get_contents($seederPath);

        $factoryFields = [];
        foreach ($fieldsArray as $field => $type) {
            $value = match ($type) {
                'string' => "fake()->word()",
                'integer' => "fake()->randomNumber()",
                'boolean' => "fake()->boolean()",
                'text' => "fake()->paragraph()",
                default => "fake()->word()"
            };
            $factoryFields[] = "'{$field}' => {$value}";
        }

        $factoryContent = implode(",\n            ", $factoryFields);
        $seederFile = preg_replace(
            "/public function run\(\).*?\{.*?\}/s",
            "public function run()\n    {\n        \\App\\Models\\{$name}::factory()->create([\n            {$factoryContent}\n        ]);\n    }",
            $seederFile
        );

        file_put_contents($seederPath, $seederFile);
    }

    private function createDTO($name, $fieldsArray)
    {
        $dtoPath = app_path("DTO/{$name}DTO.php");
        if (!file_exists(app_path('DTO'))) {
            mkdir(app_path('DTO'), 0755, true);
        }

        $attributes = '';
        foreach ($fieldsArray as $field => $type) {
            if($type == 'text') {
                $type = 'string';
            }
            if ($type == 'boolean') {
                $type = 'bool';
            }
            if ($type == 'integer') {
                $type = 'int';
            }
            $attributes .= "public? $type \${$field},\n ";
        }
        $atributsFromRequest = '';

        foreach ($fieldsArray as $field => $type) {
            $atributsFromRequest .= "$field : \$request->get('{$field}'),\n ";
        }
        $attributes = rtrim($attributes, ', ');
        $atributsFromRequest = rtrim($atributsFromRequest, ', ');

        $content = <<<EOD
<?php



namespace App\DTO;

use App\Http\Requests\\{$name}Request;
readonly class {$name}DTO
{

    public function __construct(
        {$attributes}
    ) {}

    public static function fromRequest({$name}Request \$request): self
    {
        return new self(
            {$atributsFromRequest}
        );
    }
}
EOD;

        file_put_contents($dtoPath, $content);
    }


}
