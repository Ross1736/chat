"use client";

import { DataContext } from "@/context/context";
import supabase from "@/supabase/supabaseClient";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";

function Ingreso() {
  const router = useRouter();

  const { setUserEstado, actualizarUsuario } = useContext(DataContext);

  const [formDatos, setFormDatos] = useState({
    correo: null,
    contraseña: null,
  });

  function capturarInputs(e) {
    setFormDatos((prevFormDatos) => {
      const value = e.target.value === "" ? null : e.target.value;
      return {
        ...prevFormDatos,
        [e.target.name]: value,
      };
    });
  }

  async function ingresar(e) {
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({
      email: formDatos.correo,
      password: formDatos.contraseña,
    });

    if (data) {
      console.log(data);
      actualizarUsuario(data.user);
      setUserEstado(true);
      router.push("/");
    }
  }

  return (
    <div>
      <h2>Ingresar</h2>

      <form onSubmit={ingresar}>
        <input
          type="text"
          placeholder="correo"
          name="correo"
          onChange={capturarInputs}
        />
        <input
          type="password"
          placeholder="contraseña"
          name="contraseña"
          onChange={capturarInputs}
        />
        <button type="submit">ingresar</button>
      </form>

      <p>
        No tienes una cuenta? <Link href="/registro">Registrate</Link>
      </p>
    </div>
  );
}

export default Ingreso;
