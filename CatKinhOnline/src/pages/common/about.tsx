import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import {
  Award,
  CheckCircle,
  Clock,
  Heart,
  MessageSquare,
  Phone,
  Shield,
  Star,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function About() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);
  const stats = [
    {
      number: "10+",
      label: "Năm kinh nghiệm",
      icon: <Clock className="h-6 w-6" />,
    },
    {
      number: "500+",
      label: "Khách hàng hài lòng",
      icon: <Users className="h-6 w-6" />,
    },
    {
      number: "1500+",
      label: "Đơn hàng hoàn thành",
      icon: <CheckCircle className="h-6 w-6" />,
    },
    {
      number: "99%",
      label: "Tỷ lệ hài lòng",
      icon: <Star className="h-6 w-6" />,
    },
  ];
  const values = [
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Chất lượng đảm bảo",
      desc: "Cam kết sử dụng nguyên liệu cao cấp và quy trình sản xuất nghiêm ngặt",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Tận tâm phục vụ",
      desc: "Đặt sự hài lòng của khách hàng lên hàng đầu trong mọi dịch vụ",
      color: "from-pink-500 to-rose-500",
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Nhanh chóng chính xác",
      desc: "Giao hàng đúng hẹn với độ chính xác cao nhất",
      color: "from-yellow-500 to-orange-500",
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: "Không ngừng cải tiến",
      desc: "Luôn cập nhật công nghệ mới để phục vụ khách hàng tốt hơn",
      color: "from-green-500 to-emerald-500",
    },
  ];
  const timeline = [
    {
      year: "2012",
      event: "Thành lập tiệm kính đầu tiên",
      desc: "Bắt đầu với một cửa hàng nhỏ",
    },
    { year: "2015", event: "Mở rộng quy mô", desc: "Đầu tư máy móc hiện đại" },
    {
      year: "2022",
      event: "Mở chi nhánh mới",
      desc: "Phục vụ khách hàng toàn khu vực",
    },
    {
      year: "2025",
      event: "Hiện tại",
      desc: "Dẫn đầu về chất lượng và dịch vụ",
    },
  ];
   const services = [
    {
      title: "Cắt kính cường lực",
      desc: "Kính cường lực cao cấp, độ bền gấp 5-7 lần kính thường, an toàn tuyệt đối",
      img: "https://seacons.vn/wp-content/uploads/2017/07/kinh-cuong-luc.png",
      features: ["Chống va đập", "Chịu nhiệt tốt", "An toàn khi vỡ", "Bảo hành 2 năm"],
      price: "Từ 300,000₫/m²",
    },
    {
      title: "Cắt kính bông",
      desc: "Kính mờ trang trí, tạo không gian riêng tư và thẩm mỹ cao",
      img: "https://www.kinhdapcau.vn/media/k2/items/cache/fd8b0f77d767f1f6640afba6916ff67c_XL.jpg",
      features: ["Tạo riêng tư", "Thẩm mỹ cao", "Dễ vệ sinh", "Đa dạng họa tiết"],
      price: "Từ 250,000₫/m²",
    },
    {
      title: "Cắt kính trắng",
      desc: "Kính trong suốt đa dạng độ dày, phù hợp mọi công trình",
      img: "https://kinhquangtruong.com/wp-content/uploads/2020/09/kinh-trang-5-ly.jpg",
      features: ["Độ trong cao", "Đa dạng độ dày", "Giá cả hợp lý", "Giao hàng nhanh"],
      price: "Từ 200,000₫/m²",
    },
  ]
  return (
    <main>
      <section className="relative mx-auto mb-16 max-w-7xl px-4">
        <div className="mb-12 text-center">
          <Badge className="mb-4 border-emerald-300 bg-emerald-500/20 text-emerald-700">
            <Award className="mr-1 h-4 w-4" />
            Hơn 10 năm kinh nghiệm
          </Badge>
          <h1
            className={`mb-6 transform text-5xl font-bold text-gray-800 transition-all duration-1000 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <p className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Nhôm Kính Quốc Thuần
            </p>
          </h1>
          <p className="mx-auto max-w-3xl text-xl leading-relaxed text-gray-600">
            Chúng tôi tự hào là địa chỉ tin cậy hàng đầu trong lĩnh vực cắt kính
            tại khu vực Thị Trấn Phong Điền, TP. Cần Thơ, với cam kết mang đến
            sản phẩm chất lượng cao và dịch vụ tận tâm.
          </p>
        </div>

        {/* Stats Section */}
        <div className="mb-16 grid grid-cols-2 gap-6 md:grid-cols-4">
          {stats.map((stat, idx) => (
            <Card
              key={idx}
              className={`transform border-0 text-center shadow-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${
                isVisible ? "animate-fade-in-up" : ""
              }`}
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <CardContent className="p-6">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 text-white">
                  {stat.icon}
                </div>
                <h3 className="mb-2 text-3xl font-bold text-emerald-700">
                  {stat.number}
                </h3>
                <p className="font-medium text-gray-600">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="mx-auto mb-16 max-w-7xl px-4">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div>
            <h2 className="mb-6 text-4xl font-bold text-gray-800">
              Câu chuyện của chúng tôi
            </h2>
            <p className="mb-6 text-lg leading-relaxed text-gray-600">
              Bắt đầu từ một cửa hàng nhỏ năm 2003, Nhôm Kính Quốc Thuần đã
              không ngừng phát triển và trở thành một trong những địa chỉ uy tín
              nhất trong lĩnh vực cắt kính tại Cần Thơ.
            </p>
            <p className="mb-8 text-lg leading-relaxed text-gray-600">
              Với đội ngũ kỹ thuật viên giàu kinh nghiệm và hệ thống máy móc
              hiện đại, chúng tôi cam kết mang đến cho khách hàng những sản phẩm
              chất lượng cao nhất.
            </p>

            {/* Timeline */}
            <div className="space-y-4">
              {timeline.map((item, idx) => (
                <div key={idx} className="group flex items-start space-x-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 text-sm font-bold text-white transition-transform duration-300 group-hover:scale-110">
                    {item.year.slice(-2)}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-800 transition-colors duration-300 group-hover:text-emerald-700">
                      {item.event}
                    </h4>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <img
              src="https://wecowindow.com/wp-content/uploads/2024/06/cua-so-nhom-kinh-11.jpg"
              alt="Tiệm Kính Quốc Hoàng"
              className="w-full transform rounded-2xl shadow-2xl transition-transform duration-500 hover:scale-105"
            />
            <div className="absolute -right-6 -bottom-6 flex h-32 w-32 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-xl">
              <div className="text-center">
                <div className="text-2xl font-bold">10+</div>
                <div className="text-sm">Năm</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="mx-auto mb-16 max-w-7xl px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-4xl font-bold text-gray-800">
            Giá trị cốt lõi
          </h2>
          <p className="text-xl text-gray-600">
            Những nguyên tắc định hướng mọi hoạt động của chúng tôi
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {values.map((value, idx) => (
            <Card
              key={idx}
              className="group transform border-0 bg-gradient-to-br from-white to-gray-50/50 shadow-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
            >
              <CardContent className="p-8 text-center">
                <div
                  className={`h-16 w-16 rounded-2xl bg-gradient-to-br ${value.color} mx-auto mb-6 flex items-center justify-center text-white transition-transform duration-300 group-hover:scale-110`}
                >
                  {value.icon}
                </div>
                <h3 className="mb-4 text-xl font-bold text-gray-800 transition-colors duration-300 group-hover:text-emerald-700">
                  {value.title}
                </h3>
                <p className="leading-relaxed text-gray-600">{value.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      {/* Services Section */}
      <section className="mx-auto mb-16 max-w-7xl px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-4xl font-bold text-gray-800">
            Dịch vụ chuyên nghiệp
          </h2>
          <p className="text-xl text-gray-600">
            Đa dạng loại kính với chất lượng cao nhất
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {services.map((service, idx) => (
            <Card
              key={idx}
              className="group transform overflow-hidden border-0 shadow-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
            >
              <div className="relative overflow-hidden">
                <img
                  src={service.img || "/placeholder.svg"}
                  alt={service.title}
                  className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4 rounded-full bg-emerald-500 px-3 py-1 text-sm font-semibold text-white">
                  {service.price}
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="mb-3 text-2xl font-bold text-gray-800 transition-colors duration-300 group-hover:text-emerald-700">
                  {service.title}
                </h3>
                <p className="mb-4 leading-relaxed text-gray-600">
                  {service.desc}
                </p>
                <ul className="mb-6 space-y-2">
                  {service.features.map((feature, featureIdx) => (
                    <li
                      key={featureIdx}
                      className="flex items-center text-sm text-gray-600"
                    >
                      <CheckCircle className="mr-2 h-4 w-4 text-emerald-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-700 hover:to-teal-700">
                  <Link to={"/order"}>
                  Đặt hàng ngay</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="mx-auto mb-16 max-w-7xl px-4">
        <Card className="overflow-hidden border-0 bg-gradient-to-br from-emerald-600 to-teal-600 text-white shadow-2xl">
          <CardContent className="p-12 text-center">
            <h2 className="mb-4 text-4xl font-bold">
              Sẵn sàng bắt đầu dự án của bạn?
            </h2>
            <p className="mb-8 text-xl opacity-90">
              Liên hệ với chúng tôi ngay hôm nay để được tư vấn miễn phí và báo
              giá chi tiết
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                size="lg"
                className="transform bg-white text-emerald-700 shadow-lg transition-all duration-300 hover:scale-105 hover:bg-gray-100 hover:shadow-xl"
              >
                <Phone className="mr-2 h-5 w-5" />
                Gọi ngay: 0939 105 522
              </Button>
                  <Button
                size="lg"
                className="transform bg-white text-emerald-700 shadow-lg transition-all duration-300 hover:scale-105 hover:bg-gray-100 hover:shadow-xl"
              >
                <MessageSquare className="mr-2 h-5 w-5" />
                Gửi tin nhắn
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
