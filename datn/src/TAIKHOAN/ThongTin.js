import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import Head from '../TRANGCHU/Head';
import Menu from '../TRANGCHU/Menu';
import Footer from '../TRANGCHU/Footer';
import Avatar from "./Avatar";
import { NavLink } from "react-router-dom";
import Swal from 'sweetalert2';

function ThongTin() {
    const [khachHang, setKhachHang] = useState('');
    const [hoTen, setHoTen] = useState('');
    const [soDienThoai, setSoDienThoai] = useState('');
    const [diaChi, setDiaChi] = useState('');
    const [hoaDon, setHoaDon] = useState([]);
    const [loading, setLoading] = useState(true);

    //được dùng để lưu localsotege
    const storedToken = localStorage.getItem('token');
    useEffect(() => {
        // Kiểm tra xem token có tồn tại hay không
        if (storedToken !== null) {
            axios.post('http://127.0.0.1:8000/api/me', null, {
                headers: {
                    Authorization: 'bearer ' + storedToken,
                },

            },{
                timeout: 3000,
              }).then(function (response) {
                    setKhachHang(response.data);
                    setHoTen(response.data.ho_ten);
                    setSoDienThoai(response.data.so_dien_thoai);
                    setDiaChi(response.data.dia_chi);
                     // Gọi yêu cầu lấy hoá đơn ở đây
                    return axios.post('http://localhost:8000/api/lay-hoa-don-khach-hang', {
                        KhachHang: response.data.id
                    });

                }).then(function (response) {
                    setHoaDon(response.data.data);
                    new Promise((resolve) => setTimeout(resolve, 2000)); // Giả sử việc tải mất 2 giây
                    setLoading(false);        
                })
                .catch(function (error) {
                    console.error('Error during login request:', error);
                });
        }
        else {
            // Token không tồn tại, có thể chuyển hướng hoặc thực hiện hành động khác
            console.log('Token không tồn tại');
            // Ví dụ: Chuyển hướng về trang đăng nhập
            // window.location.href = '/dang-nhap';
        }
     
            axios.post('http://localhost:8000/api/lay-hoa-don-khach-hang', {
                KhachHang: khachHang.id
            },{
                timeout: 4000,
              }).then(function(response) {
            });
        
    }, []);
    const capNhatThongTin = (event) => {
        event.preventDefault();
        if(hoTen==""||soDienThoai==""||diaChi=="")
        {
            Swal.fire({
                title: "Thất bại",
                text:"Hãy điền đầy đủ thông tin" ,
                icon: "error"
              });
            
        }
        else{
        axios.post('http://127.0.0.1:8000/api/cap_nhat_thong_tin', {
            email:khachHang.email,
            ho_ten:hoTen,
            so_dien_thoai:soDienThoai,
            dia_chi:diaChi,
        })
            .then(function (response) {
                window.location.href = "/THONGTINTAIKHOAN";
            })
            .catch(function (error) {
                 if(error.response.status === 422)
                    {
                        
                    
                        const {so_dien_thoai} = error.response.data.errors;
                        if(so_dien_thoai)
                        {
                            Swal.fire({
                                title: "Thất bại",
                                text:  Object.values(so_dien_thoai).join('') ,
                                icon: "error"
                            });
                        
                        }
                    }
                console.error('Lỗi trong quá trình yêu cầu đổi mật khẩu:', error);
            });
        }

    };

    const ThanhToanNganHang = (item) =>
    {
       
        return(<>
        <div  className="container-xxl position-relative bg-white d-flex p-0">
            <div key={item.id}className="col-sm-12 col-xl-12">
                <div className="bg-light rounded h-100 p-4">
                    <div className="row">
                        <div className="col-sm-2">Mã hoá đơn: <br></br>{item.ma}</div>
                        <div className="col-sm-2">Tổng tiền: <br></br>{item.tong_tien.toLocaleString()} VNĐ</div>
                        <div className="col-sm-2">Tiền ship: <br></br>{item.tien_ship.toLocaleString()} VNĐ</div>
                        <div className="col-sm-2">phương thức: <br></br>{item.phuong_thuc_thanh_toan}</div>
                        <div className="col-sm-2">thanh toán: <br></br>{item.trang_thai_thanh_toan == 0 ? "chưa thanh toán" : "đã thanh toán"} </div>
                        <div className="col-sm-1">Ngày lập: <br></br>{item.order_date}</div>
                        <div className="col-sm-1"><NavLink to={`/KTDonHang/${item.id}`}  style={{color:'#25c9e6', textDecoration: 'none'}}>xem chi tiết</NavLink></div>
                   </div>
                </div>
            </div>
        </div>
        <br></br>
        </>)
    }
   
    const DanhSachHoaDon = hoaDon && Array.isArray(hoaDon) ? hoaDon.map(item => (<>
        {ThanhToanNganHang(item)}
        </>
    )): () =>{
        return (<></>)
    }
    
    

    return (
<>
{loading ? (
                     <div className="loader">
                     <div className="wrapper">
                       <div className="catContainer">
                         <svg
                           xmlns="http://www.w3.org/2000/svg"
                           fill="none"
                           viewBox="0 0 733 673"
                           className="catbody"
                         >
                           <path
                             fill="#212121"
                             d="M111.002 139.5C270.502 -24.5001 471.503 2.4997 621.002 139.5C770.501 276.5 768.504 627.5 621.002 649.5C473.5 671.5 246 687.5 111.002 649.5C-23.9964 611.5 -48.4982 303.5 111.002 139.5Z"
                           ></path>
                           <path fill="#212121" d="M184 9L270.603 159H97.3975L184 9Z"></path>
                           <path fill="#212121" d="M541 0L627.603 150H454.397L541 0Z"></path>
                         </svg>
                         <svg
                           xmlns="http://www.w3.org/2000/svg"
                           fill="none"
                           viewBox="0 0 158 564"
                           className="tail"
                         >
                           <path
                             fill="#191919"
                             d="M5.97602 76.066C-11.1099 41.6747 12.9018 0 51.3036 0V0C71.5336 0 89.8636 12.2558 97.2565 31.0866C173.697 225.792 180.478 345.852 97.0691 536.666C89.7636 553.378 73.0672 564 54.8273 564V564C16.9427 564 -5.4224 521.149 13.0712 488.085C90.2225 350.15 87.9612 241.089 5.97602 76.066Z"
                           ></path>
                         </svg>
                         <div className="textcat">
                           <span className="bigzzz">Z</span>
                           <span className="zzz">Z</span>
                         </div>
                       </div>
                       <div className="wallContainer">
                         <svg
                           xmlns="http://www.w3.org/2000/svg"
                           fill="none"
                           viewBox="0 0 500 126"
                           className="wall"
                         >
                           <line
                             strokeWidth="6"
                             stroke="#7C7C7C"
                             y2="3"
                             x2="450"
                             y1="3"
                             x1="50"
                           ></line>
                           <line
                             strokeWidth="6"
                             stroke="#7C7C7C"
                             y2="85"
                             x2="400"
                             y1="85"
                             x1="100"
                           ></line>
                           <line
                             strokeWidth="6"
                             stroke="#7C7C7C"
                             y2="122"
                             x2="375"
                             y1="122"
                             x1="125"
                           ></line>
                           <line strokeWidth="6" stroke="#7C7C7C" y2="43" x2="500" y1="43"></line>
                           <line
                             strokeWidth="6"
                             stroke="#7C7C7C"
                             y2="1.99391"
                             x2="115.5"
                             y1="43.0061"
                             x1="115.5"
                           ></line>
                           <line
                             strokeWidth="6"
                             stroke="#7C7C7C"
                             y2="2.00002"
                             x2="189"
                             y1="43.0122"
                             x1="189"
                           ></line>
                           <line
                             strokeWidth="6"
                             stroke="#7C7C7C"
                             y2="2.00612"
                             x2="262.5"
                             y1="43.0183"
                             x1="262.5"
                           ></line>
                           <line
                             strokeWidth="6"
                             stroke="#7C7C7C"
                             y2="2.01222"
                             x2="336"
                             y1="43.0244"
                             x1="336"
                           ></line>
                           <line
                             strokeWidth="6"
                             stroke="#7C7C7C"
                             y2="2.01833"
                             x2="409.5"
                             y1="43.0305"
                             x1="409.5"
                           ></line>
                           <line
                             strokeWidth="6"
                             stroke="#7C7C7C"
                             y2="43"
                             x2="153"
                             y1="84.0122"
                             x1="153"
                           ></line>
                           <line
                             strokeWidth="6"
                             stroke="#7C7C7C"
                             y2="43"
                             x2="228"
                             y1="84.0122"
                             x1="228"
                           ></line>
                           <line
                             strokeWidth="6"
                             stroke="#7C7C7C"
                             y2="43"
                             x2="303"
                             y1="84.0122"
                             x1="303"
                           ></line>
                           <line
                             strokeWidth="6"
                             stroke="#7C7C7C"
                             y2="43"
                             x2="378"
                             y1="84.0122"
                             x1="378"
                           ></line>
                           <line
                             strokeWidth="6"
                             stroke="#7C7C7C"
                             y2="84"
                             x2="192"
                             y1="125.012"
                             x1="192"
                           ></line>
                           <line
                             strokeWidth="6"
                             stroke="#7C7C7C"
                             y2="84"
                             x2="267"
                             y1="125.012"
                             x1="267"
                           ></line>
                           <line
                             strokeWidth="6"
                             stroke="#7C7C7C"
                             y2="84"
                             x2="342"
                             y1="125.012"
                             x1="342"
                           ></line>
                         </svg>
                       </div>
                     </div>
                   </div>
                ) : (
        
        <>
            <Head />
            <Menu />
            <div className='trangthongtintaikhoan'>
                
                    <div className="container-xxl position-relative bg-white d-flex p-0">
                        <div className="col-sm-12 col-xl-6">
                            <div className="bg-light rounded h-100 p-4">
                                <h6 className="mb-4">THÔNG TIN TÀI KHOẢN</h6>
                                <div className="form-floating mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="floatingInput"
                                        placeholder="ho_ten"
                                        value={hoTen}
                                        onChange={(e) => setHoTen(e.target.value)}
                                    />
                                    <label htmlFor="floatingInput">Họ Tên</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input type="email" className="form-control" id="floatingInput"
                                        placeholder="name@example.com" value={khachHang?.email || ''}
                                        readOnly />
                                    <label htmlFor="floatingInput">Email </label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input type="password" className="form-control" id="floatingPassword"
                                        placeholder="Password" value={khachHang?.password || ''}
                                        readOnly />
                                    <label htmlFor="floatingPassword">Mật khẩu</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="floatingInput"
                                        placeholder="so_dien_thoai"
                                        value={soDienThoai}
                                        onChange={(e) => setSoDienThoai(e.target.value)}
                                    />
                                    <label htmlFor="floatingInput">Số điện thoại</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="floatingInput"
                                        placeholder="dia_chi"
                                        value={diaChi}
                                        onChange={(e) => setDiaChi(e.target.value)}
                                    />
                                    <label htmlFor="floatingInput">Địa chỉ</label>
                                </div>
                                <div className='row'>
                                    <div className='col-sm-3'>

                                        <NavLink to="/DoiMatKhau" className="single-icon" >Đổi mật khẩu</NavLink>

                                    </div>
                                    <div className='col-sm-6'>

                                    </div>

                                    <div className='col-sm-3'>
                                        <a className="btn btn-outline-danger" onClick={capNhatThongTin}>Cập nhật</a>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="col-sm-12 col-xl-6">
                            <Avatar khachHang = {khachHang}/>
                        </div>
                    </div>


                
            </div>

            
           <h2  className="container-xxl position-relative bg-white d-flex p-0">HOÁ ĐƠN</h2>
            {DanhSachHoaDon}
            <Footer />

        </>
                )}
</>
    );
};

export default ThongTin;