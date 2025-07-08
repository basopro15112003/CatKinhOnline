"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle,
  Phone,
  Mail,
  MapPin,
  Clock,
  Package,
  Truck,
  Home,
  FileText,
  Share2,
} from "lucide-react";
import { useEffect, useState } from "react";
import CustomerReview from "@/components/common/customerReview";
import { useParams } from "react-router-dom";
import { getOrderById, type ViewOrder } from "@/services/orderService";
import { getProducts, type Product } from "@/services/productService";
import { getAddressById, type Address } from "@/services/addressService";

function ThankYouPage() {
  const [currentTime] = useState(new Date());
  const { id } = useParams();
  const [orderNumber] = useState(() => `DH${Date.now().toString().slice(-6)}`);
  const [order, setOrder] = useState<ViewOrder | null>(null);
  const [products, setProducts] = useState<{ [key: number]: Product }>({});
  const [address, setAddress] = useState<Address>();

  useEffect(() => {
    const fetchAddress = async () => {
      const response = await getAddressById(order?.shippingAddressId || 0);
      if (response.isSuccess) {
        setAddress(response.result as Address);
      }
    };
    fetchAddress();
  }, [order]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const allProducts = await getProducts();
        if (allProducts.isSuccess && Array.isArray(allProducts.result)) {
          const productsMap: { [key: number]: Product } = {};
          allProducts.result.forEach((product: Product) => {
            productsMap[product.id] = product;
          });
          setProducts(productsMap);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchOrder = async () => {
      const response = await getOrderById(Number(id));
      if (response.isSuccess) {
        setOrder(response.result as ViewOrder);
      }
    };
    fetchOrder();
  }, [id]);

  const calculateSubtotal = () => {
    return order?.orderItems.reduce((total, item) => total + item.subtotal, 0);
  };
  const subtotal = calculateSubtotal();

  const nextSteps = [
    {
      icon: Phone,
      title: "Xác nhận đơn hàng",
      description: "Chúng tôi sẽ gọi điện xác nhận trong vòng 30 phút",
      time: "Trong 30 phút",
    },
    {
      icon: Package,
      title: "Chuẩn bị sản phẩm",
      description: "Gia công và chuẩn bị kính theo yêu cầu",
      time: "1-2 ngày",
    },
    {
      icon: Truck,
      title: "Giao hàng",
      description: "Giao hàng tận nơi và lắp đặt miễn phí",
      time: "2-3 ngày",
    },
  ];

  return (
    <div className="">
      {/* Print-only header */}
      <div className="hidden print:mb-8 print:block print:text-center">
        <h1 className="text-2xl font-bold text-gray-800">
          NHÔM KÍNH QUỐC THUẦN
        </h1>
        <p className="mb-4 text-gray-600">
          227 Phong Điền, TP Cần Thơ, Việt Nam | 0333 744 591 |
          quochoangnguyen2003ct@gmail.com
        </p>
        <h1 className="text-xl font-bold text-gray-800">ĐƠN HÀNG #DH{id}</h1>
        <p className="text-gray-600">{currentTime.toLocaleString("vi-VN")}</p>
      </div>

      <div className="mx-auto max-w-7xl px-1 py-12 md:px-4 print:max-w-none print:p-0">
        {/* Success Message */}
        <div className="mb-12 text-center print:hidden">
          <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-emerald-500 shadow-2xl md:mb-6">
            <CheckCircle className="h-12 w-12 text-white" />
          </div>
          <h1 className="mb-2 text-2xl font-bold text-gray-800 md:mb-4 md:text-4xl">
            Cảm ơn bạn đã đặt hàng!
          </h1>
          <p className="text-base text-gray-600 md:mb-2 md:text-xl">
            Đơn hàng của bạn đã được tiếp nhận thành công
          </p>
          <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
            <span>
              Mã đơn hàng:{" "}
              <strong className="text-emerald-600">#DH0{id}</strong>
            </span>
            <span>•</span>
            <span>{currentTime.toLocaleString("vi-VN")}</span>
          </div>
        </div>

        <div className="mb-8 grid grid-cols-1 gap-8 lg:grid-cols-3 print:grid-cols-1 print:gap-0">
          {/* Order Details */}
          <div className="space-y-6 lg:col-span-2 print:col-span-1">
            {/* Order Summary */}
            <Card className="border-0 bg-gradient-to-br from-white to-emerald-50/30 shadow-xl print:border print:border-gray-300 print:shadow-none">
              <CardContent className="p-6 print:p-4">
                <div className="mb-6 flex items-center">
                  <FileText className="mr-3 h-6 w-6 text-emerald-600 print:hidden" />
                  <h2 className="text-2xl font-bold text-gray-800 print:text-xl">
                    Chi tiết đơn hàng
                  </h2>
                </div>
                <div className="space-y-4">
                  {order?.orderItems.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between border-emerald-100 print:border-gray-300"
                    >
                      <div className="flex">
                        <div className="flex items-center justify-center border-r-2 border-gray-300 pr-3 text-base font-bold text-emerald-700 md:text-xl">
                          {index + 1}
                        </div>
                        <div className="ml-2 flex flex-col">
                          <div className="font-semibold text-gray-800">
                            {products[item.productId]?.productName}
                          </div>
                          <div className="text-xs text-gray-500 md:text-base">
                            {item.widthM} m × {item.heightM} m x{" "}
                            {item.unitPrice.toLocaleString()}₫/m2 ={" "}
                            {item.widthM * item.heightM * item.unitPrice}₫ x{" "}
                            {item.quantity} Tấm
                          </div>
                        </div>
                      </div>
                      <div className="text-base font-semibold text-black md:text-lg print:text-black">
                        {item.subtotal.toLocaleString()}₫
                      </div>
                    </div>
                  ))}
                  <div className="border-t-2 border-emerald-100 pt-2 print:border-gray-300">
                    <div className="flex items-center justify-between">
                      <span className="text-base font-bold text-gray-800">
                        Tạm tính:
                      </span>
                      <span className="text-base font-bold text-black print:text-black">
                        {subtotal?.toLocaleString()}₫
                      </span>
                    </div>{" "}
                    <div className="flex items-center justify-between">
                      <span className="text-base font-bold text-gray-800">
                        Phí vận chuyển:
                      </span>
                      <span className="text-base font-bold text-black print:text-black">
                        {subtotal && subtotal >= 2000000
                          ? "Miễn phí"
                          : "200,000₫"}
                      </span>
                    </div>{" "}
                    <div className="flex items-center justify-between border-b-2 border-emerald-100 pb-4 print:border-gray-300">
                      <span className="text-xl font-bold text-gray-800">
                        Tổng cộng:
                      </span>
                      <span className="text-2xl font-bold text-black print:text-black">
                        {order?.totalAmount.toLocaleString()}₫
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mt-2 flex justify-between">
                  <p className="text-sm font-semibold">
                    Ghi chú đơn hàng:{" "}
                    {order?.note && order?.note !== "" ? (
                      <span
                        className="block text-xs font-normal italic"
                        style={{ wordBreak: "break-word" }}
                      >
                        {order?.note}
                      </span>
                    ) : (
                      <span className="text-xs font-normal italic">
                        Không có
                      </span>
                    )}
                  </p>
                </div>
                <div className="mt-6 grid grid-cols-1 gap-4 text-sm md:grid-cols-2 print:grid-cols-2">
                  {order?.deliveryType === 1 && (
                    <>
                      <div className="rounded-lg bg-emerald-100/50 p-3 print:border print:border-gray-300 print:bg-gray-100">
                        <div className="text-lg font-semibold text-emerald-900 print:text-black">
                          Người nhận
                        </div>
                        <div className="text-emerald-600 print:text-black">
                          {address?.contactName}
                        </div>
                      </div>
                      <div className="rounded-lg bg-emerald-100/50 p-3 print:border print:border-gray-300 print:bg-gray-100">
                        <div className="text-lg font-semibold text-emerald-900 print:text-black">
                          Số điện thoại
                        </div>
                        <div className="text-emerald-600 print:text-black">
                          {address?.contactPhone}
                        </div>
                      </div>{" "}
                    </>
                  )}       {order?.deliveryType === 0 && (
                    <>
                      <div className="rounded-lg bg-emerald-100/50 p-3 print:border print:border-gray-300 print:bg-gray-100">
                        <div className="text-lg font-semibold text-emerald-900 print:text-black">
                          Người nhận
                        </div>
                        <div className="text-emerald-600 print:text-black">
                          {order?.fullName}
                        </div>
                      </div>
                      <div className="rounded-lg bg-emerald-100/50 p-3 print:border print:border-gray-300 print:bg-gray-100">
                        <div className="text-lg font-semibold text-emerald-900 print:text-black">
                          Số điện thoại
                        </div>
                        <div className="text-emerald-600 print:text-black">
                          {order?.phone}
                        </div>
                      </div>{" "}
                    </>
                  )}
                  <div className="rounded-lg bg-emerald-100/50 p-3 print:border print:border-gray-300 print:bg-gray-100">
                    <div className="text-lg font-semibold text-emerald-900 print:text-black">
                      Phương thức nhận hàng
                    </div>
                    <div className="text-emerald-600 print:text-black">
                      {order?.deliveryType === 0
                        ? "Tại cửa hàng"
                        : "Giao tận hàng nơi"}
                    </div>
                  </div>{" "}
                  <div className="rounded-lg bg-emerald-100/50 p-3 print:border print:border-gray-300 print:bg-gray-100">
                    <div className="text-lg font-semibold text-emerald-900 print:text-black">
                      Phương thức thanh toán
                    </div>
                    <div className="text-emerald-600 print:text-black">
                      {order?.paymentMethod === 0
                        ? "Tiền mặt"
                        : "Thanh toán trực tuyến"}
                    </div>
                  </div>{" "}
                  {order?.deliveryType === 1 && (
                    <>
                      <div className="rounded-lg bg-emerald-100/50 p-3 print:border print:border-gray-300 print:bg-gray-100">
                        <div className="text-lg font-semibold text-emerald-900 print:text-black">
                          Địa chỉ nhận hàng
                        </div>
                        <div className="text-emerald-600 print:text-black">
                          {address?.addressLine}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Next Steps */}
            <Card className="border-0 bg-gradient-to-br from-white to-emerald-50/30 shadow-xl print:hidden">
              <CardContent className="p-6">
                <div className="mb-6 flex items-center">
                  <Clock className="mr-3 h-6 w-6 text-emerald-600" />
                  <h2 className="text-2xl font-bold text-gray-800">
                    Các bước tiếp theo
                  </h2>
                </div>

                <div className="space-y-4">
                  {nextSteps.map((step, index) => (
                    <div
                      key={index}
                      className="flex items-start space-x-4 rounded-lg border border-emerald-100 bg-white p-4"
                    >
                      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 text-white">
                        <step.icon className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <div className="mb-1 flex items-center justify-between">
                          <h3 className="font-semibold text-gray-800">
                            {step.title}
                          </h3>
                          <Badge
                            variant="outline"
                            className="border-emerald-200 text-emerald-600"
                          >
                            {step.time}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6 print:hidden">
            {/* Contact Info */}
            <Card className="border-0 bg-gradient-to-br from-white to-emerald-50/30 shadow-xl">
              <CardContent className="p-6">
                <h3 className="mb-4 text-xl font-bold text-gray-800">
                  Thông tin liên hệ
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-emerald-600" />
                    <div>
                      <div className="font-semibold text-gray-800">Hotline</div>
                      <div className="text-emerald-600">0333 744 591</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-emerald-600" />
                    <div>
                      <div className="font-semibold text-gray-800">Email</div>
                      <div className="text-emerald-600">
                        quochoangnguyen2003ct@gmail.com
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-5 w-5 text-emerald-600" />
                    <div>
                      <div className="font-semibold text-gray-800">Địa chỉ</div>
                      <div className="text-emerald-600">
                        227 Phong Điền, TP Cần Thơ, Việt Nam
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Estimated Delivery */}
            <Card className="border-0 bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-xl">
              <CardContent className="p-6 text-center">
                <Truck className="mx-auto mb-4 h-12 w-12" />
                <h3 className="mb-2 text-xl font-bold">Dự kiến giao hàng</h3>
                <p className="mb-4 text-emerald-100">
                  {order?.deliveryType === 0
                    ? "Tại cửa hàng"
                    : "Giao tận hàng nơi"}
                </p>
                <div className="text-sm opacity-90">
                  Chúng tôi sẽ liên hệ trước khi giao hàng
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="space-y-3">
              <Button
                className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg transition-all duration-300 hover:from-emerald-700 hover:to-teal-700 hover:shadow-xl"
                onClick={() => (window.location.href = "/")}
              >
                <Home className="mr-2 h-5 w-5" />
                Về trang chủ
              </Button>

              <Button
                variant="outline"
                className="w-full border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                onClick={() => window.print()}
              >
                <FileText className="mr-2 h-5 w-5" />
                In đơn hàng
              </Button>

              <Button
                variant="outline"
                className="w-full border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: "Đơn hàng #" + orderNumber,
                      text: "Tôi vừa đặt hàng tại Tiệm kính Quốc Hoàng",
                      url: window.location.href,
                    });
                  }
                }}
              >
                <Share2 className="mr-2 h-5 w-5" />
                Chia sẻ
              </Button>
            </div>
          </div>
        </div>

        <div className="print:hidden">
          <CustomerReview></CustomerReview>
        </div>
      </div>
    </div>
  );
}

export default ThankYouPage;
