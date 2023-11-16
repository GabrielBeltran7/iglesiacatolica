import React, { useRef, useState, useEffect } from "react";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import { Button, Input, Space, Table, Typography, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import * as XLSX from "xlsx";
import moment from "moment";
import Swal from "sweetalert2";
import { getUserProfile } from "../../Redux/Actions"; // Asegúrate de importar apdateRoluser
import style from "./userAdmin.module.css";

const RecargarPuntos = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  const allUsers = useSelector((state) => state.allUsers);


  if (allUsers) {
    allUsers.forEach((user) => {
      // Formatea la fecha en el formato deseado
      user.createdAt = moment(user.createdAt).format("YYYY-MM-DD HH:mm:ss");
      user.updatedAt = moment(user.updatedAt).format("YYYY-MM-DD HH:mm:ss");
    });
  }

  const dispatch = useDispatch();



  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(allUsers);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "User");

    // Guardar el archivo de Excel
    XLSX.writeFile(wb, "users.xlsx");
  };
  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch]); 

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),

    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },

    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: "Nombre",
      dataIndex: "nombre",
      key: "nombre",
      width: "20%",
      ...getColumnSearchProps("nombre"),
      // render: (text, record) => (
      //   <a className={style.userName} href={`/cargapuntos/${record.id}`}>
      //     {text}
      //   </a>
      // ),
    },
    {
      title: "Apellido",
      dataIndex: "apellidos",
      key: "apellidos",
      width: "20%",
      ...getColumnSearchProps("apellidos"),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: "20%",
      ...getColumnSearchProps("email"),
    },
    {
      title: "disponibilidad",
      dataIndex: "disponibilidad",
      key: "disponibilidad",
      ...getColumnSearchProps("disponibilidad"),
    },
    {
      title: "Estatura",
      dataIndex: "estatura",
      key: "estatura",
      ...getColumnSearchProps("estatura"),
    },
    {
      title: "fecha Afiliacion",
      dataIndex: "fechaAfiliacion",
      key: "fechaAfiliacion",
      ...getColumnSearchProps("fechaAfiliacion"),
    },
    {
      title: "Fecha Nacimiento",
      dataIndex: "fechaNacimiento",
      key: "fechaNacimiento",
      ...getColumnSearchProps("fechaNacimiento"),
    },
    {
      title: "Posicion",
      dataIndex: "posicion",
      key: "posicion",
      ...getColumnSearchProps("posicion"),
    },
    {
      title: "Urquilla",
      dataIndex: "urquilla",
      key: "urquilla",
      ...getColumnSearchProps("urquilla"),
    },
  ];

  return (
    <div>
      <div className={style.botonexcel}>
        <button onClick={exportToExcel}>Exportar a excel 📑</button>
      </div>

      <Table columns={columns} dataSource={allUsers} /> {/* Agregué la propiedad dataSource */}
      <div>
        <div className={style.containerAviso}></div>
      </div>
    </div>
  );
};

export default RecargarPuntos;


// import { SearchOutlined } from "@ant-design/icons";
// import React, { useRef, useState, useEffect } from "react";
// import Highlighter from "react-highlight-words";
// import { Button, Input, Space, Table, Typography, Tag, Select } from "antd";
// import { useDispatch, useSelector } from "react-redux";
// import * as XLSX from "xlsx";
// import moment from "moment";
// import Swal from "sweetalert2";
// import { getUserProfile } from "../../Redux/Actions";
// //


// import style from "./userAdmin.module.css";

// const RecargarPuntos = () => {
//   const [searchText, setSearchText] = useState("");
//   const [searchedColumn, setSearchedColumn] = useState("");
//   const searchInput = useRef(null);

//   const allUsers = useSelector((state)=>state.allUsers)
//   console.log("usuariosmuchos", allUsers)
//   const user = useSelector((state) => state.user);

//   if (allUsers) {
//     allUsers.forEach((user) => {
//       // Formatea la fecha en el formato deseado
//       user.createdAt = moment(user.createdAt).format("YYYY-MM-DD HH:mm:ss");
//       user.updatedAt = moment(user.updatedAt).format("YYYY-MM-DD HH:mm:ss");
//     });
//   }
//   const dispatch = useDispatch();

//   const [rol, setRol] = useState(false);

//   const exportToExcel = () => {
//     const ws = XLSX.utils.json_to_sheet(allUsers);
//     const wb = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, "User");

//     // Guardar el archivo de Excel
//     XLSX.writeFile(wb, "users.xlsx");
//   };

//   const handleChange = (record) => (event) => {
//     dispatch(
//       apdateRoluser({
//         username: record.username,
//         rol: event,
//       })
//     );
//     if (rol) {
//       setRol(false);
//     } else {
//       setRol(true);
//     }
//   };



//   useEffect(() => {
//     dispatch(getUserProfile());
//   }, []);

