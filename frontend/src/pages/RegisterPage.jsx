import { Link, useNavigate } from "react-router-dom";
import React, { useState } from 'react';
import useForm from '../hooks/useForm';

export const RegisterPage = () => {
  // TODO: Integrar lógica de registro aquí
  // TODO: Implementar useForm para el manejo del formulario
  // TODO: Implementar función handleSubmit
  const { formState, handleChange, reset } = useForm({
    username: "",
    email: "",
    password: "",
    name: "",
    lastname: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!formState.username || !formState.email || !formState.password || !formState.name || !formState.lastname) {
      setError("Completa todos los campos");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formState),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || "Error al crear la cuenta. Intenta nuevamente.");
      }
      reset();
      navigate("/home");
    } catch (err) {
      setError(err.message || "Error al crear la cuenta. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-8">
      <div className="max-w-lg w-full bg-white rounded-lg shadow-xl p-8">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Crear Cuenta</h2>
        {/* TODO: Mostrar este div cuando haya error */}
        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
            <p className="text-sm">{error}</p>
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 font-medium mb-2">Usuario</label>
            <input type="text" id="username" name="username" placeholder="Elige un nombre de usuario" className="w-full border border-gray-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-green-500" required value={formState.username} onChange={handleChange} disabled={loading} />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
            <input type="email" id="email" name="email" placeholder="tu@email.com" className="w-full border border-gray-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-green-500" required value={formState.email} onChange={handleChange} disabled={loading} />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Contraseña</label>
            <input type="password" id="password" name="password" placeholder="Crea una contraseña segura" className="w-full border border-gray-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-green-500" required value={formState.password} onChange={handleChange} disabled={loading} />
          </div>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Nombre</label>
            <input type="text" id="name" name="name" placeholder="Tu nombre" className="w-full border border-gray-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-green-500" required value={formState.name} onChange={handleChange} disabled={loading} />
          </div>
          <div className="mb-6">
            <label htmlFor="lastname" className="block text-gray-700 font-medium mb-2">Apellido</label>
            <input type="text" id="lastname" name="lastname" placeholder="Tu apellido" className="w-full border border-gray-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-green-500" required value={formState.lastname} onChange={handleChange} disabled={loading} />
          </div>
          <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded transition-colors" disabled={loading}>
            {loading ? "Registrando..." : "Registrarse"}
          </button>
        </form>
        <p className="text-center text-sm text-gray-600 mt-4">
          ¿Ya tienes cuenta?{" "}
          <Link to="/login" className="text-green-600 hover:text-green-800 font-medium">Inicia sesión aquí</Link>
        </p>
      </div>
    </div>
  );
};
