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
        const response = await getProducts(); // expected shape: { result: Product[] }
        setProduct(response);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <section className="mx-auto mb-12 max-w-7xl">
        <Card className="rounded-2xl bg-white p-6 shadow-lg">
          <CardContent>
            <h2 className="mb-6 text-center text-2xl font-bold text-green-700">
              Bảng giá kính
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {product.map((product, id) => (
                <div key={id} className="rounded-xl border bg-green-50 p-4">
                  <h3 className="text-lg font-semibold text-green-800">
                    {product.productName}
                  </h3>
                  <p className="mt-2 text-green-600">
                    Giá: {product.pricePerM2.toLocaleString()}₫/m²
                  </p>
                </div>
              ))}
            </div>
            {location.pathname === "/CatKinhOnline/order" ? null : (
              <Button className="mx-auto mt-8 flex items-center justify-center bg-green-800 text-center hover:bg-green-900">
                <Link to="/order" className="w-full text-center text-white">
                  Đặt kính ngay
                </Link>
              </Button>
            )}

            <p className="mt-6 text-center text-sm text-gray-500">
              * Giá có thể thay đổi theo khu vực hoặc khối lượng đơn hàng
            </p>
          </CardContent>
        </Card>
      </section>
    </>
  );
}
