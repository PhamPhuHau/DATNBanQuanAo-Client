import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Footer from '../TRANGCHU/Footer';
import Head from '../TRANGCHU/Head';
import Menu from '../TRANGCHU/Menu';

function YeuThich() {
  const [favoriteItems, setFavoriteItems] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavoriteItems(storedFavorites);
  }, []);

  const handleRemoveFavorite = (id) => {
    const updatedFavorites = favoriteItems.filter(item => item.id !== id);
    setFavoriteItems(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  return (
    <>
      <Head />

      <div className="site-section">
        <div className="container">
          <div className="row">
            <div className="title-section mb-5 col-12">
              <h2 className='text-uppercase'>Danh sách sản phẩm yêu thích</h2>
            </div>
          </div>
          <div className="row">
            {favoriteItems.length === 0 ? (
              <p>Không có sản phẩm nào trong danh sách yêu thích.</p>
            ) : (
              favoriteItems.map((item) => (
                <div key={item.id} className="col-lg-4 col-md-6 item-entry mb-4">
                  <div className="product-item md-height bg-gray d-block">
                    <NavLink to={`/ChiTiet/${item.id}`} className="Nav-Link active">
                      <img src={`http://localhost:8000/` + item.hinh} alt={item.ten} />
                    </NavLink>
                  </div>
                  <div className="product-content">
                    <p className="item-title">{item.ten}</p>
                    <p className="item-price">{Number(item.gia).toLocaleString()} VNĐ</p>
                    <button className="btn btn-danger" onClick={() => handleRemoveFavorite(item.id)}>Xóa</button>
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="row">
            <div className="col-12">
              <div className="button-container">
                <NavLink to="/" className="btn btn-outline-danger">
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

export default YeuThich;
