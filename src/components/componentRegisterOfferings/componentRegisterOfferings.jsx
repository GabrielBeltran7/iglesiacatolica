import React, { useState, useEffect } from "react";
import style from "./componentRegisterOfferings.module.css";
import { auth } from "../../../api/firebase/FirebaseConfig/FirebaseConfig";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { postOfferings, getUserProfileByEmail } from "../../Redux/Actions";
import { onAuthStateChanged } from "firebase/auth";

const ComponentRegisterOfferings = () => {
  const dispatch = useDispatch();

  const userByemail = useSelector((state) => state.UserProfileByEmail);

  const dateUser = auth.currentUser;
  const userId = dateUser?.uid ?? "";
  const userEmail = dateUser?.email ?? "";
  console.log("prueba", userEmail);

  useEffect(() => {
 
      dispatch(getUserProfileByEmail(userEmail));
  
  }, [userEmail]);

  const [formData, setFormData] = useState({});

  const [inputs, setInputs] = useState({
    nombre: userByemail.nombre || "",
    apellidos: userByemail.apellidos || "",
    email: userByemail.email || "",
    fechadeofrenda: "",
    cantidadofrendada: "",
  });
  useEffect(() => {
    setInputs({
      nombre: userByemail.nombre || "",
      apellidos: userByemail.apellidos || "",
      email: userByemail.email || "",
    });
  }, [userByemail]);

  const handleChangeInputs = (event) => {
    const { name, value } = event.target;
    if (name === "cantidadofrendada" && !/^\d*\.?\d*$/.test(value)) {
      return; // No actualiza el estado si no cumple con el formato deseado
    }
    setInputs({
      ...inputs,
      [event.target.name]: event.target.value,
    });
  };

  const handleSaveSubmit = (e) => {
    e.preventDefault();
    dispatch(postOfferings(inputs));
    dispatch(getUserProfileByEmail(userEmail));

    setInputs({
      fechadeofrenda: "",
      cantidadofrendada: "",
    });
  };

  // const today = new Date();
  // const formattedDate = today.toISOString().split("T")[0];

  useEffect(() => {
    setTimeout(() => {
      setFormData({});
    }, 1500);
  }, [userId]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
      } else {
      }
    });
  }, []);

  return (
    <div className={style.container}>
      <h2 className={style.labelTitle}>Registrar Ofrendas</h2>

      <form className={style.form} onSubmit={handleSaveSubmit}>
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
                readOnly
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
                readOnly
                required
              />
            </label>
          </div>
        </div>

        <div className={style.inputContainer}>
          <label>
            {" "}
            <input
              placeholder="Correo:"
              type="email"
              name="email"
              value={inputs.email}
              onChange={handleChangeInputs}
              className={style.input}
              readOnly
              required
            />
          </label>
        </div>

        <div className={style.inputContainer}>
          <label>
            {" "}
            Fecha de Ofrenda
            <input
              placeholder="Fecha de Ofrenda"
              type="date"
              name="fechadeofrenda"
              value={inputs.fechadeofrenda}
              onChange={handleChangeInputs}
              className={style.input}
              required
            />
          </label>
        </div>

        <div className={style.inputContainer}>
          <label>
            <input
              placeholder="$ Cantidad de ofrenda"
              type="Number"
              name="cantidadofrendada"
              value={inputs.cantidadofrendada}
              onChange={handleChangeInputs}
              className={style.input}
              required
            />
          </label>
        </div>

        <div className={style.buttoncontainer}>
          <div className={style.inputContainer}>
            <button type="submit" className={style.button}>
              Enviar
            </button>
          </div>
        </div>
      </form>
      <div className={style.offering}></div>
    </div>
  );
};

export default ComponentRegisterOfferings;

// import React, { useState, useEffect } from "react";
// import style from "./componentRegisterOfferings.module.css";
// import { auth } from "../../../api/firebase/FirebaseConfig/FirebaseConfig";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";

// import { postOfferings, getUserProfileByEmail } from "../../Redux/Actions";
// import { onAuthStateChanged } from "firebase/auth";

// const ComponentRegisterOfferings = () => {
//   const dispatch = useDispatch();

//   const userByemail = useSelector((state) => state.UserProfileByEmail);

