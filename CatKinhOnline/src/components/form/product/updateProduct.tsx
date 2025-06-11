import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { updateProduct, type ProductInput } from "@/services/productService";
import { getCategories, type Category } from "@/services/categoryService";

type Props = {
  productId: number;
  initialData: {
    productName: string;
    categoryId: number;
    pricePerM2: number;
    status: number;
  };
  setShowForm: (value: boolean) => void;
  onUpdated?: () => void;
};

export function FormUpdateProduct({
  productId,
  initialData,
  setShowForm,
  onUpdated,
}: Props) {
  const [productName, setProductName] = useState(initialData.productName);
  const [categoryId, setCategoryId] = useState<string>(
    initialData.categoryId.toString()
  );
  const [pricePerM2, setPricePerM2] = useState<number>(initialData.pricePerM2);
  const [status, setStatus] = useState<string>(
    initialData.status.toString()
  );
  const [categories, setCategories] = useState<Category[]>([]);
  const [submitting, setSubmitting] = useState(false);

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

  const validate = (): boolean => {
    if (!productName.trim() || productName.length > 100) return false;
    if (pricePerM2 <= 0) return false;
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      alert("Vui lòng kiểm tra lại thông tin nhập");
      return;
    }
    setSubmitting(true);

    const payload: ProductInput = {
      productName,
      categoryId: parseInt(categoryId, 10),
      pricePerM2,
      status: parseInt(status, 10),
    };
    try {
      await updateProduct(productId, payload);
      onUpdated?.();
      setShowForm(false);
    } catch (error) {
      console.error(error);
      alert("Cập nhật thất bại");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <Card className="relative w-full max-w-xl rounded-xl bg-white p-6 shadow-lg">
        <CardHeader className="text-center text-2xl font-bold">
          Cập nhật sản phẩm
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Label>Chọn loại kính</Label>
            <Select value={categoryId} onValueChange={(v) => setCategoryId(v)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Chọn loại kính" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Loại Kính</SelectLabel>
                  {categories.map((cate) => (
                    <SelectItem
                      key={cate.id}
                      value={cate.id.toString()}
                    >
                      {cate.categoryName}
                    </SelectItem>
                  ))}
                </SelectGroup>
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

            <Label className="mt-4">Trạng thái</Label>
            <Select value={status} onValueChange={(v) => setStatus(v)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Chọn trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Còn hàng</SelectItem>
                <SelectItem value="0">Hết hàng</SelectItem>
              </SelectContent>
            </Select>

            <Button
              type="submit"
              className="mt-6 w-full"
              disabled={submitting}
            >
              {submitting ? "Đang cập nhật..." : "Cập nhật sản phẩm"}
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
