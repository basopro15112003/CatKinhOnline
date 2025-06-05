import { Login } from "@/pages/customer/login";
import { useState } from "react";
import { Button } from "./ui/button";
import { Register } from "@/pages/customer/register";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";

export function Header() {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <header className="mx-auto mb-10 flex h-15 max-w-7xl items-center justify-between">
        <Link to={"/"} className="text-4xl font-extrabold text-green-800">
          Tiệm kính Quốc Hoàng
        </Link>
        {/* <div className="flex space-x-4">
            <a href=""  className="text-black hover:text-blue-800 hover:underline">
              Trang chủ
            </a>
             <a href=""  className="text-black hover:text-blue-800 hover:underline">
              Đặt hàng
            </a>
          </div> */}
        {/* <Button variant="outline" onClick={() => setShowForm(true)}>
          Đăng nhập
        </Button> */}
        <div className="flex">
          <Avatar className="mr-2 h-13 w-13">
            <Link to="/account">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>User</AvatarFallback>
            </Link>
          </Avatar>
          <div>
            <Link to="/account">
              <p className="text-green-700">Nguyễn Quốc Hoàng</p>
            </Link>
            <Button variant="outline" size={"sm"}>
              Đăng xuất
            </Button>
          </div>
        </div>
      </header>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs">
          <Tabs defaultValue="account" className="w-full max-w-xl items-center">
            <TabsList className="mr-auto">
              <TabsTrigger value="account">Đăng nhập</TabsTrigger>
              <TabsTrigger value="password">Đăng ký</TabsTrigger>
            </TabsList>
            <TabsContent className="w-full" value="account">
              <Login setShowForm={setShowForm} />
            </TabsContent>
            <TabsContent className="w-full" value="password">
              <Register setShowForm={setShowForm} />
            </TabsContent>
          </Tabs>
        </div>
      )}
    </>
  );
}
