import Sanpham from "./Sanpham";
import { useState,useEffect } from "react";
import axios from "axios";
function Danhsach(props) {
    
   
    //lưu danh sách các sản phẩm
	const [dsSanPham,setdsSanPham]= useState([]);
    const [loading, setLoading] = useState(true);

	//-------------------------đây là gọi API dsSanPham sẽ được thay đổi ở đây--------------------------

	useEffect(() => {
		const fetchData = async () => {
			try {
			  const response = await axios.get('http://127.0.0.1:8000/api/danh-sach-san-pham');
			 
			  setdsSanPham(response.data.data);
              await new Promise((resolve) => setTimeout(resolve, 1000)); // Giả sử việc tải mất 2 giây
                setLoading(false);
                
			} catch (error) {
			  console.error('Error fetching data:', error);
              setLoading(false);
			}
		  };
          fetchData();
	}, []); // Thêm dispatch vào dependency array
    //hàm này duyệt qua các mảng của biến được truyền qua ở đây là props
    //vì props chưa phải là 1 mảng nên phải là props.data
    const ListSP = dsSanPham.map(function(item, index) {
        return (
          <Sanpham key={index} data={item} />
        );
      });
      
    return (
        <>
         
                        {ListSP}
                
        </>
    );
}
export default Danhsach;