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


interface RegisterProps {
  setShowLogin: (value: boolean) => void;
  setShowRegister: (value: boolean) => void;
}
export function Register({setShowRegister,setShowLogin}: RegisterProps) {
  
  return (       
     <>
    <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50">
          <Card className="w-full max-w-xl">
            <form>
              <CardHeader className="p-6">
                <CardTitle className="text-2xl">Đăng ký </CardTitle>
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
                 <CardDescription>Nếu như bạn đã có tài khoản hãy "<span className="text-blue-800 hover:underline hover:text-blue-900 cursor-pointer"  onClick={() => {setShowLogin(true); setShowRegister(false)}}> đăng nhập </span> " tại đây</CardDescription>
              </CardContent>
              <CardFooter className="flex-col gap-2 px-6 pb-6">
                <Button type="submit" className="w-full">Đăng ký</Button>
                <Button variant="ghost" className="w-full text-sm text-gray-500" onClick={() => setShowRegister(false)}>Huỷ</Button>
              </CardFooter>
            </form>
          </Card>
        </div>
        </>
  )
}