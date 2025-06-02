import React from "react";
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
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { BreadcrumbComponent } from "@/components/breadcrumb";
import NavigationComponent from "@/components/navigation";

export default function Account() {
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
                  <TableRow>
                    <TableCell>DH001</TableCell>
                    <TableCell>15/11/2003</TableCell>
                    <TableCell>Đã hoàn thành</TableCell>
                    <TableCell>500,000₫</TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm">
                        Xem
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <div className="mt-4 flex justify-center">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious href="#" />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#" isActive>
                        2
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">3</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationNext href="#" />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>{" "}
              </div>
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
    </div>
  );
}
