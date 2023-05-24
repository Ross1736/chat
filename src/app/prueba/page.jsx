"use client";

import estilo from "./prueba.module.css";
import supabase from "@/supabase/supabaseClient";
import { useContext, useEffect, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";
// import required modules
import { EffectCards } from "swiper";
import { DataContext } from "@/context/context";

function Pruebas() {
  const { url } = useContext(DataContext);

  const [datosAnuncios, setDatosAnuncios] = useState([]);

  useEffect(() => {
    const fetchAnuncio = async () => {
      const { data, error } = await supabase
        .from("anuncios")
        .select()
        .order("id", { ascending: false });

      if (data) {
        setDatosAnuncios(data);
      }
    };

    fetchAnuncio();
  }, []);

  return (
    <div>
      Pruebas
      <Swiper
        effect={"cards"}
        grabCursor={true}
        modules={[EffectCards]}
        className={estilo.swiper}
      >
        {datosAnuncios.map((e) => (
          <SwiperSlide key={e.id} className={estilo.slide}>
            <div className={estilo.foto}>
              <img
                src={`${url}${e.user_id}/${e.titulo.split(" ").join("%20")}`}
                alt={e.titulo}
              />
            </div>
            <div key={e.id} className={estilo.contenido}>
              <h4>{e.titulo}</h4>
              <h3>${e.precio}</h3>
              <p>{e.descripcion}</p>
              <p>Ver Producto</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Pruebas;
