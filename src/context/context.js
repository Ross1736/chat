"use client";

import React, { createContext, useState } from "react";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [usuarioJson, setUsuarioJson] = useState(() => {
    if (typeof window !== "undefined") {
      return JSON.parse(localStorage.getItem("usuario"));
    }
    return null;
  });

  const guardarUsuarioEnLocalStorage = (usuario) => {
    localStorage.setItem("usuario", JSON.stringify(usuario));
  };

  const actualizarUsuario = (actualizar) => {
    guardarUsuarioEnLocalStorage(actualizar);
    setUsuarioJson(actualizar);
  };

  const [userEstado, setUserEstado] = useState(false);

  const url =
    "https://oocqaprpcxowckkspozr.supabase.co/storage/v1/object/public/fotos/";

  return (
    <DataContext.Provider
      value={{
        usuarioJson,
        setUsuarioJson,
        actualizarUsuario,
        userEstado,
        setUserEstado,
        url,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
