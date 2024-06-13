import React from 'react';
import Footer from "../TRANGCHU/Footer";
import Head from "../TRANGCHU/Head";
import Menu from "../TRANGCHU/Menu";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useEffect,useState } from 'react';
import Swal from 'sweetalert2';

function KTDonHang() {

  //-------------State-------------------
  let { hdID } = useParams();
  console.log(hdID);
  const [trangThai, setTrangThai] = useState();
  const [sanPham, setSanPham] = useState();
  const [nhanXet, setNhanXet] = useState();
  const [danhGia, setDanhGia] = useState();
  const storedToken = localStorage.getItem('token');
  const [khachHang, setKhachHang] = useState('');
  const [chonSanPham, setChonSanPham] = useState();
  //--------------API----------------------
  useEffect(() => {
        axios.post('http://127.0.0.1:8000/api/kiem-tra-don-hang', {
            hdID: hdID,
          },{
            timeout: 5000,
          })
          .then(function (response) {
            setSanPham(response.data.dataCTHoaDon);
            setTrangThai(response.data.data.trang_thai);
            setSanPham(response.data.dataCTHoaDon);
           
          })
          .catch(function (error) {
            console.error('Error during login request:', error);
           
          });


          axios.post('http://127.0.0.1:8000/api/me', null, {
            headers: {
                Authorization: 'bearer ' + storedToken,
            },

        },{
          timeout: 7000,
        }).then(function (response) {
                setKhachHang(response.data);
               
                 // Gọi yêu cầu lấy hoá đơn ở đây
                return axios.post('http://localhost:8000/api/lay-hoa-don-khach-hang', {
                    KhachHang: response.data.id
                });

            }).then(function (response) {
                     
            })
            .catch(function (error) {
                console.error('Error during login request:', error);
            });
  }, []); 


  const GuiDanhGia = (event) =>{
    event.preventDefault();
    axios.post('http://127.0.0.1:8000/api/them-danh-gia',{
      KhachHang:khachHang.id,
      san_pham: chonSanPham,
      SoSao: danhGia,
      NhanXet: nhanXet,
    }).then(function(response){
      Swal.fire({
        title: 'gửi đánh giá thành công',
        icon: "success"
      });
    
      
    }) .catch(function (error) {
      console.log(error);
      if(error.response.status === 422)
      {
        const {NhanXet, KhachHang, san_pham, SoSao} = error.response.data.errors;
        if(NhanXet)
        {
          Swal.fire({
            title: "Thất bại",
            text: Object.values(NhanXet).join('') ,
            icon: "error"
          });
        
        }
        else if(KhachHang)
        {
          Swal.fire({
            title: "Thất bại",
            text: Object.values(KhachHang).join('') ,
            icon: "error"
          });
        }
        else if(san_pham)
        {
          Swal.fire({
            title: "Thất bại",
            text: Object.values(san_pham).join('') ,
            icon: "error"
          });
        }
        else{
          Swal.fire({
            title: "Thất bại",
            text: Object.values(SoSao).join('') ,
            icon: "error"
          });
        }
    }
    });
  }

  //thêm dánh giá
  

  //-------------------------Hàm xử lý ----------------

  function DaNhanHang()
  {
    axios.post('http://127.0.0.1:8000/api/da-nhan-duoc-hang', {
            hdID: hdID,
          })
          .then(function (response)
          {
            Swal.fire({
              title: "đã xác nhận",
              icon: "success"
            });
          
            window.location.href = 'http://localhost:3000/THONGTINTAIKHOAN';
          })

  }
  //------------------------------

  function TrangThai()
  {
    switch (trangThai){
      case 1: return (<>
         <div className="d-flex flex-row justify-content-between align-items-center align-content-center">
         <span className="d-flex justify-content-center align-items-center big-dot dot">
              <i className="fa fa-check text-white"></i>
            </span>
            <hr className="flex-fill track-line"></hr><span className="dot"></span>
            <hr className="flex-fill track-line"></hr><span className="dot"></span>
            <hr className="flex-fill track-line"></hr> <span className="dot"></span>
           
          </div>
      </>);
      break;


      case 2:
        return (<>
        
          <div className="d-flex flex-row justify-content-between align-items-center align-content-center">
          
             <hr className="flex-fill track-line"></hr><span className="d-flex justify-content-center align-items-center big-dot dot">
               <i className="fa fa-check text-white"></i>
             </span>
             <hr className="flex-fill track-line"></hr><span className="dot"></span>
             <hr className="flex-fill track-line"></hr> <span className="dot"></span>
            
           </div>
       </>);
      break;


      case 3:
        return (<>
       
          <div className="d-flex flex-row justify-content-between align-items-center align-content-center">
          
             <hr className="flex-fill track-line"></hr><span className="dot"></span>
             <hr className="flex-fill track-line"></hr>
             <span className="d-flex justify-content-center align-items-center big-dot dot">
               <i className="fa fa-check text-white"></i>
             </span>
             <hr className="flex-fill track-line"></hr> <span className="dot"></span>
            
           </div>
       </>);
      break;

      case 4: 
      return (<>
        <div className="d-flex flex-row justify-content-between align-items-center align-content-center">
        
           <hr className="flex-fill track-line"></hr><span className="dot"></span>
           <hr className="flex-fill track-line"></hr><span className="dot"></span>
           
           <hr className="flex-fill track-line"></hr> 
          <span className="d-flex justify-content-center align-items-center big-dot dot">
             <i className="fa fa-check text-white"></i>
           </span>
         </div>
     </>);
    break;

    default: 
    
    return (<>
     sản phẩm đã bị huỷ
        <div className="d-flex flex-row justify-content-between align-items-center align-content-center">
        
        <hr className="flex-fill track-line"></hr><span className="dot"></span>
        <hr className="flex-fill track-line"></hr><span className="dot"></span>
        
        <hr className="flex-fill track-line"></hr> <span className="dot"></span>
       
       
      </div>
   </>);
    }
  }

  const HuyDonHang = () =>{
    axios.get(`http://127.0.0.1:8000/api/huy-don-hang/${hdID}`)
    .then(function (response)
    {
      Swal.fire({
        title: 'đã huỷ',
        icon: "success"
      });
    
     
    })

  }



//--------------------------------

  const ThaoTac = () =>{
    switch (trangThai){
      case 1: 
      case 2: return(<>
      <button onClick={HuyDonHang} className="btn btn-outline-primary" type="button"> huỷ</button>
      </>)
      break;
      case 3:
        return (<>
        <button className="btn btn-outline-primary" type="button" onClick={DaNhanHang}> đã nhận được hàng</button>
        </>)
      break;
      default:

        return (<>
        
        </>)
    }
  }

  //---------------------------------

  const ChonSanPham = sanPham && Array.isArray(sanPham) ? sanPham.map(function(item){
    return(<>
      <option key={item.chi_tiet_san_pham.san_pham.id} value={item.chi_tiet_san_pham.san_pham.id}>
      {item.chi_tiet_san_pham.san_pham.ten}
      </option>
    </>)
  }): () =>{
    return (<></>)
  }

//-------------------------------------

  const DanhSachSanPham = sanPham && Array.isArray(sanPham) ? sanPham.map(function(item){
    return(<>
    <div className='row'>
      <div className='col-sm-4'>TÊN: {item.chi_tiet_san_pham.san_pham.ten}</div>
      <div className='col-sm-4'>GIÁ: {item.chi_tiet_san_pham.san_pham.gia_ban.toLocaleString() }VNĐ</div>
      <div className='col-sm-4'>SỐ LƯỢNG: {item.so_luong}</div>
    </div>
    </>);
  }): () =>{
    return (<></>)
  }

//--------------------------------------
  const DanhGia = () =>{
    if(trangThai ==4){
      return(<>
      <div className="container py-5 h-100" style={{ backgroundColor: "#eee" }}>
          <div className="row d-flex justify-content-center align-items-center h-100">
            {DanhSachSanPham}
            </div>
          </div>
      
      <div className="container-xxl position-relative bg-white d-flex p-0">
        <h1>chọn sản phẩm đánh giá </h1>
      </div>
      <div className="container-xxl position-relative bg-white d-flex p-0">
      <select  onChange={(e) => setChonSanPham(e.target.value)}>
        <option>chọn sản phẩm</option>
         {ChonSanPham}
      </select>
      </div>
      <br></br><br></br>
     
      
      <div className="container-xxl position-relative bg-white d-flex p-0">
      <select value={danhGia} onChange={(e) => setDanhGia(e.target.value)}>
        <option value="">Chọn đánh giá</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
      <p>Đánh giá đã chọn: {danhGia}<i className="fa fa-star" style={{color : 'yellow'}}></i></p>
       
        </div>
      <div className="container-xxl position-relative bg-white d-flex p-0 ">
        
      <form onSubmit={GuiDanhGia} className="form">
          <input
            onChange={(e) => setNhanXet(e.target.value)}
              
            className="input"
            type="text"
            name="noi_dung"
            id="noi_dung"
            placeholder="Nhận xét..."
          />
          <input className="login-button" type="submit" value="GỬI" />
        </form>
      </div>
      </>)
    }
    else{
      return (<>
       <div className="container py-5 h-100" style={{ backgroundColor: "#eee" }}>
          <div className="row d-flex justify-content-center align-items-center h-100">
            {DanhSachSanPham}
            </div>
          </div>
     
      </>)
    }
  }
  return (
    <>
      <Head />

      <section className="vh-50" style={{ backgroundColor: "#eee" }}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col">
              <div className="card card-stepper" style={{ borderRadius: "10px" }}>
                <div className="card-body p-4">

                  <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex flex-column">
                      <span className="lead fw-normal">Trạng thái đơn hàng</span>
                      
                      <span className="text-muted small">by DHFL on 21 Jan, 2020</span>
                    </div>
                   <div>
                      {ThaoTac()}
                    </div> 
                     
                  </div>
                  <hr className="my-4" />
                    {/*
                  <div className="d-flex flex-row justify-content-between align-items-center align-content-center">
                    <span className="dot"></span>
                    
                    <hr className="flex-fill track-line"></hr><span className="dot"></span>
                    <hr className="flex-fill track-line"></hr><span className="dot"></span>
                    <hr className="flex-fill track-line"></hr>
                    <span className="d-flex justify-content-center align-items-center big-dot dot">
                      <i className="fa fa-check text-white"></i>
                    </span>
                  </div>
                    */}
                    {TrangThai()}
                  <div className="d-flex flex-row justify-content-between align-items-center">
                    <div className="d-flex flex-column align-items-start"><span>Chờ xác nhận</span>
                    </div>
                    <div className="d-flex flex-column justify-content-center"><span>Đã xác nhận</span>
                      </div>
                    <div className="d-flex flex-column justify-content-center align-items-center"><span>Đang giao hàng</span></div>
                    
                    <div className="d-flex flex-column align-items-end"><span>Giao thành công</span></div>
                  </div>
                 
                </div>
               
              </div>
            </div>
          </div>
        </div>
      </section>
    {DanhGia()}
    
      <Footer />
    </>
  );
}

export default KTDonHang;
