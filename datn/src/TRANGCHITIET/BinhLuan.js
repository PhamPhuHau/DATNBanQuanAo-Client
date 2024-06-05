import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';


function BinhLuan() {
	//--------------các state---------------------

	const [loading, setLoading] = useState(true);


	//được dùng để lưu khách hàng bình luận
	const [khachHang, setKhachHang] = useState('');

	//được dùng để lúu danh sách các bình luận của bình luận cấp 1 
	const [danhSachBinhLuan, setDanhSachBinhLuan] = useState([]);

	//đucowj dùng để lưu nội dung khách hàng bình luận
	const [noiDungBinhLuan,setNoiDungBinhLuan] =useState('');

	//được dùng để lúu danh sách các bình luận của bình luận cấp 2
	const [danhSachBinhLuanCapHai, setDanhSachBinhLuanCapHai] = useState([]);

	//được dùng để lưu id của bình luận cấp 1
	const [traLoiBinhLuan, setTraLoiBinhLuan] = useState('');

	//được dùng để lưu id nằm trên url
	let { spID } = useParams();

	//được dùng để lưu localsotege
	const storedToken = localStorage.getItem('token');


	const [fetchCount, setFetchCount] = useState(0);

	//-----------------------------------------------------------------

	//---------------------------------------------------------------


	//-----------------------API---------------------------


	
	//lấy thông tin khách hàng
	useEffect(() => {
		//được dùng để hạng chế số lần gọi lại API
		let chayLai = false;
       
        if (storedToken !== null && chayLai ==false) {
			chayLai = true;
            axios.post('http://127.0.0.1:8000/api/me',null, {
                headers: {
                    Authorization: 'bearer ' + storedToken,
                },
              
              }, {
				timeout: 1000,
			  })
              .then(function (response) {
              setKhachHang(response.data.id);
              
              })
              .catch(function (error) {
                console.error('Error during login request:', error);
               
              });
        
        } 
        else {
          // Token không tồn tại, có thể chuyển hướng hoặc thực hiện hành động khác
          console.log('Token không tồn tại');
          // Ví dụ: Chuyển hướng về trang đăng nhập
          // window.location.href = '/dang-nhap';
        }
      }, []); 




	//---------------------hàm hiện thông tin blc1------------------

	useEffect(() => {
		const fetchData = async () => {
		  try {
			const response = await axios.get(`http://127.0.0.1:8000/api/danh-sach-binh-luan-cap-mot/${spID}`);
			setDanhSachBinhLuan(response.data.data);
	
			if (response.data.data[0]?.binh_luan_cap_hai && response.data.data[0].binh_luan_cap_hai.length > 0) {
			  setDanhSachBinhLuanCapHai(response.data.data[0].binh_luan_cap_hai[0].noi_dung);
			} else {
			  setDanhSachBinhLuanCapHai("Không có binh_luan_cap_hai");
			}
	
			await new Promise((resolve) => setTimeout(resolve, 2000)); // Giả sử việc tải mất 2 giây
          	setLoading(false);
			
		  } catch (error) {
			console.error('Lỗi khi tải dữ liệu:', error);
			setLoading(false);
		  }
		};
	
		// Kiểm tra số lần fetchCount để kiểm soát số lần chạy lại
		if (fetchCount < 1) { // Đặt giới hạn số lần chạy lại (ở đây là 5 lần)
		  fetchData();
		}
	  }, [fetchCount, spID]); 

	
	 
	 
	  
	const luuBinhLuanCapHai = () => {
		axios.post('http://127.0.0.1:8000/api/luu-binh-luan-cap-hai',{
			binh_luan_cap_mot_id: traLoiBinhLuan,
			san_pham_id: spID,
			khach_hang_id: khachHang,
			noi_dung: noiDungBinhLuan,
		}, {
			timeout: 3000,
		  }).then(function(response){
			Swal.fire({
				title: "Thành công",
				text: 'bạn đã bính luận',
				icon: "success"
			  });
		}).catch(function (error) {
			if(error.response.status === 422)
			{
			  const {noi_dung, khach_hang_id} = error.response.data.errors;
			  if(noi_dung)
			  {
				Swal.fire({
				  title: "Thất bại",
				  text: Object.values(noi_dung).join('') ,
				  icon: "error"
				});
			  
			  }
			  if(khach_hang_id)
			  {
				Swal.fire({
				  title: "Thất bại",
				  text: Object.values(khach_hang_id).join('') ,
				  icon: "error"
				});
			  }
		  }
		  });
	}
	

	//-------------------------------
	

	//----------------------ham xu ly----------------

	const listBinhLuan = danhSachBinhLuan.map(function (item ,index) {
		const listBinhLuanCapHai = item.binh_luan_cap_hai ? (
			item.binh_luan_cap_hai.map((item2, index) => (
			  <div key={index} className="single-comment left">
				{item2.khach_hang && item2.khach_hang.avatar ? (
						<img src={item2.khach_hang.image_path + item2.khach_hang.avatar} alt="#" />
					) : (
						<img src="https://via.placeholder.com/80x80" alt="#" />
					)}
				<div className="content">
				  <h4>{item2.khach_hang?.ho_ten}</h4>
				  <p>{item2.noi_dung}</p>
				</div>
			  </div>
			))
		  ) : null;


		//hàm update lại TraLoiBinhLuan
		const xuLyBinhLuan = (item) => {
			setTraLoiBinhLuan(item);
		};

		//hiện form trả lời bình luận
		const hienTraLoiBinhLuan = (id) => {
		
			return traLoiBinhLuan === id ? (<>
			 <form className="form" action="#" key={index}>
			<div className="row">

				<div className="col-12">
					<div className="form-group">
						<label>Viết câu trả lời của bạn<span>*</span></label>
						<textarea onChange={(e) => setNoiDungBinhLuan(e.target.value)} name="message" placeholder=""></textarea>
					</div>
				</div>
				<div className="col-12">
					<button onClick={luuBinhLuanCapHai}type="button" className="btn">Trả lời</button>
				</div>
			</div>
		</form>

				</>
			) : null;
		  };
		

		  return (
			<>
				<div className="single-comment">
					{item.khach_hang && item.khach_hang.avatar ? (
						<img src={item.khach_hang.image_path + item.khach_hang.avatar} alt="#" />
					) : (
						<img src="https://via.placeholder.com/80x80" alt="#" />
					)}
					<div className="content">
						<h4>{item.khach_hang?.ho_ten} </h4>
						<p>{item.noi_dung}</p>
						<div className="button">
							<a onClick={() => xuLyBinhLuan(item.id)} className="btn">
								<i className="fa fa-reply" aria-hidden="true"></i>Trả lời
							</a>
						</div>
						{hienTraLoiBinhLuan(item.id)}
					</div>
				</div>
				<div className="traloibinhluan"></div>
				{listBinhLuanCapHai}
			</>
		);
		
	});



	
	return (
		<>
		
			<>
				<section className="blog-single section">
					<div className="header-inner">
						<div className="container">
							<div className="row">
								<div className="col-lg-8 col-12">
									<div className="blog-single-main">
										<div className="row">
											<div className="col-12">
												<div className="comments">
													<h3 className="comment-title">Bình luận	</h3>
													{/* ------------------------------- */}
													
													{listBinhLuan}
													{/* ------------------------------- */}
													{/* <div className="single-comment">
														<img src="https://via.placeholder.com/80x80" alt="#" />
														<div className="content">
															<h4>megan mart <span>Feb 28, 2018 at 8:59 pm</span></h4>
															<p>Enthusiastically leverage existing premium quality vectors with enterprise-wide innovation collaboration Phosfluorescently leverage others enterprisee  Phosfluorescently leverage.</p>
															<div className="button">
																<a href="#" className="btn"><i className="fa fa-reply" aria-hidden="true"></i>Reply</a>
															</div>
														</div>
													</div> */}
												</div>
											</div>
											<div className="col-12">
												{/* <div className="reply">
													<div className="reply-head">
														<h2 className="reply-title">Leave a Comment</h2> 
														<form className="form" action="#">
															<div className="row">

																<div className="col-12">
																	<div className="form-group">
																		<label>Your Message<span>*</span></label>
																		<textarea name="message" placeholder=""></textarea>
																	</div>
																</div>
																<div className="col-12">
																	<button type="submit" className="btn">Post comment</button>
																</div>
															</div>
														</form>
													</div>
												</div> */}
											</div>
										</div>
									</div>
								</div>

							</div>
						</div>
					</div>
					
				</section>
				
			</>
	  
		</>
	
	);
}
export default BinhLuan;