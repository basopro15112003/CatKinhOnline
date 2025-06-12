import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getUserFromToken } from "./jwtDecode";

export default function GoogleCallback() {
  const navigate = useNavigate();
  const { search } = useLocation();

  useEffect(() => {
    const token = new URLSearchParams(search).get("token");
    if (token) {
      localStorage.setItem("token", token);
      getUserFromToken(); // ham goi de luu local bien chua name va email
      navigate("/account");
    } else {
      alert("Xác thực thất bại");
      navigate("/");
    }
  }, [search, navigate]);

  return <div>Đang xử lý xác thực Google…</div>;
}
