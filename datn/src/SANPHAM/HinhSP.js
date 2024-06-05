function HinhSP(item) {
    if(item.anh){
    return (
        <> 
            <img 
            style={{
            cursor: "pointer"
            }}
            src={item.anh.image_path + item.anh.url} alt="#" />
        </>
    );
    }
   
    return (
    <>  
      <img  src="https://via.placeholder.com/550x750" alt="#" />
            {/* <img className="hover-img" src="https://via.placeholder.com/550x750" alt="#" /> */}    

    </>);

}
export default HinhSP