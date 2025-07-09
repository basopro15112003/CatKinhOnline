import { getUserFromToken } from "@/components/form/auth/jwtDecode";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { LoginJWT, type LoginInput } from "@/services/userService";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ForgotPasswordForm } from "./forgotPassword";
import { Eye, EyeClosed } from "lucide-react";
type props = {
  setShowForm: (value: boolean) => void;
};

export function Login({ setShowForm }: props) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showForgotPasswordForm, setShowForgotPasswordForm] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const BE_LOGIN = `https://localhost:7057/api/auth/login?returnUrl=${encodeURIComponent("/auth/callback")}`;
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload: LoginInput = {
        email,
        password,
      };
      const res = await LoginJWT(payload);
      if (!res) {
        toast.error(
          "Đăng nhập thất bại: vui lòng kiểm tra lại tài khoản và mật khẩu",
        );
        return;
      } else {
        toast.success(
          "Đăng nhập thành công: Chúc bạn trải nghiệm dịch vụ một cách vui vẻ",
        );
        sessionStorage.setItem("token", res);
        const user = getUserFromToken();
        if (!user || user.role === "0") {
          navigate("/admin");
        }
        setShowForm(false);
        navigate("/");
      }
    } catch (error) {
      alert("Đăng nhập thất bại: " + (error as Error).message);
    }
  };
  return (
    <>
      {showLogin && (
        <>
          {" "}
          <Card className="">
            <form onSubmit={handleLogin}>
              <CardHeader className="p-6">
                <CardTitle>Đăng nhập vào tài khoản của bạn</CardTitle>
                <CardDescription>
                  Nhập email của bạn vào ô ở bên dưới để đăng nhập vào tài
                  khoản{" "}
                </CardDescription>
              </CardHeader>
              <CardContent className="mb-6 px-6">
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Tài khoản</Label>
                    <Input
                      id="email"
                      type="text"
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="quochoangnguyen2003ct@example.com"
                      required
                    />
                  </div>
                  <div className="mb-2 grid gap-2">
                    <div className=" flex items-center">
                      <Label htmlFor="password">Mật khẩu</Label>
                      <a
                        onClick={() => {
                          setShowForgotPasswordForm(true);
                          setShowLogin(false);
                        }}
                        className="ml-auto text-sm underline hover:underline-offset-2"
                      >
                        Quên mật khẩu hả? lấy lại ở đây nè.
                      </a>
                    </div>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />{" "}
                      <button
                        type="button"
                        className="absolute top-2 right-2 scale-95"
                        onClick={() => setShowPassword((v) => !v)}
                        tabIndex={-1}
                      >
                        {!showPassword ? (
                          <>
                            <EyeClosed></EyeClosed>
                          </>
                        ) : (
                          <>
                            <Eye></Eye>
                          </>
                        )}
                      </button>{" "}
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex-col gap-2 px-6 pb-6">
                <Button type="submit" className="w-full">
                  Đăng nhập
                </Button>
                <a
                  type="button"
                  className="flex w-full items-center justify-center gap-2 rounded-lg border-2 bg-blue-500 py-1 text-center font-medium text-white hover:bg-blue-600"
                  href={BE_LOGIN}
                >
                  <img
                    src="https://static.vecteezy.com/system/resources/previews/022/613/027/non_2x/google-icon-logo-symbol-free-png.png"
                    className="w-7"
                  ></img>
                  Đăng nhập với Google
                </a>
                <Button
                  variant="ghost"
                  className="w-full bg-gray-200 text-sm hover:bg-gray-300"
                  onClick={() => setShowForm(false)}
                >
                  Huỷ
                </Button>
              </CardFooter>
            </form>
          </Card>
        </>
      )}
      {showForgotPasswordForm && <ForgotPasswordForm />}
    </>
  );
}
