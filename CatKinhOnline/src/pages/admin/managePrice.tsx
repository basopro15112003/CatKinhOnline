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
import { getProducts, type Product } from "@/services/productService";
import { FormAddProduct } from "@/components/form/product/addProduct";

export default function ManagePrice() {
  const [showForm, setShowForm] = useState(false);
  const [open, setOpen] = React.useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = React.useState("0");
  const [product, setProduct] = useState<Product[]>([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getProducts();
        setProduct(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);
  //Update bảng mà không cần reload
  const handleReload = async () => {
        const response = await getProducts();
        setProduct(response);
  };

  function toggleSidebar() {
    setOpen(!open);
  }

  const filteredData = useMemo(() => {
    let data = product;
    if (searchTerm) {
      data = data.filter((o) => o.productName.toUpperCase().toString().includes(searchTerm.toUpperCase()));
    }
    if (statusFilter !== "0") {
      data = data.filter((o) => statusFilter === o.categoryId.toString());
    }
    return data;
  }, [product, searchTerm,statusFilter]);

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
                    <Input
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Tìm sản phẩm theo tên"
                    />
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
                        <SelectItem value="0">Tất cả</SelectItem>
                        {/* {product.map((cate, id) => (
                          <SelectItem key={id} value={cate.categoryId.toString()}>{}</SelectItem>
                        ))} */}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-end">
                    <Button type="button" onClick={() => setShowForm(true)}>
                      Thêm sản phẩm
                    </Button>
                  </div>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Mã</TableHead>
                      <TableHead>Tên</TableHead>
                      <TableHead>Loại</TableHead>
                      <TableHead>Giá</TableHead>
                      <TableHead>Trạng thái</TableHead>
                      <TableHead>Hành động</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredData.map((prod) => (
                      <TableRow key={prod.id}>
                        <TableCell>{prod.id}</TableCell>
                        <TableCell>{prod.productName}</TableCell>
                        <TableCell>{prod.category.categoryName}</TableCell>
                        <TableCell>
                          {prod.pricePerM2.toLocaleString()}₫
                        </TableCell>
                        <TableCell>
                          {prod.status === 1 ? "Còn hàng" : "Hết hàng"}
                        </TableCell>

                        <TableCell className="space-x-2">
                          <Button
                            variant="outline"
                            className="bg-blue-200"
                            size="sm"
                          >
                            Cập nhật
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
      {showForm && (
        <FormAddProduct
          onAdded={handleReload}
          setShowForm={setShowForm}
        ></FormAddProduct>
      )}
    </SidebarProvider>
  );
}
