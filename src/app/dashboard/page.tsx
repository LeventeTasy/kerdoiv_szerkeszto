"use client";
import { useState, useEffect } from "react";
import { surveyService } from "@/services/surveyService";
import { Survey } from "@/types/survey";

export default function DashboardPage() {
  const [surveys, setSurveys] = useState<Survey[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Szűrés és Keresés állapotok 🕵️‍♀️
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState<"newest" | "oldest">("newest");

  useEffect(() => {
    async function loadSurveys() {
      try {
        setLoading(true);
        // Fix teszt-user, amíg a 3. mérföldkőben nem lesz Login
        const data = await surveyService.getSurveys("test-user-id");
        setSurveys(data);
      } catch (err) {
        console.error(err);
        setError("Hiba történt az adatok betöltésekor. 😢");
      } finally {
        setLoading(false);
      }
    }
    loadSurveys();
  }, []);

  // Törlés funkció REAKTÍVAN! ✨
  const handleDelete = async (id: string) => {
    if (confirm("Biztosan törlöd, bestie? 🥺")) { // Megerősítő dialógus!
      try {
        await surveyService.deleteSurvey(id);
        // Azonnal kivesszük a listából, nem kell frissíteni az oldalt
        setSurveys(prev => prev.filter(survey => survey.id !== id));
      } catch (err) {
        alert("Nem sikerült törölni!");
      }
    }
  };

  // Keresés, Szűrés, Rendezés logikája 🧠
  const filteredSurveys = surveys
      .filter(s => s.title.toLowerCase().includes(searchTerm.toLowerCase()))
      .filter(s => statusFilter === "all" || s.status === statusFilter)
      .sort((a, b) => {
        const timeA = a.createdAt || 0;
        const timeB = b.createdAt || 0;
        return sortBy === "newest" ? timeB - timeA : timeA - timeB;
      });

  // Loading állapot Tailwind pulse-szal
  if (loading) return (
      <div className="p-8 max-w-7xl mx-auto space-y-4">
        <div className="h-10 w-48 bg-gray-300 dark:bg-gray-700 rounded animate-pulse mb-8"></div>
        <div className="h-32 bg-gray-200 dark:bg-gray-800 rounded-xl animate-pulse"></div>
        <div className="h-32 bg-gray-200 dark:bg-gray-800 rounded-xl animate-pulse"></div>
      </div>
  );

  if (error) return <div className="p-8 text-red-500 font-bold text-center mt-10">{error}</div>;

  return (
      <div className="p-8 max-w-7xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold">Kérdőíveid 💅</h1>

        {/* Vezérlőpult */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
          <input
              placeholder="Keresés cím alapján..."
              className="border p-2 rounded flex-1 dark:bg-gray-800 dark:border-gray-700"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
              className="border p-2 rounded dark:bg-gray-800 dark:border-gray-700"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">Összes állapot</option>
            <option value="piszkozat">Piszkozat</option>
            <option value="közzétett">Közzétett</option>
          </select>
          <select
              className="border p-2 rounded dark:bg-gray-800 dark:border-gray-700"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "newest" | "oldest")}
          >
            <option value="newest">Legújabb elöl</option>
            <option value="oldest">Legrégebbi elöl</option>
          </select>
        </div>

        {/* Üres állapot */}
        {filteredSurveys.length === 0 ? (
            <div className="text-center py-20 text-gray-500 border-2 border-dashed rounded-xl">
              Még nincs itt semmi! Kezdj el alkotni! ✨
            </div>
        ) : (
            /* Lista */
            <div className="grid md:grid-cols-3 gap-6">
              {filteredSurveys.map(survey => (
                  <div key={survey.id} className="border dark:border-gray-800 p-5 rounded-xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between h-48 bg-white dark:bg-gray-950">
                    <div>
                      <h3 className="font-bold text-xl truncate">{survey.title}</h3>
                      <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 text-xs rounded-full mt-2">
                  {survey.status}
                </span>
                    </div>
                    <div className="flex justify-between items-center mt-4 border-t dark:border-gray-800 pt-4">
                      <button className="text-blue-500 hover:text-blue-600 font-medium text-sm">Szerkesztés</button>
                      <button
                          onClick={() => handleDelete(survey.id!)}
                          className="text-red-500 hover:text-red-600 font-medium text-sm"
                      >
                        Törlés
                      </button>
                    </div>
                  </div>
              ))}
            </div>
        )}
      </div>
  );
}