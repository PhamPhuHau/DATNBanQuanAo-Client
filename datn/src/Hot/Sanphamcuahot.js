import GiaSP from "../SANPHAM/GiaSP";
import HinhSP from "../SANPHAM/HinhSP";
import TenSP from "../SANPHAM/TenSP";

function Cacsanphambanchay() {
    return (
        <>

            <div className="single-list">
                <div className="row">
                    <div className="col-lg-6 col-md-6 col-12">
                        <div className="list-image overlay">
                            {/* <img src="https://via.placeholder.com/115x140" alt="#"/> */}
                            <HinhSP />
                            <a  className="buy"><i className="fa fa-shopping-bag"></i></a>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-12 no-padding">
                        <div className="content">
                            <h4 className="title"><TenSP /></h4>
                            <div className="price with-discount"><GiaSP /></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Cacsanphambanchay;