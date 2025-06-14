import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getUserFromToken } from "./jwtDecode";
import { toast } from "@/hooks/use-toast";

export default function GoogleCallback() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const shown = useRef(false);

    useEffect(() => {  if (shown.current) return;
    shown.current = true;
    const token = new URLSearchParams(search).get("token");
    try {
      if (token) {
        localStorage.setItem("token", token);
        getUserFromToken();
              toast.success(
        "Đăng nhập thành công: Chúc bạn trải nghiệm dịch vụ một cách vui vẻ",
      );
        navigate("/");
      } else {
        toast.error("Xác thực thất bại");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    } 
  }, [search, navigate]);

  return <div>Đang xử lý xác thực Google…</div>;
}
