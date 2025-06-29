import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { TabsContent } from "@radix-ui/react-tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { DetailOrder } from "@/components/form/detailOrder";
import { getOrderByUserId } from "@/services/orderService";
import { toast } from "@/hooks/use-toast";
import type { ViewOrder } from "@/services/orderService";
import { Label } from "@/components/ui/label";
import DateRangePicker from "@/components/ui/date-picker";

export function CustomerOrders({ userId }: { userId: number }) {
  //#region  Variable
  const [isDetailModalOpen, setIsDetailOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<ViewOrder | null>(null);
  const [orders, setOrders] = useState<ViewOrder[]>([]);
  //#endregion

  const openDetail = (order: ViewOrder) => {
    setSelectedOrder(order);
    setIsDetailOpen(true);
  };

  const closeDetail = () => {
    setIsDetailOpen(false);
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await getOrderByUserId(userId);
        if (response.isSuccess) {
          setOrders(response.result as ViewOrder[]);
        }
      } catch (error) {
        console.log(error);
        toast.error("Đã có lỗi xảy ra khi kết nối tới máy chủ.");
      }
    };
    fetchOrders();
  }, [userId]);

  return (
    <>
      {/* Manage Order Start */}
      <TabsContent value="orders">
        <div className="mb-4 flex flex-col items-center gap-4 md:flex-row">
          <div className="flex flex-col gap-1">
            <Label htmlFor="picture">Tìm kiếm mã đơn</Label>
            <Input placeholder="Tìm kiếm mã đơn" className="max-w-xs" />
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="picture">Lọc trạng thái</Label>
            <Select>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Lọc trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả</SelectItem>
                <SelectItem value="Đang xử lý">Đang xử lý</SelectItem>
                <SelectItem value="Đang giao">Đang giao</SelectItem>
                <SelectItem value="Đã giao">Đã giao</SelectItem>
                <SelectItem value="Đã hủy">Đã hủy</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="dateRange">Tìm đơn theo khoảng thời gian</Label>
            <div className="flex gap-2">
              <DateRangePicker  onChange={([start, end]) => {
                console.log(start, end);
              }} />
            </div>
          </div>
        </div>{" "}
        <div className="flex max-h-120 w-full justify-center overflow-y-auto">
          <Table className=" ">
            <TableHeader className="sticky top-0 w-full bg-white">
              <TableRow>
                <TableHead>Mã đơn</TableHead>
                <TableHead>Ngày</TableHead>
                <TableHead className="hidden md:block">Trạng thái</TableHead>
                <TableHead>Tổng</TableHead>
                <TableHead className="text-right">Hành động</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody className="w-full">
              {[...orders].reverse().map(
                (
                  item,
                  index, //reverse để hiển thị đơn hàng mới nhất ở trên cùng
                ) => (
                  <TableRow key={index}>
                    <TableCell>
                      DH#{item.id.toString().padStart(4, "0")}
                    </TableCell>
                    <TableCell>
                      {new Date(item.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="hidden md:block">
                      {item.status === 0
                        ? "Chờ xác nhận"
                        : item.status === 1
                          ? "Đã xác nhận"
                          : item.status === 2
                            ? "Đang thực hiện"
                            : item.status === 3
                              ? "Đang giao hàng"
                              : item.status === 4
                                ? "Đã hoàn thành"
                                : "Đã hủy"}
                    </TableCell>
                    <TableCell className="font-semibold">
                      {item.totalAmount.toLocaleString()} VNĐ
                    </TableCell>
                    <TableCell className="w-1 space-x-1 text-right">
                      {item.status === 0 ? (
                        <Button type="button" variant="destructive" size="sm">
                          Hủy
                        </Button>
                      ) : (
                        <></>
                      )}
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => openDetail(item)}
                      >
                        Xem
                      </Button>
                    </TableCell>
                  </TableRow>
                ),
              )}
            </TableBody>
          </Table>{" "}
        </div>
      </TabsContent>
      {isDetailModalOpen && selectedOrder && (
        <DetailOrder
          selectedOrder={selectedOrder}
          closeDetail={closeDetail}
        ></DetailOrder>
      )}
      {/* Manage Order End */}
    </>
  );
}
