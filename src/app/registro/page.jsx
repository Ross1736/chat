"use client";

import estilo from "./Registro.module.css";

import supabase from "@/supabase/supabaseClient";
import Link from "next/link";
import { useState } from "react";

function Registro() {
  const [sexo, setSexo] = useState("");
  const [formDatos, setFormDatos] = useState({
    correo: null,
    contraseña: null,
    apodo: null,
    nombres: null,
    apellidos: null,
    edad: null,
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

  async function insertarDatos(e) {
    e.preventDefault();
    const { data, error } = await supabase.auth.signUp({
      email: formDatos.correo,
      password: formDatos.contraseña,
      options: {
        data: {
          first_name: formDatos.apodo,
        },
      },
    });

    if (data) {
      console.log(data);
      insertarDatosUsuario(data.user.id);
    }
    if (error) {
      console.log(error);
    }
  }

  async function insertarDatosUsuario(userId) {
    const { data, error } = await supabase
      .from("usuarios")
      .insert({
        user_id: userId,
        nombres: formDatos.nombres,
        apellidos: formDatos.apellidos,
        edad: formDatos.edad,
        correo: formDatos.correo,
        apodo: formDatos.apodo,
        sexo: sexo,
      })
      .select();

    if (data) {
      console.log(data);
    }
    if (error) {
      console.log(error);
    }
  }

  function capturarValor(e) {
    console.log(e.currentTarget.dataset.value);
    setSexo(e.currentTarget.dataset.value);
  }

  return (
    <div>
      <h3>insertar</h3>
      <form onSubmit={insertarDatos}>
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
        <input
          type="text"
          placeholder="apodo"
          name="apodo"
          onChange={capturarInputs}
        />
        <input
          type="text"
          placeholder="nombres"
          name="nombres"
          onChange={capturarInputs}
        />
        <input
          type="text"
          placeholder="apellidos"
          name="apellidos"
          onChange={capturarInputs}
        />
        <input
          type="number"
          placeholder="edad"
          name="edad"
          onChange={capturarInputs}
        />

        <div className={estilo.sexos}>
          <p>selecciona un sexo</p>
          <ul>
            <li
              onClick={capturarValor}
              data-value="Hombre"
              className={sexo === "Hombre" ? estilo.activoSexo : ""}
            >
              Hombre
            </li>
            <li
              onClick={capturarValor}
              data-value="Mujer"
              className={sexo === "Mujer" ? estilo.activoSexo : ""}
            >
              Mujer
            </li>
          </ul>
        </div>

        <button type="submit">Insertar</button>
      </form>

      <p>
        Ya tienes una cuenta? <Link href="/ingreso">Inicia Sesión</Link>
      </p>
    </div>
  );
}

export default Registro;
