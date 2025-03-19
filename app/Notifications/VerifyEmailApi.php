<?php

namespace App\Notifications;

use Carbon\Carbon;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Lang;

class VerifyEmailApi extends Notification implements ShouldQueue
{
    use Queueable;

    /**
     * Créer une nouvelle instance de notification.
     */
    public function __construct()
    {
        //
    }

    /**
     * Obtenir les canaux de livraison pour la notification.
     */
    public function via($notifiable)
    {
        return ['mail'];
    }

    /**
     * Construire le message mail.
     */
    public function toMail($notifiable)
    {
        $frontendUrl = config('app.frontend_url', 'http://localhost:3000');
        $verificationUrl = $this->verificationUrl($notifiable);

        return (new MailMessage)
            ->subject(Lang::get('Vérifiez votre adresse e-mail'))
            ->line(Lang::get('Veuillez cliquer sur le bouton ci-dessous pour vérifier votre adresse e-mail.'))
            ->action(Lang::get('Vérifier l\'adresse e-mail'), $verificationUrl)
            ->line(Lang::get('Si vous n\'avez pas créé de compte, aucune action n\'est requise.'));
    }

    /**
     * Obtenir l'URL de vérification pour l'utilisateur donné.
     */
    protected function verificationUrl($notifiable)
    {
        $frontendUrl = config('app.frontend_url', 'http://localhost:3000');

        // Générer une URL signée temporaire pour la vérification
        $verifyUrl = URL::temporarySignedRoute(
            'verification.verify',
            Carbon::now()->addMinutes(Config::get('auth.verification.expire', 60)),
            [
                'id' => $notifiable->getKey(),
                'hash' => sha1($notifiable->getEmailForVerification()),
                'redirect_to' => $frontendUrl . '/email-verified'
            ]
        );

        return $verifyUrl;
    }
}
