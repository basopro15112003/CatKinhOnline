import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProducts, type Product } from "@/services/productService";
import { Skeleton } from "../ui/skeleton";

export function Price() {
  const [product, setProduct] = useState<Product[]>([]);
  const [loadingSkeleton, setLoadingSkeleton] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoadingSkeleton(true);
        const response = await getProducts();
        if (response.isSuccess && Array.isArray(response.result)) {
          // kiểm tra xem response có phải là một mảng không
          const filtered = response.result.filter(
            (item: Product) => item.status === 1,
          ); // lọc ra những sản phẩm có status là đang còn hàng
          setProduct(filtered);
          setTimeout(() => {
            setLoadingSkeleton(false);
          }, 2000);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <section className="mx-auto mb-12 max-w-7xl px-1 md:px-4">
        <Card className="rounded-2xl bg-gradient-to-br from-white to-emerald-50/30 shadow-lg md:p-6">
          <h2 className="mb-8 text-center text-4xl font-bold text-gray-800">
            Bảng giá kính
          </h2>
          {loadingSkeleton ? (
            <>
              <CardContent> 
                {" "}
                <div className="mb-29 grid w-full grid-cols-1 gap-2 sm:grid-cols-2 md:w-auto md:gap-4">
                  {Array.from({ length: 8 }).map((_, index) => (
                    <Skeleton key={index} className="h-23 rounded-2xl bg-green-200"></Skeleton>
                  ))}
                </div>
              </CardContent>
            </>
          ) : (
            <>
              {" "}
              <CardContent>
                <div className="grid w-full grid-cols-1 gap-2 sm:grid-cols-2 md:w-auto md:gap-4">
                  {product.map((product, id) => (
                    <div
                      key={id}
                      className="rounded-xl border border-emerald-400 bg-white/60 p-2 shadow-lg shadow-emerald-100 md:p-4"
                    >
                      <p className="text-lg font-semibold text-black">
                        {product.productName}
                      </p>
                      <p className="text-green-900 md:mt-2">
                        Giá: {product.pricePerM2.toLocaleString()}₫/m²
                      </p>
                    </div>
                  ))}
                </div>
                {location.pathname === "/CatKinhOnline/order" ? null : (
                  <Link to="/order" className="w-full text-center text-white">
                    <Button
                      className="mx-auto mt-6 flex bg-gradient-to-r from-green-600 to-green-800 text-center text-white shadow-lg transition-all duration-300 hover:scale-105 hover:from-emerald-700 hover:to-teal-700 hover:shadow-xl"
                      size="lg"
                      type="button"
                    >
                      Đặt kính ngay
                    </Button>{" "}
                  </Link>
                )}

                <p className="mt-6 text-center text-sm text-gray-500 italic">
                  * Giá có thể thay đổi theo khu vực hoặc khối lượng đơn hàng
                </p>
              </CardContent>
            </>
          )}
        </Card>
      </section>
    </>
  );
}
