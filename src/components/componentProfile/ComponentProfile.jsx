import React, { useState, useEffect } from "react";
import style from "./ComponentProfile.module.css";
import { auth } from "../../../api/firebase/FirebaseConfig/FirebaseConfig";
import { useDispatch, useSelector } from "react-redux";
import { postProfile, getUserProfileByEmail, updateProfile } from "../../Redux/Actions";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const ComponentProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userByemail = useSelector((state) => state.UserProfileByEmail);
console.log("************", userByemail)

  const dateUser = auth.currentUser;
  const userId = dateUser?.uid ?? "";
  const userEmail = dateUser?.email ?? "";
  console.log("//////////////////////", userEmail)
  useEffect(() => {
    dispatch(getUserProfileByEmail(userEmail));
  }, [userEmail]);


  const [formData, setFormData] = useState({
    nombre:  "",
    apellidos: "",
    fechaNacimiento: "",
    fechaAfiliacion: "",
    estatura: "",
    posicion: "",
    disponibilidad: "",
    urquilla: "",
    email: userEmail,
    userId: userId,
    admin: false,
    user:true
  });

  const [inputs, setInputs] = useState({
    nombre: "",
    apellidos: "",
    fechaNacimiento: "",
    fechaAfiliacion: "",
    estatura: "",
    posicion: "",
    disponibilidad: "",
    urquilla: "",
    email: "",
    id: "",
    admin: false,
    user: true,
  });
  useEffect(() => {
    // Cargar los datos del usuario al montar el componente o al actualizar la página
    setInputs({
      nombre: userByemail.nombre || "",
      apellidos: userByemail.apellidos || "",
      fechaNacimiento: userByemail.fechaNacimiento || "",
      fechaAfiliacion: userByemail.fechaAfiliacion || "",
      estatura: userByemail.estatura || "",
      posicion: userByemail.posicion || "",
      disponibilidad: userByemail.disponibilidad || "",
      urquilla: userByemail.urquilla || "",
      email: userByemail.email || "",
      id: userByemail.id || "",
      admin: false,
      user: true,
    });
  }, [userByemail]); 

 

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "estatura" && !/^\d*\.?\d*$/.test(value)) {
      return; // No actualiza el estado si no cumple con el formato deseado
    }
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangeInputs = (event) => {
    const { name, value } = event.target;
    if (name === "estatura" && !/^\d*\.?\d*$/.test(value)) {
      return; // No actualiza el estado si no cumple con el formato deseado
    }
    setInputs({
      ...inputs,
      [event.target.name]: event.target.value,
    });
  };

  const handleSaveSubmit = (e) => {
    e.preventDefault();
    dispatch(postProfile(formData));
    dispatch(getUserProfileByEmail(userEmail));

    setFormData({
      nombre: "",
      apellidos: "",
      fechaNacimiento: "",
      fechaAfiliacion: formattedDate,
      estatura: "",
      posicion: "",
      disponibilidad: "",
      urquilla: "",
      email: userEmail,
      userId: userId,
      admin: false,
      user: true,
    });
  };


  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProfile(inputs));
    dispatch(getUserProfileByEmail(userEmail));
  };


  const today = new Date();
  const formattedDate = today.toISOString().split("T")[0];

  useEffect(() => {
    setTimeout(() => {
      setFormData({
        ...formData,
        email: userEmail,
        userId: userId,
        fechaAfiliacion: formattedDate,
      });
    }, 1500);
  }, [userId]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // El usuario está autenticado
      } else {
        // El usuario no está autenticado
      }
    });
  }, []);

  const navigateHomeAdmin = () => {
    navigate("/homeadmin");
  };

  return userByemail.length===0 ? (
    <div className={style.container}>
      
      <h2 className={style.labelTitle}>Registrar Datos</h2>
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
                required
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
                required
              />
            </label>
          </div>
        </div>

        <div className={style.divdate}>
          <div className={style.inputContainer}>
            <label>
              {" "}
              Fecha de Nacimiento
              <input
                placeholder="Fecha de nacimiento"
                type="date"
                name="fechaNacimiento"
                value={formData.fechaNacimiento}
                onChange={handleInputChange}
                className={style.inputdate}
                required
              />
            </label>
          </div>
          <div className={style.inputContainer}>
            <label>
              {" "}
              Fecha de Afiliacion
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
              required
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
              required
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
              required
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
              required
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
          
        </div>
      </form>
    </div>
  ) : 
  
  (
    <div className={style.container}>
     
      <h2 className={style.labelTitle}>Mis Datos</h2>
      <form className={style.form} onSubmit={handleUpdateSubmit}>
        <div className={style.div}>
          <div className={style.inputContainer}>
            <label>
            {" "}
              <input
                placeholder="Nombre"
                type="text"
                name="nombre"
                value={inputs.nombre}
                onChange={handleChangeInputs}
                className={style.inputdiv}
                required
              />
            </label>
          </div>
          <div className={style.inputContainer}>
            <label>
            {" "}
              <input
                placeholder="Apellidos:"
                type="text"
                name="apellidos"
                value={inputs.apellidos}
                onChange={handleChangeInputs}
                className={style.inputdiv}
                required
              />
            </label>
          </div>
        </div>

        <div className={style.divdate}>
          <div className={style.inputContainer}>
            <label>
              {" "}
              Fecha de Nacimiento
              <input
                placeholder="Fecha de nacimiento"
                type="date"
                name="fechaNacimiento"
                value={inputs.fechaNacimiento}
                onChange={handleChangeInputs}
                className={style.inputdate}
                required
              />
            </label>
          </div>
          <div className={style.inputContainer}>
            <label>
              
              Fecha de Afiliacion
              <input
                placeholder="Fecha de afiliación"
                type="date"
                name="fechaAfiliacion"
                value={inputs.fechaAfiliacion}
                onChange={handleChangeInputs}
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
              value={inputs.estatura}
              onChange={handleChangeInputs}
              className={style.input}
              required
            />
          </label>
        </div>
        <div className={style.inputContainer}>
          <label>
            Posición:
            <select
              name="posicion"
              value={inputs.posicion}
              onChange={handleChangeInputs}
              className={style.input}
              required
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
              value={inputs.disponibilidad}
              onChange={handleChangeInputs}
              className={style.input}
              required
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
              value={inputs.urquilla}
              onChange={handleChangeInputs}
              className={style.input}
              required
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
// import { useDispatch, useSelector } from "react-redux";
// import { postProfile, getUserProfileByEmail, updateProfile } from "../../Redux/Actions";
// import { onAuthStateChanged } from "firebase/auth";
// import { useNavigate } from "react-router-dom";

// const ComponentProfile = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const userByemail = useSelector((state) => state.UserProfileByEmail);
//  console.log("userByemail",userByemail)

//   const dateUser = auth.currentUser;
//   const userId = dateUser?.uid ?? "";
//   const userEmail = dateUser?.email ?? "";


//   const [formData, setFormData] = useState({
//     nombre:  "",
//     apellidos: "",
//     fechaNacimiento: "",
//     fechaAfiliacion: "",
//     estatura: "",
//     posicion: "",
//     disponibilidad: "",
//     urquilla: "",
//     email: userEmail,
//     userId: userId,
//     admin: true,
//     user:true
//   });

//   const [inputs, setInputs] = useState({
//     nombre: userByemail.nombre || "",
//     apellidos: userByemail.apellidos || "",
//     fechaNacimiento: userByemail.fechaNacimiento || "",
//     fechaAfiliacion: userByemail.fechaAfiliacion || "",
//     estatura: userByemail.estatura || "",
//     posicion: userByemail.posicion || "",
//     disponibilidad: userByemail.disponibilidad || "",
//     urquilla: userByemail.urquilla || "",
//     email: userByemail.email || "",
//     userId: userByemail.userId || "",
//     admin: true,
//     user:true
//   });
//   useEffect(() => {
//     dispatch(getUserProfileByEmail(userEmail));
//   }, []);

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     if (name === "estatura" && !/^\d*\.?\d*$/.test(value)) {
//       return; // No actualiza el estado si no cumple con el formato deseado
//     }
//     setFormData({
//       ...formData,
//       [event.target.name]: event.target.value,
//     });
//   };

//   const handleChangeInputs = (event) => {
//     const { name, value } = event.target;
//     if (name === "estatura" && !/^\d*\.?\d*$/.test(value)) {
//       return; // No actualiza el estado si no cumple con el formato deseado
//     }
//     setInputs({
//       ...inputs,
//       [event.target.name]: event.target.value,
//     });
//   };

//   const handleSaveSubmit = (e) => {
//     e.preventDefault();
//     dispatch(postProfile(formData));
//     dispatch(getUserProfileByEmail(userEmail));

//     setFormData({
//       nombre: "",
//       apellidos: "",
//       fechaNacimiento: "",
//       fechaAfiliacion: formattedDate,
//       estatura: "",
//       posicion: "",
//       disponibilidad: "",
//       urquilla: "",
//       email: userEmail,
//       userId: userId,
//       admin: false,
//       user: true,
//     });
//   };


//   const handleUpdateSubmit = (e) => {
//     e.preventDefault();
//     dispatch(updateProfile(inputs));
//     dispatch(getUserProfileByEmail(userEmail));
//   };


//   const today = new Date();
//   const formattedDate = today.toISOString().split("T")[0];

//   useEffect(() => {
//     setTimeout(() => {
//       setFormData({
//         ...formData,
//         email: userEmail,
//         userId: userId,
//         fechaAfiliacion: formattedDate,
//       });
//     }, 1500);
//   }, [userId]);

//   useEffect(() => {
//     onAuthStateChanged(auth, (user) => {
//       if (user) {
//         // El usuario está autenticado
//       } else {
//         // El usuario no está autenticado
//       }
//     });
//   }, []);

//   const navigateHomeAdmin = () => {
//     navigate("/homeadmin");
//   };

//   return !userByemail.user ? (
//     <div className={style.container}>
//       <div className={style.inputContainer}>
//         <button
//           onClick={navigateHomeAdmin}
//           type="submit"
//           className={style.button}
//         >
//           admin
//         </button>
//       </div>
//       <h2 className={style.labelTitle}>Registrar Datos</h2>
//       <form className={style.form} onSubmit={handleSaveSubmit}>
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
//                 required
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
//                 required
//               />
//             </label>
//           </div>
//         </div>

//         <div className={style.divdate}>
//           <div className={style.inputContainer}>
//             <label>
//               {" "}
//               Fecha de Nacimiento
//               <input
//                 placeholder="Fecha de nacimiento"
//                 type="date"
//                 name="fechaNacimiento"
//                 value={formData.fechaNacimiento}
//                 onChange={handleInputChange}
//                 className={style.inputdate}
//                 required
//               />
//             </label>
//           </div>
//           <div className={style.inputContainer}>
//             <label>
//               {" "}
//               Fecha de Afiliacion
//               <input
//                 placeholder="Fecha de afiliación"
//                 type="date"
//                 name="fechaAfiliacion"
//                 value={formData.fechaAfiliacion}
//                 onChange={handleInputChange}
//                 className={style.inputdate}
//               />
//             </label>
//           </div>
//         </div>

//         <div className={style.inputContainer}>
//           <label>
//             <input
//               placeholder="Estatura en metros"
//               type="text"
//               name="estatura"
//               value={formData.estatura}
//               onChange={handleInputChange}
//               className={style.input}
//               required
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
//               required
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
//               required
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
//               required
//             >
//               <option value="">Seleccione...</option>
//               <option value="Si">Si</option>
//               <option value="No">No</option>
//             </select>
//           </label>
//         </div>

//         <div className={style.buttoncontainer}>
//           <div className={style.inputContainer}>
//             <button type="submit" className={style.button}>
//               Guardar
//             </button>
//           </div>
          
//         </div>
//       </form>
//     </div>
//   ) : 
  
  
  
  








  
//   (
//     <div className={style.container}>
//       <div className={style.inputContainer}>
//         <button
//           onClick={navigateHomeAdmin}
//           type="submit"
//           className={style.button}
//         >
//           admin
//         </button>
//       </div>
//       <h2 className={style.labelTitle}>Mis Datos</h2>
//       <form className={style.form} onSubmit={handleUpdateSubmit}>
//         <div className={style.div}>
//           <div className={style.inputContainer}>
//             <label>
//               <input
//                 placeholder="Nombre"
//                 type="text"
//                 name="nombre"
//                 value={inputs.nombre}
//                 onChange={handleChangeInputs}
//                 className={style.inputdiv}
//                 required
//               />
//             </label>
//           </div>
//           <div className={style.inputContainer}>
//             <label>
//               <input
//                 placeholder="Apellidos:"
//                 type="text"
//                 name="apellidos"
//                 value={inputs.apellidos}
//                 onChange={handleChangeInputs}
//                 className={style.inputdiv}
//                 required
//               />
//             </label>
//           </div>
//         </div>

//         <div className={style.divdate}>
//           <div className={style.inputContainer}>
//             <label>
//               {" "}
//               Fecha de Nacimiento
//               <input
//                 placeholder="Fecha de nacimiento"
//                 type="date"
//                 name="fechaNacimiento"
//                 value={inputs.fechaNacimiento}
//                 onChange={handleChangeInputs}
//                 className={style.inputdate}
//                 required
//               />
//             </label>
//           </div>
//           <div className={style.inputContainer}>
//             <label>
//               {" "}
//               Fecha de Afiliacion
//               <input
//                 placeholder="Fecha de afiliación"
//                 type="date"
//                 name="fechaAfiliacion"
//                 value={inputs.fechaAfiliacion}
//                 onChange={handleChangeInputs}
//                 className={style.inputdate}
//               />
//             </label>
//           </div>
//         </div>

//         <div className={style.inputContainer}>
//           <label>
//             <input
//               placeholder="Estatura en metros"
//               type="text"
//               name="estatura"
//               value={inputs.estatura}
//               onChange={handleChangeInputs}
//               className={style.input}
//               required
//             />
//           </label>
//         </div>
//         <div className={style.inputContainer}>
//           <label>
//             Posición:
//             <select
//               name="posicion"
//               value={inputs.posicion}
//               onChange={handleChangeInputs}
//               className={style.input}
//               required
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
//               value={inputs.disponibilidad}
//               onChange={handleChangeInputs}
//               className={style.input}
//               required
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
//               value={inputs.urquilla}
//               onChange={handleChangeInputs}
//               className={style.input}
//               required
//             >
//               <option value="">Seleccione...</option>
//               <option value="Si">Si</option>
//               <option value="No">No</option>
//             </select>
//           </label>
//         </div>

//         <div className={style.buttoncontainer}>
//           <div className={style.inputContainer}>
//             <button type="submit" className={style.button}>
//               Actualizar
//             </button>
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default ComponentProfile;
