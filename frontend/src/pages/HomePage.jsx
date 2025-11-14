import React, { useEffect, useState } from "react";
import Loading from "../components/Loading";

export const HomePage = () => {
  // Estado y lógica para usuario, superhéroes y carga
  const [user, setUser] = useState(null);
  const [superheroes, setSuperheroes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reloadLoading, setReloadLoading] = useState(false);

  // para cargar datos de usuario y superhéroes al montar
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError("");
      try {
        const profileRes = await fetch("http://localhost:3000/api/profile", {
          credentials: "include",
        });
        if (!profileRes.ok) throw new Error();
        const profile = await profileRes.json();
        setUser(profile);
        const heroesRes = await fetch("http://localhost:3000/api/superheroes", {
          credentials: "include",
        });
        if (!heroesRes.ok) throw new Error();
        const heroesJson = await heroesRes.json();
        setSuperheroes(Array.isArray(heroesJson.data) ? heroesJson.data : []);
      } catch {
        setError("Error al cargar los datos. Inicia sesión nuevamente.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Función para recargar la lista de superhéroes
  const handleReload = async () => {
    setReloadLoading(true);
    setError("");
    try {
      const res = await fetch("http://localhost:3000/api/superheroes", {
        credentials: "include",
      });
      if (!res.ok) throw new Error();
      const heroesJson = await res.json();
      setSuperheroes(Array.isArray(heroesJson.data) ? heroesJson.data : []);
    } catch {
      setError("Error al recargar superhéroes.");
    } finally {
      setReloadLoading(false);
    }
  };

  if (loading) return <Loading />;

  // Renderiza la página principal con saludo y lista de superhéroes
  return (
    <div className="container mx-auto px-4 pb-8">
      <h1 className="text-4xl font-bold text-center mt-8 mb-4 text-gray-800">
        ¡Bienvenido{user?.name ? ", " + user.name : ""}!
      </h1>
      <div className="flex justify-center mb-8">
        <button
          onClick={handleReload}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded transition-colors"
          disabled={reloadLoading}
        >
          {reloadLoading ? "Recargando..." : "Recargar"}
        </button>
      </div>
      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-center">
          <p className="text-sm">{error}</p>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {superheroes.length === 0 ? (
          <div className="col-span-3 text-center text-gray-500 text-lg">No hay superhéroes disponibles.</div>
        ) : (
          superheroes.map((hero) => (
            <div
              key={hero.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              <img
                src={hero.image}
                alt={hero.superhero}
                className="h-64 object-cover w-full"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800">
                  {hero.superhero}
                </h3>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
