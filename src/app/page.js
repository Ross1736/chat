"use client";

import { DataContext } from "@/context/context";
import styles from "./page.module.css";

import TarjetasInicio from "@/components/TarjetasInicio";
import { useContext, useEffect } from "react";

function Home() {
  const { userEstado, usuarioDatos } = useContext(DataContext);

  useEffect(() => {
    if (userEstado) {
      console.log(usuarioDatos);
    }
  }, []);

  return (
    <main className={styles.main}>
      <h1>Inicio</h1>

      <p>{JSON.stringify(usuarioDatos)}</p>

      <TarjetasInicio></TarjetasInicio>
    </main>
  );
}

export default Home;
