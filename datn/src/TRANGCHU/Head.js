import { NavLink } from "react-router-dom";
import { useState } from "react";
import Menu from "./Menu";
function Head() {
  // State to store search input value
  const [thanhTimKiem, setThanhTimKiem] = useState('');

  // Check if the token exists in localStorage
  const storedToken = localStorage.getItem('token');

  // Handle logout action
  const logoutHandler = () => {
    localStorage.removeItem('token'); // Remove token from localStorage
    window.location.href = '/'; // Redirect to home
  };

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
  const dangNhap = () => {
    return (
      <>
        {storedToken === null ? (
          <>
            <i className="ti-power-off"></i>
            <NavLink to="/DANGNHAP" className="Nav-Link active">
              ĐĂNG NHẬP
            </NavLink>
            /
            <NavLink to="/DANGKY" className="Nav-Link active">
              ĐĂNG KÝ
            </NavLink>
          </>
        ) : (
          <>
            <i className="ti-power-off"></i>
            <NavLink to="/" onClick={logoutHandler} className="Nav-Link active">
              ĐĂNG XUẤT
            </NavLink>
          </>
        )}
      </>
    );
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

  return (
    <>
      <header>
        <div className="site-navbar bg-white py-2">
          <div className="search-wrap">
            <div className="container">
              <a href="#" className="search-close js-search-close">
                <span className="icon-close2"></span>
              </a>
              <form onSubmit={handleSearchSubmit} method="post">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search keyword and hit enter..."
                  value={thanhTimKiem}
                  onChange={handleSearchChange}
                />
              </form>
            </div>
          </div>
          <Menu />

        </div>
      </header>
    </>
  );
}

export default Head;
