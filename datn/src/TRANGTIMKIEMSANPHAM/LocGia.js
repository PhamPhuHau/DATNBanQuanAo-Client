function LocGia(){
    return(
        <>
        <div>
        <hr></hr>
            <div className="row">
                <div className="khunggia col-sm-3">
                    <h5 className="khoang_gia">KHOẢNG GIÁ</h5>
                </div>
                <div className="col-sm-9"></div>
            </div>
        <input type="text" autocomplete="off" name="text" className="nhap_gia" placeholder=""/>
        <label>
            <p>----</p>
        </label>
        <input type="text" autocomplete="off" name="text" className="nhap_gia" placeholder=""/>
        <button className="nutgia">
            Click
        </button>
        <hr></hr>
        </div>
        </>
    );
}
export default LocGia;