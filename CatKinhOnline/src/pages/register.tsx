import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function Register({setShowForm}) {
  return (       
     <>
          <Card className="">
            <form>
              <CardHeader className="p-6">
                <CardTitle >Đăng ký </CardTitle>
                <CardDescription>Nếu như bạn chưa có tài khoản đăng ký tài khoản tại đây</CardDescription>
              </CardHeader>
              <CardContent className="px-6 mb-6">
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="fullname">Họ tên</Label>
                    <Input id="fullname" type="text" placeholder="quochoangnguyen2003ct@example.com" required />
                  </div>
                     <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="" required />
                  </div>
                    <div className="grid gap-2">
                    <Label htmlFor="username">Tên đăng nhập</Label>
                    <Input id="username" type="username" placeholder="" required />
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="password">Mật khẩu</Label>
                    </div>
                    <Input id="password" type="password"  />
                  </div>
                   <div className="grid gap-2 mb-2">
                    <div className="flex items-center">
                      <Label htmlFor="password">Xác nhận mật khẩu</Label>
                    </div>
                    <Input id="password" type="password"  />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex-col gap-2 px-6 pb-6">
                <Button type="submit" className="w-full">Đăng ký</Button>
                <Button variant="ghost" className="w-full text-sm text-gray-500" onClick={() => setShowForm(false)}>Huỷ</Button>
              </CardFooter>

              {/* Phương thức thanh toán */}
              <Label></Label>
            </form>
          </Card>
        </>
  )
}