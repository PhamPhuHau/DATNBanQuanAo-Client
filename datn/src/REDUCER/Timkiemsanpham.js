import { createSlice } from "@reduxjs/toolkit"; // muốn dùng thì cần phải npm install @reduxjs/toolkit

export const Task = createSlice({
    name: 'cacSanPham',
    //tên của slice, làm cơ sở cho tên của các action được tạo bởi createSlice. Trong trường hợp này, các action sẽ có tên dạng 'task/Them'.
    //hiểu một cách đơn giản thì muốn sử dụng các action (ở đây là Them) thì phải thông qua thằng name(task) này.
    initialState: {
        mangSanPham: []//trạng thái ban đầu của slice. Trong trường hợp này, trạng thái ban đầu có một thuộc tính dem với giá trị là 1.
        //hiểu đơn giản thì đây giống như là nơi lưu biến toàn cục vậy
    },
    reducers:{//đây là nơi chứa action dùng để thay đổi thằng initialState (ở đây là đếm)
        TimKiem:(state, action)=>{
            state.mangSanPham = action.payload
        }
    }

})

export const {TimKiem} = Task.actions
export default Task.reducer