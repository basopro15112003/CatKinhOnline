import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const PRICE_MAP = {
  tempered: 500000,
  frosted: 150000,
  clear4: 135000,
  clear5: 157000,
  clear8: 240000,
};

const GLASS_NAMES = {
  tempered: "Kính cường lực",
  frosted: "Kính bông",
  clear4: "Kính trắng 4 ly",
  clear5: "Kính trắng 5 ly",
  clear8: "Kính trắng 8 ly",
};
function HomePage() {
  return (
    <>
      <main className="min-h-screen bg-gradient-to-br from-green-100 to-green-300 pt-6">
        <header className="items-center justify-between flex h-15 max-w-7xl mx-auto">
          <p className="text-4xl  font-extrabold text-green-800">
            Tiệm kính Quốc Hoàng
          </p>
          {/* <div className="flex space-x-4">
            <a href=""  className="text-black hover:text-blue-800 hover:underline">
              Trang chủ
            </a>
             <a href=""  className="text-black hover:text-blue-800 hover:underline">
              Đặt hàng
            </a>
          </div> */}
          <Button variant="outline" className="">
            <Link to="/login">Đăng nhập</Link>
          </Button>
        </header>

        <section className=" relative  mt-10 mx-auto text-center rounded-2xl overflow-hidden">
          <Carousel
            className="w-7xl mx-auto  overflow-hidden rounded-2xl"
            plugins={[
              Autoplay({
                delay: 2000,
              }),
            ]}
          >
            <CarouselContent>
              <CarouselItem className="">
                <img
                  src="https://acotecxuanmai.com.vn/storage/du-an/anh-3.jpg"
                  alt="Banner"
                  className="w-full h-120 object-cover "
                />
              </CarouselItem>
              <CarouselItem>
                {" "}
                <img
                  src="https://www.gothaibefree.com/wp-content/uploads/2016/01/Pattaya1940x1300.jpg"
                  alt="Banner"
                  className="w-full h-120 object-cover "
                />
              </CarouselItem>
              <CarouselItem>
                {" "}
                <img
                  src="https://d2rdhxfof4qmbb.cloudfront.net/wp-content/uploads/20200825140923/iStock-918934132-scaled.jpg"
                  alt="Banner"
                  className="w-full h-120 object-cover "
                />
              </CarouselItem>
            </CarouselContent>
          </Carousel>
          <div className="absolute top-0 right-0 left-0 items-center justify-center mt-50">
            <h2 className="text-3xl font-extrabold text-white mb-4">
              Nơi đặt kính nhanh chóng & tiện lợi
            </h2>
            <p className="text-lg text-white font-extrabold">
              Chọn loại kính, nhập kích thước và nhận báo giá ngay lập tức. Cắt
              kính chính xác, giao hàng tận nơi hoặc nhận tại cửa hàng.
            </p>
          </div>
        </section>
        <section className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 mt-10">
          {[
            {
              title: "Báo giá tự động",
              desc: "Tính toán chi phí nhanh chóng theo diện tích",
            },
            {
              title: "Chất lượng cao",
              desc: "Sử dụng kính nhập khẩu, cắt chuẩn xác",
            },
            {
              title: "Giao nhận linh hoạt",
              desc: "Nhận tại cửa hàng hoặc vận chuyển đến tận nhà",
            },
          ].map((item, idx) => (
            <Card
              key={idx}
              className="rounded-2xl shadow-md p-10 bg-white relative overflow-hidden"
            >
              <CardContent>
                <h3 className="text-xl font-semibold text-green-700 mb-2">
                  {item.title}
                </h3>
                <p className="text-green-600">{item.desc}</p>
              </CardContent>
            </Card>
          ))}
        </section>

        <section className="max-w-7xl mx-auto mb-12">
          <Card className="rounded-2xl shadow-lg p-6 bg-white">
            <CardContent>
              <h2 className="text-2xl font-bold mb-6 text-green-700 text-center">
                Bảng giá kính
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {Object.keys(PRICE_MAP).map((type, idx) => (
                  <div key={idx} className="border rounded-xl p-4 bg-green-50">
                    <h3 className="text-lg font-semibold text-green-800">
                      {GLASS_NAMES[type]}
                    </h3>
                    <p className="text-green-600 mt-2">
                      Giá: {PRICE_MAP[type].toLocaleString()}₫/m²
                    </p>
                  </div>
                ))}
              </div>
              <Button className="mx-auto mt-8 flex items-center justify-center text-center bg-green-800 hover:bg-green-900">
                {" "}
                Đặt kính ngay
              </Button>
              <p className="text-sm text-gray-500 mt-6 text-center">
                * Giá có thể thay đổi theo khu vực hoặc khối lượng đơn hàng
              </p>
            </CardContent>
          </Card>
        </section>

        <section className="max-w-7xl mx-auto mb-12">
          <h2 className="text-2xl font-bold text-green-800 mb-6 text-center">
            Khách hàng nói gì về dịch vụ của chúng tôi?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Anh Minh",
                img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7puyx2DAaMt7ejj55Iylp4COOeSf4zPG-mw&s",
              },
              {
                name: "Chị Hoa",
                img: "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/474053qxl/anh-nguoi-that-cute-nhat_043412774.jpg",
              },
              {
                name: "Anh Tuấn",
                img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHYtDbL_HuXPvfbfTzOzx7BiMXjQ7PbI9mJw&s",
              },
            ].map((item, idx) => (
              <Card key={idx} className="rounded-2xl shadow-sm p-6 bg-white">
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-12 h-12 rounded-full  mx-auto"
                />
                <CardContent>
                  <p className="italic text-green-600">
                    "Dịch vụ nhanh, chất lượng kính tuyệt vời!"
                  </p>
                  <p className="mt-4 font-semibold text-green-700 text-center">
                    - {item.name}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
        <section className="max-w-7xl rounded-2xl overflow-hidden mx-auto mb-12">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d335.7529973570932!2d105.6776721423215!3d9.994594320910576!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a08ec8035be43b%3A0x432cb00910505ce1!2zQ8ahIFPhu58gQ-G7rWEgU-G6r3QgUXXhu5FjIFRodeG6p24!5e1!3m2!1sen!2s!4v1748685293274!5m2!1sen!2s"
            className="w-full"
            width="600"
            height="250"
            loading="lazy"
          ></iframe>{" "}
        </section>
        <footer className="bg-green-800 text-white py-8">
          <div className="max-w-7xl rounded-2xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <h3 className="text-2xl font-semibold mb-4">
                Tiệm kính Quốc Hoàng
              </h3>
              <p className="flex items-center gap-2 text-sm mb-2">
                <MapPin size={20} />
                227 Phong Điền, TP Cần Thơ, Việt Nam
              </p>
              <p className="flex items-center gap-2 text-sm mb-2">
                <Mail size={20} /> quochoangnguyen2003ct@gmail.com
              </p>
              <p className="flex items-center gap-2 text-sm mb-2">
                <Phone size={20} /> 0901 234 567
              </p>
            </div>

            <div>
              <h4 className="text-2xl font-semibold mb-4 ">Liên kết</h4>
              <ul className="space-y-1 text-sm">
                <li className="mb-2">
                  <a href="#" className="hover:underline">
                    Giới thiệu
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="hover:underline">
                    Liên hệ
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="hover:underline">
                    Chính sách bảo mật
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-2xl font-semibold mb-4 ">Tài khoản</h4>
              <ul className="space-y-1 text-base">
                <li className="mb-2">
                  <a href="#" className="hover:underline">
                    Đăng nhập
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="hover:underline">
                    Đặt Đơn
                  </a>
                </li>
              </ul>
            </div>
            <div className="">
              <h4 className="text-2xl font-semibold mb-4">
                Kết nối với chúng tôi
              </h4>
              <div className="flex space-x-4">
                <a href="#" aria-label="Facebook">
                  <Facebook size={20} />
                </a>
                <a href="#" aria-label="Instagram">
                  <Instagram size={20} />
                </a>
                <a href="#" aria-label="Twitter">
                  <Twitter size={20} />
                </a>
              </div>
            </div>
          </div>

          <div className="text-center text-xs text-white mt-7">
            © 2025 QuocHoang. All rights reserved.
          </div>
        </footer>
      </main>
    </>
  );
}
export default HomePage;
