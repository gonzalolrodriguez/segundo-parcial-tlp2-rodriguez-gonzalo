import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  // TODO: Obtener datos del usuario desde /api/profile
  // TODO: Implementar función handleLogout con POST a /api/logout usando credentials: 'include'
  // TODO: Después del logout exitoso, redireccionar a /login
  // TODO: Manejar errores apropiadamente

  const [userName, setUserName] = useState('Usuario'); // TODO: Reemplazar con el nombre real del usuario obtenido de /api/profile
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/api/profile', { credentials: 'include' })
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data && data.name) setUserName(data.name);
      })
      .catch(() => { });
  }, []);

  const handleLogout = async () => {
    setError(null);
    try {
      const res = await fetch('/api/logout', {
        method: 'POST',
        credentials: 'include'
      });
      if (!res.ok) throw new Error('Logout fallido');
      navigate('/login');
    } catch (err) {
      setError('Error al cerrar sesión');
    }
  };

  return (
    <nav className="bg-gray-900 text-white h-16 left-0 right-0 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        <div className="text-2xl font-bold">Superhéroes App</div>

        <div className="hidden md:flex items-center space-x-6">
          <span className="text-gray-300">
            Bienvenido,{" "}
            <span className="font-semibold text-white">{userName}</span>
          </span>

          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded transition-colors font-medium"
          >
            Cerrar Sesión
          </button>
          {error && (
            <span className="text-red-400 ml-4 text-sm">{error}</span>
          )}
        </div>
      </div>
    </nav>
  );
};
