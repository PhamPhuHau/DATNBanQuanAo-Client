import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Table } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import Footer from "../TRANGCHU/Footer";
import Head from "../TRANGCHU/Head";
import Menu from "../TRANGCHU/Menu";

function GioHang() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(items);
  }, []);

  const updateCart = (itemId, selectedSize, selectedColor, newQuantity) => {
    axios.post('http://127.0.0.1:8000/api/kiem-tra-so-luong', {
      mau: selectedColor,
      size: selectedSize,
      soLuong: newQuantity,
      sanPhamID: itemId,
    }).then((response) => {
      if (response.data.trangThai === 1) {
        const updatedCart = cartItems.map((item) =>
          item.id === itemId && item.selectedSize === selectedSize && item.selectedColor === selectedColor
            ? { ...item, so_luong: newQuantity >= 0 ? newQuantity : 0 }
            : item
        );

        setCartItems(updatedCart);
        localStorage.setItem('cartItems', JSON.stringify(updatedCart));
      } else {
        Swal.fire({
          title: "Thất bại",
          text: 'Không đủ sản phẩm',
          icon: "error"
        });
      }
    });
  };

  const removeItemFromCart = (itemId, selectedSize, selectedColor) => {
    const updatedCart = cartItems.filter((item) => !(item.id === itemId && item.selectedSize === selectedSize && item.selectedColor === selectedColor));
    setCartItems(updatedCart);
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
  };

  const calculateTotal = () => {
    return cartItems.reduce((acc, item) => acc + item.gia * Number(item.so_luong), 0);
  };

  return (
    <>
      <Head />

      <div className="bg-light py-3">
        <div className="container">
          <div className="row">
            <div className="col-md-12 mb-0"><NavLink to="/">Home</NavLink> <span className="mx-2 mb-0">/</span> <strong className="text-black">Cart</strong></div>
          </div>
        </div>
      </div>

      <div className="site-section">
        <div className="container">
          <div className="row mb-5">
            <form className="col-md-12" method="post">
              <div className="site-blocks-table">
                <Table className="table table-bordered">
                  <thead>
                    <tr>
                      <th className="product-thumbnail">Image</th>
                      <th className="product-name">Product</th>
                      <th className="product-size">Size</th>
                      <th className="product-color">Color</th>
                      <th className="product-price">Price</th>
                      <th className="product-quantity">Quantity</th>
                      <th className="product-total">Total</th>
                      <th className="product-remove">Remove</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.length === 0 ? (
                      <tr>
                        <td colSpan="8" className="text-center">Bạn chưa có sản phẩm trong giỏ hàng.</td>
                      </tr>
                    ) : (
                      cartItems.map((item) => (
                        <tr key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}>
                          <td className="product-thumbnail">
                            <img src={`http://localhost:8000/${item.hinh}`} alt={item.ten} className="img-fluid" style={{ maxWidth: '160px', maxHeight: '110px' }} />
                          </td>
                          <td className="product-name">
                            <h2 className="h5 text-black">{item.ten}</h2>
                          </td>
                          <td className="product-size">
                            {item.selectedSize}
                          </td>
                          <td className="product-color">
                            {item.selectedColor}
                          </td>
                          <td>{item.gia.toLocaleString()} VNĐ</td>
                          <td style={{ maxWidth: "50px" }}>
                            <div className="input-group mb-3" style={{ maxWidth: 'auto' }}>
                              <div className="input-group-prepend">
                                <button className="btn btn-outline-danger js-btn-minus" type="button" onClick={() => updateCart(item.id, item.selectedSize, item.selectedColor, item.so_luong - 1)}>&minus;</button>
                              </div>
                              <input type="text" className="form-control text-center" value={item.so_luong} readOnly />
                              <div className="input-group-append">
                                <button className="btn btn-outline-danger js-btn-plus" type="button" onClick={() => updateCart(item.id, item.selectedSize, item.selectedColor, item.so_luong + 1)}>+</button>
                              </div>
                            </div>
                          </td>
                          <td>{(item.gia * item.so_luong).toLocaleString()} VNĐ</td>
                          <td>
                            <button className="btn btn-danger height-auto" onClick={() => removeItemFromCart(item.id, item.selectedSize, item.selectedColor)}>X</button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </Table>
              </div>
            </form>
          </div>

          {cartItems.length > 0 && (
            <div className="row">
              <div className="col-md-6">
                <div className="row mb-5">
                  <div className="col-md-6 mb-3 mb-md-0">
                    <button className="btn btn-danger btn-sm btn-block">Update Cart</button>
                  </div>
                  <div className="col-md-6">
                    <NavLink to="/" className="btn btn-outline-danger btn-block">Continue Shopping</NavLink>
                  </div>
                </div>
              </div>
              <div className="col-md-6 pl-5">
                <div className="row justify-content-end">
                  <div className="col-md-7">
                    <div className="row">
                      <div className="col-md-12 text-right border-bottom mb-5">
                        <h3 className="text-black h4 text-uppercase">Cart Totals</h3>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-md-6">
                        <span className="text-black">Subtotal</span>
                      </div>
                      <div className="col-md-6 text-right">
                        <strong className="text-black">{calculateTotal().toLocaleString()} VNĐ</strong>
                      </div>
                    </div>
                    <div className="row mb-5">
                      <div className="col-md-6">
                        <span className="text-black">Total</span>
                      </div>
                      <div className="col-md-6 text-right">
                        <strong className="text-black">{calculateTotal().toLocaleString()} VNĐ</strong>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-12">
                        <button className="btn btn-danger btn-block" onClick={() => window.location='/ThanhToan'}>Proceed To Checkout</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default GioHang;
