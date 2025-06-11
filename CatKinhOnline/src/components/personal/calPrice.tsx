import React, { useState, useMemo } from "react";
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

export default function PriceQuoteCard() {
  type Product = { product: string; price: number };
  const products: Product[] = useMemo(
    () => [
      { product: "tempered", price: 300000 },
      { product: "frosted", price: 250000 },
      { product: "clear4", price: 200000 },
      { product: "clear5", price: 220000 },
      { product: "clear8", price: 260000 },
    ],
    [],
  );

  // State cho form
  const [glassType, setGlassType] = useState<string>("");
  const [width, setWidth] = useState<string>(""); // lưu dưới dạng string để có thể nhập số thập phân
  const [height, setHeight] = useState<string>("");
  const [quantity, setQuantity] = useState(1);

  const found = products.find((p) => p.product === glassType) || null; // set product prop = glasstype trong select
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
    return Math.round(areaTotal * found.price);
  }, [glassType, width, height, quantity, found, products]);
  return (
    <>
      <section className="mx-auto mb-16 max-w-7xl px-4">
        <Card className="overflow-hidden border-0 bg-gradient-to-br from-white to-emerald-50/30 shadow-2xl">
          <CardContent className="p-12">
            <div className="mb-10 text-center">
              <h2 className="mb-4 text-4xl font-bold text-gray-800">
                Tính giá kính thông minh
              </h2>
              <p className="text-xl text-gray-600">
                Nhập thông số và nhận báo giá chính xác ngay lập tức
              </p>
            </div>

            <div className="rounded-2xl border border-emerald-100 bg-white p-8 shadow-lg">
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                {/* Form inputs would go here */}
                <div className="space-y-6">
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
                  <div className="rounded-xl bg-gradient-to-br from-emerald-600 to-teal-600 p-6 text-white">
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

                <div className="col-span-2">
                  <div className="rounded-xl border border-emerald-200 p-8 text-center">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      {/* Form nhập liệu */}
                      <div>
                        <Label htmlFor="glassType">Loại kính</Label>
                        <Select
                          value={glassType}
                          onValueChange={(value) => setGlassType(value)}
                        >
                          <SelectTrigger id="glassType" className="w-full" >
                            <SelectValue placeholder="Chọn loại kính" />
                          </SelectTrigger>
                          <SelectContent className="border-2 border-emerald-200">
                            <SelectItem value="tempered" >
                              Kính cường lực
                            </SelectItem>
                            <SelectItem value="frosted">Kính bông</SelectItem>
                            <SelectItem value="clear4">
                              Kính trắng 4 ly
                            </SelectItem>
                            <SelectItem value="clear5">
                              Kính trắng 5 ly
                            </SelectItem>
                            <SelectItem value="clear8">
                              Kính trắng 8 ly
                            </SelectItem>
                          </SelectContent>
                        </Select>

                        <div className="mt-2 flex space-x-1">
                          <div className="w-1/2">
                            <Label className="mt-4" >Chiều rộng</Label>{" "}
                            <Input className="border-2 focus:border-emerald-200"
                              id="width"
                              placeholder="Rộng"
                              value={width}
                              onChange={(e) => setWidth(e.target.value)}
                            />
                          </div>
                          <div className="w-1/2">
                            <Label className="mt-4" htmlFor="dimensions">
                              Chiều dài
                            </Label>
                            <Input
                              id="height"
                              placeholder="Dài"
                              value={height}
                              onChange={(e) => {
                                setHeight(e.target.value);
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
                              min={1}
                              className="w-20"
                              value={quantity}
                              onChange={(e) => {
                                const v = parseInt(e.target.value, 10);
                                setQuantity(isNaN(v) || v < 1 ? 1 : v);
                              }}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Hiển thị tạm tính & nút */}
                      <div className="flex flex-col justify-between">
                        <div className="rounded-xl bg-gradient-to-tl from-emerald-50 to-teal-100 p-3">
                          <p className="text-start text-lg font-medium text-green-700">
                            Tạm tính{" "}
                          </p>
                            <p className="text-start">
                              {quantity} × {glassType} ({width}m × {height}m) x{" "}
                              {found?.price.toLocaleString()} ₫/m² ={" "}
                              {subtotal.toLocaleString()}₫
                            </p>
                          <p className="mt-2 text-end text-xl font-bold text-green-900">
                            Tổng: {subtotal.toLocaleString()}₫
                          </p>
                        </div>
                      </div>
                    </div>
                    <Link className="mt-6 flex justify-center" to={"/order"}>
                      <Button
                        className=" bg-gradient-to-r from-green-600 to-green-800 text-center text-white shadow-lg transition-all duration-300 hover:scale-105 hover:from-emerald-700 hover:to-teal-700 hover:shadow-xl"
                        size="lg"
                        type="button"
                      >
                        Đặt kính ngay
                      </Button>
                    </Link>
                    <p className="mt-6 text-center text-sm text-gray-500">
                      * Khách hàng muốn đặt kính vui lòng bấm vào nút "Đặt kính
                      ngay"
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </>
  );
}
