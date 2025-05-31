import { Login } from "@/pages/login";
import { useState } from "react";
import { Button } from "./ui/button";
import { Register } from "@/pages/register";

export function Header() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  return (
    <>
      <header className="items-center justify-between flex h-15 max-w-7xl mx-auto">
        <p className="text-4xl  font-extrabold text-green-800">
          Tiệm kính Quốc Hoàng
        </p>
        {/* <div className="flex space-x-4">
            <a href=""  className="text-black hover:text-blue-800 hover:underline">
              Trang chủ
            </a>
             <a href=""  className="text-black hover:text-blue-800 hover:underline">
              Đặt hàng
            </a>
          </div> */}
        <Button variant="outline" onClick={() => setShowLogin(true)}>
          Đăng nhập
        </Button>
      </header>
      {showLogin && (
        <Login setShowLogin={setShowLogin} setShowRegister={setShowRegister} />
      )}
      {showRegister && (
        <Register
          setShowRegister={setShowRegister}
          setShowLogin={setShowLogin}
        />
      )}
    </>
  );
}
