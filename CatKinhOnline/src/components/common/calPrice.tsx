import { useState, useMemo, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Calculator, CheckCircle } from "lucide-react";
import { getProducts, type Product } from "@/services/productService";

export default function PriceQuoteCard() {
  const [product, setProduct] = useState<Product[]>([]);
  // Get Product Data
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getProducts();
        if (response.isSuccess && Array.isArray(response.result)) {
          // kiểm tra xem response có phải là một mảng không
          const filtered = response.result.filter(
            (item: Product) => item.status === 1,
          ); // lọc ra những sản phẩm có status là đang còn hàng
          setProduct(filtered);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
    fetchData();
  }, []);

  // State cho form
  const [glassType, setGlassType] = useState<string>("");
  const [width, setWidth] = useState<string>(""); // lưu dưới dạng string để có thể nhập số thập phân
  const [height, setHeight] = useState<string>("");
  const [quantity, setQuantity] = useState(1);

  const found = product.find((p) => p.id === parseInt(glassType)) || null; // set product prop = glasstype trong select
  const subtotal = useMemo(() => {
    if (!glassType) return 0;
    if (!found) return 0;
    // parseFloat từ chuỗi
    const w = parseFloat(width);
    const h = parseFloat(height);

    if (h <= 0 || w <= 0 || quantity <= 0) return 0;

    // Tính diện tích tổng
    const areaTotal = w * h * quantity;
    // Tạm tính = diện tích * đơn giá
    return Math.round(areaTotal * found.pricePerM2);
  }, [glassType, width, height, quantity, found, product]);
  return (
    <>
      <section className="mx-auto mb-16 max-w-7xl px-1 md:px-4">
        <Card className="overflow-hidden border-0 bg-gradient-to-br from-white to-emerald-50/30 shadow-2xl">
          <CardContent className="mt-2 p-1 md:p-12">
            <div className="mb-10 text-center">
              <h2 className="mb-4 text-4xl font-bold text-gray-800">
                Tính giá kính thông minh
              </h2>
              <p className="text-xl text-gray-600">
                Nhập thông số và nhận báo giá chính xác ngay lập tức
              </p>
            </div>

            <div className="rounded-2xl border border-emerald-100 bg-white p-2 md:p-4 shadow-lg lg:p-8">
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                {/* Form inputs would go here */}
                <div className="col-span-1 space-y-6">
                  <div className="rounded-xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-teal-50 p-8 text-center">
                    <Calculator className="mx-auto mb-4 h-12 w-12 text-emerald-600" />
                    <h3 className="mb-2 text-2xl font-bold text-emerald-800">
                      Báo giá từng loại tức thì
                    </h3>
                    <p className="text-emerald-600">
                      Công nghệ tính toán nhanh chóng & chính xác
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="rounded-xl bg-gradient-to-br from-emerald-600 to-teal-600 p-7 text-white">
                    <h3 className="mb-4 text-2xl font-bold">Ưu đãi đặc biệt</h3>
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <CheckCircle className="mr-2 h-5 w-5" />
                        Miễn phí tư vấn thiết kế
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="mr-2 h-5 w-5" />
                        Bảo hành 2 năm
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="mr-2 h-5 w-5" />
                        Giao hàng miễn phí nội thành
                      </li>
                    </ul>
                  </div>
                </div>
              </div>{" "}
              <div className="mt-6 rounded-xl border border-emerald-200 p-4 md:p-8 text-center">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                  {/* Form nhập liệu */}
                  <div>
                    <Label htmlFor="glassType" className="mb-1">
                      Loại kính
                    </Label>
                    <Select
                      value={glassType}
                      onValueChange={(value) => setGlassType(value)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Chọn loại kính" />
                      </SelectTrigger>
                      <SelectContent className="border-2 border-emerald-200">
                        {product.map((type) => (
                          <SelectItem key={type.id} value={type.id.toString()}>
                            <div className="flex w-full items-center justify-between">
                              <span>{type.productName}</span>
                              <span className="ml-4 font-semibold text-emerald-600">
                                {type.pricePerM2.toLocaleString()}
                                ₫/m²
                              </span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <div className="mt-2 flex space-x-1">
                      <div className="w-full">
                        <Label className="mt-4">Chiều rộng</Label>
                        <Input
                          className="border-2 focus:border-emerald-200"
                          id="width"
                          placeholder="Rộng"
                          value={width}
                          type="number"
                          min={0.1}
                          max={2.7}
                          onChange={(e) => {
                            let value = Number(e.target.value);
                            if (value > 2.7) value = 2.7;
                            if (value < 0.1) value = 0.1;
                            value = Math.round(value * 1000) / 1000;
                            setWidth(value.toString());
                          }}
                        />
                      </div>
                      <div className="w-full">
                        <Label className="mt-4" htmlFor="dimensions">
                          Chiều dài
                        </Label>
                        <Input
                          id="height"
                          placeholder="Dài"
                          min={0.1}
                          max={4.8}
                          type="number"
                          value={height}
                          onChange={(e) => {
                            let value = Number(e.target.value);
                            if (value > 4.8) value = 4.8;
                            if (value < 0.1) value = 0.1;
                            value = Math.round(value * 1000) / 1000;
                            setHeight(value.toString());
                          }}
                        />
                      </div>
                      <div>
                        <Label className="mt-4" htmlFor="quantity">
                          Số lượng
                        </Label>
                        <Input
                          id="quantity"
                          type="number"
                          className="w-14 md:w-full"
                          value={quantity}
                          onChange={(e) => {
                            let value = Number(e.target.value);
                            if (value > 101) value = 101;
                            if (value < 1) value = 1;
                            setQuantity(value);
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Hiển thị tạm tính & nút */}
                  <div className="flex flex-col justify-between">
                    <div className="mt-4 rounded-xl bg-gradient-to-tl from-emerald-50 to-teal-100 p-3">
                      <p className="text-start text-lg font-medium text-green-700">
                        Tạm tính{" "}
                      </p>
                      <p className="text-start text-sm md:text-base">
                        {quantity} × {glassType} ({width}m × {height}m) x{" "}
                        {found?.pricePerM2.toLocaleString()} ₫/m² ={" "}
                        {subtotal.toLocaleString()}₫
                      </p>
                      <p className="text-sx mt-2 text-end font-bold text-green-900 md:text-xl">
                        Tổng: {subtotal.toLocaleString()}₫
                      </p>
                    </div>
                  </div>
                </div>
                <Link className="mt-6 flex justify-center" to={"/order"}>
                  <Button
                    className="bg-gradient-to-r from-green-600 to-green-800 text-center text-white shadow-lg transition-all duration-300 hover:scale-105 hover:from-emerald-700 hover:to-teal-700 hover:shadow-xl"
                    size="lg"
                    type="button"
                  >
                    Đặt kính ngay
                  </Button>
                </Link>
                <p className="mt-4 md:mt-6 text-center text-xs md:text-sm text-gray-500 italic">
                  * Bảng này dùng để báo giá theo từng loại kính, nếu quý khách
                  hàng muốn đặt kính vui lòng bấm vào nút "Đặt kính ngay"
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </>
  );
}
