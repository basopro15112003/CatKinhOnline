import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./appsidebar";
import React, { useMemo, useState } from "react";
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
import SearchBar from "@/components/personal/searchbar";
import FilterBar from "@/components/personal/orderFilterBar";
import PaginationControls from "@/components/personal/Paging";

export default function ManageOrder() {
  const [showForm, setShowForm] = useState(false);
  const [open, setOpen] = React.useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  function toggleSidebar() {
    setOpen(!open);
  }
 type Order = { id: number; user_id: number, datetime: string, total: number,delivery_type: number, payment_method: number, status:number  };
 
const orders: Order[] = useMemo(() => [
  { id: 1, user_id: 1, datetime: "2023-10-01", total: 260000, delivery_type: 1, payment_method: 1, status: 1 },
  { id: 2, user_id: 2, datetime: "2023-10-03", total: 135000, delivery_type: 0, payment_method: 0, status: 1 },
  { id: 3, user_id: 3, datetime: "2023-10-04", total: 300000, delivery_type: 1, payment_method: 0, status: 1 },
  { id: 4, user_id: 1, datetime: "2023-10-05", total: 157000, delivery_type: 0, payment_method: 1, status: 1 },
  { id: 5, user_id: 1, datetime: "2023-10-05", total: 157000, delivery_type: 0, payment_method: 1, status: 1 },
  { id: 6, user_id: 1, datetime: "2023-10-05", total: 157000, delivery_type: 0, payment_method: 1, status: 0 },
], []);

  const filteredOrders = useMemo(() => {
    let data = orders;
    if (searchTerm) {
      data = data.filter((o) => o.user_id.toString().includes(searchTerm));
    }
    if (statusFilter !== "all") {
      data = data.filter((o) => (statusFilter === "done" ? o.status === 1 : o.status === 0));
    }
    return data;
  }, [orders, searchTerm, statusFilter]);

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
                   <div className="flex  gap-2 mb-4">
                <SearchBar  value={searchTerm} onChange={setSearchTerm} />
                <FilterBar value={statusFilter} onChange={setStatusFilter} />
              </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Mã đơn</TableHead>
                      <TableHead>Tên khách</TableHead>
                      <TableHead>Ngày</TableHead>
                      <TableHead>Đơn giá</TableHead>
                      <TableHead>Vận chuyển</TableHead>
                      <TableHead>Thanh toán</TableHead>
                      <TableHead>Trạng thái</TableHead>
                     <TableHead>Hành động</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedOrders.map((ord) => (
                      <TableRow key={ord.id}>
                        <TableCell>{ord.id}</TableCell>
                        <TableCell>{ord.user_id}</TableCell>
                        <TableCell>{ord.datetime}</TableCell>
                        <TableCell>{ord.total.toLocaleString()}₫</TableCell>
                        <TableCell>{ord.delivery_type === 1 ? "Giao tận nhà" : "Nhận tại cửa hàng"}</TableCell>
                        <TableCell>{ord.payment_method === 1 ? "Tiền mặt" : "Chuyển khoản"}</TableCell>
                        <TableCell>{ord.status === 1 ? "Đã hoàn thành  " : "Chờ xác nhận"}</TableCell>
                        <TableCell className="space-x-2">
                          <Button>Xóa</Button>
                          <Button
                            variant="outline"
                            className="bg-blue-200"
                            size="sm"
                          >
                            Sửa
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
      </main>
    </SidebarProvider>
  );
}
