import { Link } from "react-router";
import React, { useState } from "react";
import useForm from "../hooks/useForm";

export const LoginPage = () => {
  // TODO: Integrar lógica de autenticación aquí
  // TODO: Implementar useForm para el manejo del formulario
  // TODO: Implementar función handleSubmit

  // TODO: Integrar lógica de autenticación aquí
  const { values, handleChange } = useForm({
    username: "",
    password: "",
  });
  const [error, setError] = useState(false);

  // TODO: Implementar función handleSubmit
  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(false);
    try {
      // Lógica de autenticación: enviar datos al backend
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (!response.ok) throw new Error("Credenciales incorrectas");
      // Si todo sale bien, puedes guardar el token y redirigir
      // const data = await response.json();
      // localStorage.setItem('token', data.token);
      // Redirigir a la página principal
    } catch {
      setError(true);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-8">
      <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-8">
        {/* Título */}
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Iniciar Sesión
        </h2>

        {/* TODO: Mostrar este div cuando haya error */}
        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
            <p className="text-sm">Credenciales incorrectas. Intenta nuevamente.</p>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-gray-700 font-medium mb-2"
            >
              Usuario
            </label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Ingresa tu usuario"
              className="w-full border border-gray-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              value={values.username}
              onChange={handleChange}
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-2"
            >
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Ingresa tu contraseña"
              className="w-full border border-gray-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              value={values.password}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded transition-colors"
          >
            Ingresar
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          ¿No tienes cuenta?
          <Link
            to="/register"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Regístrate aquí
          </Link>
        </p>
      </div>
    </div>
  );
};
