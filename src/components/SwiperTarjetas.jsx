"use client";

import estilo from "./css/SwiperTarjetas.module.css";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";
// import required modules
import { EffectCards } from "swiper";

function SwiperTarjetas({ datos }) {
  return (
    <div>
      <h2>prueba</h2>
      <Swiper
        effect={"cards"}
        grabCursor={true}
        modules={[EffectCards]}
        className={estilo.swiper}
      >
        {datos.map((e) => (
          <SwiperSlide key={e.id} className={estilo.slide}>
            <div className={estilo.contenido}>
              <p>{e.titulo}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default SwiperTarjetas;
