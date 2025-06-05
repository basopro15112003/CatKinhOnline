import React, { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { BreadcrumbComponent } from "@/components/breadcrumb";
import NavigationComponent from "@/components/navigation";
import { DetailOrder } from "@/components/form/detailOrder";

export default function Account() {
  const [isDetailModalOpen, setIsDetailOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const openDetail = (order: Order) => {
    setSelectedOrder(order);
    setIsDetailOpen(true);
  };

  const closeDetail = () => {
    setIsDetailOpen(false);
  };

  type OrderItem = {
    id: number;
    productName: string;
    width: number;
    height: number;
    quantity: number;
    unitPrice: number;
    subtotal: number;
  };

  type Order = {
    id: string;
    date: string;
    status: number;
    deliveryType: string;
    shippingAddress?: string;
    paymentMethod: string;
    totalAmount: number;
    items: OrderItem[];
  };

  //#region  Mock 10 order data
  const orders: Order[] = useMemo(
    () => [
      {
        id: "DH001",
        date: "2023-11-01",
        status: 2,
        deliveryType: "shipping",
        shippingAddress: "227 Phong Điền, Cần Thơ",
        paymentMethod: "cod",
        items: [
          {
            id: 1,
            productName: "Kính cường lực 8 ly",
            width: 1.2,
            height: 0.8,
            quantity: 2,
            unitPrice: 260000,
            subtotal: Math.round(1.2 * 0.8 * 2 * 260000),
          },
          {
            id: 2,
            productName: "Kính trắng 5 ly",
            width: 1,
            height: 1,
            quantity: 1,
            unitPrice: 157000,
            subtotal: Math.round(1 * 1 * 1 * 157000),
          },
        ],
        totalAmount: 2 * 1.2 * 0.8 * 260000 + 1 * 1 * 157000,
      },
      {
        id: "DH002",
        date: "2023-11-03",
        status: 1,
        deliveryType: "pickup",
        paymentMethod: "online",
        items: [
          {
            id: 1,
            productName: "Kính bông",
            width: 0.8,
            height: 0.8,
            quantity: 3,
            unitPrice: 150000,
            subtotal: Math.round(0.8 * 0.8 * 3 * 150000),
          },
        ],
        totalAmount: Math.round(0.8 * 0.8 * 3 * 150000),
      },
      {
        id: "DH003",
        date: "2023-11-05",
        status: 0,
        deliveryType: "shipping",
        shippingAddress: "123 Nguyễn Huệ, TP HCM",
        paymentMethod: "cod",
        items: [
          {
            id: 1,
            productName: "Kính trắng 4 ly",
            width: 1,
            height: 2,
            quantity: 1,
            unitPrice: 135000,
            subtotal: Math.round(1 * 2 * 1 * 135000),
          },
        ],
        totalAmount: Math.round(1 * 2 * 1 * 135000),
      },
      {
        id: "DH004",
        date: "2023-11-07",
        status: 4,
        deliveryType: "pickup",
        paymentMethod: "online",
        items: [
          {
            id: 1,
            productName: "Kính trắng 8 ly",
            width: 1.5,
            height: 1,
            quantity: 2,
            unitPrice: 240000,
            subtotal: Math.round(1.5 * 1 * 2 * 240000),
          },
        ],
        totalAmount: Math.round(1.5 * 1 * 2 * 240000),
      },
      {
        id: "DH005",
        date: "2023-11-09",
        status: 3,
        deliveryType: "shipping",
        shippingAddress: "789 Trần Phú, Đà Nẵng",
        paymentMethod: "cod",
        items: [
          {
            id: 1,
            productName: "Kính cường lực 8 ly",
            width: 2,
            height: 1.5,
            quantity: 1,
            unitPrice: 260000,
            subtotal: Math.round(2 * 1.5 * 1 * 260000),
          },
          {
            id: 2,
            productName: "Kính bông",
            width: 1,
            height: 1,
            quantity: 2,
            unitPrice: 150000,
            subtotal: Math.round(1 * 1 * 2 * 150000),
          },
        ],
        totalAmount: Math.round(2 * 1.5 * 1 * 260000 + 1 * 1 * 2 * 150000),
      },
      {
        id: "DH006",
        date: "2023-11-10",
        status: 2,
        deliveryType: "pickup",
        paymentMethod: "online",
        items: [
          {
            id: 1,
            productName: "Kính trắng 5 ly",
            width: 1.2,
            height: 0.8,
            quantity: 2,
            unitPrice: 157000,
            subtotal: Math.round(1.2 * 0.8 * 2 * 157000),
          },
        ],
        totalAmount: Math.round(1.2 * 0.8 * 2 * 157000),
      },
      {
        id: "DH007",
        date: "2023-11-12",
        status: 3,
        deliveryType: "shipping",
        shippingAddress: "456 Lê Lợi, Cần Thơ",
        paymentMethod: "cod",
        items: [
          {
            id: 1,
            productName: "Kính bông",
            width: 0.5,
            height: 0.5,
            quantity: 4,
            unitPrice: 150000,
            subtotal: Math.round(0.5 * 0.5 * 4 * 150000),
          },
        ],
        totalAmount: Math.round(0.5 * 0.5 * 4 * 150000),
      },
      {
        id: "DH008",
        date: "2023-11-14",
        status: 3,
        deliveryType: "pickup",
        paymentMethod: "online",
        items: [
          {
            id: 1,
            productName: "Kính trắng 4 ly",
            width: 2,
            height: 1,
            quantity: 1,
            unitPrice: 135000,
            subtotal: Math.round(2 * 1 * 1 * 135000),
          },
          {
            id: 2,
            productName: "Kính cường lực 8 ly",
            width: 1,
            height: 1,
            quantity: 1,
            unitPrice: 260000,
            subtotal: Math.round(1 * 1 * 1 * 260000),
          },
        ],
        totalAmount: Math.round(2 * 1 * 1 * 135000 + 1 * 1 * 1 * 260000),
      },
      {
        id: "DH009",
        date: "2023-11-15",
        status: 3,
        deliveryType: "shipping",
        shippingAddress: "101 Nguyễn Trãi, Hà Nội",
        paymentMethod: "cod",
        items: [
          {
            id: 1,
            productName: "Kính trắng 5 ly",
            width: 1.5,
            height: 1.5,
            quantity: 1,
            unitPrice: 157000,
            subtotal: Math.round(1.5 * 1.5 * 1 * 157000),
          },
        ],
        totalAmount: Math.round(1.5 * 1.5 * 1 * 157000),
      },
      {
        id: "DH010",
        date: "2023-11-17",
        status: 4,
        deliveryType: "pickup",
        paymentMethod: "online",
        items: [
          {
            id: 1,
            productName: "Kính bông",
            width: 1,
            height: 2,
            quantity: 1,
            unitPrice: 150000,
            subtotal: Math.round(1 * 2 * 1 * 150000),
          },
        ],
        totalAmount: Math.round(1 * 2 * 1 * 150000),
      },
    ],
    [],
  );
  //#endregion

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-green-300 pt-6">
      <Header></Header> <NavigationComponent></NavigationComponent>
      <BreadcrumbComponent></BreadcrumbComponent>
      <Card className="relative mx-auto mb-10 max-w-7xl">
        <CardHeader>
          <CardTitle className="text-2xl text-green-700">
            Tài khoản khách hàng
          </CardTitle>
        </CardHeader>
        <CardContent className="">
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="profile">Thông tin cá nhân</TabsTrigger>{" "}
              <TabsTrigger value="changepass">Đổi mật khẩu</TabsTrigger>
              <TabsTrigger value="orders">Quản lý đơn hàng</TabsTrigger>
            </TabsList>
            <TabsContent value="profile">
              <div className="grid max-w-lg gap-4">
                <div>
                  <Label>Họ tên</Label>
                  <Input />
                </div>
                <div>
                  <Label>Email</Label>
                  <Input />
                </div>
                <div>
                  <Label>Số điện thoại</Label>
                  <Input type="tel" />
                </div>
                <div>
                  <Label>Địa chỉ</Label>
                  <Input />
                </div>
                <div className="flex-1">
                  <Label>Thành phố</Label>
                  <Input />
                </div>
                <Button className="mt-4">Lưu thay đổi</Button>
              </div>
            </TabsContent>

            <TabsContent value="orders">
              <div className="mb-4 flex flex-col items-center gap-4 md:flex-row">
                <Input placeholder="Tìm kiếm mã đơn" className="max-w-xs" />
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
              <Table>
                <TableHeader className="w-full">
                  <TableRow>
                    <TableHead>Mã đơn</TableHead>
                    <TableHead>Ngày</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead>Tổng</TableHead>
                    <TableHead className="text-right">Hành động</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.id}</TableCell>
                      <TableCell>{item.date}</TableCell>
                      <TableCell>
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
                      <TableCell>
                        {item.totalAmount.toLocaleString()} vn₫
                      </TableCell>
                      <TableCell className="w-1 space-x-1 text-right">
                        {item.status === 0 ? (
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                          >
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
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
            <TabsContent value="changepass">
              <div className="grid max-w-md gap-4">
                <div>
                  <Label>Mật khẩu cũ</Label>
                  <Input type="password" />
                </div>{" "}
                <div>
                  <Label>Mật khẩu mới</Label>
                  <Input type="password" />
                </div>{" "}
                <div>
                  <Label>Xác nhận ật khẩu mới</Label>
                  <Input type="password" />
                </div>
                <Button>Đổi mật khẩu</Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      <Footer></Footer>
      {isDetailModalOpen && selectedOrder && (
        <DetailOrder
          selectedOrder={selectedOrder}
          closeDetail={closeDetail}
        ></DetailOrder>
      )}
    </div>
  );
}
