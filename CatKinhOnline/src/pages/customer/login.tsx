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

export function Login({setShowForm}) {
  return (
    <>
          <Card className="">
            <form>
              <CardHeader className="p-6">
                <CardTitle>Đăng nhập vào tài khoản của bạn</CardTitle>
                <CardDescription>Nhập email của bạn vào ô ở bên dưới để đăng nhập vào tài khoản </CardDescription>
              </CardHeader>
              <CardContent className="px-6 mb-6">
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Tài khoản</Label>
                    <Input id="email" type="email" placeholder="quochoangnguyen2003ct@example.com" required />
                  </div>
                  <div className="grid gap-2 mb-2">
                    <div className="flex items-center">
                      <Label htmlFor="password">Mật khẩu</Label>
                      <a href="#" className="ml-auto text-sm underline hover:underline-offset-2">Quên mật khẩu?</a>
                    </div>
                    <Input id="password" type="password"  />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex-col gap-2 px-6 pb-6">
                <Button type="submit" className="w-full">Đăng nhập</Button>
                <Button variant="outline" className="w-full">Đăng nhập với Google</Button>
                <Button variant="ghost" className="w-full text-sm text-gray-500" onClick={() => setShowForm(false)}>Huỷ</Button>
              </CardFooter>
            </form>
          </Card>
         </>
  )
}