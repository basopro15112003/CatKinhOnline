import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProducts, type Product } from "@/services/productService";

export function Price() {
  const [product, setProduct] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getProducts();
        const filtered = response.filter((item) => item.status === 1); // lọc ra những sản phẩm có status là đang còn hàng
        setProduct(filtered);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <section className="mx-auto mb-12 max-w-7xl px-4">
        <Card className="rounded-2xl bg-white p-6 shadow-lg">
          <CardContent>
            <h2 className="mb-8 text-center text-4xl font-bold text-gray-800">
              Bảng giá kính
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {product.map((product, id) => (
                <div
                  key={id}
                  className="rounded-xl border border-emerald-200 bg-green-50 p-4 shadow-lg shadow-emerald-100"
                >
                  <h4 className="text-lg font-semibold text-green-800">
                    {product.productName}
                  </h4>
                  <p className="mt-2 text-green-600">
                    Giá: {product.pricePerM2.toLocaleString()}₫/m²
                  </p>
                </div>
              ))}
            </div>
            {location.pathname === "/CatKinhOnline/order" ? null : (
              <Button
                className="mx-auto mt-6 flex bg-gradient-to-r from-green-600 to-green-800 text-center text-white shadow-lg transition-all duration-300 hover:scale-105 hover:from-emerald-700 hover:to-teal-700 hover:shadow-xl"
                size="lg"
                type="button"
              >
                <Link to="/order" className="w-full text-center text-white">
                  Đặt kính ngay
                </Link>
              </Button>
            )}

            <p className="mt-6 text-center text-sm text-gray-500 italic">
              * Giá có thể thay đổi theo khu vực hoặc khối lượng đơn hàng
            </p>
          </CardContent>
        </Card>
      </section>
    </>
  );
}