//   const dateUser = auth.currentUser;
//   const userId = dateUser?.uid ?? "";
//   const userEmail = dateUser?.email ?? "";
//   console.log("prueba", userEmail);

//   useEffect(() => {
//     if (userEmail) {
//       dispatch(getUserProfileByEmail(userEmail));
//     }
//   }, [userEmail]);

//   const [formData, setFormData] = useState({});

//   const [inputs, setInputs] = useState({
//     nombre: userByemail.nombre || "",
//     apellidos: userByemail.apellidos || "",
//     email: userByemail.email || "",
//     fechadeofrenda: "",
//     cantidadofrendada: "",
//   });
//   useEffect(() => {
//     setInputs({
//       nombre: userByemail.nombre || "",
//       apellidos: userByemail.apellidos || "",
//       email: userByemail.email || "",
//     });
//   }, [userByemail]);

//   const handleChangeInputs = (event) => {
//     const { name, value } = event.target;
//     if (name === "cantidadofrendada" && !/^\d*\.?\d*$/.test(value)) {
//       return; // No actualiza el estado si no cumple con el formato deseado
//     }
//     setInputs({
//       ...inputs,
//       [event.target.name]: event.target.value,
//     });
//   };

//   const handleSaveSubmit = (e) => {
//     e.preventDefault();
//     dispatch(postOfferings(inputs));
//     dispatch(getUserProfileByEmail(userEmail));

//     setInputs({
//       fechadeofrenda: "",
//       cantidadofrendada: "",
//     });
//   };

//   // const today = new Date();
//   // const formattedDate = today.toISOString().split("T")[0];

//   useEffect(() => {
//     setTimeout(() => {
//       setFormData({});
//     }, 1500);
//   }, [userId]);

//   useEffect(() => {
//     onAuthStateChanged(auth, (user) => {
//       if (user) {
//       } else {
//       }
//     });
//   }, []);

//   return (
//     <div className={style.container}>
//       <h2 className={style.labelTitle}>Registrar Ofrendas</h2>
//       <form className={style.form} onSubmit={handleSaveSubmit}>
//         <div className={style.div}>
//           <div className={style.inputContainer}>
//             <label>
//               {" "}
//               <input
//                 placeholder="Nombre"
//                 type="text"
//                 name="nombre"
//                 value={inputs.nombre}
//                 onChange={handleChangeInputs}
//                 className={style.inputdiv}
//                 readOnly
//                 required
//               />
//             </label>
//           </div>
//           <div className={style.inputContainer}>
//             <label>
//               {" "}
//               <input
//                 placeholder="Apellidos:"
//                 type="text"
//                 name="apellidos"
//                 value={inputs.apellidos}
//                 onChange={handleChangeInputs}
//                 className={style.inputdiv}
//                 readOnly
//                 required
//               />
//             </label>
//           </div>
//         </div>
//         <div className={style.inputContainer}>
//           <label>
//             {" "}
//             <input
//               placeholder="Correo:"
//               type="email"
//               name="email"
//               value={inputs.email}
//               onChange={handleChangeInputs}
//               className={style.inputdiv}
//               readOnly
//               required
//             />
//           </label>
//         </div>
//         <div className={style.divdate}>
//           <div className={style.inputContainer}>
//             <label>
//               {" "}
//               Fecha de Ofrenda
//               <input
//                 placeholder="Fecha de nacimiento"
//                 type="date"
//                 name="fechadeofrenda"
//                 value={inputs.fechadeofrenda}
//                 onChange={handleChangeInputs}
//                 className={style.inputdate}
//                 required
//               />
//             </label>
//           </div>
//         </div>

//         <div className={style.inputContainer}>
//           <label>
//             <input
//               placeholder="Cantidad de ofrenda"
//               type="Number"
//               name="cantidadofrendada"
//               value={inputs.cantidadofrendada}
//               onChange={handleChangeInputs}
//               className={style.input}
//               required
//             />
//           </label>
//         </div>

//         <div className={style.buttoncontainer}>
//           <div className={style.inputContainer}>
//             <button type="submit" className={style.button}>
//               Enviar
//             </button>
//           </div>
//         </div>
//       </form>
//       <div className={style.offering}></div>
//     </div>
//   );
// };

// export default ComponentRegisterOfferings;
