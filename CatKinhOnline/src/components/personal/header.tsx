import { Login } from "@/pages/customer/login";
import { useState } from "react";
import { Button } from "../ui/button";
import { Register } from "@/pages/customer/register";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sparkles, Store } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Link } from "react-router-dom";

export function Header() {
  const [showForm, setShowForm] = useState(false);
  const token = localStorage.getItem("token");
  const name = localStorage.getItem("name");

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    window.location.href = "/";
  }
  return (
    <>
      <header className="sticky top-0 z-50 border-b border-emerald-100 bg-white/80 shadow-sm backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <div className="flex items-center space-x-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-600 to-teal-600">
              <Store className="h-6 w-6 text-white" />
            </div>
            <h1 className="bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-2xl font-bold text-transparent">
              Tiệm kính Quốc Hoàng
            </h1>
          </div>
          {!token ? (
            <>
              <Button
                onClick={() => setShowForm(true)}
                className="transform bg-gradient-to-r from-green-600 to-teal-800 text-white shadow-lg transition-all duration-300 hover:scale-105 hover:from-emerald-700 hover:to-teal-700 hover:shadow-xl"
              >
                <Sparkles className="mr-2 h-4 w-4" />
                Đăng nhập
              </Button>
            </>
          ) : (
            <>
              <div className="flex">
                <Avatar className="mr-2 h-13 w-13">
                  <Link to="/account">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>User</AvatarFallback>
                  </Link>
                </Avatar>
                <div>
                  <Link to="/account">
                    <p className="font-bold text-green-700">{name}</p>
                  </Link>
                  <Button
                    className="bg-gradient-to-r from-emerald-500 to-teal-700 text-white transition-all duration-300 hover:scale-105 hover:from-green-500 hover:to-green-900 hover:text-white"
                    variant="outline"
                    type="button"
                    size={"sm"}
                    onClick={logout}
                  >
                    Đăng xuất
                  </Button>
                </div>
              </div>
            </>
          )}
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
