import React, { useState, useEffect } from "react";
import style from "./ComponentProfile.module.css";

const ComponentProfile = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    apellidos: "",
    fechaNacimiento: "",
    fechaAfiliacion: "",
    estatura: "",
    posicion: "",
    disponibilidad: "",
    urquilla: "",
  });

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    // Establecer la fecha actual al cargar la página
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0];
    setFormData({
      ...formData,
      fechaAfiliacion: formattedDate,
    });
  }, []);

  return (
    <div className={style.container}>
      <h2 className={style.labelTitle}>Mis Datos</h2>
      <form className={style.form} onSubmit={handleFormSubmit}>
        <div className={style.div}>
          <div className={style.inputContainer}>
            <label>
              <input
                placeholder="Nombre"
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleInputChange}
                className={style.inputdiv}
              />
            </label>
          </div>
          <div className={style.inputContainer}>
            <label>
              <input
                placeholder="Apellidos:"
                type="text"
                name="apellidos"
                value={formData.apellidos}
                onChange={handleInputChange}
                className={style.inputdiv}
              />
            </label>
          </div>
        </div>



        <div className={style.divdate}>

        <div className={style.inputContainer}>
          <label> Fecha de Nacimiento
            <input
              placeholder="Fecha de nacimiento"
              type="date"
              name="fechaNacimiento"
              value={formData.fechaNacimiento}
              onChange={handleInputChange}
              className={style.inputdate}
            />
          </label>
        </div>
        <div className={style.inputContainer}>
          <label> Fecha de Afiliacion
            <input
              placeholder="Fecha de afiliación"
              type="date"
              name="fechaAfiliacion"
              value={formData.fechaAfiliacion}
              onChange={handleInputChange}
              className={style.inputdate}
            />
          </label>
        </div>
        </div>

         <div className={style.inputContainer}>
          <label>
            <input
              placeholder="Estatura en metros"
              type="text"
              name="estatura"
              value={formData.estatura}
              onChange={handleInputChange}
              className={style.input}
            />
          </label>
        </div>
        <div className={style.inputContainer}>
          <label>
            Posición:
            <select
              name="posicion"
              value={formData.posicion}
              onChange={handleInputChange}
              className={style.input}
            >
              <option value="">Seleccione...</option>
              <option value="Derecha">Derecha</option>
              <option value="Izquierda">Izquierda</option>
            </select>
          </label>
        </div>
        <div className={style.inputContainer}>
          <label>
            Disponibilidad:
            <select
              name="disponibilidad"
              value={formData.disponibilidad}
              onChange={handleInputChange}
              className={style.input}
            >
              <option value="">Seleccione...</option>
              <option value="Semana Mayor">Semana Mayor</option>
              <option value="Viernes Santo">Viernes Santo</option>
              <option value="Ambas">Ambas</option>
            </select>
          </label>
        </div>
        <div className={style.inputContainer}>
          <label>
            ¿Urquilla?:
            <select
              name="urquilla"
              value={formData.urquilla}
              onChange={handleInputChange}
              className={style.input}
            >
              <option value="">Seleccione...</option>
              <option value="Si">Si</option>
              <option value="No">No</option>
            </select>
          </label>
        </div>


         <div className={style.buttoncontainer}>
        <div className={style.inputContainer}>
          <button type="submit" className={style.button}>
            Guardar
          </button>
        </div>
        <div className={style.inputContainer}>
          <button type="submit" className={style.button}>
            Actualizar
          </button>
        </div>
        </div> 


      </form>
    </div>
  );
};

export default ComponentProfile;
