import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Register } from "@/pages/common/register";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sparkles } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Link, useNavigate } from "react-router-dom";
import {
  getUserProfileByEmail,
  type UserProfile,
} from "@/services/userService";
import { Login } from "@/pages/common/login";
import { toast } from "@/hooks/use-toast";
import NavigationComponent from "./navigation";
import Logo from "@/assets/images/logo/LogoWhiteNoBG.png";

export function Header() {
  const [showForm, setShowForm] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const navigate = useNavigate();
  const email = sessionStorage.getItem("email");

  useEffect(() => {
    async function fetchData() {
      if (!email) {
        return;
      }
      try {
        const response = await getUserProfileByEmail(email);
        if (response && response.isSuccess) {
          setUserProfile(response.result as UserProfile | null);
          console.log("userProfile", userProfile);
        }
        if (userProfile?.phone === "") {
          toast.warning(
            "Vui lòng cập nhật số điện thoại tại trang cá nhân để tiếp tục có thể đặt hàng",
          );
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [email, userProfile?.phone]);

  // const handleReloadUser = async () => {
  //   try {
  //     const response = await getUserProfile(email!);
  //     if (response) setUserProfile(response);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  function logout() {
    sessionStorage.clear()
    navigate("/");
    toast.success("Đang xuất thành công!");
  }
  return (
    <>
      <header className="sticky top-0 z-50 border-b border-emerald-100 bg-white/80 shadow-sm backdrop-blur-sm print:hidden">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <Link to={"/"} className="flex items-center space-x-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-600 to-teal-600">
              <img src={Logo} alt="Logo" className="h-7 w-7 text-white" />
            </div>
            <h1 className="bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-base font-bold text-transparent md:text-2xl">
              Nhôm Kính Quốc Thuần
            </h1>
          </Link>
          {!email ? (
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
              <div className="flex items-center">
                {" "}
                <Link to="/account">
                  <Avatar className="mr-2 h-10 w-10 md:h-13 md:w-13">
                    <AvatarImage
                      alt="avatar"
                      src="https://yt3.googleusercontent.com/OXbxyxi7XaDta1HS8rAUWzgLcegQxXf4clltpIUE3qCzuO3LxFhRqqatphRP788cVqYiRWWKPXQ=s900-c-k-c0x00ffffff-no-rj"
                    />
                    <AvatarFallback>User</AvatarFallback>
                  </Avatar>{" "}
                </Link>
                <div>
                  <Link to="/account">
                    <p className="max-w-30 truncate text-sm font-bold text-green-700 md:max-w-44 md:text-base">
                      {userProfile?.fullName}
                    </p>
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
      <NavigationComponent></NavigationComponent>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs">
          <Tabs defaultValue="account" className="w-full max-w-xl items-center">
            <TabsList className="mr-auto">
              <TabsTrigger value="account">Đăng nhập</TabsTrigger>
              <TabsTrigger value="password">Đăng ký</TabsTrigger>
            </TabsList>
            <TabsContent className="w-sm md:w-full" value="account">
              <Login setShowForm={setShowForm} />
            </TabsContent>
            <TabsContent className="w-sm md:w-full" value="password">
              <Register setShowForm={setShowForm} />
            </TabsContent>
          </Tabs>
        </div>
      )}
    </>
  );
}
