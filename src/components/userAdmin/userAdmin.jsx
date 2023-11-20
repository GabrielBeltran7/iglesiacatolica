import React, { useRef, useState, useEffect } from "react";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import { Button, Input, Space, Table, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import * as XLSX from "xlsx";
import moment from "moment";

import { getUserProfile, apdateRoluser } from "../../Redux/Actions"; 
import style from "./userAdmin.module.css";

const ReportAllUsers = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const [permissions, setPermissions] = useState({
    
  }); 


  const allUsers = useSelector((state) => state.allUsers);


  const dispatch = useDispatch();

 

  if (allUsers) {
    allUsers.forEach((user) => {
      // Formatea la fecha en el formato deseado
      user.createdAt = moment(user.createdAt).format("YYYY-MM-DD HH:mm:ss");
      user.updatedAt = moment(user.updatedAt).format("YYYY-MM-DD HH:mm:ss");
    });
  }

  const handlePermissionChange = (userId, value) => {
    setPermissions({
      id:userId,
      admin:value
    });

    dispatch(apdateRoluser({id:userId,
      admin:value})
    );
  };
  useEffect(() => {
    dispatch(getUserProfile());
  }, [permissions]);


  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(allUsers);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "User");

    // Guardar el archivo de Excel
    XLSX.writeFile(wb, "users.xlsx");
  };

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
      (record[dataIndex] &&
        record[dataIndex]
          .toString()
          .toLowerCase()
          .includes(value.toLowerCase())) ||
      false,
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
      ...getColumnSearchProps("nombre"),
    },
    {
      title: "Apellido",
      dataIndex: "apellidos",
      key: "apellidos",
      ...getColumnSearchProps("apellidos"),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      ...getColumnSearchProps("email"),
    },
    {
      title: "Disponibilidad",
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
      title: "Fecha Afiliacion",
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
    {
      title: "Permisos",
      dataIndex: "admin",
      key: "admin",
      render: (text, record) => (
        <select
          name="admin"
          value={permissions[record.id] || ""}
          onChange={(e) => handlePermissionChange(record.id, e.target.value)}
        >
          <option value="">{record.admin}</option>
          <option value="Administrador">Administrador</option>
          <option value="Usuario">Usuario</option>
        </select>
      ),
    },
  ];

  return (
    <div>
      <div className={style.botonexcel}>
        <button onClick={exportToExcel}>Exportar a excel 📑</button>
      </div>

      <Table columns={columns} dataSource={allUsers} />
      <div>
        <div className={style.containerAviso}></div>
      </div>
    </div>
  );
};

export default ReportAllUsers;
