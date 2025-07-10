import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Eye, EyeClosed } from "lucide-react";

export function ResetPasswordForm() {
  const [params] = useSearchParams();
  const token = params.get("token");
  const email = params.get("email");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) {
      return toast.warning("Mật khẩu không khớp! Vui lòng thử lại");
    }
    if (password.length < 8) {
      return toast.warning("Mật khẩu không thể ngắn hơn 8 ký tự");
    }
    setSubmitting(true);
    const res = await fetch("https://localhost:7057/api/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, email, newPassword: password }),
    });
    if (res.ok) {
      setSuccess(true);
      toast.success("Thay đổi mật khẩu thành công");
    } else {
      toast.error("Có lỗi xảy ra, vui lòng thử lại");
    }
    setSubmitting(false);
  };
  if (success)
    return (
      <Card className="mx-auto mt-20 mb-20 max-w-md p-8 text-center">
        <div className="flex flex-col items-center gap-4">
          {/* Icon check xanh */}
          <svg
            className="mb-2 h-16 w-16 text-green-500"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="2"
              fill="white"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12l2 2l4-4"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
            />
          </svg>
          <h2 className="mb-2 text-2xl font-semibold text-green-700">
            Đổi mật khẩu thành công!
          </h2>
          <p className="mb-4 text-gray-600">
            Mật khẩu của bạn đã được cập nhật.
            <br />
            Bạn có thể đăng nhập lại với mật khẩu mới.
          </p>
          <Button className="w-full max-w-xs" asChild>
            <Link to={"/"} >
           Quay về trang chủ  </Link>
          </Button>
        </div>
      </Card>
    );

  return (
    <>
      <Card className="mx-auto mt-20 max-w-xl">
        <form onSubmit={handleSubmit}>
          <CardHeader className="p-6">
            <CardTitle>Khôi phục mật khẩu</CardTitle>
            <CardDescription>
              Để đảm bảo an toàn, hãy tạo một mật khẩu mới cho tài khoản.
              <br />
              Mật khẩu nên có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường và
              số.
            </CardDescription>
          </CardHeader>
          <CardContent className="mb-6">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <div className="relative">
                  <Label htmlFor="email">Mật khẩu</Label>
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Mật khẩu mới"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="absolute top-5 right-2 scale-95"
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

                <div className="relative">
                  <Label htmlFor="email">Nhập lại mật khẩu</Label>
                  <Input
                    type={showConfirm ? "text" : "password"}
                    placeholder="Nhập lại mật khẩu"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    required
                  />{" "}
                  <button
                    type="button"
                    className="absolute top-5 right-2 scale-95"
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
            </div>
          </CardContent>
          <CardFooter className="w-full flex-col">
            <Button type="submit" className="w-full" name="changePasswordBtn" disabled={submitting}>
              {submitting ? "Đang đổi mật khẩu..." : "Đổi mật khẩu"}
            </Button>
          </CardFooter>
        </form>    
      </Card>
  
    </>
  );
}
