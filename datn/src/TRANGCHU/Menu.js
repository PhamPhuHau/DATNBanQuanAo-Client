import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function Menu() {
  //--------các State-------------------

  // được dùng để lưu danh sách loại
  const [dsLoai, setDSLoai] = useState([]);

  //----------API-----------------------
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('http://127.0.0.1:8000/api/danh-sach-loai');
      setDSLoai(response.data.data);
    };
    fetchData();
  }, []);

  //---------hàm xử lý-----------------

  // được dùng để hiển thị tất cả loại lên trang web
  const danhSachLoai = dsLoai.map((item) => {
    return (
      <li key={item.id}>
        <NavLink to={`/loai/${item.id}`}>{item.ten}</NavLink>
      </li>
    );
  });

  const [menuOpen, setMenuOpen] = useState(false);

  const openMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const storedToken = localStorage.getItem('token');

  // Handle logout action
  const logoutHandler = () => {
    localStorage.removeItem('token'); // Remove token from localStorage
    window.location.href = '/'; // Redirect to home
  };

  const [thanhTimKiem, setThanhTimKiem] = useState('');

  // Handle search input change
  const handleSearchChange = (event) => {
    setThanhTimKiem(event.target.value);
  };

  // Handle search form submission
  const handleSearchSubmit = (event) => {
    event.preventDefault();
    // Implement search logic here
  };

  // Render login/logout options
  const renderLoginLogoutOptions = () => {
    if (storedToken === null) {
      return (
        <>
          <NavLink to="/DANGNHAP" className="btn btn-primary mx-2">
            ĐĂNG NHẬP
          </NavLink>
          <NavLink to="/DANGKY" className="btn btn-secondary mx-2">
            ĐĂNG KÝ
          </NavLink>
        </>
      );
    } else {
      return (
        <button onClick={logoutHandler} className="btn btn-danger mx-2">
          ĐĂNG XUẤT
        </button>
      );
    }
  };

  // Render appropriate icons based on login status
  const KiemTraDangNhap = () => {
    if (storedToken == null) {
      return (
        <>
          <div className="single-bar">
            <NavLink to="/DANGNHAP" className="single-icon">
              <i className="fa fa-user-circle-o" aria-hidden="true"></i>
            </NavLink>
          </div>
          <div className="single-bar shopping">
            <NavLink to="/DANGNHAP" className="single-icon">
              <i className="ti-bag"></i>
            </NavLink>
          </div>
        </>
      );
    }
  };

  // Render shopping cart icon based on login status
  const renderCartIcon = () => {
    if (storedToken) {
      return (
        <NavLink to="/GioHang" className="icons-btn d-inline-block bag">
          <span className="icon-shopping-bag"></span>
        </NavLink>
      );
    }
    return null;
  };

  return (
    <>
      <header>
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
              {renderCartIcon()}
              <div className="d-inline-block ml-3">
                {renderLoginLogoutOptions()}
              </div>
              <a className="site-menu-toggle js-menu-toggle ml-3 d-inline-block d-lg-none">
                <button className="menu-toggle btn-danger" onClick={openMenu}>☰</button>
                <div className={`app ${menuOpen ? 'menu-open' : ''}`}>
                  <div className={`menu ${menuOpen ? 'open' : ''}`} id="menu">
                    <ul>
                      <li><NavLink to="/shop">Shop</NavLink></li>
                      <li><NavLink to="#">Catalogue</NavLink></li>
                      <li><NavLink to="#">New Arrivals</NavLink></li>
                      <li><NavLink to="/contact">Contact</NavLink></li>
                      <li><NavLink to="/THONGTINTAIKHOAN">User</NavLink></li>
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
