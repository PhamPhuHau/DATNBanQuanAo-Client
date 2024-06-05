import Head from './Head';
import Menu from './Menu';
import SlideShow from './SlideShow';
import SmallBanner from './SmallBanner';
import Danhmuc from '../SANPHAM/Danhmuc';
import Footer from './Footer';
import Dichvu from './DichVu';
import axios from 'axios';
import React, { useEffect, useState } from 'react'; 

function TrangChu() {
 
    const [loading, setLoading] = useState(true);
  const [slideShowData, setSlideShowData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        
        const response = await axios.get(`http://127.0.0.1:8000/api/danh-sach-san-pham`);
        setSlideShowData(response.data.dataSlideShow);
       
          await new Promise((resolve) => setTimeout(resolve, 1000)); // Giả sử việc tải mất 1 giây
          setLoading(false);
        
      } catch (error) {
        console.error('Lỗi khi tải dữ liệu:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);



  return (

    <>
    
        <>
          <Head />

          <div className="site-blocks-cover">
      <div className="container">
        <div className="row">
          <div className="col-md-6 ml-auto order-md-2 align-self-start">
            <div className="site-block-cover-content">
            <h2 className="sub-title">#New Summer Collection 2019</h2>
            <h1>Arrivals Sales</h1>
            <p><a href="#" className="btn btn-black rounded-0">Shop Now</a></p>
            </div>
          </div>
          <div className="col-md-6 order-1 align-self-end" >
          <SlideShow hinh={slideShowData} />
          </div>
        </div>
      </div>
    </div>
       
          <Danhmuc />
          <Footer />
        </>
      {/* )} */}
      
    </>
  );
}

export default TrangChu;
