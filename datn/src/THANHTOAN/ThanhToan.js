import React, { useState, useEffect } from 'react';
import Footer from "../TRANGCHU/Footer";
import Head from "../TRANGCHU/Head";
import Menu from "../TRANGCHU/Menu";
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Slice } from '@reduxjs/toolkit';
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';


function ThanhToan() {
    const [loading, setLoading] = useState(true);

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
  
    // Truy cập các tham số query cụ thể
    const vnp_Amount = searchParams.get('vnp_Amount');
    const vnp_BankCode = searchParams.get('vnp_BankCode');
    const vnp_OrderInfo = searchParams.get('vnp_OrderInfo');

    
    const [cartItems, setCartItems] = useState([]);
  
    const [tenSanPhamArr, setTenSanPhamArr] = useState([]);

    const [mauArr, setMauArr] = useState([]);

    const [tienShip , setTienShip] = useState(0);

    const [phuongThucThanhToan, setPhuongThucThanhToan] = useState(1);

    const [sizeArr, setSizeArr] = useState([]);

    const [soLuong, setSoLuong] = useState([]);

    const [gia, setGia] = useState([]);

    const [khachHang, setKhachHang] = useState({});

    const storedToken = localStorage.getItem('token');


    //-----------------API------------------------------

    //hàm thanh toán

    useEffect(() => {
        
        if(vnp_BankCode=="NCB")
        {
            if (vnp_Amount != null && khachHang.id && calculateTotal() && mauArr && tienShip && sizeArr && soLuong && gia && tenSanPhamArr) {
                setLoading(true);
                axios.post('http://127.0.0.1:8000/api/trang-thai-thanh-toan',{
    
                }).then(function(response){

                    new Promise((resolve) => setTimeout(resolve, 2000)); // Giả sử việc tải mất 2 giây
                    setLoading(false);
                    window.location.href = `KTDONHANG/${response.data.data}`;
                }).catch(function(error){
                    if(error.response.status===422)
                    {
                        Swal.fire({
                            title: "Thất bại",
                            text: error.response.data.errors ,
                            icon: "error"
                        });
                    }
                
                })
            }
        }
      }, [ tienShip]);





      const HamThanhToan = () => {
        axios.post('http://127.0.0.1:8000/api/thanh-toan', {
            khach_hang: khachHang.id,
            tong_tien: calculateTotal(),
            mau: mauArr,
            tien_ship: tienShip,
            size: sizeArr,
            so_luong: soLuong,
            gia: gia,
            ten: tenSanPhamArr,
            PhuongThucThanhToan: phuongThucThanhToan,
        }).then(function(response){
            if(response.data.url) {
                window.location.href = response.data.url;
            } else {
                window.location.href = `KTDONHANG/${response.data.data}`;
            }
        }).catch(function(error){
            if(error.response && error.response.status === 422) {
                Swal.fire({
                    title: "Thất bại",
                    text: error.response.data.errors,
                    icon: "error"
                });
            } else {
                Swal.fire({
                    title: "Lỗi hệ thống",
                    text: "Có lỗi xảy ra. Vui lòng thử lại sau.",
                    icon: "error"
                });
            }
        });
    }
    

    

    useEffect(() => {
        // Kiểm tra xem token có tồn tại hay không
        
        let KyTuHoChiMinh = '';
        
        if (khachHang.dia_chi) {
            const diaChi = khachHang.dia_chi;
            KyTuHoChiMinh = diaChi.slice(-11).toLowerCase();
        }
        
        if (KyTuHoChiMinh) 
        {
            if((KyTuHoChiMinh == 'ho chi minh' || KyTuHoChiMinh == 'hồ chí minh'))
            {
                setTienShip(30000);
            } 
            else
            {
                setTienShip(60000);
            }
        }
       
        
        if (storedToken !== null) {
            axios.post('http://127.0.0.1:8000/api/me',null, {
                headers: {
                    Authorization: 'bearer ' + storedToken,
                },
              
              },{
                timeout: 5000,
              })
              .then(function (response) {
                setKhachHang(response.data);
                new Promise((resolve) => setTimeout(resolve, 2000)); // Giả sử việc tải mất 2 giây
                setLoading(false);
              })
              .catch(function (error) {
                setLoading(false);
                console.error('Error during login request:', error);
               
              });
        
        } 
        else {
          // Token không tồn tại, có thể chuyển hướng hoặc thực hiện hành động khác
          console.log('Token không tồn tại');
          // Ví dụ: Chuyển hướng về trang đăng nhập
          // window.location.href = '/dang-nhap';
        }
      }, []); 


    


    useEffect(() => {
      
        let KyTuHoChiMinh = '';
        if (khachHang.dia_chi) {
          const diaChi = khachHang.dia_chi;
          KyTuHoChiMinh = diaChi.slice(-11).toLowerCase();
        }
      
        if (KyTuHoChiMinh) {
          if (KyTuHoChiMinh === 'ho chi minh' || KyTuHoChiMinh === 'hồ chí minh') {
            setTienShip(30000);
          } else {
            setTienShip(60000);
          }
        }
      const items = JSON.parse(localStorage.getItem('cartItems')) || [];
      setCartItems(items);

      //lấy tên
      const tenArr = items.map((item) => item.ten);
        setTenSanPhamArr(tenArr);

    //lấu màu
    const MauArr = items.map((item) => item.selectedColor);
        setMauArr(MauArr);
        
    //lấy Size
    const SizeArr = items.map((item) => item.selectedSize);
        setSizeArr(SizeArr);
        
        const SoLuongArr = items.map((item) => item.so_luong);
        setSoLuong(SoLuongArr); 

        const GiaArr = items.map((item) => item.gia);
        setGia(GiaArr); 
        
    }, [khachHang]);

    //hàm tính tổng tiền
    const calculateTotal = () => {
    let total = cartItems.reduce((acc, item) => {
        return (acc + item.gia * Number(item.so_luong));
    }, 0);

    return total;
};





//------------ham xu ly------------------




  return (
    <>
   
        <>
        <Head />
        <div className="container">
            <div className="row">
                <div className="col-12 mt-4">
                    <div className="card p-3" style={{backgroundColor: '#0193f5' , color :'white'}}>
                        <p className="mb-0 fw-bold h4">Điền thông tin</p>
                    </div>
                </div>
                <div className="col-12">
                    <div className="card p-3">
                    
                        <div className="card-body border p-0">
                            
                            <div className="collapse show p-3 pt-0" id="collapseExample">
                                <div className="row">
                                    <div className="col-lg-5 mb-lg-0 mb-3">
                                        
                                        {cartItems.map((item) => (
                                            <div key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}   >
                                                <p className="mb-0" style={{margin: '20px 0 0 0'}}>
                                                    <span className="fw-bold">Sản phẩm:</span>
                                                    <span className="c-green">{item.ten} </span>
                                                    <span className="fw-bold">Màu:</span>
                                                    <span className="c-green">{item.selectedColor} </span>
                                                    <span className="fw-bold">Size:</span>
                                                    <span className="c-green">{item.selectedSize} </span>
                                                </p>
                                                <p className="mb-0">
                                                    <span className="fw-bold">Giá: </span>
                                                    <span className="c-green">{item.gia.toLocaleString()}VND</span>
                                                    <span className="fw-bold"> Số lượng: </span>
                                                    <span className="c-green">{item.so_luong}</span>
                                                </p>
                                                
                                            </div>
                                        ))}
                                    
                                        
                                            <div className="mb-0" style={{margin: '20px 0 0 0'}}>
                                                <h4>tiền ship: 
                                                <span className="c-green">{tienShip.toLocaleString()} VNĐ</span>
                                                </h4> 
                                            </div>
                                            
                                            <div className="mb-0" style={{margin: '20px 0 0 0'}}>
                                                <h3 className="fw-bold">Tổng tiền:
                                                <span className="c-green">{(calculateTotal()+tienShip).toLocaleString()} VNĐ</span> </h3>
                                            </div>
                                    </div>
                                    <div className="col-lg-7">
                                        <form action="" className="form">
                                            <div className="row">
                                                <div className="col-12">
                                                    <div className="form__div">
                                                        <input type="text" className="form-control" placeholder=" " value={khachHang?.ho_ten}/>
                                                        <label htmlFor="" className="form__label">Tên khách hàng</label>
                                                    </div>
                                                </div>

                                                <div className="col-12">
                                                    <div className="form__div">
                                                        <input type="text" className="form-control" placeholder=" " value={khachHang?.dia_chi}/>
                                                        <label htmlFor="" className="form__label">Địa chỉ</label>
                                                    </div>
                                                </div>

                                                <div className="col-12">
                                                    <div className="form__div">
                                                        <input type="text" className="form-control" placeholder=" " value={khachHang?.so_dien_thoai}/>
                                                        <label htmlFor="" className="form__label">Số điện thoại</label>
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <div className="form__div" placeholder=" " >
                                                    
                                                        <select onChange={(e) => setPhuongThucThanhToan(e.target.value)} className="form-control">
                                                            <option value="1">Thanh toán khi nhận hàng</option>
                                                            <option value="2">Thanh toán qua Ngân hàng NCB </option>
                                                        </select>
                                                        <label htmlFor="" className="form__label">Phương thức thanh toán</label>
                                                    </div>
                                                </div>
                                            
                                                    <div className="btn btn-primary w-100" onClick={HamThanhToan}>Đặt hàng</div>
                                                    
                                                
                                            
                                            
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className="col-12">
                    <div className="btn btn-primary payment">
                        Make Payment
                    </div>
                </div> */}
            </div>
        </div>
        <Footer />
        </>
    </>
  );
}

export default ThanhToan;
