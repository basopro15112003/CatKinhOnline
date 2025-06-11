import { BreadcrumbComponent } from "@/components/personal/breadcrumb";
import { Footer } from "@/components/personal/footer";
import { Header } from "@/components/personal/header";
import NavigationComponent from "@/components/personal/navigation";
import { Price } from "@/components/personal/price";
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
import { ArrowRight, Calculator, CheckCircle, Clock, CreditCard, Package, Plus, Shield, Store, Trash2, Truck } from "lucide-react";
import { useMemo, useState } from "react";
interface GlassItem {
  id: number
  type: string
  width: string
  height: string
  quantity: number
  price: number
}
function Order() {
  
   const [currentStep, setCurrentStep] = useState(1)
  const [glassItems, setGlassItems] = useState<GlassItem[]>([
    { id: 1, type: "", width: "", height: "", quantity: 1, price: 0 },
  ])
  const [deliveryMethod, setDeliveryMethod] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("")
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    notes: "",
  })

  const glassTypes = [
    { value: "tempered", label: "Kính cường lực", price: 300000 },
    { value: "frosted", label: "Kính bông", price: 250000 },
    { value: "clear4", label: "Kính trắng 4 ly", price: 200000 },
    { value: "clear5", label: "Kính trắng 5 ly", price: 220000 },
    { value: "clear8", label: "Kính trắng 8 ly", price: 260000 },
  ]

  const steps = [
    { number: 1, title: "Chọn kính", desc: "Chọn loại kính và kích thước" },
    { number: 2, title: "Thông tin", desc: "Nhập thông tin khách hàng" },
    { number: 3, title: "Thanh toán", desc: "Chọn phương thức thanh toán" },
    { number: 4, title: "Xác nhận", desc: "Xem lại và xác nhận đơn hàng" },
  ]

  const addGlassItem = () => {
    const newId = Math.max(...glassItems.map((item) => item.id)) + 1
    setGlassItems([...glassItems, { id: newId, type: "", width: "", height: "", quantity: 1, price: 0 }])
  }

  const removeGlassItem = (id: number) => {
    if (glassItems.length > 1) {
      setGlassItems(glassItems.filter((item) => item.id !== id))
    }
  }

  const updateGlassItem = (id: number, field: keyof GlassItem, value: any) => {
    setGlassItems(
      glassItems.map((item) => {
        if (item.id === id) {
          const updatedItem = { ...item, [field]: value }
          if (field === "type") {
            const glassType = glassTypes.find((type) => type.value === value)
            updatedItem.price = glassType ? glassType.price : 0
          }
          return updatedItem
        }
        return item
      }),
    )
  }

  const totalAmount = useMemo(() => {
    return glassItems.reduce((total, item) => {
      const width = Number.parseFloat(item.width) || 0
      const height = Number.parseFloat(item.height) || 0
      const area = width * height * item.quantity
      return total + area * item.price
    }, 0)
  }, [glassItems])

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1)
  }

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }
  return (
    <>
      <main className="min-h-screen  bg-gradient-to-tr from-green-200 via-emerald-50 to-green-300 ">
        <Header></Header>
        <NavigationComponent></NavigationComponent>
               {/* Progress Steps */}
          <div className="flex justify-center mb-12">
            <div className="flex items-center space-x-4 bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-emerald-100">
              {steps.map((step, idx) => (
                <div key={step.number} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                        currentStep >= step.number
                          ? "bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-lg"
                          : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      {currentStep > step.number ? <CheckCircle className="w-6 h-6" /> : step.number}
                    </div>
                    <div className="mt-2 text-center">
                      <div className="font-semibold text-sm text-gray-800">{step.title}</div>
                      <div className="text-xs text-gray-500">{step.desc}</div>
                    </div>
                  </div>
                  {idx < steps.length - 1 && (
                    <div
                      className={`w-16 h-1 mx-4 rounded-full transition-all duration-300 ${
                        currentStep > step.number ? "bg-gradient-to-r from-emerald-500 to-teal-500" : "bg-gray-200"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 max-w-7xl mx-auto gap-8 px-4 mb-16">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-2xl bg-gradient-to-br from-white to-emerald-50/30">
              <CardContent className="p-8">
                {/* Step 1: Glass Selection */}
                {currentStep === 1 && (
                  <div>
                    <div className="flex items-center mb-8">
                      <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center text-white mr-4">
                        <Package className="w-6 h-6" />
                      </div>
                      <div>
                        <h2 className="text-3xl font-bold text-gray-800">Chọn loại kính</h2>
                        <p className="text-gray-600">Thêm các loại kính bạn muốn đặt</p>
                      </div>
                    </div>

                    <div className="space-y-6">
                      {glassItems.map((item, index) => (
                        <Card
                          key={item.id}
                          className="border border-emerald-200 shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                          <CardContent className="p-6">
                            <div className="flex justify-between items-center mb-4">
                              <h3 className="text-lg font-semibold text-emerald-700">Kính #{index + 1}</h3>
                              {glassItems.length > 1 && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => removeGlassItem(item.id)}
                                  className="text-red-600 border-red-200 hover:bg-red-50"
                                >
                                  <Trash2 className="w-4 h-4 mr-1" />
                                  Xóa
                                </Button>
                              )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <Label className="text-sm font-medium text-gray-700 mb-2 block">Loại kính</Label>
                                <Select
                                  value={item.type}
                                  onValueChange={(value) => updateGlassItem(item.id, "type", value)}
                                >
                                  <SelectTrigger className="border-emerald-200 focus:border-emerald-500">
                                    <SelectValue placeholder="Chọn loại kính" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {glassTypes.map((type) => (
                                      <SelectItem key={type.value} value={type.value}>
                                        <div className="flex justify-between items-center w-full">
                                          <span>{type.label}</span>
                                          <span className="text-emerald-600 font-semibold ml-4">
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
                                  <Label className="text-sm font-medium text-gray-700 mb-2 block">Rộng (m)</Label>
                                  <Input
                                    type="number"
                                    step="0.1"
                                    placeholder="0.0"
                                    value={item.width}
                                    onChange={(e) => updateGlassItem(item.id, "width", e.target.value)}
                                    className="border-emerald-200 focus:border-emerald-500"
                                  />
                                </div>
                                <div>
                                  <Label className="text-sm font-medium text-gray-700 mb-2 block">Dài (m)</Label>
                                  <Input
                                    type="number"
                                    step="0.1"
                                    placeholder="0.0"
                                    value={item.height}
                                    onChange={(e) => updateGlassItem(item.id, "height", e.target.value)}
                                    className="border-emerald-200 focus:border-emerald-500"
                                  />
                                </div>
                                <div>
                                  <Label className="text-sm font-medium text-gray-700 mb-2 block">Số lượng</Label>
                                  <Input
                                    type="number"
                                    min="1"
                                    value={item.quantity}
                                    onChange={(e) =>
                                      updateGlassItem(item.id, "quantity", Number.parseInt(e.target.value) || 1)
                                    }
                                    className="border-emerald-200 focus:border-emerald-500"
                                  />
                                </div>
                              </div>
                            </div>

                            {item.type && item.width && item.height && (
                              <div className="mt-4 p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                                <div className="flex justify-between items-center">
                                  <span className="text-sm text-emerald-700">
                                    {item.quantity} × {glassTypes.find((t) => t.value === item.type)?.label} (
                                    {item.width}m × {item.height}m)
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
                        className="w-full border-2 border-dashed border-emerald-300 text-emerald-700 hover:bg-emerald-50 py-6"
                      >
                        <Plus className="w-5 h-5 mr-2" />
                        Thêm loại kính khác
                      </Button>
                    </div>
                  </div>
                )}

                {/* Step 2: Customer Information */}
                {currentStep === 2 && (
                  <div>
                    <div className="flex items-center mb-8">
                      <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center text-white mr-4">
                        <Store className="w-6 h-6" />
                      </div>
                      <div>
                        <h2 className="text-3xl font-bold text-gray-800">Thông tin khách hàng</h2>
                        <p className="text-gray-600">Nhập thông tin để chúng tôi liên hệ và giao hàng</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-2 block">Họ và tên *</Label>
                        <Input
                          placeholder="Nhập họ và tên"
                          value={customerInfo.name}
                          onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                          className="border-emerald-200 focus:border-emerald-500"
                        />
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-2 block">Số điện thoại *</Label>
                        <Input
                          placeholder="Nhập số điện thoại"
                          value={customerInfo.phone}
                          onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                          className="border-emerald-200 focus:border-emerald-500"
                        />
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-2 block">Email</Label>
                        <Input
                          type="email"
                          placeholder="Nhập email"
                          value={customerInfo.email}
                          onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                          className="border-emerald-200 focus:border-emerald-500"
                        />
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-2 block">Phương thức nhận hàng *</Label>
                        <Select value={deliveryMethod} onValueChange={setDeliveryMethod}>
                          <SelectTrigger className="border-emerald-200 focus:border-emerald-500">
                            <SelectValue placeholder="Chọn phương thức nhận hàng" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pickup">
                              <div className="flex items-center">
                                <Package className="w-4 h-4 mr-2" />
                                Nhận tại cửa hàng
                              </div>
                            </SelectItem>
                            <SelectItem value="delivery">
                              <div className="flex items-center">
                                <Truck className="w-4 h-4 mr-2" />
                                Giao hàng tận nơi
                              </div>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {deliveryMethod === "delivery" && (
                      <div className="mt-6">
                        <Label className="text-sm font-medium text-gray-700 mb-2 block">Địa chỉ giao hàng *</Label>
                        <Textarea
                          placeholder="Nhập địa chỉ chi tiết"
                          value={customerInfo.address}
                          onChange={(e) => setCustomerInfo({ ...customerInfo, address: e.target.value })}
                          className="border-emerald-200 focus:border-emerald-500"
                          rows={3}
                        />
                      </div>
                    )}

                    <div className="mt-6">
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">Ghi chú</Label>
                      <Textarea
                        placeholder="Ghi chú thêm về đơn hàng (tùy chọn)"
                        value={customerInfo.notes}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, notes: e.target.value })}
                        className="border-emerald-200 focus:border-emerald-500"
                        rows={3}
                      />
                    </div>
                  </div>
                )}

                {/* Step 3: Payment Method */}
                {currentStep === 3 && (
                  <div>
                    <div className="flex items-center mb-8">
                      <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center text-white mr-4">
                        <CreditCard className="w-6 h-6" />
                      </div>
                      <div>
                        <h2 className="text-3xl font-bold text-gray-800">Phương thức thanh toán</h2>
                        <p className="text-gray-600">Chọn cách thức thanh toán phù hợp</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card
                        className={`cursor-pointer border-2 transition-all duration-300 hover:shadow-lg ${
                          paymentMethod === "cash" ? "border-emerald-500 bg-emerald-50" : "border-gray-200"
                        }`}
                        onClick={() => setPaymentMethod("cash")}
                      >
                        <CardContent className="p-6 text-center">
                          <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center text-white mx-auto mb-4">
                            <Package className="w-8 h-8" />
                          </div>
                          <h3 className="text-xl font-bold text-gray-800 mb-2">Tiền mặt khi nhận</h3>
                          <p className="text-gray-600 text-sm">
                            Thanh toán khi nhận hàng tại cửa hàng hoặc khi giao hàng
                          </p>
                          <Badge className="mt-3 bg-green-100 text-green-700">Phổ biến</Badge>
                        </CardContent>
                      </Card>

                      <Card
                        className={`cursor-pointer border-2 transition-all duration-300 hover:shadow-lg ${
                          paymentMethod === "online" ? "border-emerald-500 bg-emerald-50" : "border-gray-200"
                        }`}
                        onClick={() => setPaymentMethod("online")}
                      >
                        <CardContent className="p-6 text-center">
                          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center text-white mx-auto mb-4">
                            <CreditCard className="w-8 h-8" />
                          </div>
                          <h3 className="text-xl font-bold text-gray-800 mb-2">Thanh toán trực tuyến</h3>
                          <p className="text-gray-600 text-sm">Chuyển khoản ngân hàng hoặc ví điện tử</p>
                          <Badge className="mt-3 bg-blue-100 text-blue-700">Nhanh chóng</Badge>
                        </CardContent>
                      </Card>
                    </div>

                    {paymentMethod === "online" && (
                      <Card className="mt-6 border border-blue-200 bg-blue-50">
                        <CardContent className="p-6">
                          <h4 className="font-bold text-blue-800 mb-4">Thông tin chuyển khoản</h4>
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
                              <strong>Nội dung:</strong> Thanh toan don hang [Số điện thoại]
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
                    <div className="flex items-center mb-8">
                      <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center text-white mr-4">
                        <CheckCircle className="w-6 h-6" />
                      </div>
                      <div>
                        <h2 className="text-3xl font-bold text-gray-800">Xác nhận đơn hàng</h2>
                        <p className="text-gray-600">Kiểm tra lại thông tin trước khi đặt hàng</p>
                      </div>
                    </div>

                    <div className="space-y-6">
                      {/* Order Summary */}
                      <Card className="border border-emerald-200">
                        <CardContent className="p-6">
                          <h3 className="text-xl font-bold text-gray-800 mb-4">Chi tiết đơn hàng</h3>
                          <div className="space-y-3">
                            {glassItems.map((item, index) => {
                              const glassType = glassTypes.find((t) => t.value === item.type)
                              const itemTotal =
                                Number.parseFloat(item.width) *
                                Number.parseFloat(item.height) *
                                item.quantity *
                                item.price
                              return (
                                <div
                                  key={item.id}
                                  className="flex justify-between items-center py-2 border-b border-gray-100"
                                >
                                  <div>
                                    <span className="font-medium">{glassType?.label}</span>
                                    <span className="text-gray-500 text-sm ml-2">
                                      ({item.width}m × {item.height}m × {item.quantity})
                                    </span>
                                  </div>
                                  <span className="font-semibold">{itemTotal.toLocaleString()}₫</span>
                                </div>
                              )
                            })}
                          </div>
                        </CardContent>
                      </Card>

                      {/* Customer Info */}
                      <Card className="border border-emerald-200">
                        <CardContent className="p-6">
                          <h3 className="text-xl font-bold text-gray-800 mb-4">Thông tin khách hàng</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div>
                              <strong>Họ tên:</strong> {customerInfo.name}
                            </div>
                            <div>
                              <strong>Điện thoại:</strong> {customerInfo.phone}
                            </div>
                            <div>
                              <strong>Email:</strong> {customerInfo.email || "Không có"}
                            </div>
                            <div>
                              <strong>Nhận hàng:</strong>{" "}
                              {deliveryMethod === "pickup" ? "Tại cửa hàng" : "Giao tận nơi"}
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
                <div className="flex justify-between mt-8">
                  <Button
                    variant="outline"
                    onClick={prevStep}
                    disabled={currentStep === 1}
                    className="border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                  >
                    Quay lại
                  </Button>
                  <Button
                    onClick={currentStep === 4 ? () => alert("Đặt hàng thành công!") : nextStep}
                    className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    {currentStep === 4 ? (
                      <>
                        <CheckCircle className="w-5 h-5 mr-2" />
                        Xác nhận đặt hàng
                      </>
                    ) : (
                      <>
                        Tiếp tục
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24 border-0 shadow-2xl bg-gradient-to-br from-white to-emerald-50/30">
              <CardContent className="p-6">
                <div className="flex items-center mb-6">
                  <Calculator className="w-6 h-6 text-emerald-600 mr-2" />
                  <h3 className="text-xl font-bold text-gray-800">Tóm tắt đơn hàng</h3>
                </div>

                <div className="space-y-4">
                  {glassItems.map((item, ) => {
                    if (!item.type || !item.width || !item.height) return null
                    const glassType = glassTypes.find((t) => t.value === item.type)
                    const itemTotal =
                      Number.parseFloat(item.width) * Number.parseFloat(item.height) * item.quantity * item.price
                    return (
                      <div key={item.id} className="p-3 bg-white rounded-lg border border-emerald-100">
                        <div className="text-sm font-medium text-gray-800">{glassType?.label}</div>
                        <div className="text-xs text-gray-500">
                          {item.quantity} × ({item.width}m × {item.height}m)
                        </div>
                        <div className="text-right font-semibold text-emerald-700">{itemTotal.toLocaleString()}₫</div>
                      </div>
                    )
                  })}
                </div>

                <div className="border-t border-emerald-200 mt-6 pt-6">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-semibold text-gray-800">Tổng cộng:</span>
                    <span className="text-2xl font-bold text-emerald-700">{totalAmount.toLocaleString()}₫</span>
                  </div>

                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Shield className="w-4 h-4 mr-2 text-emerald-500" />
                      Bảo hành 2 năm
                    </div>
                    <div className="flex items-center">
                      <Truck className="w-4 h-4 mr-2 text-emerald-500" />
                      Giao hàng miễn phí nội thành
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2 text-emerald-500" />
                      Hoàn thành trong 2-3 ngày
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl text-white text-center">
                  <div className="text-sm opacity-90">Tiết kiệm được</div>
                  <div className="text-xl font-bold">15%</div>
                  <div className="text-xs opacity-90">so với giá thị trường</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        <Footer></Footer>
      </main>
    </>
  );
}
export default Order;
