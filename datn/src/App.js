import './App.css';
import './vendor/2/css/style.css';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './vendor/2/css/bootstrap/bootstrap-grid.css';
import './vendor/2/css/bootstrap/bootstrap-reboot.css';
import './vendor/2/css/aos.css';
import './vendor/2/css/bootstrap.min.css';
import './vendor/2/css/bootstrap.min.css.map';
import './vendor/2/css/jquery-ui.css';
import './vendor/2/css/magnific-popup.css';
import './vendor/2/css/owl.carousel.min.css';
import './vendor/2/css/owl.theme.default.min.css';
import './vendor/2/fonts/icomoon/style.css';


// Component imports
import DangNhap from './TAIKHOAN/DangNhap';
import TrangChu from './TRANGCHU/TrangChu';
import DangKy from './TAIKHOAN/DangKy';
import QuenMatKhau from './TAIKHOAN/QuenMatKhau';
import Trangchinhcacloaisanpham from './LOAISANPHAM/Trangchinhcacloaisanpham';
import ThongTin from './TAIKHOAN/ThongTin';
import TrangChinhChiTietSanPham from './TRANGCHITIET/TrangChinhChiTietSanPham';
import DaXem from './TRANGCHITIET/DaXem';
import YeuThich from './TRANGCHITIET/YeuThich';
import GioHang from './TRANGCHITIET/GioHang';
import TrangChinhTimKiem from './TRANGTIMKIEMSANPHAM/TrangChinhTimKiem';
import ThanhToan from './THANHTOAN/ThanhToan';
import DoiMatKhau from './TAIKHOAN/DoiMatKhau';
import KTDonHang from './THANHTOAN/KTDonHang';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<TrangChu />} />
        <Route path='/DANGNHAP' element={<DangNhap />} />
        <Route path='/DANGKY' element={<DangKy />} />
        <Route path='/DoiMatKhau' element={<DoiMatKhau />} />
        <Route path='/quen-mat-khau' element={<QuenMatKhau />} />
        <Route path='/Trang-chinh-cac-loai-san-pham' element={<Trangchinhcacloaisanpham />} />
        <Route path='/ChiTiet/:spID' element={<TrangChinhChiTietSanPham />} />
        <Route path='/GioHang' element={<GioHang />} />
        <Route path='/YeuThich' element={<YeuThich />} />
        <Route path='/DaXem' element={<DaXem />} />
        <Route path='/ThanhToan' element={<ThanhToan />} />
        <Route path='/KTDonHang/:hdID' element={<KTDonHang />} />
        <Route path='/TimKiem/:tenSanPham' element={<TrangChinhTimKiem />} />
        <Route path='/loai/:loaiID' element={<Trangchinhcacloaisanpham />} />
        <Route path='/THONGTINTAIKHOAN' element={<ThongTin />} />
      </Routes>
    </>
  );
}

export default App;
