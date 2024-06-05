import React from "react";
import ClickSP from "./ClickSP";
import GiaSP from "./GiaSP";
import HinhSP from "./HinhSP";
import TenSP from "./TenSP";

function Sanpham({ data }) {
  const DaXem = () => {
    const daXemItem = {
      id: data.id,
      ten: data.ten,
      gia: data.gia_ban,
      hinh: data.hinh_anh[0]?.url,
    };


   
    let daXem = JSON.parse(localStorage.getItem('viewed')) || [];
    const daXemItemIndex = daXem.findIndex(item => item.id === daXemItem.id);

   

    if (daXemItemIndex === -1) {
      daXem.unshift(daXemItem);
      daXem = daXem.slice(0, 10);
      localStorage.setItem('viewed', JSON.stringify(daXem));
      
    } 
    window.location.href = `/ChiTiet/${data.id}`;

  };

  return (

          <div class="col-lg-4 col-md-6 item-entry mb-4">
          <a class="product-item md-height bg-gray d-block" onClick={DaXem}>
          <HinhSP anh={data?.hinh_anh[0]} />
          <ClickSP />

            </a>
    
      
          <h2 class="item-title" onClick={DaXem} ><TenSP ten={data.ten} /></h2>
          <strong class="item-price" onClick={DaXem} > <GiaSP gia={data.gia_ban.toLocaleString()}/> </strong>
       
         </div>
       
            
  );
}

export default Sanpham;