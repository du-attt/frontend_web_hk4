import axios from "axios";

// Tạo một phiên bản Axios với cấu hình mặc định
const URLBASE = axios.create({
  baseURL: "http://localhost:44317/api", // Đổi thành URL của backend Laravel của bạn
});

export default URLBASE;
