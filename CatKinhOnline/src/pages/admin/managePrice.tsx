import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./appsidebar";
import React, { useMemo } from "react";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { AlignStartVertical } from "lucide-react";

export default function ManagePrice() {
  const [open, setOpen] = React.useState(true);
  const [statusFilter, setStatusFilter] = React.useState("all");
  function toggleSidebar() {
    setOpen(!open);
  }
  type Product = { id: number; name: string; type: string; price: number };
  const products: Product[] = useMemo(
    () => [
      { id: 1, name: "Kính cường lực 8 ly", type: "Clear6", price: 260000 },
      { id: 2, name: "Kính trắng 5 ly", type: "Clear5", price: 220000 },
      { id: 3, name: "Kính trắng 5 ly", type: "Clear7", price: 220000 },
    ],
    [],
  );

  const filteredData = useMemo(() => {
    let data = products;

    if (statusFilter !== "all") {
      data = data.filter((o) => statusFilter === o.type);
    }
    return data;
  }, [products, statusFilter]);

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
                Quản lý giá bán
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
                  <div>
                    <Label>Tên sản phẩm</Label>
                    <Input placeholder="Tìm sản phẩm theo tên" />
                  </div>
                  <div>
                    <Label>Loại</Label>
                    <Select
                      value={statusFilter}
                      onValueChange={(value) => setStatusFilter(value)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Chọn loại" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Tất cả</SelectItem>
                        {products.map((cate) => (
                          <SelectItem value={cate.type}>{cate.type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-end">
                    <Button>Thêm sản phẩm</Button>
                  </div>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Mã</TableHead>
                      <TableHead>Tên</TableHead>
                      <TableHead>Loại</TableHead>
                      <TableHead>Giá</TableHead>
                      <TableHead>Hành động</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredData.map((prod) => (
                      <TableRow key={prod.id}>
                        <TableCell>{prod.id}</TableCell>
                        <TableCell>{prod.name}</TableCell>
                        <TableCell>{prod.type}</TableCell>
                        <TableCell>{prod.price.toLocaleString()}₫</TableCell>
                        <TableCell className="space-x-2">
                          <Button variant="destructive" size="sm">
                            Xóa
                          </Button>
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
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </SidebarProvider>
  );
}
