import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

export default function CustomerReview() {
    
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
      <section className="mx-auto mb-8 md:mb-16 max-w-7xl px-1 md:px-4">
        <div className="mb-8 md:mb-12 text-center">
          <h2 className="mb-4 text-4xl font-bold text-gray-800">
            Khách hàng nói gì về chúng tôi?
          </h2>
          <p className="text-xl text-gray-600">
            Hơn 100+ khách hàng tin tưởng và hài lòng
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:gap-8 md:grid-cols-3">
          {reviews.map((review, idx) => (
            <Card
              key={idx}
              className="group transform border-0 bg-gradient-to-br from-white to-emerald-50/30 shadow-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
            >
              <CardContent className="p-4 md:p-8">
                <div className="mb-2 md:mb-6 flex items-center">
                  <img
                    src={review.img || "/placeholder.svg"}
                    alt={review.name}
                    className="h-16 w-16 rounded-full border-4 border-emerald-200 object-cover transition-colors duration-300 group-hover:border-emerald-400"
                  />
                  <div className="ml-2 md:ml-4">
                    <h4 className="font-bold text-gray-800">{review.name}</h4>
                    <p className="text-sm text-gray-600">{review.role}</p>
                  </div>
                </div>

                <div className="mb-2 md:mb-4 flex">
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
    </>
  );
}
