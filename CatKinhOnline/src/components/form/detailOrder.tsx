import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "../ui/button";
import type { ViewOrder } from "@/services/orderService";
import { getProducts, type Product } from "@/services/productService";
import { useEffect, useState } from "react";
import { getAddressById, type Address } from "@/services/addressService";
import Logo from "../../assets/images/Logo.png";

export function DetailOrder({
  selectedOrder,
  closeDetail,
}: {
  selectedOrder: ViewOrder;
  closeDetail: () => void;
}) {
  const [products, setProducts] = useState<{ [key: number]: Product }>({});
  const [address, setAddress] = useState<Address>();

  useEffect(() => {
    const fetchAddress = async () => {
      const response = await getAddressById(selectedOrder.shippingAddressId);
      if (response.isSuccess) {
        setAddress(response.result as Address);
      }
    };
    fetchAddress();
  }, []);

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

  // Tính toán phí ship
  const calculateShippingFee = () => {
    if (selectedOrder.deliveryType === 1) {
      // Giao tận nhà - phí ship 200,000 VNĐ
      if (selectedOrder.totalAmount <= 2000000) {
        // Đơn hàng dưới 2 triệu thì phí ship 200,000 VNĐ
        return 200000;
      } else {
        return 0;
      }
    } else {
      // Nhận tại cửa hàng - không có phí ship
      return 0;
    }
  };

  // Tính tổng tiền hàng (không bao gồm phí ship)
  const calculateSubtotal = () => {
    return selectedOrder.orderItems.reduce(
      (total, item) => total + item.subtotal,
      0,
    );
  };

  const shippingFee = calculateShippingFee();
  const subtotal = calculateSubtotal();

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
        <div className="relative w-full max-w-3xl rounded-xl bg-white p-6 shadow-lg print:border-1">
          <div className="border-b-2 border-gray-300">
            <div className="mb-2 flex items-center justify-center text-center">
              <img src={Logo} alt="Logo" className="mr-2 h-10 w-10" />
              <h1 className="text-center text-2xl font-bold text-green-800">
                Nhôm Kính Quốc Thuần
              </h1>
            </div>
            <div className="flex items-center justify-center text-sm">
              <p className="mb-4 text-gray-600">
                227 Phong Điền, TP Cần Thơ, Việt Nam | 0939 105 522 |
                quochoangnguyen2003ct@gmail.com
              </p>
            </div>
          </div>

          <h2 className="mt-4 mb-2 text-xl font-bold text-green-800">
            Chi tiết đơn hàng #DH{selectedOrder.id.toString().padStart(4, "0")}
          </h2>
          <div className="grid grid-cols-1 items-start justify-between border-b border-gray-200 md:grid-cols-2 md:gap-2">
            <div className="">
              <p className="mb-2">
                <span className="font-semibold">Ngày tạo:</span>{" "}
                {new Date(selectedOrder.createdAt).toLocaleDateString("vi-VN")}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Họ và tên:</span>{" "}
                {address?.contactName}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Số điện thoại:</span>{" "}
                {address?.contactPhone}
              </p>
              {selectedOrder.note && selectedOrder.note !== "" && (
                <p className="mb-2">
                  <span className="font-semibold">Ghi chú đơn hàng:</span>{" "}
                  <span className="text-sm text-gray-900 italic break-words max-h-24 overflow-y-auto">
                    {selectedOrder.note}
                  </span>
                </p>
              )}
            </div>
            <div className="">
              <p className="mb-2">
                <span className="font-semibold">Vận chuyển:</span>{" "}
                {selectedOrder.deliveryType === 1
                  ? "Giao tận nhà"
                  : "Nhận tại cửa hàng"}
              </p>
              {selectedOrder.deliveryType === 1 && (
                <p className="mb-2">
                  <span className="font-semibold">Địa chỉ giao hàng:</span>{" "}
                  {address?.addressLine}
                  {/* {address?.note && address?.note !== "" && (
                    <span>
                      {" "}
                      <span className="text-sm font-semibold">
                        (Ghi chú:
                      </span>{" "}
                      {address?.note})
                    </span>
                  )} */}
                </p>
              )}{" "}
              <p className="mb-2">
                <span className="font-semibold">Thanh toán:</span>{" "}
                {selectedOrder.paymentMethod === 1
                  ? "Tiền mặt"
                  : "Chuyển khoản"}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Trạng thái:</span>{" "}
                {selectedOrder.status === 0
                  ? "Chờ xác nhận"
                  : selectedOrder.status === 1
                    ? "Đã xác nhận"
                    : selectedOrder.status === 2
                      ? "Đang thực hiện"
                      : selectedOrder.status === 3
                        ? "Đang giao hàng"
                        : selectedOrder.status === 4
                          ? "Đã hoàn thành"
                          : "Đã hủy"}
              </p>
            </div>
          </div>

          {/* Bảng chi tiết từng item */}
          <Table className="mt-4">
            <TableHeader>
              <TableRow>
                <TableHead>#</TableHead>
                <TableHead>Loại kính</TableHead>
                <TableHead>Rộng (m)</TableHead>
                <TableHead>Dài (m)</TableHead>
                <TableHead>Số lượng</TableHead>
                <TableHead>Đơn giá (m²)</TableHead>
                <TableHead>Thành tiền</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {selectedOrder.orderItems.map((item, index) => (
                <>
                  <TableRow key={item.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      {products[item.productId]?.productName ||
                        `Sản phẩm ${item.productId}`}
                    </TableCell>
                    <TableCell>{item.widthM}</TableCell>
                    <TableCell>{item.heightM}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>{item.unitPrice.toLocaleString()} VNĐ</TableCell>
                    <TableCell>{item.subtotal.toLocaleString()} VNĐ</TableCell>
                  </TableRow>
                </>
              ))}
              {selectedOrder.deliveryType === 1 && (
                <>
                  {/* Tổng tiền hàng */}
                  <TableCell colSpan={6} className="text-right font-semibold">
                    Tổng tiền hàng:
                  </TableCell>
                  <TableCell className="font-semibold">
                    {subtotal.toLocaleString()}₫
                  </TableCell>
                  {/* Phí ship */}

                  <TableRow className="border-0">
                    <TableCell colSpan={6} className="text-right">
                      Phí vận chuyển:
                    </TableCell>
                    {shippingFee > 0 ? (
                      <TableCell>{shippingFee.toLocaleString()}₫</TableCell>
                    ) : (
                      <TableCell className="italic">Miễn phí</TableCell>
                    )}
                  </TableRow>
                </>
              )}
              {/* Tổng cộng */}
              <TableRow>
                <TableCell colSpan={6} className="text-right text-lg font-bold">
                  Tổng cộng:
                </TableCell>
                <TableCell className="text-lg font-bold">
                  {selectedOrder.totalAmount.toLocaleString()}₫
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <div className="mt-6 flex justify-end gap-2 print:hidden">
            <Button
              variant="ghost"
              type="button"
              onClick={() => {
                window.print();
              }}
            >
              In đơn hàng
            </Button>
            <Button variant="ghost" type="button" onClick={closeDetail}>
              Đóng
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
