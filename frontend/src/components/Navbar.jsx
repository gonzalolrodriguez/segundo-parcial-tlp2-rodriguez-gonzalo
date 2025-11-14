
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


export const Navbar = () => {
  const [userName, setUserName] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/profile", {
          credentials: "include",
        });
        if (!res.ok) {
          setUserName("");
          return;
        }
        const data = await res.json();

        if (data.user) {
          setUserName(data.user.name || data.user.username || data.user.email || "");
        } else {
          setUserName(data.name || data.username || data.email || "");
        }
      } catch {
        setUserName("");
      }
    };
    fetchProfile();
  }, []);

  const handleLogout = async () => {
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/api/logout", {
        method: "POST",
        credentials: "include",
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || "Logout fallido");
      }
      navigate("/login");
    } catch (err) {
      setError(err.message || "Error al cerrar sesión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <nav className="bg-gray-900 text-white h-16 left-0 right-0 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        <div className="text-2xl font-bold">Superhéroes App</div>
        <div className="hidden md:flex items-center space-x-6">
          <span className="text-gray-300">
            Bienvenido, <span className="font-semibold text-white">{userName ? userName : "Invitado"}</span>
          </span>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded transition-colors font-medium"
            disabled={loading}
          >
            Cerrar Sesión
          </button>
          {error && <span className="text-red-400 ml-4 text-sm">{error}</span>}
        </div>
      </div>
    </nav>
  );
};
