import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function Price() {
  type GlassType = "tempered" | "frosted" | "clear4" | "clear5" | "clear8";

  const PRICE_MAP: Record<GlassType, number> = {
    tempered: 500000,
    frosted: 150000,
    clear4: 135000,
    clear5: 157000,
    clear8: 240000,
  };

  const GLASS_NAMES: Record<GlassType, string> = {
    tempered: "Kính cường lực",
    frosted: "Kính bông",
    clear4: "Kính trắng 4 ly",
    clear5: "Kính trắng 5 ly",
    clear8: "Kính trắng 8 ly",
  };

  return (
    <>
      <section className="mx-auto mb-12 max-w-7xl">
        <Card className="rounded-2xl bg-white p-6 shadow-lg">
          <CardContent>
            <h2 className="mb-6 text-center text-2xl font-bold text-green-700">
              Bảng giá kính
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {(Object.keys(PRICE_MAP) as GlassType[]).map((type, idx) => (
                <div key={idx} className="rounded-xl border bg-green-50 p-4">
                  <h3 className="text-lg font-semibold text-green-800">
                    {GLASS_NAMES[type]}
                  </h3>
                  <p className="mt-2 text-green-600">
                    Giá: {PRICE_MAP[type].toLocaleString()}₫/m²
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
