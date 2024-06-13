import axios from "axios";
import { useState } from "react";
function Avatar(props)
{
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageChange = (event) => {
      setSelectedImage(event.target.files[0]);
    };

    const handleUpload = async (event) => {
        event.preventDefault();
        if (!selectedImage) {
            console.error('Please select an image first.');
            return;
        }
    
        const formData = new FormData();
        formData.append('image', selectedImage);
        formData.append('khachHangID', props.khachHang.id);
    
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/them-avatar', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
    
            if (response.data.success) {
                alert('Thành công');
                // Thực hiện các thao tác cần thiết sau khi tải lên thành công
            } else {
                alert('Thất bại: ' + response.data.message);
                // Xử lý lỗi nếu cần
            }
        } catch (error) {
            console.error('Error uploading image', error);
            alert('Lỗi khi tải lên ảnh');
        }
    };

    const hienAnh = () =>
    {
        if(props.khachHang)
        {
            return(<img className="default-img" src={props.khachHang.image_path + props.khachHang.avatar} style={{maxWidth: "500px",height: "300px"}} alt="#" />
            )
        }
        return(<img style={{textAlign: 'center'}} className="default-img" src="https://via.placeholder.com/550x750" alt="#" />)
    }
    
    
    
    return(<>
        {hienAnh()}<br></br>
        <input type="file" onChange={handleImageChange} />
        <button onClick={handleUpload}>Upload Image</button>
    </>)
}

export default Avatar;