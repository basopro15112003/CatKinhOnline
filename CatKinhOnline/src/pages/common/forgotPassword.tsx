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
import React, { useState } from "react";

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await fetch("https://localhost:7057/api/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    setSent(true);
    setCooldown(60); // 60 giây cooldown
    setSubmitting(false);
  };
  // Đếm ngược cooldown
  React.useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldown]);
  return (
    <>
      <Card className="">
        <form onSubmit={handleSubmit}>
          <CardHeader className="p-6">
            <CardTitle>Quên mật khẩu?</CardTitle>
            <CardDescription>
              Nhập email của bạn vào ô ở bên dưới để lấy lại mật khẩu{" "}
            </CardDescription>
          </CardHeader>
          <CardContent className="mb-6 px-6">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="text"
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@gmail.com"
                    required
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex-col gap-2 px-6 pb-6">
          <Button type="submit" className="w-full" disabled={cooldown > 0 || submitting}>
            {submitting ? "Đang gửi..." : cooldown > 0 ? `Vui lòng chờ ${cooldown}s...` : "Lấy lại mật khẩu"}
          </Button>
              {sent && (
            <div className="text-green-600 mt-2 text-center">
              Nếu email tồn tại, hướng dẫn đã được gửi đến email của bạn.
            </div>
          )}
          </CardFooter>
        </form>
      </Card>
    </>
  );
}
