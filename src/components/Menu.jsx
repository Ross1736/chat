"use client";

import estilo from "./css/Menu.module.css";

import Link from "next/link";
import supabase from "@/supabase/supabaseClient";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { DataContext } from "@/context/context";

function Menu() {
  const router = useRouter();

  const { userEstado, setUserEstado } = useContext(DataContext);

  const [estado, setEstado] = useState(false);

  useEffect(() => {
    setEstado(false);
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        setUserEstado(true);
      }
      setEstado(true);
    };

    fetchUser();
  }, [userEstado]);

  async function cerrar() {
    const { error } = await supabase.auth.signOut();
    setUserEstado(false);
    localStorage.clear();
    router.push("/");
  }

  return (
    <ul className={estilo.menu}>
      <li>
        <Link href="/">Inicio</Link>
      </li>
      <li>
        <Link href="/galeria">Galeria</Link>
      </li>
      <li>
        <Link href="/prueba">Prueba</Link>
      </li>

      {userEstado ? (
        <li>
          <Link href="/subir">Subir</Link>
        </li>
      ) : null}

      {userEstado ? (
        <li>
          <Link href="/perfil">Perfil</Link>
        </li>
      ) : null}

      <li>
        {userEstado ? (
          <button onClick={cerrar}>{estado ? "Salir" : null}</button>
        ) : (
          <button
            onClick={() => {
              router.push("/ingreso");
            }}
          >
            {estado ? "Ingresar" : null}
          </button>
        )}
      </li>
    </ul>
  );
}

export default Menu;
