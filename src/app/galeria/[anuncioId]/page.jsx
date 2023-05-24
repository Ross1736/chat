import supabase from "@/supabase/supabaseClient";

async function fetchUsuarios() {
  const { data, error } = await supabase.from("usuarios").select();

  return data;
}

async function fetchAnuncio(titulo) {
  const { data, error } = await supabase
    .from("anuncios")
    .select()
    .eq("titulo", titulo);

  return data;
}

async function getAnuncio({ params }) {
  let tituloFiltro = params.anuncioId.split("%20").join(" ");

  const datoUsuario = await fetchUsuarios();
  const datoAnuncio = await fetchAnuncio(tituloFiltro);

  return (
    <div>
      {datoAnuncio.map((e) => (
        <div key={e.id}>
          <p>{e.titulo}</p>
          <p>{e.descripcion}</p>
          <p>${e.precio}</p>
          <img
            src={`https://oocqaprpcxowckkspozr.supabase.co/storage/v1/object/public/fotos/${
              e.user_id
            }/${e.titulo.split(" ").join("%20")}`}
            width="200px"
            alt={e.titulo}
          />
          {datoUsuario
            .filter((f) => f.user_id === e.user_id)
            .map((e) => (
              <div key={e.id}>
                <p>{e.nombres}</p>
                <img
                  src={`https://oocqaprpcxowckkspozr.supabase.co/storage/v1/object/public/fotos/${e.sexo.toLowerCase()}.png`}
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

export default getAnuncio;
