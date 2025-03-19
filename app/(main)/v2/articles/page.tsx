'use client';

import React, { useEffect, useState } from "react";
import ArticlesList from "@/components/v2/ArticlesList";
import { getAllRubriques } from "@/app/(main)/lib/article";
import Sidebar from "@/components/v2/Sidebar";
import { Search } from "lucide-react";
import { Rubrique } from "@/type";
import {toast, Toaster} from "sonner";

export default function ForYouPage() {
  const [selectedRubriqueId, setSelectedRubriqueId] = useState<string | null>(null);
  const [_rubriques, setRubriques] = useState<Rubrique[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchRubriques() {
      try {
        const fetchedRubriques = await getAllRubriques();
        setRubriques(fetchedRubriques);
      } catch (error) {
        console.error("Erreur lors du chargement des Rubriques:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchRubriques();
  }, []);
  return (
    <div className="min-h-screen bg-gray-50 mt-16">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold ">Pour Vous</h1>
          <button
              className="flex md:hidden bg-[#FF9100] text-white px-6 py-2 rounded-full hover:bg-orange-400 transition-colors ml-4"
              onClick={() => toast.info("Fonctionnalité en cours de développement")}
          >
            Soumettre un article
          </button>
        </div>

        {/* Search and Categories */}
        <div className="mb-8">
          <div className="relative mb-6 flex justify-between items-center w-full">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Rechercher des articles"
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FF9100]    "
              />
            </div>
            <button
                className="hidden md:block bg-[#FF9100] text-white px-6 py-2 rounded-full hover:bg-orange-400 transition-colors ml-4"
                onClick={() => toast.info("Fonctionnalité en cours de développement")}
            >
                Soumettre un article
            </button>
          </div>

          {/* Rubrique Filters */}
          <div className="flex gap-4 overflow-x-auto pb-2">
            <button
              className={`px-4 py-2 rounded-full ${
                selectedRubriqueId === null ? "bg-[#FF9100] text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => setSelectedRubriqueId(null)}
            >
              Tout
            </button>
            {_rubriques.map(rubrique => (
              <button
                key={rubrique.rubrique_uuid}
                className={`px-4 py-2 rounded-full ${
                  selectedRubriqueId === rubrique.rubrique_uuid ? "bg-[#FF9100] text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                onClick={() => setSelectedRubriqueId(rubrique.rubrique_uuid)}
              >
                {rubrique.titre}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Articles List */}
          <div className="lg:col-span-2">
            <ArticlesList selectedRubriqueId={selectedRubriqueId} />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Sidebar />
          </div>
        </div>
      </main>
        <Toaster
            position="top-right"
            richColors
            expand={false}
            closeButton={true}
            visibleToasts={3}
            theme="light"
        />
    </div>
  );
}
