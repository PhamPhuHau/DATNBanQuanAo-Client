import '../vendor/css/dangnhap.css';
import axios from 'axios';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Swal from 'sweetalert2';
function DangNhap() {
  //---------các state ---------------------

  //lưu value nhập vào của email ở input
  const [email, setEmail] = useState('');
  
  //lưu value nhập vào của password ở input
  const [password, setPassword] = useState('');

  //------------ gọi API--------------------


  const postLogin = (event) => {
    // Ngăn chặn hành vi mặc định của sự kiện, trong trường hợp này là gửi biểu mẫu
    event.preventDefault();


    //ở đây kiểm tra thông tin đăng nhập
    //nếu thông tin đăng nhập là hợp lệ thì sẽ tạo ra 1 localStorage sẽ thay đổi đường dẫn thành /
    axios.post('http://127.0.0.1:8000/api/login', {
      email: email,
      password: password,
    })
    .then(function (response) {
      const token = response.data.access_token;
      localStorage.setItem('token', token);
      window.location.href = '/';
    })
    .catch(function (error) {
      if(error.response.status === 422)
      {
        const {email, password} = error.response.data.errors;
        if(email || password)
        {
          Swal.fire({
            title: "Thất bại",
            text: Object.values(email).join('') ,
            icon: "error"
          });
        
        }
      }
      else{
        Swal.fire({
          title: "Thất bại",
          text: 'Tài khoảng hoặc mật khẩu không đúng' ,
          icon: "error"
        });
      
      }

    });
  }


  return (
    <>
     
        <div className="container1">
          <div className="heading">ĐĂNG NHẬP</div>
          <form onSubmit={postLogin} className="form">
            <input
              onChange={(e) => setEmail(e.target.value)}
              className="input"
              type="email"
              name="ten_dang_nhap"
              id="ten_dang_nhap"
              placeholder="Email"
            />
            <div className='invalid-feedback email-error'></div>
            <input
              onChange={(e) => setPassword(e.target.value)}
              
              className="input"
              type="password"
              name="password"
              id="password"
              placeholder="Password"
            />
            <div className='invalid-feedback password-error'></div>

            <input className="login-button" type="submit" value="Sign In" />
          </form>
          <NavLink to="/quen-mat-khau" style={{color:'#25c9e6', textDecoration: 'none'}}>quên mật khẩu/</NavLink>
          <NavLink to="/DANGKY" style={{color:'#25c9e6', textDecoration: 'none'}}>đăng ký</NavLink>
        </div>
     
    </>
  );
}

export default DangNhap;
