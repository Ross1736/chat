"use client";

import supabase from "@/supabase/supabaseClient";

import estilo from "./css/Mensajes.module.css";

async function Mensajes() {
  const { data, error } = await supabase.from("prueba").select();

  if (data) {
    return (
      <div className={estilo.mensajes}>
        <h4>mensajes</h4>

        {data.length > 0 ? (
          <div>
            {data.map((e, i) => (
              <div key={i}>
                <h5>{e.nombre}</h5>
                <p>{e.mensaje}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>Cargando datos...</p>
        )}
      </div>
    );
  }

  if (error) {
    return (
      <div className={estilo.mensajes}>
        <h4>{error}</h4>
      </div>
    );
  }
}

export default Mensajes;
