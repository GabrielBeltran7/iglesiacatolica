
import React, { useState, useEffect } from "react";
import style from "./ComponentProfile.module.css";
import { auth } from "../../../api/firebase/FirebaseConfig/FirebaseConfig";
import { useDispatch } from "react-redux";
import  { postProfile } from "../../Redux/Actions"
import { onAuthStateChanged } from "firebase/auth";

const ComponentProfile = () => {
  const dispatch = useDispatch()
  const dateUser = auth.currentUser;
  const userId = dateUser?.uid ??"";
  const userEmail = dateUser?.email??"";
  const [formData, setFormData] = useState({
    nombre: "",
    apellidos: "",
    fechaNacimiento: "",
    fechaAfiliacion: "",
    estatura: "",
    posicion: "",
    disponibilidad: "",
    urquilla: "",
    email:userEmail,
    userId:userId,
    admin:true
  });

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSaveSubmit = (e) => {
    e.preventDefault();
     dispatch(postProfile(formData))
     setFormData({
      nombre: "",
      apellidos: "",
      fechaNacimiento: "",
      fechaAfiliacion: "",
      estatura: "",
      posicion: "",
      disponibilidad: "",
      urquilla: "",
     })
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


useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // El usuario está autenticado
        console.log("Usuario autenticado:", user);
      } else {
        // El usuario no está autenticado
        console.log("Usuario no autenticado");
      }
    });
  }, [])
  return (
    <div className={style.container}>
      <h2 className={style.labelTitle}>Mis Datos</h2>
      <form className={style.form} onSubmit={handleSaveSubmit}>
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
          <button type="submit"   className={style.button}>
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

// import React, { useState, useEffect } from "react";
// import style from "./ComponentProfile.module.css";
// import { auth } from "../../../api/firebase/FirebaseConfig/FirebaseConfig";
// import { useDispatch } from "react-redux";
// import { postProfile } from "../../Redux/Actions";

// const ComponentProfile = () => {
//   const dispatch = useDispatch()
//   const dateUser = auth.currentUser;
//   const userId = dateUser?.uid ??"";
//   const userEmail = dateUser?.email ??"";

//   const [formData, setFormData] = useState({
//     nombre: "",
//     apellidos: "",
//     fechaNacimiento: "",
//     fechaAfiliacion: "",
//     estatura: "",
//     posicion: "",
//     disponibilidad: "",
//     urquilla: "",
//     email:userEmail,
//     userId:userId,
//     admin:true
//   });

//   const handleInputChange = (event) => {
//     setFormData({
//       ...formData,
//       [event.target.name]: event.target.value,
//     });
//   };

//   const handleSaveSubmit = (e) => {
//     e.preventDefault();
//     dispatch(postProfile(formData))
//     console.log("55555555555555", formData)
//   };

//   useEffect(() => {
//     // Establecer la fecha actual al cargar la página
//     const today = new Date();
//     const formattedDate = today.toISOString().split("T")[0];
//     setFormData({
//       ...formData,
//       fechaAfiliacion: formattedDate,
//     });
//   }, []);

//   return (
//     <div className={style.container}>
//       <h2 className={style.labelTitle}>Mis Datos</h2>
//       <form className={style.form} >
//         <div className={style.div}>
//           <div className={style.inputContainer}>
//             <label>
//               <input
//                 placeholder="Nombre"
//                 type="text"
//                 name="nombre"
//                 value={formData.nombre}
//                 onChange={handleInputChange}
//                 className={style.inputdiv}
//               />
//             </label>
//           </div>
//           <div className={style.inputContainer}>
//             <label>
//               <input
//                 placeholder="Apellidos:"
//                 type="text"
//                 name="apellidos"
//                 value={formData.apellidos}
//                 onChange={handleInputChange}
//                 className={style.inputdiv}
//               />
//             </label>
//           </div>
//         </div>



//         <div className={style.divdate}>

//         <div className={style.inputContainer}>
//           <label> Fecha de Nacimiento
//             <input
//               placeholder="Fecha de nacimiento"
//               type="date"
//               name="fechaNacimiento"
//               value={formData.fechaNacimiento}
//               onChange={handleInputChange}
//               className={style.inputdate}
//             />
//           </label>
//         </div>
//         <div className={style.inputContainer}>
//           <label> Fecha de Afiliacion
//             <input
//               placeholder="Fecha de afiliación"
//               type="date"
//               name="fechaAfiliacion"
//               value={formData.fechaAfiliacion}
//               onChange={handleInputChange}
//               className={style.inputdate}
//             />
//           </label>
//         </div>
//         </div>

//          <div className={style.inputContainer}>
//           <label>
//             <input
//               placeholder="Estatura en metros"
//               type="text"
//               name="estatura"
//               value={formData.estatura}
//               onChange={handleInputChange}
//               className={style.input}
//             />
//           </label>
//         </div>
//         <div className={style.inputContainer}>
//           <label>
//             Posición:
//             <select
//               name="posicion"
//               value={formData.posicion}
//               onChange={handleInputChange}
//               className={style.input}
//             >
//               <option value="">Seleccione...</option>
//               <option value="Derecha">Derecha</option>
//               <option value="Izquierda">Izquierda</option>
//             </select>
//           </label>
//         </div>
//         <div className={style.inputContainer}>
//           <label>
//             Disponibilidad:
//             <select
//               name="disponibilidad"
//               value={formData.disponibilidad}
//               onChange={handleInputChange}
//               className={style.input}
//             >
//               <option value="">Seleccione...</option>
//               <option value="Semana Mayor">Semana Mayor</option>
//               <option value="Viernes Santo">Viernes Santo</option>
//               <option value="Ambas">Ambas</option>
//             </select>
//           </label>
//         </div>
//         <div className={style.inputContainer}>
//           <label>
//             ¿Urquilla?:
//             <select
//               name="urquilla"
//               value={formData.urquilla}
//               onChange={handleInputChange}
//               className={style.input}
//             >
//               <option value="">Seleccione...</option>
//               <option value="Si">Si</option>
//               <option value="No">No</option>
//             </select>
//           </label>
//         </div>


//          <div className={style.buttoncontainer}>
//         <div className={style.inputContainer}>
//           <button type="submit"  onSubmit={handleSaveSubmit} className={style.button}>
//             Guardar
//           </button>
//         </div>
//         <div className={style.inputContainer}>
//           <button type="submit" className={style.button}>
//             Actualizar
//           </button>
//         </div>
//         </div> 


//       </form>
//     </div>
//   );
// };

// export default ComponentProfile;
