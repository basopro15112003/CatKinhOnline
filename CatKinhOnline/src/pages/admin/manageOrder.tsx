import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./appsidebar";
import React, { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { AlignStartVertical } from "lucide-react";
import PaginationControls from "@/components/layout/Paging";
import { getOrders, type ViewOrder } from "@/services/orderService";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
  SelectTrigger,
} from "@/components/ui/select";

import { Label } from "@radix-ui/react-label";
import DateRangePicker from "@/components/ui/date-picker";
import { Input } from "@/components/ui/input";
import { DetailAdminOrder } from "@/components/admin/order/adminDetailOrder";
import { OrderStatusUpdateForm } from "@/components/admin/order/OrderStatusUpdateForm";

export default function ManageOrder() {
  // const [showForm, setShowForm] = useState(false);
  const [open, setOpen] = React.useState(true);
  const [searchTermByOrderId, setSearchTermByOrderId] = useState("");
  const [searchTermByFullName, setSearchTermByFullName] = useState("");
  const [status, setStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const [orders, setOrders] = useState<ViewOrder[]>([]);

  const [showDetail, setShowDetail] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<ViewOrder | null>(null);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [orderToUpdate, setOrderToUpdate] = useState<ViewOrder | null>(null);
  const [deliveryType, setDeliveryType] = useState("all");
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    null,
    null,
  ]);
  function toggleSidebar() {
    setOpen(!open);
  }
  function showDetailOrder(order: ViewOrder) {
    setShowDetail(true);
    setSelectedOrder(order);
  }

  function showUpdateStatusForm(order: ViewOrder) {
    setOrderToUpdate(order);
    setShowUpdateForm(true);
  }

  //lấy danh sách đơn hàng
  useEffect(() => {
    async function fetchOrders() {
      const response = await getOrders();
      if (response.isSuccess) {
        setOrders(response.result as ViewOrder[] | []);
      } else {
        toast.error(response.message);
      }
    }
    fetchOrders();
  }, []);

  function removeVietnameseTones(str: string) { // xóa dấu tiếng việt
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").replace(/Đ/g, "D");
  }

  const filteredOrders = useMemo(() => {
    const orderReverse = [...orders].reverse();
    let data = orderReverse;
    if (searchTermByOrderId) {
      data = data.filter((o) => o.id.toString().includes(searchTermByOrderId));
    }
    if (searchTermByFullName) {
      data = data.filter((o) => removeVietnameseTones(o.fullName).toLowerCase().includes(removeVietnameseTones(searchTermByFullName).toLowerCase()));
    }
      if (status !== "all") {
      data = data.filter((o) => o.status === Number(status));
    }
    if (deliveryType !== "all") {
      data = data.filter((o) => o.deliveryType === Number(deliveryType));
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
  }, [orders, searchTermByOrderId, searchTermByFullName, status, deliveryType, dateRange]);

  const paginatedOrders = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredOrders.slice(start, start + pageSize);
  }, [filteredOrders, currentPage]);

  return (
    <SidebarProvider open={open} onOpenChange={setOpen} className="gap-5">
      <AppSidebar />
      <main className="w-full rounded-2xl">
        <Breadcrumb className="mt-5 ml-5">
          <BreadcrumbList>
            <Button
              className="text-black"
              variant="ghost"
              size={"sm"}
              onClick={() => toggleSidebar()}
            >
              <AlignStartVertical></AlignStartVertical>
            </Button>
            |
            <BreadcrumbItem>
              <BreadcrumbLink href="/admin">Quản lý</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Quản lý giá</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex-1 overflow-auto p-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-green-800">
                Quản lý đơn hàng
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4 flex w-full flex-col gap-2 md:flex-row">
              <div className="">
                  <Label>Tìm kiếm theo mã đơn </Label>
                  <Input
                   className="w-full md:w-48"
                    placeholder="Tìm tên đơn hàng"
                    value={searchTermByOrderId}
                    onChange={(e) => setSearchTermByOrderId(e.target.value)}
                  />
                </div>
                <div className="">
                  <Label>Tìm kiếm theo tên </Label>
                  <Input
                 className="w-full md:w-48"
                    placeholder="Tìm tên khách hàng"
                    value={searchTermByFullName}
                    onChange={(e) => setSearchTermByFullName(e.target.value)}
                  />
                </div>
                <div>
                  <Label>Trạng thái</Label>
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
                  </Select>{" "}
                </div>
                <div>
                  <Label>Loại vận chuyển</Label>
                  <Select
                    value={deliveryType}
                    onValueChange={(value) => setDeliveryType(value)}
                  >
                    <SelectTrigger className="w-full md:w-48">
                      <SelectValue placeholder="Lọc trạng thái" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tất cả</SelectItem>
                      <SelectItem value="1">Giao tận nhà</SelectItem>
                      <SelectItem value="0">Nhận tại cửa hàng</SelectItem>
                    </SelectContent>
                  </Select>{" "}
                </div>
                <div>
                  <Label htmlFor="dateRange">
                    Tìm đơn theo khoảng thời gian
                  </Label>
                  <div className="flex w-full gap-2 md:w-auto">
                    <DateRangePicker
                      onChange={([start, end]) => setDateRange([start, end])}
                    />
                  </div>
                </div>
                <div className="flex flex-col">
                  <Label>Đơn hàng mới nhất</Label>
                  <Button variant="outline" className="">
                    Đơn hàng mới nhất
                  </Button>
                </div>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Mã đơn</TableHead>
                    <TableHead>Tên khách</TableHead>
                    <TableHead>Số điện thoại</TableHead>
                    <TableHead>Ngày</TableHead>
                    <TableHead>Đơn giá</TableHead>
                    <TableHead>Vận chuyển</TableHead>
                    <TableHead>Thanh toán</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead className="text-end">Hành động</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedOrders.map((ord) => (
                    <TableRow key={ord.id}>
                      <TableCell>DH#{ord.id}</TableCell>
                      <TableCell>{ord.fullName}</TableCell>
                      <TableCell>{ord.phone}</TableCell>
                      <TableCell>
                        {ord.createdAt.toLocaleString().split("T")[0]}
                      </TableCell>
                      <TableCell>{ord.totalAmount.toLocaleString()}₫</TableCell>
                      <TableCell>
                        {ord.deliveryType === 1
                          ? "Giao tận nhà"
                          : "Nhận tại cửa hàng"}
                      </TableCell>
                      <TableCell>
                        {ord.paymentMethod === 1 ? "Tiền mặt" : "Chuyển khoản"}
                      </TableCell>
                      <TableCell>
                        {ord.status === 0 ? (
                          <span className="font-bold text-amber-500">
                            Chờ xác nhận
                          </span>
                        ) : ord.status === 1 ? (
                          <span className="font-bold text-blue-500">
                            Đã xác nhận
                          </span>
                        ) : ord.status === 2 ? (
                          <span className="font-bold text-indigo-500">
                            Đang thực hiện
                          </span>
                        ) : ord.status === 3 ? (
                          <span className="font-bold text-cyan-500">
                            Đang giao hàng
                          </span>
                        ) : ord.status === 4 ? (
                          <span className="font-bold text-green-600">
                            Đã hoàn thành
                          </span>
                        ) : (
                          <span className="font-bold text-red-500">Đã hủy</span>
                        )}
                      </TableCell>
                      <TableCell className="space-x-2 text-end">
                        {ord.status !== 5 ? (
                          <>
                            {" "}
                            <Button
                              onClick={() => showUpdateStatusForm(ord)}
                              size="sm"
                              className="bg-cyan-700 hover:bg-cyan-800"
                            >
                              Cập nhật
                            </Button>
                          </>
                        ) : (
                          ""
                        )}
                        <Button
                          variant="outline"
                          className="bg-blue-200"
                          size="sm"
                          onClick={() => showDetailOrder(ord)}
                        >
                          Xem
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <PaginationControls
                currentPage={currentPage}
                totalItems={filteredOrders.length}
                pageSize={pageSize}
                onPageChange={setCurrentPage}
              />
            </CardContent>
          </Card>
        </div>
        {showDetail && selectedOrder && (
          <DetailAdminOrder
            selectedOrder={selectedOrder as ViewOrder}
            closeDetail={() => setShowDetail(false)}
          />
        )}
        {showUpdateForm && orderToUpdate && (
          <OrderStatusUpdateForm
            id={orderToUpdate.id}
            order={orderToUpdate}
            onClose={() => {
              setShowUpdateForm(false);
              setOrderToUpdate(null);
            }}
            onUpdateSuccess={(updatedOrder) => {
              // Cập nhật order trong danh sách
              setOrders((prevOrders) =>
                prevOrders.map((order) =>
                  order.id === updatedOrder.id ? updatedOrder : order,
                ),
              );
              // Cập nhật selectedOrder nếu đang xem chi tiết
              if (selectedOrder && selectedOrder.id === updatedOrder.id) {
                setSelectedOrder(updatedOrder);
              }
            }}
          />
        )}
      </main>
    </SidebarProvider>
  );
}
