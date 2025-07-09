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
import { useEffect, useMemo, useState } from "react";
import { DetailOrder } from "@/components/customer/account/order/detailOrder";
import { getOrderByUserId, updateOrderStatus } from "@/services/orderService";
import { toast } from "@/hooks/use-toast";
import type { ViewOrder } from "@/services/orderService";
import { Label } from "@/components/ui/label";
import DateRangePicker from "@/components/ui/date-picker";
import { Link } from "react-router-dom";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

export function CustomerOrders({ userId }: { userId: number }) {
  //#region  Variable
  const [isDetailModalOpen, setIsDetailOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<ViewOrder | null>(null);
  const [orders, setOrders] = useState<ViewOrder[]>([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    null,
    null,
  ]);
  const [cancelId, setCancelId] = useState<number | null>(null);
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
          setOrders((response.result as ViewOrder[]) || []);
        }
      } catch (error) {
        console.log(error);
        toast.error("Đã có lỗi xảy ra khi kết nối tới máy chủ.");
      }
    };
    fetchOrders();
  }, [userId]);

  const handleReloadOrders = async () => {
    const response = await getOrderByUserId(userId);
    if (response.isSuccess) {
      setOrders(response.result as ViewOrder[]);
    }
  };

  const filteredOrders = useMemo(() => {
    let data = orders;
    if (search.trim()) {
      data = data.filter((o) => o.id.toString().includes(search));
    }
    if (status !== "all") {
      data = data.filter((o) => o.status === Number(status));
    }
    if (dateRange[0] && dateRange[1]) {
      //sử dụng setHours để đặt giờ, phút, giây và mili giây về 00:00:00.000 và 23:59:59.999 để lọc đơn hàng theo khoảng thời gian
      const start = new Date(dateRange[0]);
      start.setHours(0, 0, 0, 0);
      const end = new Date(dateRange[1]);
      end.setHours(23, 59, 59, 999);
      data = data.filter((o) => {
        const created = new Date(o.createdAt);
        return created >= start && created <= end;
      });
    }
    return data;
  }, [orders, search, status, dateRange]);

  const handleCancelOrder = async (id: number) => {
    const response = await updateOrderStatus(id, 5);
    if (response.isSuccess) {
      toast.success("Đã hủy đơn hàng thành công");
      setCancelId(null);
      handleReloadOrders();
    } else {
      toast.error("Đã có lỗi xảy ra khi hủy đơn hàng");
    }
  };

  return (
    <>
      {/* Manage Order Start */}
      <TabsContent value="orders">
        {orders.length > 0 ? (
          <>
            <div className="mb-4 flex flex-col items-center gap-4 md:flex-row">
              <div className="flex w-full flex-col gap-1 md:w-auto">
                <Label htmlFor="picture">Tìm kiếm mã đơn</Label>
                <Input
                  placeholder="Tìm kiếm mã đơn"
                  className="w-full md:max-w-xs"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <div className="flex w-full flex-col gap-1 md:w-auto">
                <Label htmlFor="picture">Lọc trạng thái</Label>
                <Select
                  value={status}
                  onValueChange={(value) => setStatus(value)}
                >
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="Lọc trạng thái" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả</SelectItem>
                    <SelectItem value="0">Chờ xác nhận</SelectItem>
                    <SelectItem value="1">Đã xác nhận</SelectItem>
                    <SelectItem value="2">Đang thực hiện</SelectItem>
                    <SelectItem value="3">Đang giao hàng</SelectItem>
                    <SelectItem value="4">Đã hoàn thành</SelectItem>
                    <SelectItem value="5">Đã hủy</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex w-full flex-col gap-1 md:w-auto">
                <Label htmlFor="dateRange">Tìm đơn theo khoảng thời gian</Label>
                <div className="flex w-full gap-2 md:w-auto">
                  <DateRangePicker
                    onChange={([start, end]) => setDateRange([start, end])}
                  />
                </div>
              </div>
            </div>
            <div className="flex max-h-120 w-full justify-center overflow-y-auto">
              {orders.length > 0 && (
                <Table className=" ">
                  <TableHeader className="sticky top-0 w-full bg-white">
                    <TableRow>
                      <TableHead>Mã đơn</TableHead>
                      <TableHead>Ngày</TableHead>
                      <TableHead className="hidden md:block">
                        Trạng thái
                      </TableHead>
                      <TableHead>Tổng</TableHead>
                      <TableHead className="text-right">Hành động</TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody className="w-full">
                    {[...filteredOrders].reverse().map(
                      (
                        item,
                        index, //reverse để hiển thị đơn hàng mới nhất ở trên cùng
                      ) => (
                        <TableRow key={index}>
                          <TableCell>
                            DH#{item.id.toString().padStart(4, "0")}
                          </TableCell>
                          <TableCell>
                            {new Date(item.createdAt).toLocaleDateString(
                              "vi-VN",
                            )}
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
                            {item.status === 0 || item.status === 1 ? (
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button
                                    type="button"
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => setCancelId(item.id)}
                                  >
                                    Hủy
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>
                                      Bạn có chắc muốn hủy đơn hàng này?
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Hành động này không thể hoàn tác. Đơn hàng
                                      sẽ bị hủy vĩnh viễn.
                                      <br />
                                      Bạn có chắc muốn hủy đơn hàng này?
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>
                                      Quay lại
                                    </AlertDialogCancel>
                                    <AlertDialogAction
                                      className="bg-red-500 hover:bg-red-600"
                                      onClick={() => {
                                        if (cancelId)
                                          handleCancelOrder(cancelId);
                                      }}
                                    >
                                      Hủy đơn hàng
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
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
                </Table>
              )}
            </div>
          </>
        ) : (
          <> </>
        )}{" "}
        {orders.length === 0 && (
          <div className="flex w-full flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 px-4 py-12">
            <div className="mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
              <svg
                className="h-8 w-8 text-emerald-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </div>
            <h3 className="mb-2 text-lg font-semibold text-gray-900">
              Bạn chưa có đơn hàng nào
            </h3>
            <p className="mb-6 max-w-md text-center text-sm text-gray-500">
              Hãy bắt đầu mua sắm và tạo đơn hàng đầu tiên của bạn để trải
              nghiệm dịch vụ tuyệt vời của chúng tôi
            </p>
            <Link to="/order">
              <Button className="rounded-lg bg-gradient-to-r from-emerald-500 to-emerald-600 px-6 py-2 font-medium text-white shadow-md transition-all duration-200 hover:scale-105 hover:from-emerald-600 hover:to-emerald-700">
                <svg
                  className="mr-2 h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                Đặt đơn hàng ngay
              </Button>{" "}
            </Link>
          </div>
        )}
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
