import { ArrowRight, Star } from 'lucide-react';
import React from 'react';
// import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
export function Hero() {
  return (
    <section className="py-32 px-4">
  <div className="container mx-auto text-center">
    <div className="mx-auto flex max-w-screen-lg flex-col gap-6">
      <h1 className="text-3xl font-extrabold leading-tight lg:text-6xl lg:leading-snug text-left sm:text-center">
        Un ensemble d'articles sur l'informatique, la mécanique, l'électronique et les divers
      </h1>
      <p className="text-muted-foreground text-left sm:text-center text-lg leading-relaxed lg:leading-normal">
        Le Hello Word est le blog de l'École Nationale Supérieure Polytechnique de Yaoundé
      </p>
    </div>
    {/* <Button size="lg" className="mt-10">
      Voir tous les posts 
      <ArrowRight className="ml-2 size-4" />
    </Button> */}
  </div>
</section>


  );
};
