// DichVu.js

import React from 'react';

const DichVu = () => {
  return (
    <section className="shop-services section home">
		<div className="container">
			<div className="row">
				<div className="col-lg-4 col-md-6 col-12">
					<div className="single-service">
						<i className="ti-reload"></i>
						<h4>Miễn phí hoàn trả</h4>
						<p>Hoàn trả trong 30 ngày</p>
					</div>
				</div>
				<div className="col-lg-4 col-md-6 col-12">
					<div className="single-service">
						<i className="ti-lock"></i>
						<h4>An toàn giao dịch</h4>
						<p>Đảm bảo bảo mật thông tin giao dịch</p>
					</div>
				</div>
				<div className="col-lg-4 col-md-6 col-12">
					<div className="single-service">
						<i className="ti-tag"></i>
						<h4>Giá cả hợp lý</h4>
						<p>Giá cả tốt nhất giành cho bạn</p>
					</div>
				</div>
			</div>
		</div>
	</section>
  );
};

export default DichVu;
