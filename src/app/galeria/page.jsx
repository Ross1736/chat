"use client";

import { useContext } from "react";
import estilo from "./Galeria.module.css";
import supabase from "@/supabase/supabaseClient";
import { DataContext } from "@/context/context";
import { useRouter } from "next/navigation";

async function fetchUsuarios() {
  const { data, error } = await supabase.from("usuarios").select();

  if (data) {
    console.log(data);
  }

  return data;
}

async function fetchDatos() {
  const { data, error } = await supabase
    .from("anuncios")
    .select()
    .order("id", { ascending: false });

  if (data) {
    console.log(data);
  }

  return data;
}

async function Galeria() {
  const router = useRouter();
  const { url } = useContext(DataContext);

  const usuarios = await fetchUsuarios();
  const anuncios = await fetchDatos();

  console.log("router", router);

  return (
    <div>
      {anuncios.map((e) => (
        <div key={e.id} className={estilo.anuncio}>
          <p onClick={() => router.push("/galeria/" + e.titulo)}>{e.titulo}</p>
          <p>{e.descripcion}</p>
          <p>${e.precio}</p>
          <img
            src={`${url}${e.user_id}/${e.titulo.split(" ").join("%20")}`}
            width="120px"
            alt={e.titulo}
          />
          {usuarios
            .filter((f) => f.user_id === e.user_id)
            .map((e) => (
              <div key={e.id}>
                <p>{e.nombres}</p>
                <img
                  src={`${url}${e.sexo.toLowerCase()}.png`}
                  width="40px"
                  alt="1"
                />
              </div>
            ))}
        </div>
      ))}
    </div>
  );
}

export default Galeria;
