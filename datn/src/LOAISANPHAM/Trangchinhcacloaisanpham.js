import Footer from "../TRANGCHU/Footer";
import Head from "../TRANGCHU/Head";
import Menu from "../TRANGCHU/Menu";
import Danhsach from "../SANPHAM/Danhsach";
import Nutxemthem from "../SANPHAM/Nutxemthem";
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";
import Danhmuc from "../SANPHAM/Danhmuc";
import Sanpham from "../SANPHAM/Sanpham";
import ReactPaginate from 'react-paginate';

function Trangchinhcacloaisanpham() {
//--------------------------các state----------------------------
    const [loading, setLoading] = useState(true);

    //đây là state lọc giá bắt đầu
    const [giaTu,setGiaTu] = useState();
    //đây là state lọc giá kết thúc
    const [giaDen,setGiaDen] =useState();

    //đây là giá trị lấy được trên thanh url
    let { loaiID } = useParams();

    //lưu danh sách sản phẩm
    const [dsSanPham ,setDSSanPham] = useState([]); 

    // để theo dõi trang hiện tại đang được hiển thị.
    //hiểu cách đơn giản đây sẽ là vị tría của trang 
    const [pageNumber, setPageNumber] = useState(0);

    // Số lượng sản phẩm trên mỗi trang
    const itemsPerPage = 20; 

    //Tính toán số lượng trang cần hiển thị dựa trên tổng số sản phẩm và số sản phẩm trên mỗi trang.
    const pageCount = dsSanPham.length / itemsPerPage;

//----------------API------------------------------
useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
        axios.post(`http://127.0.0.1:8000/api/loc-loai/${loaiID}`, {
            giaTu: giaTu,
            giaDen: giaDen,
        })
        .then(function (response) {
            setDSSanPham(response.data.data);
            
            new Promise((resolve) => setTimeout(resolve, 2000)); // Giả sử việc tải mất 2 giây
            setLoading(false);
        })
        .catch(function (error) {
            console.error('Error during login request:', error);
            setLoading(false);
        });
        };

    fetchData();
  }, [loaiID]);


  const locGia = () => {
        axios.post(`http://127.0.0.1:8000/api/loc-loai/${loaiID}`, {
        giaTu: giaTu,
        giaDen: giaDen,
        })
        .then(function (response) {
        setDSSanPham(response.data.data);
        })
        .catch(function (error) {
        console.error('Error during login request:', error);
        
        });
    };

    const GiaTang = async () => {
        const response = await axios(`http://127.0.0.1:8000/api/gia-tang/${loaiID}`);
        setDSSanPham(response.data.data);
    }

    const GiaGiam = async () => {
        const response = await axios(`http://127.0.0.1:8000/api/gia-giam/${loaiID}`);
        setDSSanPham(response.data.data);
    }
//--------------------hàm xử lý ------------------------


    //đây là hàm trả về các danh sách sản phẩm đã có phân trang
    //Phương thức slice được sử dụng để cắt một phần của mảng data. 
    //trong slice sẽ truyền vào 2 tham số lần lược là bắt đâu và kết thúc
    //bắt đầu kết ở đây là vị trí mảng
    //pageNumber và itemsPerPage đã được tạo ở state 
    const ListSP = dsSanPham
    .slice(pageNumber * itemsPerPage, (pageNumber+1) * itemsPerPage)
    .map(function(item, index) {
        return (
          <Sanpham key={index} data={item} />
        );
    });


  //được gọi khi người dùng chuyển trang, cập nhật giá trị của pageNumber với trang đã chọn.
    //selected là các ReactPaginate hiểu đơn giản thì đây là nơi lưu trử trạng thái trang
    //ví dụ khi click vào ô số 2 thì setPageNumber sẽ được update lại là số 1 vì là mảng nên bắt đầu từ 0
    const handlePageClick = ({ selected }) => {
        setPageNumber(selected);
    };
     

    return (
        <>
            <Head />
            <Menu />

            <div>
                <hr></hr>
                    <div className="row">
                        <div className="khunggia col-sm-3">
                            <h5 className="khoang_gia">KHOẢNG GIÁ</h5>
                        </div>
                        <div className="col-sm-9">
                            <input onChange={(e) => setGiaTu(e.target.value)} autoComplete="off" type="text" name="text" className="nhap_gia" placeholder=""/>
                                <label>
                                    <p>----</p>
                                </label>
                                <input  onChange={(e) => setGiaDen(e.target.value)} autoComplete="off" type="text"  name="text" className="nhap_gia" placeholder=""/>
                                <button onClick={locGia} className="nutgia">
                                    Lọc
                                </button>
                        </div>
                        
                        <div className="col-sm-3">
                        <div className="">
                            <h5 className="khoang_gia">XẾP GIÁ</h5>
                        </div>
                            <button onClick={GiaTang} className="nutgia">THẤP </button>

                            <button onClick={GiaGiam} className="nutgia">CAO</button>
                        </div>
                    </div>
                                
                        
                        <hr></hr>
            </div>


            <div className="product-area section">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="section-title">
                                <h2>{dsSanPham[0]?.loai.ten}</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <div className="product-info">
                                <div className="nav-main">


                                    <div className="tab-content" id="myTabContent">
                                    <div className="tab-pane fade show active" id="man" role="tabpanel">
                                        <div className="tab-single">
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
                                            <div className="row">
                                                {ListSP}
                                            </div>
                )}
                                        </div>
                                    </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <ReactPaginate
        previousLabel={'previous'}
        nextLabel={'next'}
        breakLabel={'...'}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={'pagination'}
        activeClassName={'active'}
        />
        <Footer/>
    

            </div>
            <Footer />
        </>
    );
}
export default Trangchinhcacloaisanpham;