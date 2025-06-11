import { Header } from "@/components/personal/header";
import { Footer } from "@/components/personal/footer";
import { BreadcrumbComponent } from "@/components/personal/breadcrumb";
import { Card, CardContent } from "@/components/ui/card";
import NavigationComponent from "@/components/personal/navigation";

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-200 to-green-300 ">
      <Header></Header><NavigationComponent></NavigationComponent>
      <BreadcrumbComponent></BreadcrumbComponent>

      {/* About Section */}
      <section className="bg-gradient-to-br from-green-100 to-green-200 py-16">
        <div className="mx-auto grid max-w-5xl grid-cols-1 items-center gap-8 md:grid-cols-2">
          <div>
            <h2 className="mb-4 text-4xl font-bold text-green-800">
              Về Chúng Tôi
            </h2>
            <p className="mb-4 text-gray-700">
              Tiệm Kính Quốc Hoàng tự hào là địa chỉ tin cậy trong lĩnh vực cắt
              kính tại TP. Cần Thơ. Với hơn 20 năm kinh nghiệm, chúng tôi cam
              kết mang đến cho bạn những sản phẩm kính chất lượng cao, cắt chuẩn
              xác và dịch vụ tận tâm.
            </p>
            <p className="text-gray-700">
              Đội ngũ kỹ thuật viên giàu kinh nghiệm cùng hệ thống máy móc hiện
              đại giúp chúng tôi hoàn thành đơn hàng nhanh chóng và chính xác.
              Hãy để Kính Quốc Hoàng đồng hành cùng ngôi nhà và công trình của
              bạn.
            </p>
          </div>
          <img
            src="https://wecowindow.com/wp-content/uploads/2024/06/cua-so-nhom-kinh-11.jpg"
            alt="Tiệm Kính Quốc Hoàng"
            className="h-auto w-full rounded-xl shadow-lg"
          />
        </div>
      </section>

      {/* Services Section */}
      <section className=" bg-gradient-to-br from-green-200 to-green-300 py-16">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-8 text-center text-3xl font-bold text-green-800">
            Dịch vụ của chúng tôi
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                title: "Cắt kính cường lực",
                desc: "Đảm bảo độ bền và an toàn.",
                img: "https://seacons.vn/wp-content/uploads/2017/07/kinh-cuong-luc.png",
              },
              {
                title: "Cắt kính bông",
                desc: "Phù hợp trang trí và sử dụng nội thất.",
                img: "https://www.kinhdapcau.vn/media/k2/items/cache/fd8b0f77d767f1f6640afba6916ff67c_XL.jpg",
              },
              {
                title: "Cắt kính trắng",
                desc: "Đa dạng độ dày 4ly, 5ly, 8ly.",
                img: "https://kinhquangtruong.com/wp-content/uploads/2020/09/kinh-trang-5-ly.jpg",
              },
            ].map((item, idx) => (
              <Card key={idx} className="overflow-hidden rounded-xl shadow-md">
                <img
                  src={item.img}
                  alt={item.title}
                  className="h-50 w-100 rounded-2xl  scale-90  object-cover"
                />
                <CardContent>
                  <h3 className="mb-2 text-xl font-semibold text-green-700">
                    {item.title}
                  </h3>
                  <p className="text-gray-600">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer></Footer>
    </div>
  );
}
