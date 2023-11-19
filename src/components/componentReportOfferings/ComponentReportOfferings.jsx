import React, { useRef, useState, useEffect } from "react";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import { Button, Input, Space, Table, Typography, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import * as XLSX from "xlsx";
import moment from "moment";
import Swal from "sweetalert2";
import { getReportOffering } from "../../Redux/Actions"; // Asegúrate de importar apdateRoluser
import style from "./ComponentReportOfferings.module.css";

const ComponentReportOfferings = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  const offering = useSelector((state) => state.allOffering);


  if (offering) {
    offering.forEach((offering) => {
      offering.createdAt = moment(offering.createdAt).format("YYYY-MM-DD HH:mm:ss");
      offering.updatedAt = moment(offering.updatedAt).format("YYYY-MM-DD HH:mm:ss");
    });
  }

  const dispatch = useDispatch();



  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(offering);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "offering");

    // Guardar el archivo de Excel
    XLSX.writeFile(wb, "offering.xlsx");
  };
  useEffect(() => {
    dispatch(getReportOffering());
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
    (record[dataIndex] && record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())) || false,
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
      title: "Fecha de Ofrenda",
      dataIndex: "fechadeofrenda",
      key: "fechadeofrenda",
      ...getColumnSearchProps("fechadeofrenda"),
    },
    {
      title: "Cantidad Ofrendada",
      dataIndex: "cantidadofrendada",
      key: "cantidadofrendada",
      ...getColumnSearchProps("cantidadofrendada"),
    },
   
  ];

  return (
    <div>
      <div className={style.botonexcel}>
        <button onClick={exportToExcel}>Exportar a excel 📑</button>
      </div>

      <Table columns={columns} dataSource={offering} /> 
      <div>
        <div className={style.containerAviso}></div>
      </div>
    </div>
  );
};

export default ComponentReportOfferings;
