import Sanphamcuahot from './Sanphamcuahot';

function Cacsanphambanchay()
{
    return(
        <>
        <section className="shop-home-list section">
		<div className="container">
			<div className="row">
				<div className="col-lg-4 col-md-6 col-12">
					<div className="row">
						<div className="col-12">
							<div className="shop-section-title">
								<h1>On sale</h1>
							</div>
						</div>
					</div>
					<Sanphamcuahot/>
					<Sanphamcuahot/>
					<Sanphamcuahot/>

				</div>
                
				<div className="col-lg-4 col-md-6 col-12">
					<div className="row">
						<div className="col-12">
							<div className="shop-section-title">
								<h1>Best Seller</h1>
							</div>
						</div>
					</div>
					<Sanphamcuahot/>
					<Sanphamcuahot/>
					<Sanphamcuahot/>
				</div>
				<div className="col-lg-4 col-md-6 col-12">
					<div className="row">
						<div className="col-12">
							<div className="shop-section-title">
								<h1>Top viewed</h1>
							</div>
						</div>
					</div>
					<Sanphamcuahot/>
					<Sanphamcuahot/>
					<Sanphamcuahot/>
				</div>
			</div>
		</div>
	</section>
        </>
    );
}
export default Cacsanphambanchay;