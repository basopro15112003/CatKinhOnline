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
import { FormUpdateProduct } from "@/components/form/product/updateProduct";
import { getCategories, type Category } from "@/services/categoryService";

export default function ManagePrice() {
  //#region Variable Declaration
  const [showForm, setShowForm] = useState(false);
  const [open, setOpen] = React.useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<number>(0);
  const [product, setProduct] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  //#endregion

  //#region Fucntion React Hook
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

  useEffect(() => {
    async function fetchCategories() {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }
    fetchCategories();
  }, []);
  //#endregion

  //#region const handle logic, filter

  //Update bảng mà không cần reload
  const newProduct = async () => {
    setProduct((prev) => [...prev].reverse());
  };

  const handleReload = async () => {
    const response = await getProducts();
    setProduct(response);
  };

  function toggleSidebar() {
    setOpen(!open);
  }

  const filteredData = useMemo(() => {
    let data = product;
    if (searchTerm.trim()) {
      data = data.filter((o) =>
        o.productName.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }
    if (statusFilter !== 0) {
      data = data.filter((o) => o.category.id === statusFilter);
    }
    return data;
  }, [product, searchTerm, statusFilter]);
  //#endregion

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
                      value={statusFilter.toString()}
                      onValueChange={(value) => setStatusFilter(Number(value))}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Chọn loại" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">Tất cả</SelectItem>
                        {categories.map((cate) => (
                          <SelectItem key={cate.id} value={cate.id.toString()}>
                            {cate.categoryName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-end space-x-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={newProduct}
                    >
                      Sản phẩn mới nhất
                    </Button>
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
                            onClick={() => {
                              setSelectedProduct(prod);
                              setShowForm(true);
                            }}
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
      {showForm && selectedProduct ? (
        <FormUpdateProduct
          productId={selectedProduct.id}
          initialData={{
            productName: selectedProduct.productName,
            categoryId: selectedProduct.category.id,
            pricePerM2: selectedProduct.pricePerM2,
            status: selectedProduct.status,
          }}
          onUpdated={handleReload}
          setShowForm={(value) => {
            setShowForm(value);
            if (!value) setSelectedProduct(null);
          }}
        />
      ) : null}
    </SidebarProvider>
  );
}
