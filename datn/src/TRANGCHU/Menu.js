import { NavLink } from "react-router-dom";
import { useState,useEffect } from "react";
import axios from "axios";

function Menu() {
  //--------các State-------------------

  //được dùng để lưu danh sách loại
  const [dsLoai, setDSLoai] = useState([]);

  //----------API-----------------------
  useEffect(  () =>  {
    const fetchData = async () => {
    const response = await axios.get('http://127.0.0.1:8000/api/danh-sach-loai');
    setDSLoai(response.data.data);
    }
    fetchData();
  },[]);

  //---------hàm xử lý-----------------

  //được dùng để hiển thị tất cả loại lênt rang web

  const danhSachLoai = dsLoai.map((item) => {
    return(
      <li key={item.id}>
        <NavLink to={`/loai/${item.id}`}>{item.ten}</NavLink>
      </li>
    )
  })

  const [menuOpen, setMenuOpen] = useState(false);

  const openMenu = () => {
    setMenuOpen(!menuOpen);
  };

  


  return (
    <>
      <header >                        
        <div className="container">
            <div className="d-flex align-items-center justify-content-between">
              <div className="logo">
                <div className="site-logo">
                  <NavLink to="/" className="js-logo-clone">ShopMax</NavLink>
                </div>
              </div>
              <div className="main-nav d-none d-lg-block">
                <nav className="site-navigation text-right text-md-center" role="navigation">
                  <ul className="site-menu js-clone-nav d-none d-lg-block">
                    <li className="has-children active">
                      <NavLink to="/">Home</NavLink>
                      <ul className="dropdown">
                      {danhSachLoai}

                      </ul>
                    </li>
                    <li><NavLink to="/shop">Shop</NavLink></li>
                    <li><NavLink to="#">Catalogue</NavLink></li>
                    <li><NavLink to="#">New Arrivals</NavLink></li>
                    <li><NavLink to="/contact">Contact</NavLink></li>
                  </ul>
                </nav>
              </div>
              <div className="icons">
                <a href="#" className="icons-btn d-inline-block js-search-open">
                  <span className="icon-search"></span>
                </a>
                <a href="/YeuThich" className="icons-btn d-inline-block">
                  <span className="icon-heart-o"></span>
                </a>
                <NavLink to="/GioHang" className="icons-btn d-inline-block bag">
                  <span className="icon-shopping-bag"></span>
                </NavLink>
                <a  className="site-menu-toggle js-menu-toggle ml-3 d-inline-block d-lg-none"  >
                <button className="menu-toggle btn-danger" onClick={openMenu}>☰</button>

                  <div className={`app ${menuOpen ? 'menu-open' : ''}`}>
      <div className={`menu ${menuOpen ? 'open' : ''}`} id="menu">
        <ul>
        <li><NavLink to="/shop">Shop</NavLink></li>
        <li><NavLink to="#">Catalogue</NavLink></li>
        <li><NavLink to="#">New Arrivals</NavLink></li>
        <li><NavLink to="/contact">Contact</NavLink></li>
        </ul>
      </div>
   
    </div>                  
    </a>                
              </div>
            </div>
          </div>
                        
                    
      </header>
    </>
  );
}

export default Menu;
