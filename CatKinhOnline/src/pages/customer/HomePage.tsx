import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Price } from "@/components/price";
import NavigationComponent from "@/components/navigation";

function HomePage() {

  return (
    <>
      <main className="min-h-screen bg-gradient-to-br from-green-100 to-green-300 pt-6">
        <Header></Header>
        <NavigationComponent></NavigationComponent>
        <section className="relative mx-auto  overflow-hidden rounded-2xl text-center">
          <Carousel
            className="mx-auto w-7xl overflow-hidden rounded-2xl"
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
                  className="h-120 w-full object-cover"
                />
              </CarouselItem>
              <CarouselItem>
                {" "}
                <img
                  src="https://www.gothaibefree.com/wp-content/uploads/2016/01/Pattaya1940x1300.jpg"
                  alt="Banner"
                  className="h-120 w-full object-cover"
                />
              </CarouselItem>
              <CarouselItem>
                {" "}
                <img
                  src="https://d2rdhxfof4qmbb.cloudfront.net/wp-content/uploads/20200825140923/iStock-918934132-scaled.jpg"
                  alt="Banner"
                  className="h-120 w-full object-cover"
                />
              </CarouselItem>
            </CarouselContent>
          </Carousel>
          <div className="absolute top-0 right-0 left-0 mt-50 items-center justify-center">
            <h2 className="mb-4 text-3xl font-extrabold text-white">
              Nơi đặt kính nhanh chóng & tiện lợi
            </h2>
            <p className="text-lg font-extrabold text-white">
              Chọn loại kính, nhập kích thước và nhận báo giá ngay lập tức. Cắt
              kính chính xác, giao hàng tận nơi hoặc nhận tại cửa hàng.
            </p>
          </div>
        </section>
        <section className="mx-auto mt-10 mb-12 grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-3">
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
              className="relative overflow-hidden rounded-2xl bg-white p-10 shadow-md"
            >
              <CardContent>
                <h3 className="mb-2 text-xl font-semibold text-green-700">
                  {item.title}
                </h3>
                <p className="text-green-600">{item.desc}</p>
              </CardContent>
            </Card>
          ))}
        </section>

        <Price></Price>
        
        <section className="mx-auto mb-12 max-w-7xl">
          <h2 className="mb-6 text-center text-2xl font-bold text-green-800">
            Khách hàng nói gì về dịch vụ của chúng tôi?
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              {
                name: "Anh Trường",
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
              <Card key={idx} className="rounded-2xl bg-white p-6 shadow-sm">
                <img
                  src={item.img}
                  alt={item.name}
                  className="mx-auto h-12 w-12 rounded-full"
                />
                <CardContent>
                  <p className="text-green-600 italic">
                    "Dịch vụ nhanh, chất lượng kính tuyệt vời!"
                  </p>
                  <p className="mt-4 text-center font-semibold text-green-700">
                    - {item.name}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
        <section className="mx-auto mb-12 max-w-7xl overflow-hidden rounded-2xl">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d335.7529973570932!2d105.6776721423215!3d9.994594320910576!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a08ec8035be43b%3A0x432cb00910505ce1!2zQ8ahIFPhu58gQ-G7rWEgU-G6r3QgUXXhu5FjIFRodeG6p24!5e1!3m2!1sen!2s!4v1748685293274!5m2!1sen!2s"
            className="w-full"
            width="600"
            height="250"
            loading="lazy"
          ></iframe>{" "}
        </section>
        <Footer></Footer>
      </main>
    </>
  );
}
export default HomePage;
