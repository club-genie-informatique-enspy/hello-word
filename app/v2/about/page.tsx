import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Users, BookOpen, Target, Award, Github, Twitter, Linkedin } from 'lucide-react';

interface StatProps {
  value: string;
  label: string;
}

const StatCard: React.FC<StatProps> = ({ value, label }) => (
  <div className="p-6 bg-white/10 rounded-lg text-center">
    <h3 className="text-4xl font-bold text-orange-300 mb-2">{value}</h3>
    <p className="text-white/60">{label}</p>
  </div>
);

interface MissionProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const MissionCard: React.FC<MissionProps> = ({ title, description, icon }) => (
  <div className="p-6 bg-white rounded-lg shadow-lg transition-transform hover:translate-y-[-4px]">
    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-semibold text-[#FF9100] mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

interface TeamMemberProps {
    name: string;
    role: string;
    image: string;
    socialLinks: {
      linkedin?: string;
      twitter?: string;
      github?: string;
    };
  }

  const TeamMember: React.FC<TeamMemberProps> = ({ name, role, image, socialLinks }) => (
    <div className="group">
      <div className="relative overflow-hidden rounded-xl bg-white shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
        <div className="relative h-48 w-48 mx-auto mb-4 rounded-full overflow-hidden">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover"
          />
        </div>
        <div className="text-center">
          <h3 className="text-xl font-bold text-gray-900 mb-1">{name}</h3>
          <p className="text-[#FF9100] mb-4">{role}</p>
          <div className="flex justify-center gap-4">
            {socialLinks.linkedin && (
              <a href={socialLinks.linkedin} className="text-gray-600 hover:text-[#FF9100]">
                <Linkedin className="w-5 h-5" />
              </a>
            )}
            {socialLinks.twitter && (
              <a href={socialLinks.twitter} className="text-gray-600 hover:text-[#FF9100]">
                <Twitter className="w-5 h-5" />
              </a>
            )}
            {socialLinks.github && (
              <a href={socialLinks.github} className="text-gray-600 hover:text-[#FF9100]">
                <Github className="w-5 h-5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );

export default function AboutPage() {
  const stats = [
    { value: "50+", label: "Articles par mois" },
    { value: "30", label: "Journalistes actifs" },
    { value: "5K", label: "Lecteurs mensuels" },
    { value: "100+", label: "Événements couverts" }
  ];

  const missions = [
    {
      title: "Informer",
      description: "Couvrir l'actualité universitaire avec rigueur et objectivité pour tenir les étudiants informés.",
      icon: <BookOpen className="w-6 h-6 text-orange-500" />
    },
    {
      title: "Former",
      description: "Offrir une expérience pratique en journalisme aux étudiants passionnés par l'information.",
      icon: <Users className="w-6 h-6 text-orange-500" />
    },
    {
      title: "Connecter",
      description: "Créer des liens entre les différentes communautés du campus à travers nos reportages.",
      icon: <Target className="w-6 h-6 text-orange-500" />
    }
  ];

  const teamMembers = [
    {
      name: "Marie Laurent",
      role: "Rédactrice en Chef",
      image: "/api/placeholder/400/400",
      socialLinks: {
        linkedin: "#",
        twitter: "#"
      }
    },
    {
      name: "Thomas Dubois",
      role: "Directeur Editorial",
      image: "/api/placeholder/400/400",
      socialLinks: {
        linkedin: "#",
        twitter: "#",
        github: "#"
      }
    },
    {
      name: "Sarah Cohen",
      role: "Responsable Multimédia",
      image: "/api/placeholder/400/400",
      socialLinks: {
        linkedin: "#",
        twitter: "#"
      }
    },
    {
      name: "Lucas Martin",
      role: "Chef de Developpement",
      image: "/api/placeholder/400/400",
      socialLinks: {
        linkedin: "#",
        twitter: "#"
      }
    }
  ];

  return (
    <main className="min-h-screen">

      <header className="bg-white border-b py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Le Journal Universitaire</h1>
          <p className="text-xl text-[#FF9100]">La voix des étudiants depuis 2020</p>
        </div>
      </header>

        {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-bold text-center text-gray-900 mb-12">Notre Mission</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {missions.map((mission, index) => (
              <MissionCard key={index} {...mission} />
            ))}
          </div>
        </div>
      </section>

        {/* Stats Section */}
      <section className="py-16 bg-[#FF9100] text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-bold text-center text-white mb-12">Nos Chiffres</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <StatCard key={index} {...stat} />
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-bold text-center text-gray-900 mb-12">Nos Événements</h2>
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Images Grid */}
            <div className="lg:w-1/2">
              <div className="grid grid-cols-2 gap-1 h-full">
                <div className="rounded-tl-3xl overflow-hidden">
                  <Image src="/images/ios.jpg" alt="Event 1" width={250} height={250} className="object-cover w-[360px] h-[250px]" />
                </div>
                <div className="rounded-tr-3xl overflow-hidden">
                  <Image src="/images/android.jpg" alt="Event 2" width={250} height={250} className="object-cover w-[360px] h-[250px]" />
                </div>
                <div className="rounded-bl-3xl overflow-hidden">
                  <Image src="/images/camera.jpg" alt="Event 3" width={250} height={250} className="object-cover w-[360px] h-[300px]" />
                </div>
                <div className="rounded-br-3xl overflow-hidden">
                  <Image src="/images/culture.png" alt="Event 4" width={250} height={250} className="object-cover w-[360px] h-[300px]" />
                </div>
              </div>
            </div>
            {/* Text Content */}
            <div className="lg:w-1/2 flex flex-col justify-center">
              <h1 className="text-5xl font-bold text-gray-900 mb-6">Capturer les Moments Qui Comptent</h1>
              <p className="text-2xl text-gray-600 leading-relaxed">
                Notre équipe de journalistes couvre les événements les plus importants de la vie universitaire,
                des conférences académiques aux festivités étudiantes. Chaque image raconte une histoire,
                chaque reportage capture l'essence de notre communauté universitaire dynamique et diverse.
                Découvrez à travers notre objectif les moments qui façonnent notre expérience collective.
              </p>
            </div>
          </div>
        </div>
      </section>

        {/* Team Section - New */}
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
            <h2 className="text-5xl font-bold text-center text-gray-900 mb-12">Notre Équipe</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {teamMembers.map((member, index) => (
                <TeamMember key={index} {...member} />
                ))}
            </div>
            </div>
       </section>


      {/* Join Us Section */}
      <section className="py-16 bg-[#FF9100] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl text-white font-bold mb-6">Rejoignez la commautée du Club GI </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Vous êtes passionné d'informatique? Vous souhaitez acquérir une expérience
            concrète dans ces differents domaines? Rejoignez nous!
          </p>
          <Link
            href="#"
            className="inline-flex items-center gap-2 bg-white text-[#FF9100] px-8 py-3
                     rounded-full font-semibold transition-transform hover:scale-105"
          >
            Visiter Notre Site
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </main>
  );
}
