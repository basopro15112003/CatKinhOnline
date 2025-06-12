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
type props = {
  setShowForm: (value: boolean) => void;
};
export function Login({ setShowForm }: props) {
    const BE_LOGIN = `https://localhost:7057/api/auth/login?returnUrl=${encodeURIComponent("/auth/callback")}`;

  return (
    <>
      <Card className="">
        <form>
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
                  type="email"
                  placeholder="quochoangnguyen2003ct@example.com"
                  required
                />
              </div>
              <div className="mb-2 grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Mật khẩu</Label>
                  <a
                    href="#"
                    className="ml-auto text-sm underline hover:underline-offset-2"
                  >
                    Quên mật khẩu?
                  </a>
                </div>
                <Input id="password" type="password" />
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
              className="w-full text-sm bg-gray-200 hover:bg-gray-300"
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
