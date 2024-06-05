// DaXem.js
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Footer from '../TRANGCHU/Footer';
import Head from '../TRANGCHU/Head';
import Menu from '../TRANGCHU/Menu';

function DaXem() {
  const [viewedItems, setViewedItems] = useState([]);

  useEffect(() => {
    const storedViewedItems = JSON.parse(localStorage.getItem('viewed')) || [];
    setViewedItems(storedViewedItems);
  }, []);

  const handleRemoveViewed = (id) => {
    const updatedViewedItems = viewedItems.filter(item => item.id !== id);
    setViewedItems(updatedViewedItems);
    localStorage.setItem('viewed', JSON.stringify(updatedViewedItems));
  };

  return (
    <>
      <Head />
      <Menu />

      <div className="product-area section">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="section-title">
                <h2>Sản phẩm đã xem</h2>
              </div>
            </div>
          </div>
          <div className="row">
            {viewedItems.length === 0 ? (
              <p>Bạn chưa xem sản phẩm nào.</p>
            ) : (
              viewedItems.map((item) => (
                <div key={item.id} className="col-xl-3 col-lg-4 col-md-4 col-12">
                  <div className="single-product">
                    <div className="product-img">
                      <NavLink to={`/ChiTiet/${item.id}`} className="Nav-Link active">
                      <img src={`http://localhost:8000/` + item.hinh} alt={item.ten} />
                      </NavLink>
                    </div>
                    <div className="product-content">
                      <p>{item.ten}</p>
                      <p>{item.gia} VNĐ</p>
                      <button className="btn" onClick={() => handleRemoveViewed(item.id)}>Xóa</button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        <div className="row">
            <div className="col-12">
              <div className="button-container">
                <NavLink to="/" className="btn">
                  Tiếp tục mua hàng
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default DaXem;
