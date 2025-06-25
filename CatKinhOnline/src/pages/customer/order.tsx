import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowRight,
  Calculator,
  CheckCircle,
  Clock,
  CreditCard,
  Package,
  Plus,
  Shield,
  Store,
  Trash2,
  Truck,
} from "lucide-react";
import { useMemo, useState } from "react";
interface GlassItem {
  id: number;
  type: string;
  width: string;
  height: string;
  quantity: number;
  price: number;
}
function Order() {
  const [currentStep, setCurrentStep] = useState(1);
  const [glassItems, setGlassItems] = useState<GlassItem[]>([
    { id: 1, type: "", width: "", height: "", quantity: 1, price: 0 },
  ]);
  const [deliveryMethod, setDeliveryMethod] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    notes: "",
  });

  const glassTypes = [
    { value: "tempered", label: "Kính cường lực", price: 300000 },
    { value: "frosted", label: "Kính bông", price: 250000 },
    { value: "clear4", label: "Kính trắng 4 ly", price: 200000 },
    { value: "clear5", label: "Kính trắng 5 ly", price: 220000 },
    { value: "clear8", label: "Kính trắng 8 ly", price: 260000 },
  ];

  const steps = [
    { number: 1, title: "Chọn kính", desc: "Chọn loại kính và kích thước" },
    { number: 2, title: "Thông tin", desc: "Nhập thông tin khách hàng" },
    { number: 3, title: "Thanh toán", desc: "Chọn phương thức thanh toán" },
    { number: 4, title: "Xác nhận", desc: "Xem lại và xác nhận đơn hàng" },
  ];

  const addGlassItem = () => {
    const newId = Math.max(...glassItems.map((item) => item.id)) + 1;
    setGlassItems([
      ...glassItems,
      { id: newId, type: "", width: "", height: "", quantity: 1, price: 0 },
    ]);
  };

  const removeGlassItem = (id: number) => {
    if (glassItems.length > 1) {
      setGlassItems(glassItems.filter((item) => item.id !== id));
    }
  };

  const updateGlassItem = (id: number, field: keyof GlassItem, value: string | number) => {
    setGlassItems(
      glassItems.map((item) => {
        if (item.id === id) {
          const updatedItem = { ...item, [field]: value };
          if (field === "type") {
            const glassType = glassTypes.find((type) => type.value === value);
            updatedItem.price = glassType ? glassType.price : 0;
          }
          return updatedItem;
        }
        return item;
      }),
    );
  };

  const totalAmount = useMemo(() => {
    return glassItems.reduce((total, item) => {
      const width = Number.parseFloat(item.width) || 0;
      const height = Number.parseFloat(item.height) || 0;
      const area = width * height * item.quantity;
      return total + area * item.price;
    }, 0);
  }, [glassItems]);

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };
  return (
    <>
      <main >
        {/* Progress Steps */}
        <div className="mb-12 flex w-full justify-center mx-auto">
          <div className="flex flex-col md:flex-row items-center md:space-x-4 rounded-2xl border border-emerald-100 bg-white/70 p-6 shadow-lg backdrop-blur-md md:space-y-0 space-y-8">
            {steps.map((step, idx) => (
              <div key={step.number} className="flex flex-col md:flex-row items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-full text-sm font-bold transition-all duration-300 ${
                      currentStep >= step.number
                        ? "bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-lg"
                        : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {currentStep > step.number ? (
                      <CheckCircle className="h-6 w-6" />
                    ) : (
                      step.number
                    )}
                  </div>
                  <div className="mt-2 text-center">
                    <div className="text-sm font-semibold text-gray-800">
                      {step.title}
                    </div>
                    <div className="text-xs text-gray-500">{step.desc}</div>
                  </div>
                </div>
                {idx < steps.length - 1 && (
                  <div
                    className={`my-4 h-16 w-1 rounded-full transition-all duration-300 md:mx-4 md:h-1 md:w-16 md:my-0 ${
                      currentStep > step.number
                        ? "bg-gradient-to-b md:bg-gradient-to-r from-emerald-500 to-teal-500"
                        : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mx-auto mb-16 grid max-w-7xl grid-cols-1 gap-8 px-4 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Card className="border-0  bg-gradient-to-br from-white to-emerald-50/30 shadow-2xl">
              <CardContent className="p-8">
                {/* Step 1: Glass Selection */}
                {currentStep === 1 && (
                  <div>
                    <div className="mb-8 flex items-center">
                      <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 text-white">
                        <Package className="h-6 w-6" />
                      </div>
                      <div>
                        <h2 className="text-3xl font-bold text-gray-800">
                          Chọn loại kính
                        </h2>
                        <p className="text-gray-600">
                          Thêm các loại kính bạn muốn đặt
                        </p>
                      </div>
                    </div>

                    <div className="space-y-6">
                      {glassItems.map((item, index) => (
                        <Card
                          key={item.id}
                          className="border border-emerald-200 shadow-lg transition-all duration-300 hover:shadow-xl"
                        >
                          <CardContent className="p-4">
                            <div className="mb-4 flex items-center justify-between">
                              <h3 className="text-lg font-semibold text-emerald-700">
                                Kính #{index + 1}
                              </h3>
                              {glassItems.length > 1 && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => removeGlassItem(item.id)}
                                  className="border-red-200 text-red-600 hover:bg-red-50"
                                >
                                  <Trash2 className="mr-1 h-4 w-4" />
                                  Xóa
                                </Button>
                              )}
                            </div>

                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                              <div>
                                <Label className="mb-2 block text-sm font-medium text-gray-700">
                                  Loại kính
                                </Label>
                                <Select
                                  value={item.type}
                                  onValueChange={(value) =>
                                    updateGlassItem(item.id, "type", value)
                                  }
                                >
                                  <SelectTrigger className="border-emerald-200 focus:border-emerald-500">
                                    <SelectValue placeholder="Chọn loại kính" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {glassTypes.map((type) => (
                                      <SelectItem
                                        key={type.value}
                                        value={type.value}
                                      >
                                        <div className="flex w-full items-center justify-between">
                                          <span>{type.label}</span>
                                          <span className="ml-4 font-semibold text-emerald-600">
                                            {type.price.toLocaleString()}₫/m²
                                          </span>
                                        </div>
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>

                              <div className="grid grid-cols-3 gap-2">
                                <div>
                                  <Label className="mb-2 block text-sm font-medium text-gray-700">
                                    Rộng (m)
                                  </Label>
                                  <Input
                                    type="number"
                                    step="0.1"
                                    placeholder="0.0"
                                    value={item.width}
                                    onChange={(e) =>
                                      updateGlassItem(
                                        item.id,
                                        "width",
                                        e.target.value,
                                      )
                                    }
                                    className="border-emerald-200 focus:border-emerald-500"
                                  />
                                </div>
                                <div>
                                  <Label className="mb-2 block text-sm font-medium text-gray-700">
                                    Dài (m)
                                  </Label>
                                  <Input
                                    type="number"
                                    step="0.1"
                                    placeholder="0.0"
                                    value={item.height}
                                    onChange={(e) =>
                                      updateGlassItem(
                                        item.id,
                                        "height",
                                        e.target.value,
                                      )
                                    }
                                    className="border-emerald-200 focus:border-emerald-500"
                                  />
                                </div>
                                <div>
                                  <Label className="mb-2 block text-sm font-medium text-gray-700">
                                    Số lượng
                                  </Label>
                                  <Input
                                    type="number"
                                    min="1"
                                    value={item.quantity}
                                    onChange={(e) =>
                                      updateGlassItem(
                                        item.id,
                                        "quantity",
                                        Number.parseInt(e.target.value) || 1,
                                      )
                                    }
                                    className="border-emerald-200 focus:border-emerald-500"
                                  />
                                </div>
                              </div>
                            </div>

                            {item.type && item.width && item.height && (
                              <div className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 p-3">
                                <div className="flex items-center justify-between">
                                  <span className="text-sm text-emerald-700">
                                    {item.quantity} ×{" "}
                                    {
                                      glassTypes.find(
                                        (t) => t.value === item.type,
                                      )?.label
                                    }{" "}
                                    ({item.width}m × {item.height}m)
                                  </span>
                                  <span className="font-semibold text-emerald-800">
                                    {(
                                      Number.parseFloat(item.width) *
                                      Number.parseFloat(item.height) *
                                      item.quantity *
                                      item.price
                                    ).toLocaleString()}
                                    ₫
                                  </span>
                                </div>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      ))}

                      <Button
                        onClick={addGlassItem}
                        variant="outline"
                        className="w-full border-2 border-dashed border-emerald-300 py-6 text-emerald-700 hover:bg-emerald-50"
                      >
                        <Plus className="mr-2 h-5 w-5" />
                        Thêm loại kính khác
                      </Button>
                    </div>
                  </div>
                )}

                {/* Step 2: Customer Information */}
                {currentStep === 2 && (
                  <div>
                    <div className="mb-8 flex items-center">
                      <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 text-white">
                        <Store className="h-6 w-6" />
                      </div>
                      <div>
                        <h2 className="text-3xl font-bold text-gray-800">
                          Thông tin khách hàng
                        </h2>
                        <p className="text-gray-600">
                          Nhập thông tin để chúng tôi liên hệ và giao hàng
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      <div>
                        <Label className="mb-2 block text-sm font-medium text-gray-700">
                          Họ và tên *
                        </Label>
                        <Input
                          placeholder="Nhập họ và tên"
                          value={customerInfo.name}
                          onChange={(e) =>
                            setCustomerInfo({
                              ...customerInfo,
                              name: e.target.value,
                            })
                          }
                          className="border-emerald-200 focus:border-emerald-500"
                        />
                      </div>
                      <div>
                        <Label className="mb-2 block text-sm font-medium text-gray-700">
                          Số điện thoại *
                        </Label>
                        <Input
                          placeholder="Nhập số điện thoại"
                          value={customerInfo.phone}
                          onChange={(e) =>
                            setCustomerInfo({
                              ...customerInfo,
                              phone: e.target.value,
                            })
                          }
                          className="border-emerald-200 focus:border-emerald-500"
                        />
                      </div>
                      <div>
                        <Label className="mb-2 block text-sm font-medium text-gray-700">
                          Email
                        </Label>
                        <Input
                          type="email"
                          placeholder="Nhập email"
                          value={customerInfo.email}
                          onChange={(e) =>
                            setCustomerInfo({
                              ...customerInfo,
                              email: e.target.value,
                            })
                          }
                          className="border-emerald-200 focus:border-emerald-500"
                        />
                      </div>
                      <div>
                        <Label className="mb-2 block text-sm font-medium text-gray-700">
                          Phương thức nhận hàng *
                        </Label>
                        <Select
                          value={deliveryMethod}
                          onValueChange={setDeliveryMethod}
                        >
                          <SelectTrigger className="border-emerald-200 focus:border-emerald-500">
                            <SelectValue placeholder="Chọn phương thức nhận hàng" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pickup">
                              <div className="flex items-center">
                                <Package className="mr-2 h-4 w-4" />
                                Nhận tại cửa hàng
                              </div>
                            </SelectItem>
                            <SelectItem value="delivery">
                              <div className="flex items-center">
                                <Truck className="mr-2 h-4 w-4" />
                                Giao hàng tận nơi
                              </div>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {deliveryMethod === "delivery" && (
                      <div className="mt-6">
                        <Label className="mb-2 block text-sm font-medium text-gray-700">
                          Địa chỉ giao hàng *
                        </Label>
                        <Textarea
                          placeholder="Nhập địa chỉ chi tiết"
                          value={customerInfo.address}
                          onChange={(e) =>
                            setCustomerInfo({
                              ...customerInfo,
                              address: e.target.value,
                            })
                          }
                          className="border-emerald-200 focus:border-emerald-500"
                          rows={3}
                        />
                      </div>
                    )}

                    <div className="mt-6">
                      <Label className="mb-2 block text-sm font-medium text-gray-700">
                        Ghi chú
                      </Label>
                      <Textarea
                        placeholder="Ghi chú thêm về đơn hàng (tùy chọn)"
                        value={customerInfo.notes}
                        onChange={(e) =>
                          setCustomerInfo({
                            ...customerInfo,
                            notes: e.target.value,
                          })
                        }
                        className="border-emerald-200 focus:border-emerald-500"
                        rows={3}
                      />
                    </div>
                  </div>
                )}

                {/* Step 3: Payment Method */}
                {currentStep === 3 && (
                  <div>
                    <div className="mb-8 flex items-center">
                      <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 text-white">
                        <CreditCard className="h-6 w-6" />
                      </div>
                      <div>
                        <h2 className="text-3xl font-bold text-gray-800">
                          Phương thức thanh toán
                        </h2>
                        <p className="text-gray-600">
                          Chọn cách thức thanh toán phù hợp
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      <Card
                        className={`cursor-pointer border-2 transition-all duration-300 hover:shadow-lg ${
                          paymentMethod === "cash"
                            ? "border-emerald-500 bg-emerald-50"
                            : "border-gray-200"
                        }`}
                        onClick={() => setPaymentMethod("cash")}
                      >
                        <CardContent className="p-6 text-center">
                          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 text-white">
                            <Package className="h-8 w-8" />
                          </div>
                          <h3 className="mb-2 text-xl font-bold text-gray-800">
                            Tiền mặt khi nhận
                          </h3>
                          <p className="text-sm text-gray-600">
                            Thanh toán khi nhận hàng tại cửa hàng hoặc khi giao
                            hàng
                          </p>
                          <Badge className="mt-3 bg-green-100 text-green-700">
                            Phổ biến
                          </Badge>
                        </CardContent>
                      </Card>

                      <Card
                        className={`cursor-pointer border-2 transition-all duration-300 hover:shadow-lg ${
                          paymentMethod === "online"
                            ? "border-emerald-500 bg-emerald-50"
                            : "border-gray-200"
                        }`}
                        onClick={() => setPaymentMethod("online")}
                      >
                        <CardContent className="p-6 text-center">
                          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 text-white">
                            <CreditCard className="h-8 w-8" />
                          </div>
                          <h3 className="mb-2 text-xl font-bold text-gray-800">
                            Thanh toán trực tuyến
                          </h3>
                          <p className="text-sm text-gray-600">
                            Chuyển khoản ngân hàng hoặc ví điện tử
                          </p>
                          <Badge className="mt-3 bg-blue-100 text-blue-700">
                            Nhanh chóng
                          </Badge>
                        </CardContent>
                      </Card>
                    </div>

                    {paymentMethod === "online" && (
                      <Card className="mt-6 border border-blue-200 bg-blue-50">
                        <CardContent className="p-6">
                          <h4 className="mb-4 font-bold text-blue-800">
                            Thông tin chuyển khoản
                          </h4>
                          <div className="space-y-2 text-sm">
                            <p>
                              <strong>Ngân hàng:</strong> Vietcombank
                            </p>
                            <p>
                              <strong>Số tài khoản:</strong> 1234567890
                            </p>
                            <p>
                              <strong>Chủ tài khoản:</strong> Nguyễn Quốc Hoàng
                            </p>
                            <p>
                              <strong>Nội dung:</strong> Thanh toan don hang [Số
                              điện thoại]
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                )}

                {/* Step 4: Order Confirmation */}
                {currentStep === 4 && (
                  <div>
                    <div className="mb-8 flex items-center">
                      <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 text-white">
                        <CheckCircle className="h-6 w-6" />
                      </div>
                      <div>
                        <h2 className="text-3xl font-bold text-gray-800">
                          Xác nhận đơn hàng
                        </h2>
                        <p className="text-gray-600">
                          Kiểm tra lại thông tin trước khi đặt hàng
                        </p>
                      </div>
                    </div>

                    <div className="space-y-6">
                      {/* Order Summary */}
                      <Card className="border border-emerald-200">
                        <CardContent className="p-6">
                          <h3 className="mb-4 text-xl font-bold text-gray-800">
                            Chi tiết đơn hàng
                          </h3>
                          <div className="space-y-3">
                            {glassItems.map((item) => {
                              const glassType = glassTypes.find(
                                (t) => t.value === item.type,
                              );
                              const itemTotal =
                                Number.parseFloat(item.width) *
                                Number.parseFloat(item.height) *
                                item.quantity *
                                item.price;
                              return (
                                <div
                                  key={item.id}
                                  className="flex items-center justify-between border-b border-gray-100 py-2"
                                >
                                  <div>
                                    <span className="font-medium">
                                      {glassType?.label}
                                    </span>
                                    <span className="ml-2 text-sm text-gray-500">
                                      ({item.width}m × {item.height}m ×{" "}
                                      {item.quantity})
                                    </span>
                                  </div>
                                  <span className="font-semibold">
                                    {itemTotal.toLocaleString()}₫
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        </CardContent>
                      </Card>

                      {/* Customer Info */}
                      <Card className="border border-emerald-200">
                        <CardContent className="p-6">
                          <h3 className="mb-4 text-xl font-bold text-gray-800">
                            Thông tin khách hàng
                          </h3>
                          <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-2">
                            <div>
                              <strong>Họ tên:</strong> {customerInfo.name}
                            </div>
                            <div>
                              <strong>Điện thoại:</strong> {customerInfo.phone}
                            </div>
                            <div>
                              <strong>Email:</strong>{" "}
                              {customerInfo.email || "Không có"}
                            </div>
                            <div>
                              <strong>Nhận hàng:</strong>{" "}
                              {deliveryMethod === "pickup"
                                ? "Tại cửa hàng"
                                : "Giao tận nơi"}
                            </div>
                            {deliveryMethod === "delivery" && (
                              <div className="md:col-span-2">
                                <strong>Địa chỉ:</strong> {customerInfo.address}
                              </div>
                            )}
                            {customerInfo.notes && (
                              <div className="md:col-span-2">
                                <strong>Ghi chú:</strong> {customerInfo.notes}
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="mt-8 flex justify-between">
                  <Button
                    variant="outline"
                    onClick={prevStep}
                    disabled={currentStep === 1}
                    className="border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                  >
                    Quay lại
                  </Button>
                  <Button
                    onClick={
                      currentStep === 4
                        ? () => alert("Đặt hàng thành công!")
                        : nextStep
                    }
                    className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg transition-all duration-300 hover:from-emerald-700 hover:to-teal-700 hover:shadow-xl"
                  >
                    {currentStep === 4 ? (
                      <>
                        <CheckCircle className="mr-2 h-5 w-5" />
                        Xác nhận đặt hàng
                      </>
                    ) : (
                      <>
                        Tiếp tục
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24 border-0 bg-gradient-to-br from-white to-emerald-50/30 shadow-2xl">
              <CardContent className="p-6">
                <div className="mb-6 flex items-center">
                  <Calculator className="mr-2 h-6 w-6 text-emerald-600" />
                  <h3 className="text-xl font-bold text-gray-800">
                    Tóm tắt đơn hàng
                  </h3>
                </div>

                <div className="space-y-4">
                  {glassItems.map((item) => {
                    if (!item.type || !item.width || !item.height) return null;
                    const glassType = glassTypes.find(
                      (t) => t.value === item.type,
                    );
                    const itemTotal =
                      Number.parseFloat(item.width) *
                      Number.parseFloat(item.height) *
                      item.quantity *
                      item.price;
                    return (
                      <div
                        key={item.id}
                        className="rounded-lg border border-emerald-100 bg-white p-3"
                      >
                        <div className="text-sm font-medium text-gray-800">
                          {glassType?.label}
                        </div>
                        <div className="text-xs text-gray-500">
                          {item.quantity} × ({item.width}m × {item.height}m)
                        </div>
                        <div className="text-right font-semibold text-emerald-700">
                          {itemTotal.toLocaleString()}₫
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-6 border-t border-emerald-200 pt-6">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="text-lg font-semibold text-gray-800">
                      Tổng cộng:
                    </span>
                    <span className="text-2xl font-bold text-emerald-700">
                      {totalAmount.toLocaleString()}₫
                    </span>
                  </div>

                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Shield className="mr-2 h-4 w-4 text-emerald-500" />
                      Bảo hành 2 năm
                    </div>
                    <div className="flex items-center">
                      <Truck className="mr-2 h-4 w-4 text-emerald-500" />
                      Giao hàng miễn phí nội thành
                    </div>
                    <div className="flex items-center">
                      <Clock className="mr-2 h-4 w-4 text-emerald-500" />
                      Hoàn thành trong 2-3 ngày
                    </div>
                  </div>
                </div>

                <div className="mt-6 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 p-4 text-center text-white">
                  <div className="text-sm opacity-90">Tiết kiệm được</div>
                  <div className="text-xl font-bold">15%</div>
                  <div className="text-xs opacity-90">
                    so với giá thị trường
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </>
  );
}
export default Order;
