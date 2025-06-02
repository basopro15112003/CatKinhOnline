import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./appsidebar";
import React, { useState } from "react";
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
import { Home, AlignStartVertical } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";

export default function ManagePrice() {
  const [open, setOpen] = React.useState(false);
  function toggleSidebar() {
    setOpen(!open);
  }
  const initialProducts = [
    { id: 1, name: "Kính cường lực 8 ly", type: "Tempered", price: 260000 },
    { id: 2, name: "Kính trắng 5 ly", type: "Clear5", price: 220000 },
  ];

  // Handlers
  const addProduct = () => {
    if (!prName || !prType || !prPrice) return;
    const newProduct = {
      id: Date.now(),
      name: prName,
      type: prType,
      price: Number(prPrice),
    };
    setProducts([...products, newProduct]);
    setPrName("");
    setPrType("");
    setPrPrice("");
  };
  const deleteProduct = (id) =>
    setProducts(products.filter((p) => p.id !== id));
  const [products, setProducts] = useState(initialProducts);
  const [prName, setPrName] = useState("");
  const [prType, setPrType] = useState("");
  const [prPrice, setPrPrice] = useState("");

  return (
    <SidebarProvider open={open} onOpenChange={setOpen} className="gap-5">
      <AppSidebar />
      <main className="w-full rounded-2xl ">
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
                 <ModeToggle></ModeToggle>
                                  <ModeToggle></ModeToggle>

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
                <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <Label>Tên sản phẩm</Label>
                    <Input
                      value={prName}
                      onChange={(e) => setPrName(e.target.value)}
                      placeholder="Nhập tên"
                    />
                  </div>
                  <div>
                    <Label>Loại</Label>
                    <Select onValueChange={(v) => setPrType(v)}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Chọn loại" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Tempered">Tempered</SelectItem>
                        <SelectItem value="Frosted">Frosted</SelectItem>
                        <SelectItem value="Clear4">Clear4</SelectItem>
                        <SelectItem value="Clear5">Clear5</SelectItem>
                        <SelectItem value="Clear8">Clear8</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Giá (đ)</Label>
                    <Input
                      type="number"
                      value={prPrice}
                      onChange={(e) => setPrPrice(e.target.value)}
                      placeholder="Nhập giá"
                    />
                  </div>
                  <div className="flex items-end">
                    <Button onClick={addProduct}>Thêm sản phẩm</Button>
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
                    {products.map((prod) => (
                      <TableRow key={prod.id}>
                        <TableCell>{prod.id}</TableCell>
                        <TableCell>{prod.name}</TableCell>
                        <TableCell>{prod.type}</TableCell>
                        <TableCell>{prod.price.toLocaleString()}₫</TableCell>
                        <TableCell className="space-x-2">
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => deleteProduct(prod.id)}
                          >
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
