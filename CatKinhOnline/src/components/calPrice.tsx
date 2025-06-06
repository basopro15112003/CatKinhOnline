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
    <Card className="mx-auto mb-10 max-w-7xl rounded-2xl bg-white p-8 shadow-lg">
      <CardContent>
        <h2 className="mb-6 text-center text-2xl font-bold text-green-700">
          Báo giá kính theo kích thước
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Form nhập liệu */}
          <div>
            <Label htmlFor="glassType">Loại kính</Label>
            <Select
              value={glassType}
              onValueChange={(value) => setGlassType(value)}
            >
              <SelectTrigger id="glassType" className="w-full">
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

            <div className="mt-2 flex space-x-1">
              <div className="w-1/2">
                <Label className="mt-4">Chiều rộng</Label>{" "}
                <Input
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
            <div className="rounded-xl bg-green-50 p-3">
              <p className="text-lg font-medium text-green-700">Tạm tính </p>
              <ul className="list-disc pl-5">
                <li>
                  {quantity} × {glassType} ({width}m × {height}m) x{" "}
                  {found?.price.toLocaleString()} ₫/m² ={" "}
                  {subtotal.toLocaleString()}₫
                </li>
              </ul>
              <p className="mt-2 text-end text-2xl font-bold text-green-900">
                Tổng: {subtotal.toLocaleString()}₫
              </p>
            </div>
   
          </div>
        </div>
                 <Link className="justify-center flex mt-2" to={"/order"}>
              <Button
                className="mt-2 bg-green-800 text-center hover:bg-green-900"
                size="lg"
                type="button"
              >
                Đặt kính ngay
              </Button>
            </Link>
        <p className="mt-6 text-center text-sm text-gray-500">
          * Khách hàng muốn đặt kính vui lòng bấm vào nút "Đặt kính ngay"
        </p>
      </CardContent>
    </Card>
  );
}
