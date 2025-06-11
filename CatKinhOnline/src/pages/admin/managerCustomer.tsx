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

import PaginationControls from "@/components/personal/Paging";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function ManageCustomer() {
  const [open, setOpen] = React.useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  function toggleSidebar() {
    setOpen(!open);
  }
  type Customers = {
    id: number;
    name: string;
    email: string;
    phone: string;
    status: number;
  };

  const customer: Customers[] = useMemo(
    () => [
      {
        id: 1,
        name: "Nguyễn Quốc Hoàng",
        email: "quochoangnguyen2003ct@gmail.com",
        phone: "0333744591",
        status: 1,
      },
      {
        id: 2,
        name: "Trần Thị Mai",
        email: "maitran@gmail.com",
        phone: "0911223344",
        status: 1,
      },
      {
        id: 3,
        name: "Lê Văn Nam",
        email: "namle1990@gmail.com",
        phone: "0988777666",
        status: 0,
      },
      {
        id: 4,
        name: "Phạm Hồng Ánh",
        email: "anhpham@gmail.com",
        phone: "0909888777",
        status: 1,
      },
      {
        id: 5,
        name: "Võ Minh Trí",
        email: "minhtri@example.com",
        phone: "0933332222",
        status: 0,
      },
    ],
    [],
  );

  const filteredData = useMemo(() => {
    let data = customer;
    if (searchTerm.toLowerCase()) {
      data = data.filter(
        (o) =>
          o.name.toString().toLowerCase().includes(searchTerm) ||
          o.email.toString().toLowerCase().includes(searchTerm) ||
          o.phone.toString().includes(searchTerm),
      );
    }
    if (statusFilter !== "all") {
      data = data.filter((o) =>
        statusFilter === "done" ? o.status === 1 : o.status === 0,
      );
    }
    return data;
  }, [customer, searchTerm, statusFilter]);

  const paginatedOrders = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredData.slice(start, start + pageSize);
  }, [filteredData, currentPage]);

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
              <BreadcrumbLink>
                <Link to={"/admin"}>Quản lý</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Quản lý khách hàng</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex-1 overflow-auto p-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-green-800">
                Quản lý khách hàng
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4 flex gap-2">
                <Input
                  className="lg:w-1/5"
                  placeholder="Tìm khách hàng ( tên, sđt, email ) "
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value)} >
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Lọc theo trạng thái" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả</SelectItem>
                    <SelectItem value="done">Đang hoạt động</SelectItem>
                    <SelectItem value="pending">Đang bị khóa</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Mã ID </TableHead>
                    <TableHead>Tên khách</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Số điện thoại</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead>Hành động</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedOrders.map((ord) => (
                    <TableRow key={ord.id}>
                      <TableCell>{ord.id}</TableCell>
                      <TableCell>{ord.name}</TableCell>
                      <TableCell>{ord.email}</TableCell>
                      <TableCell>{ord.phone}</TableCell>
                      <TableCell>
                        {ord.status === 1 ? "Đã hoàn thành  " : "Chờ xác nhận"}
                      </TableCell>
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
                totalItems={filteredData.length}
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