//   const handleSearch = (selectedKeys, confirm, dataIndex) => {
//     confirm();
//     setSearchText(selectedKeys[0]);
//     setSearchedColumn(dataIndex);
//   };
//   const handleReset = (clearFilters) => {
//     clearFilters();
//     setSearchText("");
//   };
//   const getColumnSearchProps = (dataIndex) => ({
//     filterDropdown: ({
//       setSelectedKeys,
//       selectedKeys,
//       confirm,
//       clearFilters,
//       close,
//     }) => (
//       <div
//         style={{
//           padding: 8,
//         }}
//         onKeyDown={(e) => e.stopPropagation()}
//       >
//         <Input
//           ref={searchInput}
//           placeholder={`Search ${dataIndex}`}
//           value={selectedKeys[0]}
//           onChange={(e) =>
//             setSelectedKeys(e.target.value ? [e.target.value] : [])
//           }
//           onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
//           style={{
//             marginBottom: 8,
//             display: "block",
//           }}
//         />
//         <Space>
//           <Button
//             type="primary"
//             onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
//             icon={<SearchOutlined />}
//             size="small"
//             style={{
//               width: 90,
//             }}
//           >
//             Search
//           </Button>
//           <Button
//             onClick={() => clearFilters && handleReset(clearFilters)}
//             size="small"
//             style={{
//               width: 90,
//             }}
//           >
//             Reset
//           </Button>
//           <Button
//             type="link"
//             size="small"
//             onClick={() => {
//               confirm({
//                 closeDropdown: false,
//               });
//               setSearchText(selectedKeys[0]);
//               setSearchedColumn(dataIndex);
//             }}
//           >
//             Filter
//           </Button>
//           <Button
//             type="link"
//             size="small"
//             onClick={() => {
//               close();
//             }}
//           >
//             close
//           </Button>
//         </Space>
//       </div>
//     ),
//     filterIcon: (filtered) => (
//       <SearchOutlined
//         style={{
//           color: filtered ? "#1677ff" : undefined,
//         }}
//       />
//     ),

//     onFilter: (value, record) =>
//       record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
//     onFilterDropdownOpenChange: (visible) => {
//       if (visible) {
//         setTimeout(() => searchInput.current?.select(), 100);
//       }
//     },

//     render: (text) =>
//       searchedColumn === dataIndex ? (
//         <Highlighter
//           highlightStyle={{
//             backgroundColor: "#ffc069",
//             padding: 0,
//           }}
//           searchWords={[searchText]}
//           autoEscape
//           textToHighlight={text ? text.toString() : ""}
//         />
//       ) : (
//         text
//       ),
//   });
  

//   const columns = [
//     {
//       title: "Nombre",
//       dataIndex: "nombre",
//       key: "nombre",
//       width: "20%",
//       ...getColumnSearchProps("nombre"),
//       render: (text, record) => (
//         <a className={style.userName} href={`/cargapuntos/${record.id}`}>
//           {text}
//         </a>
//       ),
//     },
//     {
//       title: "Apellido",
//       dataIndex: "apellido",
//       key: "apellido",
//       width: "20%",
//       ...getColumnSearchProps("apellido"),
//     },
//     {
//       title: "Email",
//       dataIndex: "email",
//       key: "email",
//       width: "20%",
//       ...getColumnSearchProps("email"),
//     },
    

//     {
//       title: "disponibilidad",
//       dataIndex: "disponibilidad",
//       key: "disponibilidad",
//       ...getColumnSearchProps("disponibilidad"),
//     },
    
//     {
//       title: "Estatura",
//       dataIndex: "estatura",
//       key: "estatura",
//       ...getColumnSearchProps("estatura"),
//     },
//     {
//       title: "fecha Afiliacion",
//       dataIndex: "fechaAfiliacion",
//       key: "fechaAfiliacion",
//       ...getColumnSearchProps("fechaAfiliacion"),
//     },
//     {
//       title: "Fecha Nacimiento",
//       dataIndex: "fechaNacimiento",
//       key: "fechaNacimiento",
//       ...getColumnSearchProps("fechaNacimiento"),
//     },
//     {
//       title: "Posicion",
//       dataIndex: "posicion",
//       key: "posicion",
//       ...getColumnSearchProps("posicion"),
//     }, {
//       title: "Urquilla",
//       dataIndex: "urquilla",
//       key: "urquilla",
//       ...getColumnSearchProps("urquilla"),
//     },
//   ];

//   return (
//     <div>
//       <div className={style.botonexcel}>
 

      
//         <button onClick={exportToExcel}>Exportar a excel 📑</button>
//       </div>

//       <Table
//         columns={columns}
       
//       />

//       <div>
//         <div className={style.containerAviso}></div>
//       </div>
//     </div>
//   );
// };
// export default RecargarPuntos;
