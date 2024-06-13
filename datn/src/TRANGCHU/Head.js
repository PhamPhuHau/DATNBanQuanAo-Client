import { NavLink } from "react-router-dom";
import { useState } from "react";
import Menu from "./Menu";
function Head() {
  // State to store search input value

  // Check if the token exists in localStorage
 

  return (
    <>
      <header>
        <div className="site-navbar bg-white py-2">
          <div className="search-wrap">
            <div className="container">
              <a href="#" className="search-close js-search-close">
                <span className="icon-close2"></span>
              </a>
              {/* <form onSubmit={handleSearchSubmit} method="post">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search keyword and hit enter..."
                  value={thanhTimKiem}
                  onChange={handleSearchChange}
                />
              </form> */}
            </div>
          </div>
          <Menu />

        </div>
      </header>
    </>
  );
}

export default Head;
