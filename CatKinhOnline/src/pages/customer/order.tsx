import { BreadcrumbComponent } from "@/components/personal/breadcrumb";
import { Footer } from "@/components/personal/footer";
import { Header } from "@/components/personal/header";
import NavigationComponent from "@/components/personal/navigation";
import { Price } from "@/components/personal/price";
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
import { useState } from "react";
function Order() {
  const [glassItems, setGlassItems] = useState([1]); // đầu tiên phải có 1 loại kính trước

  const handleAddGlassItem = () => {
    setGlassItems((prev) => [...prev, prev.length + 1]);
  };

  const handleRemoveGlassItem = () => {
    setGlassItems((prev) => prev.slice(0, -1)); // slice từ 0 , -1  là sẽ lấy tất cả phần tử trừ phần tử cuối
  };
  return (
    <>
      <main className="min-h-screen bg-gradient-to-br from-green-100 to-green-300 ">
        <Header></Header>
        <NavigationComponent></NavigationComponent>
        <BreadcrumbComponent></BreadcrumbComponent>
        <Price></Price>
        <section className="mx-auto mb-10 h-auto max-w-7xl rounded-2xl bg-white p-12">
          <p className="mb-4 text-xl font-bold text-green-700">Đặt kính ngay</p>
          <form>
             {glassItems.map((item,index) => (
              <div key={index} className="mb-8 border-b pb-4">
                <div className="flex justify-between">
                  <p className="mb-2 font-semibold">Loại kính #{index + 1}</p>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleRemoveGlassItem}
                  >
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
                </Select>
                <div className="mt-4 mb-4 flex space-x-2">
                  <div className="flex-1">
                    <Label className="mb-2">Rộng (m)</Label>
                    <Input className="w-full" />
                  </div>
                  <div className="flex-1">
                    <Label className="mb-2">Dài (m)</Label>
                    <Input className="w-full" />
                  </div>
                  <div>
                    <Label className="mb-2">Số lượng</Label>
                    <Input className="w-20" type="number" />
                  </div>
                </div>
              </div>
            ))}
            {/* Add new grass element */}
            <Button
              type="button"
              variant="outline"
              className="mb-8"
              onClick={handleAddGlassItem}
            >
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
