import style from "./ComponentOfferings.module.css"
const ComponentOfferings = () => {
  return (
    <div className={style.offeringsbutton}>
      <label className={style.title}>Ofrendas</label>
      <a
        href="https://api.whatsapp.com/send/?phone=573132315212&text=Hola%2C+estoy+interesado+en+los+servicios+que+ofrece+Innovación +Digital.+%C2%BFPodr%C3%ADa+proporcionarme+m%C3%A1s+informaci%C3%B3n+al+respecto%3F+Gracias"
        target="_blank"
      >
        <img
          src="https://e7.pngegg.com/pngimages/104/456/png-clipart-computer-icons-money-scalable-graphics-fund-text-donation.png"
          alt="ofrendas"
          width="65px"
        />
      </a>
    </div>
  );
};

export default ComponentOfferings;
