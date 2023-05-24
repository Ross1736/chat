"use client";

import { DataContext } from "@/context/context";
import supabase from "@/supabase/supabaseClient";
import { useContext, useEffect, useState } from "react";

function Subir() {
  const { usuarioJson, url } = useContext(DataContext);

  const [datosForm, setDatosForm] = useState({
    titulo: null,
    descripcion: null,
    precio: null,
  });
  const [foto, setFoto] = useState(null);
  const [mostrarFoto, setMostrarFoto] = useState(null);
  const [datos, setDatos] = useState([]);
  const [contador, setContador] = useState(0);

  function capturarInputs(e) {
    setDatosForm((prevFormDatos) => {
      const value = e.target.value === "" ? null : e.target.value;
      return {
        ...prevFormDatos,
        [e.target.name]: value,
      };
    });
  }

  function capturarFoto(e) {
    const files = Array.from(e.target.files);
    console.log(files);
    setFoto(files);
    setMostrarFoto(URL.createObjectURL(files[0]));
  }

  async function subirFoto() {
    for (const image of foto) {
      const { data, error } = await supabase.storage
        .from("fotos")
        .upload(`${usuarioJson.id}/${datosForm.titulo}`, image);

      if (data) {
        console.log(data);
        setContador(contador + 1);
      }
      if (error) {
        console.log(error);
      }
    }
  }

  async function publicarAnuncio(e) {
    e.preventDefault();
    const { data, error } = await supabase
      .from("anuncios")
      .insert({
        user_id: usuarioJson.id,
        titulo: datosForm.titulo,
        descripcion: datosForm.descripcion,
        precio: datosForm.precio,
      })
      .select();

    if (data) {
      console.log(data);
      await subirFoto();
    }
  }

  //traer datos

  useEffect(() => {
    const fetchAnuncios = async () => {
      const { data, error } = await supabase
        .from("anuncios")
        .select()
        .eq("user_id", usuarioJson.id)
        .order("id", { ascending: false });

      if (data) {
        setDatos(data);
      }
    };

    fetchAnuncios();
  }, [contador]);

  return (
    <div>
      <form onSubmit={publicarAnuncio}>
        <input
          type="text"
          name="titulo"
          placeholder="titulo"
          onChange={capturarInputs}
        />
        <textarea
          type="text"
          name="descripcion"
          placeholder="descripcion"
          onChange={capturarInputs}
        />
        <input
          type="number"
          name="precio"
          placeholder="precio"
          onChange={capturarInputs}
        />
        <input type="file" onChange={capturarFoto} />

        <button type="submit">Publicar</button>
      </form>

      {/* <img src={mostrarFoto === null ? "" : mostrarFoto} alt="1" /> */}

      {datos && (
        <div>
          {datos.map((e) => (
            <div key={e.id}>
              <p>{e.titulo}</p>
              <p>{e.descripcion}</p>
              <p>${e.precio}</p>
              <img
                src={`${url}/${e.user_id}/${e.titulo.split(" ").join("%20")}`}
                width="160px"
                alt={e.titulo}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Subir;
