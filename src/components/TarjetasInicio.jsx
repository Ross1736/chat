"use client";

import { DataContext } from "@/context/context";
import supabase from "@/supabase/supabaseClient";
import { useContext } from "react";

async function getDatos() {
  const { data, error } = await supabase.from("usuarios").select();

  return data;
}

async function TarjetasInicio() {
  const { url } = useContext(DataContext);

  const respuestaDatos = await getDatos();
  console.log(respuestaDatos);

  return (
    <div>
      {respuestaDatos.map((e) => (
        <div key={e.id}>
          <div>
            {e.sexo === "Hombre" ? (
              <img src={`${url}hombre.png`} width="50px" alt="" />
            ) : (
              <img src={`${url}mujer.png`} width="50px" alt="" />
            )}
          </div>
          <h4>
            {e.nombres} {e.apellidos} - {e.edad} años
          </h4>
          <p>{e.sexo}</p>
          <p>{e.apodo}</p>
          <p>{e.correo}</p>
          <p>{e.user_id}</p>
        </div>
      ))}
    </div>
  );
}

export default TarjetasInicio;
