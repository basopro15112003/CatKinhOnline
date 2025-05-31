import { BreadcrumbComponent } from "@/components/breadcrumb";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Price } from "@/components/price";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
function Order() {
  return (
    <>
      <main className="min-h-screen bg-gradient-to-br from-green-100 to-green-300 pt-6">
        <Header></Header>
        <BreadcrumbComponent></BreadcrumbComponent>
        <Price></Price>
        <section className="mx-auto mb-10 h-auto max-w-7xl rounded-2xl bg-white p-12">
          <p className="mb-4 text-xl font-bold text-green-700">Đặt kính ngay</p>
          <form>
            <div className="flex justify-between">
              <p className="mb-2 font-semibold">Loại kính #1</p>
              <Button variant="outline" className="">
                {" "}
                Xóa
              </Button>
            </div>
            <Label className="mb-2">Loại kính</Label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Chọn loại kính" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tempered">Kính cường lực</SelectItem>
                <SelectItem value="frosted">Kính bông</SelectItem>
                <SelectItem value="clear4">Kính trắng 4 ly</SelectItem>
                <SelectItem value="clear5">Kính trắng 5 ly</SelectItem>
                <SelectItem value="clear8">Kính trắng 8 ly</SelectItem>
              </SelectContent>
            </Select>{" "}
            <div className="mt-4 mb-4 flex space-x-2">
              <div className="flex-1">
                <Label className="mb-2">Rộng (m)</Label>
                <Input className="w-full"></Input>
              </div>
              <div className="flex-1">
                <Label className="mb-2">Dài (m)</Label>
                <Input className="w-full"></Input>
              </div>
              <div>
                <Label className="mb-2">Số lượng</Label>
                <Input className="w-20" type="number"></Input>
              </div>
            </div>
            <div className="mb-8 w-full border-1"></div>
            <p className="mb-2 font-semibold">Loại kính #2</p>
            <Label className="mb-2">Loại kính</Label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Chọn loại kính" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tempered">Kính cường lực</SelectItem>
                <SelectItem value="frosted">Kính bông</SelectItem>
                <SelectItem value="clear4">Kính trắng 4 ly</SelectItem>
                <SelectItem value="clear5">Kính trắng 5 ly</SelectItem>
                <SelectItem value="clear8">Kính trắng 8 ly</SelectItem>
              </SelectContent>
            </Select>{" "}
            <div className="mt-4 mb-4 flex space-x-2">
              <div className="flex-1">
                <Label className="mb-2">Rộng (m)</Label>
                <Input className="w-full"></Input>
              </div>
              <div className="flex-1">
                <Label className="mb-2">Dài (m)</Label>
                <Input className="w-full"></Input>
              </div>
              <div>
                <Label className="mb-2">Số lượng</Label>
                <Input className="w-20" type="number"></Input>
              </div>
            </div>
            <div className="mb-2 w-full border-1"></div>
            <Button variant="outline" className="mb-8">
              Thêm loại kính
            </Button>
            {/* Phương thức thanh toán - Start*/}
            <Label className="mb-2">Phương thức nhận hàng</Label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Chọn phương thức thanh toán" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="onShop">Nhận tại cửa hàng</SelectItem>
                <SelectItem value="shipping">Giao hàng tận nơi</SelectItem>
              </SelectContent>
            </Select>{" "}
            {/* Phương thức thanh toán - End*/}
            {/* Phương thức thanh toán - Start*/}
            <Label className="mt-4 mb-2">Phương thức thanh toán</Label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Chọn phương thức thanh toán" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="onShop">Tiền mặt khi nhận</SelectItem>
                <SelectItem value="shipping">Thanh toán trực tuyến</SelectItem>
              </SelectContent>
            </Select>{" "}
            {/* Phương thức thanh toán - End*/}
            <div className="mt-8 w-full rounded-2xl bg-green-50 p-4">
              <p className="mb-2 font-bold text-green-600">Chi tiết tạm tính</p>
              <ul className="list-disc pl-5">
                <li className="mb-2">
                  2 × Kính trắng 5 ly (0.5m × 0.5m) @ 200000₫/m² = 50,000₫
                </li>
                <li className="mb-2">
                  2 × Kính trắng 5 ly (0.5m × 0.5m) @ 200000₫/m² = 50,000₫
                </li>{" "}
                <li className="mb-2">
                  2 × Kính trắng 5 ly (0.5m × 0.5m) @ 200000₫/m² = 50,000₫
                </li>
              </ul>
              <p className="text-end font-bold text-green-800">Tổng: 150,000₫</p>
            </div>
            <Button className="mt-4 w-full">Xác nhận đặt hàng</Button>
          </form>
        </section>
        <Footer></Footer>
      </main>
    </>
  );
}
export default Order;
