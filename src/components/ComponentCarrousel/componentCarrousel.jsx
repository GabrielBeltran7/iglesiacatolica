import React from "react";
import { Carousel } from "antd";
import style from "./componentCarrousel.module.css";

const contentStyle = {
  height: "160px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};
const componentCarrousel = () => (
  <Carousel effect="fade" autoplay className={style.carrousel}>
    <div className={style.image}>
      <img
        src="https://res.cloudinary.com/dby8lelja/image/upload/v1699925286/iglesiacatolica/1_vybq4u.jpg"
        alt=""
      />
    </div>

    <div className={style.imageDos}>
      <img
        src="https://res.cloudinary.com/dby8lelja/image/upload/v1699925290/iglesiacatolica/4_lxrgpb.png"
        alt=""
      />
    </div>
    <div className={style.imageTres}>
      <img
        src="https://res.cloudinary.com/dby8lelja/image/upload/v1699925287/iglesiacatolica/3_okmemi.jpg"
        alt=""
      />
    </div>
    <div className={style.imageCuatro}>
      <img
        src="https://res.cloudinary.com/dby8lelja/image/upload/v1699925982/iglesiacatolica/7_wrjyah.jpg"
        alt=""
      />
    </div>
    <div className={style.imageCinco}>
      <img
        src="https://res.cloudinary.com/dby8lelja/image/upload/v1699925981/iglesiacatolica/6_hm9qxb.png"
        alt=""
      />
    </div>
    <div className={style.imageSeis}>
      <img
        src="https://res.cloudinary.com/dby8lelja/image/upload/v1699925981/iglesiacatolica/8_jwvmjb.jpg"
        alt=""
      />
    </div>
    <div className={style.imageSiete}>
      <img
        src="https://res.cloudinary.com/dby8lelja/image/upload/v1699925980/iglesiacatolica/4_qdl0yx.jpg"
        alt=""
      />
    </div>
    <div className={style.imageOcho}>
      <img
        src="https://res.cloudinary.com/dby8lelja/image/upload/v1699925980/iglesiacatolica/5_wkwl9e.jpg"
        alt=""
      />
    </div>
  </Carousel>
);

export default componentCarrousel;
