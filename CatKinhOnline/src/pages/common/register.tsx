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
import { registerNewUser, type RegisterInput } from "@/services/userService";
import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";

export function Register({
  setShowForm,
}: {
  setShowForm: (value: boolean) => void;
}) {
  const [fullname, setFullname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [passwordHash, setPassword] = useState<string>("");
  const [confirmPassWord, setConfirmPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const validate = (): boolean => {
    if (!fullname.trim()) {
      toast.warning("Họ và tên không thể được để trống !");
      return false;
    }
    if (fullname.length < 6) {
      toast.warning("Họ và tên thể ngắn hơn 6 ký tự");
      return false;
    }
    if (fullname.length > 100) {
      toast.warning("Tên sản phẩm không thể dài hơn 100 ký tự.");
      return false;
    } // Validate phone number format (Vietnam)
    const phoneRegex = /^(84|0[35789])[0-9]{8}$/;
    if (!phoneRegex.test(phone)) {
      toast.warning("Số điện thoại không hợp lệ");
      return false;
    }
    if (passwordHash.length < 8) {
      toast.warning("Mật khẩu không thể nhỏ hơn 8 ký tự");
      return false;
    }
    if (passwordHash !== confirmPassWord) {
      toast.warning("Mật khẩu xác nhận sai");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      const payload: RegisterInput = {
        id: 0,
        fullName: fullname,
        email: email,
        phone: phone,
        passwordHash: passwordHash,
        role: 1,
        status: 1,
      };
      const response = await registerNewUser(payload);

      if (response.isSuccess) {
        toast.success("Đăng ký tài khoản thành công !");
        setFullname(""); //Clear lại form sau khi đăng ký thành công
        setEmail("");
        setPhone("");
        setPassword("");
        setConfirmPassword("");
      } else {
        toast.error(response.message);
      }
      setSubmitting(false);
    } catch (error) {
      console.log(error);
      setSubmitting(false);
    }
  };

  return (
    <>
      <Card className="d:w-full relative mx-auto h-full max-w-7xl">
        <form onSubmit={handleSubmit}>
          <CardHeader className="p-6">
            <CardTitle>Đăng ký </CardTitle>
            <CardDescription>
              Nếu như bạn chưa có tài khoản đăng ký tài khoản tại đây
            </CardDescription>
          </CardHeader>
          <CardContent className="mb-6 px-6">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="fullname">Họ và tên</Label>
                <Input
                  id="fullname"
                  type="text"
                  placeholder="Nhập vào họ và tên"
                  required
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Nhập vào Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label>Số điện thoại</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Nhập vào số điện thoại"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="relative grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Mật khẩu</Label>
                </div>
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={passwordHash}
                  placeholder="Nhập vào mật khẩu"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute top-7 right-2 scale-95"
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
              <div className="relative mb-2 grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Xác nhận mật khẩu</Label>
                </div>
                <Input
                  id="confirmPassword"
                  type={showConfirm ? "text" : "password"}
                  value={confirmPassWord}
                  placeholder="Xác nhận mật khẩu"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />{" "}
                <button
                  type="button"
                  className="absolute top-7 right-2 scale-95"
                  onClick={() => setShowConfirm((v) => !v)}
                  tabIndex={-1}
                >
                  {!showConfirm ? (
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
          </CardContent>
          <CardFooter className="flex-col gap-2 px-6 pb-6">
            <Button className="w-full" disabled={submitting}>
              {submitting ? "Đang đăng ký..." : "Đăng ký"}
            </Button>
            <Button
              variant="ghost"
              className="w-full text-sm text-gray-500"
              onClick={() => setShowForm(false)}
            >
              Huỷ
            </Button>
          </CardFooter>
        </form>
      </Card>
    </>
  );
}
