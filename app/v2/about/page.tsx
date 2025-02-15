import React from "react";
import { Mail, MapPin, Clock, Send } from "lucide-react";

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto p-6">
        {/* En-tête avec effet de soulignement */}
        <div className="text-center mt-16 mb-12">
          <h1 className="text-4xl font-bold text-orange-500 mb-3 relative inline-block">
            Contactez-Nous
            <div className="absolute bottom-0 left-0 w-full h-1 bg-orange-500 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></div>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Nous sommes à votre écoute pour toute question, suggestion ou collaboration
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Colonne d'informations */}
          <div className="space-y-8">
            {/* Section À Propos avec carte moderne */}
            <div className="bg-white rounded-xl shadow-lg p-8 transform hover:scale-105 transition-transform duration-300">
              <h2 className="text-2xl font-bold text-orange-500 mb-4 flex items-center">
                <span className="w-8 h-1 bg-orange-500 mr-3"></span>
                À Propos de Nous
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Le Journal de l'École est une publication créée par et pour les élèves. 
                Notre mission est de tenir informée la communauté scolaire des événements, 
                actualités et succès de notre établissement tout en offrant une plateforme 
                d'expression aux élèves.
              </p>
            </div>

            {/* Section Mission avec design moderne */}
            <div className="bg-white rounded-xl shadow-lg p-8 transform hover:scale-105 transition-transform duration-300">
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <span className="w-8 h-1 bg-orange-500 mr-3"></span>
                Notre Mission
              </h2>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                  Fournir une information fiable
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                  Encourager la créativité
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                  Promouvoir le dialogue
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                  Développer l'esprit critique
                </li>
              </ul>
            </div>

            {/* Section Équipe avec effet de profondeur */}
            <div className="bg-white rounded-xl shadow-lg p-8 transform hover:scale-105 transition-transform duration-300">
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <span className="w-8 h-1 bg-orange-500 mr-3"></span>
                Notre Équipe
              </h2>
              <p className="leading-relaxed">
                Notre équipe est composée d'élèves passionnés par le journalisme, 
                l'écriture et la communication. Chaque membre apporte sa perspective 
                unique pour enrichir notre contenu.
              </p>
            </div>
          </div>

          {/* Colonne du formulaire */}
          <div>
            <form className="bg-white rounded-xl shadow-lg p-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="name">
                    Nom et Prénom
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition duration-200"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="email">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition duration-200"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="subject">
                    Sujet
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition duration-200"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="message">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition duration-200"
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-orange-500 text-white py-4 px-6 rounded-lg hover:bg-orange-700 transform hover:-translate-y-1 transition duration-200 flex items-center justify-center space-x-2"
                >
                  <Send size={20} />
                  <span>Envoyer</span>
                </button>
              </div>
            </form>

            {/* Informations de contact avec icônes */}
            <div className="mt-8 bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Autres Moyens de Nous Contacter
              </h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-gray-600">
                  <Mail className="text-orange-500" size={20} />
                  <p>clubinfoenspy@gmail.com</p>
                </div>
                <div className="flex items-center space-x-3 text-gray-600">
                  <MapPin className="text-orange-500" size={20} />
                  <p>Local du journal : Melen, ENSPY</p>
                </div>
                <div className="flex items-center space-x-3 text-gray-600">
                  <Clock className="text-orange-500" size={20} />
                  <p>Sortie des versions Papiers : Toutes les deux semaines</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;