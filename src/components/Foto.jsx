import React from "react";

async function Foto() {
  const datos = await Consulta();
  return (
    <div>
      {datos.map((e) => (
        <div key={e.id}>
          <img src={e.urls.small} width="200px" alt="foto" />
        </div>
      ))}
    </div>
  );
}

async function Consulta() {
  const data = await fetch(
    "https://api.unsplash.com/photos/?client_id=WdTcB3AcKr6fjh_R2LMF-OykvZ1Jt3ZNLvudXs8bLdQ&per_page=10"
  );
  const respuesta = await data.json();

  return respuesta;
}

export default Foto;
