import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "../ui/button";

type DetailOrderProps = {
  closeDetail: boolean
}

export function DetailOrder({selectedOrder,closeDetail}){
    return(<>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg p-6 relative">
                  <h2 className="text-2xl font-bold text-green-800 mb-4">
                    Chi tiết đơn hàng {selectedOrder.id}
                  </h2>
                  <p className="mb-2">
                    <span className="font-semibold">Ngày tạo:</span>{" "}
                    {selectedOrder.date}
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
                  <p className="mb-2">
                    <span className="font-semibold">Vận chuyển:</span>{" "}
                    {selectedOrder.deliveryType === "shipping"
                      ? "Giao tận nhà"
                      : "Nhận tại cửa hàng"}
                  </p>
                  {selectedOrder.deliveryType === "shipping" && (
                    <p className="mb-2">
                      <span className="font-semibold">
                        Địa chỉ giao hàng:
                      </span>{" "}
                      {selectedOrder.shippingAddress}
                    </p>
                  )}
                  <p className="mb-2">
                    <span className="font-semibold">Thanh toán:</span>{" "}
                    {selectedOrder.paymentMethod === "cod"
                      ? "Tiền mặt"
                      : "Chuyển khoản"}
                  </p>

                  {/* Bảng chi tiết từng item */}
                  <Table className="mt-4">
                    <TableHeader>
                      <TableRow>
                        <TableHead>#</TableHead>
                        <TableHead>Loại kính</TableHead>
                        <TableHead>Rộng (m)</TableHead>
                        <TableHead>Dài (m)</TableHead>
                        <TableHead>Số lượng</TableHead>
                        <TableHead>Đơn giá</TableHead>
                        <TableHead>Thành tiền</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedOrder.items.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>{item.id}</TableCell>
                          <TableCell>{item.productName}</TableCell>
                          <TableCell>{item.width}</TableCell>
                          <TableCell>{item.height}</TableCell>
                          <TableCell>{item.quantity}</TableCell>
                          <TableCell>{item.unitPrice.toLocaleString()}₫</TableCell>
                          <TableCell>
                            {item.subtotal.toLocaleString()}₫
                          </TableCell>
                        </TableRow>
                      ))}
                      {/* Tổng cộng */}
                      <TableRow>
                        <TableCell colSpan={6} className="text-right font-bold">
                          Tổng cộng:
                        </TableCell>
                        <TableCell className="font-bold">
                          {selectedOrder.totalAmount.toLocaleString()}₫
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>

                  <div className="mt-6 flex justify-end">
                    <Button variant="ghost" type="button" onClick={closeDetail} >
                      Đóng
                    </Button>
                  </div>
                </div>
              </div>
    </>)
};