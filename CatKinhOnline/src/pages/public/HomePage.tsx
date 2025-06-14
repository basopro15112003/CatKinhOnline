import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Price } from "@/components/personal/price";
import PriceQuoteCard from "@/components/personal/calPrice";
import { ArrowRight, Calculator, Shield, Star, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

function HomePage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    {
      icon: <Calculator className="h-8 w-8" />,
      title: "Báo giá tự động",
      desc: "Tính toán chi phí nhanh chóng theo diện tích với công nghệ chính xác",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Chất lượng cao",
      desc: "Sử dụng kính nhập khẩu cao cấp, cắt chuẩn xác đến từng mm",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: <Truck className="h-8 w-8" />,
      title: "Giao nhận linh hoạt",
      desc: "Nhận tại cửa hàng hoặc vận chuyển đến tận nhà trong 24h",
      color: "from-purple-500 to-pink-500",
    },
  ];

  const reviews = [
    {
      name: "Anh Trường",
      role: "Chủ cửa hàng nội thất",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7puyx2DAaMt7ejj55Iylp4COOeSf4zPG-mw&s",
      rating: 5,
      comment:
        "Dịch vụ tuyệt vời! Kính chất lượng cao, giao hàng đúng hẹn. Tôi sẽ tiếp tục sử dụng dịch vụ.",
    },
    {
      name: "Chị Huyền",
      role: "Kiến trúc sư",
      img: "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/474053qxl/anh-nguoi-that-cute-nhat_043412774.jpg",
      rating: 5,
      comment:
        "Báo giá nhanh chóng, chính xác. Đội ngũ tư vấn nhiệt tình và chuyên nghiệp.",
    },
    {
      name: "Bạn Hân",
      role: "Nhà thầu xây dựng",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHYtDbL_HuXPvfbfTzOzx7BiMXjQ7PbI9mJw&s",
      rating: 5,
      comment:
        "Giá cả hợp lý, chất lượng vượt mong đợi. Đã hợp tác nhiều dự án với tiệm.",
    },
  ];
  return (
    <>
      <main>
        <section className="relative mx-auto mb-16 max-w-7xl px-4">
          <div className="relative overflow-hidden rounded-3xl shadow-2xl">
            <Carousel className="w-full" plugins={[Autoplay({ delay: 4000 })]}>
              <CarouselContent>
                {[
                  "https://acotecxuanmai.com.vn/storage/du-an/anh-3.jpg",
                  "https://www.gothaibefree.com/wp-content/uploads/2016/01/Pattaya1940x1300.jpg",
                  "https://d2rdhxfof4qmbb.cloudfront.net/wp-content/uploads/20200825140923/iStock-918934132-scaled.jpg",
                ].map((src, idx) => (
                  <CarouselItem key={idx}>
                    <div className="relative h-[500px] overflow-hidden">
                      <img
                        src={src || "/placeholder.svg"}
                        alt={`Banner ${idx + 1}`}
                        className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent"></div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>

            {/* Hero Content Overlay */}
            <div className="absolute inset-0 flex items-center justify-start pl-12">
              <div
                className={`max-w-2xl transform transition-all duration-1000 ${isVisible ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"}`}
              >
                <h2 className="mb-6 text-5xl leading-tight font-bold text-white">
                  Nơi đặt kính
                  <span className="block bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                    nhanh chóng & tiện lợi
                  </span>
                </h2>
                <p className="mb-8 text-xl leading-relaxed text-gray-200">
                  Chọn loại kính, nhập kích thước và nhận báo giá ngay lập tức.
                  Cắt kính chính xác, giao hàng tận nơi hoặc nhận tại cửa hàng.
                </p>
                <div className="flex space-x-4">
                  <Button
                    size="lg"
                    className="transform bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-xl transition-all duration-300 hover:scale-105 hover:from-emerald-700 hover:to-teal-700 hover:shadow-2xl"
                  >
                    Đặt kính ngay
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto mb-16 max-w-7xl px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-4xl font-bold text-gray-800">
              Tại sao chọn chúng tôi?
            </h2>
            <p className="mx-auto max-w-2xl text-xl text-gray-600">
              Chúng tôi cam kết mang đến dịch vụ tốt nhất với công nghệ hiện đại
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {features.map((feature, idx) => (
              <Card
                key={idx}
                className={`group relative transform overflow-hidden border-0 shadow-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${isVisible ? "animate-fade-in-up" : ""}`}
                style={{ animationDelay: `${idx * 200}ms` }}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 transition-opacity duration-300 group-hover:opacity-10`}
                ></div>
                <CardContent className="relative z-10 p-8">
                  <div
                    className={`h-16 w-16 rounded-2xl bg-gradient-to-br ${feature.color} mb-6 flex items-center justify-center text-white transition-transform duration-300 group-hover:scale-110`}
                  >
                    {feature.icon}
                  </div>
                  <h3 className="mb-4 text-2xl font-bold text-gray-800 transition-colors duration-300 group-hover:text-emerald-700">
                    {feature.title}
                  </h3>
                  <p className="leading-relaxed text-gray-600">
                    {feature.desc}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <Price></Price>
        <PriceQuoteCard></PriceQuoteCard>

        <section className="mx-auto mb-16 max-w-7xl px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-4xl font-bold text-gray-800">
              Khách hàng nói gì về chúng tôi?
            </h2>
            <p className="text-xl text-gray-600">
              Hơn 100+ khách hàng tin tưởng và hài lòng
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {reviews.map((review, idx) => (
              <Card
                key={idx}
                className="group transform border-0 bg-gradient-to-br from-white to-emerald-50/30 shadow-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
              >
                <CardContent className="p-8">
                  <div className="mb-6 flex items-center">
                    <img
                      src={review.img || "/placeholder.svg"}
                      alt={review.name}
                      className="h-16 w-16 rounded-full border-4 border-emerald-200 object-cover transition-colors duration-300 group-hover:border-emerald-400"
                    />
                    <div className="ml-4">
                      <h4 className="font-bold text-gray-800">{review.name}</h4>
                      <p className="text-sm text-gray-600">{review.role}</p>
                    </div>
                  </div>

                  <div className="mb-4 flex">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 fill-current text-yellow-400"
                      />
                    ))}
                  </div>

                  <p className="leading-relaxed text-gray-700 italic">
                    "{review.comment}"
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mx-auto mb-12 max-w-7xl  px-4">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d335.7529973570932!2d105.6776721423215!3d9.994594320910576!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a08ec8035be43b%3A0x432cb00910505ce1!2zQ8ahIFPhu58gQ-G7rWEgU-G6r3QgUXXhu5FjIFRodeG6p24!5e1!3m2!1sen!2s!4v1748685293274!5m2!1sen!2s"
            className="w-full rounded-2xl border-emerald-200 border-2 shadow-xl"
            width="600"
            height="300"
            loading="lazy"
          ></iframe>{" "}
        </section>
      </main>
    </>
  );
}
export default HomePage;
