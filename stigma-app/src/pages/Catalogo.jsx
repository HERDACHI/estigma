
import React, { useEffect, useState } from "react";
import CatalogoProductos from "../components/CatalogoProductos";

function Catalogo() {
  const [productos, setProductos] = useState([]);
  const [doctor, setDoctor] = useState(null);

  const doctorId = localStorage.getItem("idUsuario");

  // Cargar doctor
  useEffect(() => {
    fetch(`http://localhost:3001/api/doctores/${doctorId}`)
      .then((res) => res.json())
      .then((data) => setDoctor(data))
      .catch((err) => console.error("Error cargando doctor:", err));
  }, [doctorId]);

  // Cargar productos
  useEffect(() => {
    fetch("http://localhost:3001/api/productos")
      .then((res) => res.json())
      .then((data) => setProductos(data))
      .catch((err) => console.error("Error cargando catálogo:", err));
  }, []);

  // Loading
  if (!doctor || productos.length === 0) {
    return <p>Cargando catálogo...</p>;
  }

  // Canje real
  const handleCanjear = async (producto) => {
    const res = await fetch("http://localhost:3001/api/canje", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        doctor_id: doctorId,
        producto_id: producto.id,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.mensaje);
      return;
    }

    alert("Canje exitoso");
    window.location.href = "/canje-exitoso";
  };

  return (
    <CatalogoProductos
      productos={productos}
      doctorFrancoins={doctor.francoins}
      onCanjear={handleCanjear}
    />
  );
}

export default Catalogo;







