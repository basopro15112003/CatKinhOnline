import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { AddProduct, type ProductInput } from "@/services/productService";
import { getCategories, type Category } from "@/services/categoryService";

type Props = {
  setShowForm: (value: boolean) => void;
  onAdded?: (newProd: ProductInput) => void;
};

export function FormAddProduct({ setShowForm, onAdded }: Props) {
  // State cho từng field
  const [productName, setProductName] = useState("");
  const [categoryId, setCategoryId] = useState<string>("1");
  const [pricePerM2, setPricePerM2] = useState<number>(0);
  const [submitting, setSubmitting] = useState(false);
  const [category, setCagtegory] = useState<Category[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getCategories(); //
        setCagtegory(response);
      } catch (error) {
        console.error("Error fetching DATA:", error);
      }
    }
    fetchData();
  }, []);

 const validate = (): boolean => {
    if (!productName.trim()) {
      alert("Tên sản phẩm không được để trống.");
      return false;
    }
    if (productName.length > 100) {
      alert("Tên sản phẩm không thể dài hơn 100 ký tự.");
      return false;
    }
    if (pricePerM2 <= 0) {
      alert("Giá phải lớn hơn 0.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);

    const payload: ProductInput = {
      productName,
      categoryId: parseInt(categoryId, 10),
      pricePerM2,
      status: 0,
    };
    const result = await AddProduct(payload);
    setSubmitting(false);
    if (result) {
      onAdded?.(payload);
      setShowForm(false);
    } else {
      alert("Thêm sản phẩm thất bại");
    }
  };

  return (
    <Card className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <Card className="relative w-full max-w-xl rounded-xl bg-white p-6 shadow-lg">
        <CardHeader className="text-center text-2xl font-bold">
          Thêm sản phẩm
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit}>
            <Label>Chọn loại kính</Label>
            <Select value={categoryId} onValueChange={(v) => setCategoryId(v)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Chọn loại kính" />
              </SelectTrigger>
              <SelectContent>
                {/* Giả sử có 3 loại */}
                {category.map((cate) =>{
                  const valueId:string = cate.id.toString();
                  return(
                  <SelectGroup>
                    <SelectItem value={valueId}>{cate.categoryName}</SelectItem>
                  </SelectGroup>
                )})}
              </SelectContent>
            </Select>

            <Label className="mt-4">Tên sản phẩm</Label>
            <Input
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="Nhập tên sản phẩm"
              required
            />

            <Label className="mt-4">Giá bán (₫/m²)</Label>
            <Input
              type="number"
              value={pricePerM2}
              onChange={(e) => setPricePerM2(+e.target.value)}
              placeholder="Nhập giá sản phẩm"
              required
            />

            <Button type="submit" className="mt-6 w-full" disabled={submitting}>
              {submitting ? "Đang xử lý..." : "Thêm sản phẩm"}
            </Button>
            <Button
              type="button"
              variant="outline"
              className="mt-2 w-full"
              onClick={() => setShowForm(false)}
            >
              Hủy
            </Button>
          </form>
        </CardContent>
      </Card>
    </Card>
  );
}
