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
import { getProducts, type Product } from "@/services/productService";
import {
  ArrowRight,
  Calculator,
  CheckCircle,
  CreditCard,
  MapPin,
  Package,
  Pencil,
  Plus,
  PlusCircle,
  Store,
  Trash2,
  TriangleAlert,
  Truck,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import {
  addOrder,
  type Order,
  type OrderCreateRequest,
  type OrderItems,
} from "@/services/orderService";
import { getUserProfile, type UserProfile } from "@/services/userService";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogFooter,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";
import { AlertDialogTitle } from "@/components/ui/alert-dialog";
import {
  type Address,
  deleteAddress,
  getAddressByUserId,
  updateAddress,
} from "@/services/addressService";
import {
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "@/hooks/use-toast";
import { FromAddress } from "@/features/address/components/address/addAddress";
import { UpdateAddress } from "@/features/address/components/address/updateAddress";
import { useNavigate } from "react-router-dom";

function OrderPage() {
  //#region variables declaration
  const [currentStep, setCurrentStep] = useState(1);
  const steps = [
    { number: 1, title: "Chọn kính", desc: "Chọn loại kính và kích thước" },
    { number: 2, title: "Thông tin", desc: "Nhập thông tin khách hàng" },
    { number: 3, title: "Thanh toán", desc: "Chọn phương thức thanh toán" },
    { number: 4, title: "Xác nhận", desc: "Xem lại và xác nhận đơn hàng" },
  ];
  const navigate = useNavigate();
  //#region Step 1 - Variables
  const [product, setProduct] = useState<Product[]>([]);

  //#endregion

  //#region Step 2 - Variables
  const [userProfile, setUserProfile] = useState<UserProfile>();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<number>(0);
  const [deliveryMethod, setDeliveryMethod] = useState<number>(0);
  const [isAddressFormOpen, setIsAddressFormOpen] = useState(false);
  const [isUpdateAddressFormOpen, setIsUpdateAddressFormOpen] = useState(false);
  const [addressUpdate, setAddressUpdate] = useState<Address | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [note, setNote] = useState<string>("");

  //#endregion

  //#region Step 3 - Variables
  const [paymentMethod, setPaymentMethod] = useState<number>(0);
  //#endregion

  //#region Step 4 - Variables
  const [newOrder, setNewOrder] = useState<Order | null>(null);
  const [order, setOrder] = useState<Order>({
    id: 0,
    userId: 0,
    shippingAddressId: 0,
    createdAt: new Date().toISOString(),
    status: 1,
    deliveryType: 0,
    paymentMethod: 0,
    note: "",
    totalAmount: 0,
  });

  const [orderItems, setOrderItems] = useState<OrderItems[]>([
    {
      id: 1,
      orderId: 0,
      productId: 0,
      widthM: 0,
      heightM: 0,
      quantity: 1,
      unitPrice: 0,
      subtotal: 0,
    },
  ]);

  const [orderCreateRequest, setOrderCreateRequest] =
    useState<OrderCreateRequest>({
      order: order,
      orderItems: orderItems,
    });

  //#endregion

  //#region  Step 1 - Select Glass and Calculate Total Amount
  // Get Product Data
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getProducts();
        const filtered = response.filter((item) => item.status === 1); // lọc ra những sản phẩm có status là đang còn hàng
        setProduct(filtered);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
    fetchData();
  }, []);

  // Tính tổng tiền của đơn hàng (làm tròn đến hàng nghìn)
  const totalAmount = useMemo(() => {
    const sum = orderItems.reduce((total, item) => {
      const width = item.widthM || 0;
      const height = item.heightM || 0;
      const area = width * height * item.quantity;
      return total + area * item.unitPrice;
    }, 0);
    return Math.round(sum / 1000) * 1000;
  }, [orderItems]);

  // Add Glass Item
  const addGlassItem = () => {
    // Tìm ID lớn nhất trong danh sách hiện tại
    const maxId = Math.max(...orderItems.map((item) => item.id));
    const newId = maxId + 1;
    // Tạo mục kính mới với các giá trị mặc định
    const newGlassItem = {
      id: newId,
      orderId: 0,
      productId: 0,
      widthM: 0,
      heightM: 0,
      quantity: 1,
      unitPrice: 0,
      subtotal: 0,
    };
    // Thêm mục mới vào danh sách
    const updatedOrderItems = [...orderItems, newGlassItem];
    setOrderItems(updatedOrderItems);
  };

  // Remove Glass Item
  const removeGlassItem = (id: number) => {
    // Chỉ xóa nếu còn nhiều hơn 1 mục
    if (orderItems.length > 1) {
      const updatedItems = orderItems.filter((item) => item.id !== id);
      setOrderItems(updatedItems);
    }
  };

  // Update Glass Item
  const updateGlassItem = (
    id: number,
    field: keyof OrderItems,
    value: string | number,
  ) => {
    // Tạo danh sách mới với mục được cập nhật
    const updatedItems = orderItems.map((item) => {
      // Nếu đây là mục cần cập nhật
      if (item.id === id) {
        // Tạo bản sao của mục với giá trị mới
        const updatedItem = { ...item, [field]: value };

        // Nếu đang cập nhật productId, tính lại unitPrice
        if (field === "productId") {
          const selectedProduct = product.find((p) => p.id === Number(value));
          updatedItem.unitPrice = selectedProduct
            ? selectedProduct.pricePerM2
            : 0;
        }
        return updatedItem;
      }
      // Nếu không phải mục cần cập nhật, giữ nguyên
      return item;
    });
    setOrderItems(updatedItems);
  };

  //#endregion

  //#region  Step 2 - Select Address


  const [address, setAddress] = useState<Address | null>(null);

  useEffect(() => {
    const findAddress = addresses.find((addr) => addr.id === selectedAddressId);
    setAddress(findAddress || null);  
  }, [selectedAddressId, addresses]);
  // Get User Profile
  useEffect(() => {
    async function fetchData() {
      const email = localStorage.getItem("email");
      if (!email) {
        console.error("Không tìm thấy email trong localStorage");
        return;
      }
      try {
        const response = await getUserProfile(email);
        if (response) {
          setUserProfile(response);
          setOrder({
            ...order,
            userId: response.id,
          });
        }
      } catch (error) {
        console.error("Lỗi khi fetch profile:", error);
      }
    }
    fetchData();
  }, []);

  // Get Address Data
  useEffect(() => {
    async function fetchData() {
      if (userProfile?.id) {
        const response = await getAddressByUserId(userProfile.id);
        if (response.isSuccess) {
          setAddresses((response.result as Address[]) || []);
        } else {
          setAddresses([]);
        }
      }
    }
    fetchData();
  }, [userProfile?.id]);

  // Set Default Address
  useEffect(() => {
    if (addresses.length > 0 && !selectedAddressId) {
      const defaultAddr = addresses.find((addr) => addr.isDefault);
      if (defaultAddr) {
        setSelectedAddressId(defaultAddr.id);
      } else {
        setSelectedAddressId(addresses[0].id); //  chọn địa chỉ đầu tiên nếu không có mặc định
      }
    }
  }, [addresses, selectedAddressId]);

  // Reload Address
  const handleReloadAddress = async () => {
    if (userProfile?.id) {
      const response = await getAddressByUserId(userProfile?.id ?? 0);
      if (response.isSuccess) {
        setAddresses((response.result as Address[]) || []);
      } else {
        setAddresses([]);
      }
    }
  };

  // Delete Address
  const handleDeleteAddress = async (id: number) => {
    try {
      const deletedAddr = addresses.find((item) => item.id === id);
      const response = await deleteAddress(id);
      if (response.isSuccess) {
        const newAddressList = addresses.filter((item) => item.id !== id); // Tìm ra những địa chỉ khác có id khác với id địa chỉ bị xóa
        if (deletedAddr?.isDefault && newAddressList.length > 0) {
          const oldest = newAddressList.reduce(
            (
              prev,
              curr, // tìm địa chỉ cũ nhất trong danh sách địa chỉ còn lại bằng cách so sánh id prev với curr
            ) => (prev.id < curr.id ? prev : curr),
          );
          // cập nhật lại địa chỉ mặc định
          await updateAddress(oldest.id, {
            ...oldest,
            isDefault: true,
          });
        }
        setAddresses(newAddressList);
        toast.success("Xóa địa chỉ thành công");
        handleReloadAddress();
      }
    } catch (error) {
      console.error("Lỗi khi xóa địa chỉ:", error);
      toast.error("Xóa địa chỉ thất bại");
    }
  };
  //#endregion

  //#region  Step 3 - Set Payment Method
  //#endregion

  //#region  Step 4 - Set Order Data
  // Set Order Data
  useEffect(() => {
    if (deliveryMethod === 1) {
      // nhận hàng tại nhà
      setOrder((prev) => ({
        ...prev,
        deliveryType: deliveryMethod,
        shippingAddressId: selectedAddressId,
        userId: userProfile?.id || 0,
        paymentMethod: paymentMethod,
        note: note,
      }));
    }
    if (deliveryMethod === 0) {
      // nhận hàng tại cửa hàng
      setOrder((prev) => ({
        ...prev,
        deliveryType: deliveryMethod,
        shippingAddressId: null as unknown as number,
        userId: userProfile?.id || 0,
        paymentMethod: paymentMethod,
        note: note,
      }));
    }
  }, [deliveryMethod, selectedAddressId, userProfile, paymentMethod, note]);

  // Set Order Create Request
  useEffect(() => {
    setOrderCreateRequest({
      order: order,
      orderItems: orderItems,
    });
  }, [order, orderItems]);

  const handleOrder = async () => {
    try {
      const response = await addOrder(orderCreateRequest);
      if (response.isSuccess) {
        toast.success("Đơn hàng đã được thêm thành công");
        setNewOrder(response.result as Order);
      } else {
        toast.error("Đã có lỗi xảy ra khi kết nối tới máy chủ.");
      }
    } catch (error) {
      console.error("Lỗi khi thêm đơn hàng:", error);
      toast.error("Đã có lỗi xảy ra khi kết nối tới máy chủ.");
    }
  };

  useEffect(() => {
    if (newOrder) {
      navigate("/thankyou/" + newOrder?.id);
      console.log("newOrder đã cập nhật: ", newOrder);
    }
  }, [newOrder]);

  //#region Thêm state cho phí ship
  const [shippingFee, setShippingFee] = useState<number>(0);

  // Tính phí ship dựa trên totalAmount và deliveryMethod
  useEffect(() => {
    if (deliveryMethod === 1) {
      // Giao tận nơi
      if (totalAmount >= 2000000) {
        setShippingFee(0); // Free ship nếu  hóa đơn trên 2tr
      } else {
        setShippingFee(200000);
      }
    } else {
      setShippingFee(0); // Nhận tại cửa hàng thì phí ship là 0
    }
  }, [totalAmount, deliveryMethod]);
  const finalTotal = totalAmount + shippingFee;
  //#endregion

  //#endregion

  //#region next and prev step
  const validateStep1 = () => {
    for (let i = 0; i < orderItems.length; i++) {
      const item = orderItems[i];
      const index = i + 1;
      if (!item.widthM) {
        toast.warning(`Kính #${index}: Vui lòng nhập chiều rộng kính!`);
        return false;
      }
      if (!item.heightM) {
        toast.warning(`Kính #${index}: Vui lòng nhập chiều dài kính!`);
        return false;
      }
      if (item.quantity <= 0) {
        toast.warning(`Kính #${index}: Vui lòng nhập số lượng kính!`);
        return false;
      }
      if (item.productId === 0) {
        toast.warning(`Kính #${index}: Vui lòng chọn loại kính!`);
        return false;
      }
      if (item.quantity > 100) {
        toast.warning(
          `Kính #${index}: Số lượng kính không được lớn hơn 100 tấm! Nếu bạn muốn đặt số lượng lớn hơn, hãy liên hệ số điện thoại 0333744591 hoặc đặt thêm kính`,
        );
        return false;
      }
    }
    return true;
  };

  const validateStep2 = () => {
    const selectedAddress = addresses.find(
      (addr) => addr.id === selectedAddressId,
    );
    const allowedProvinces = [
      "Cần Thơ",
      "Vĩnh Long",
      "Hậu Giang",
      "Kiên Giang",
      "An Giang",
    ];

    if (
      selectedAddress &&
      !allowedProvinces.some((province) =>
        selectedAddress.addressLine.includes(province),
      )
    ) {
      toast.warning(
        "Shop chỉ nhận giao kính tại khu vực Cần Thơ và các tỉnh thành phố lân cận: Vĩnh Long, Hậu Giang, Kiên Giang, An Giang. Vui lòng chọn địa chỉ khác hoặc liên hệ hotline : 0333744591 để được hỗ trợ.",
      );
      return false;
    }

    if (!selectedAddress) {
      toast.warning("Vui lòng chọn địa chỉ giao hàng");
      return false;
    }
    if (selectedAddress.note.length > 300) {
      toast.warning("Ghi chú quá dài (tối đa 300 ký tự)");
      return false;
    }

    return true;
  };

  const nextStep = () => {
    if (currentStep === 1) {
      if (!validateStep1()) {
        return;
      }
    }
    if (currentStep === 2 && deliveryMethod === 1) {
      if (!validateStep2()) {
        return;
      }
    }
    if (
      currentStep === 2 &&
      userProfile?.phone === "" &&
      deliveryMethod === 0
    ) {
      toast.warning(
        "Vui lòng cập nhật số điện thoại tại trang cá nhân để tiếp tục đặt hàng",
      );
      return false;
    }
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };
  //#endregion

  return (
    <>
      <main>
        {/* Progress Steps Start*/}
        <>
          <div className="mx-auto mb-12 flex w-full justify-center">
            <div className="flex flex-col items-center space-y-8 rounded-2xl border border-emerald-100 bg-white/70 p-6 shadow-lg backdrop-blur-md md:flex-row md:space-y-0 md:space-x-4">
              {steps.map((step, idx) => (
                <div
                  key={step.number}
                  className="flex flex-col items-center md:flex-row"
                >
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
                    <div className="text-center md:mt-2">
                      <div className="text-sm font-semibold text-gray-800">
                        {step.title}
                      </div>
                      <div className="text-xs text-gray-500">{step.desc}</div>
                    </div>
                  </div>
                  {idx < steps.length - 1 && (
                    <div
                      className={`mx-20 mt-5 h-10 w-1 rounded-full transition-all duration-300 md:mx-4 md:my-0 md:mt-0 md:h-1 md:w-16 ${
                        currentStep > step.number
                          ? "bg-gradient-to-b from-emerald-500 to-teal-500 md:bg-gradient-to-r"
                          : "bg-gray-200"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </>
        {/* Progress Steps End*/}

        <div className="mx-auto mb-16 grid max-w-7xl grid-cols-1 gap-8 px-4 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Card className="border-0 bg-gradient-to-br from-white to-emerald-50/30 shadow-2xl">
              <CardContent className="p-8">
                {/* Step 1: Glass Selection */}
                <>
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
                      <div className="space-y-3">
                        {orderItems.map((item, index) => (
                          <Card
                            key={item.id}
                            className="border border-emerald-200 shadow-lg transition-all duration-300 hover:shadow-xl"
                          >
                            <CardContent className="">
                              <div className="mb-2 flex items-center justify-between">
                                <h3 className="text-lg font-semibold text-emerald-700">
                                  Kính #{index + 1}
                                </h3>
                                {orderItems.length > 1 && (
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
                                    value={
                                      item.productId
                                        ? item.productId.toString()
                                        : ""
                                    }
                                    onValueChange={(value) =>
                                      updateGlassItem(
                                        item.id,
                                        "productId",
                                        Number(value),
                                      )
                                    }
                                  >
                                    <SelectTrigger className="border-emerald-200 focus:border-emerald-500">
                                      <SelectValue placeholder="Chọn loại kính" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {product.map((type) => (
                                        <SelectItem
                                          key={type.id}
                                          value={type.id.toString()}
                                        >
                                          <div className="flex w-full items-center justify-between">
                                            <span>{type.productName}</span>
                                            <span className="ml-4 font-semibold text-emerald-600">
                                              {type.pricePerM2.toLocaleString()}
                                              ₫/m
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
                                      max={2.7}
                                      placeholder="0.0"
                                      value={item.widthM}
                                      onChange={(e) => {
                                        let value = Number(e.target.value);
                                        if (value > 2.7) value = 2.7;
                                        if (value < 0.1) value = 0.1;
                                        value = Math.round(value * 1000) / 1000;
                                        updateGlassItem(
                                          item.id,
                                          "widthM",
                                          value,
                                        );
                                      }}
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
                                      min={0.1}
                                      max={4.8}
                                      placeholder="0.0"
                                      value={item.heightM}
                                      onChange={(e) => {
                                        let value = Number(e.target.value);
                                        if (value > 4.8) value = 4.8;
                                        if (value < 0.1) value = 0.1;
                                        value = Math.round(value * 1000) / 1000;
                                        updateGlassItem(
                                          item.id,
                                          "heightM",
                                          value,
                                        );
                                      }}
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
                                      max="101"
                                      value={item.quantity}
                                      onChange={(e) => {
                                        let value = Number(e.target.value);
                                        if (value > 101) value = 101;
                                        if (value < 1) value = 1;
                                        updateGlassItem(
                                          item.id,
                                          "quantity",
                                          value,
                                        );
                                      }}
                                      className="border-emerald-200 focus:border-emerald-500"
                                    />
                                  </div>
                                </div>
                              </div>

                              {item.productId !== 0 &&
                                item.widthM &&
                                item.heightM && (
                                  <div className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 p-3">
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm text-emerald-700">
                                        {
                                          product.find(
                                            (type) =>
                                              type.id ===
                                              Number(item.productId),
                                          )?.productName
                                        }{" "}
                                        ({item.widthM}m × {item.heightM}m) ={" "}
                                        {item.quantity} Tấm
                                      </span>
                                      <span className="font-semibold text-emerald-800">
                                        {(
                                          Math.round(
                                            (item.widthM *
                                              item.heightM *
                                              item.quantity *
                                              item.unitPrice) /
                                              1000,
                                          ) * 1000
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
                </>
                {/* Step 1 End*/}

                {/* Step 2: Customer Information */}
                <>
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
                        {deliveryMethod === 0 && (
                          <>
                            <div>
                              <Label className="mb-2 block text-sm font-medium text-gray-700">
                                Họ và tên *
                              </Label>
                              <Input
                                placeholder="Nhập họ và tên"
                                className="border-emerald-200 focus:border-emerald-500"
                                value={userProfile?.fullName}
                                disabled
                              />
                            </div>{" "}
                            <div>
                              <Label className="mb-2 block text-sm font-medium text-gray-700">
                                Số điện thoại *
                              </Label>
                              <Input
                                placeholder="Nhập số điện thoại"
                                className="border-emerald-200 focus:border-emerald-500"
                                value={userProfile?.phone}
                                disabled
                              />
                            </div>
                            <div>
                              <Label className="mb-2 block text-sm font-medium text-gray-700">
                                Email
                              </Label>
                              <Input
                                type="email"
                                placeholder="Nhập email"
                                className="border-emerald-200 focus:border-emerald-500"
                                value={userProfile?.email}
                                disabled
                              />
                            </div>
                          </>
                        )}

                        <div>
                          <Label className="mb-2 block text-sm font-medium text-gray-700">
                            Phương thức nhận hàng *
                          </Label>
                          <Select
                            value={deliveryMethod.toString()}
                            onValueChange={(value) =>
                              setDeliveryMethod(Number(value))
                            }
                          >
                            <SelectTrigger className="border-emerald-200 focus:border-emerald-500">
                              <SelectValue placeholder="Chọn phương thức nhận hàng" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="0">
                                <div className="flex items-center">
                                  <Package className="mr-2 h-4 w-4" />
                                  Nhận tại cửa hàng
                                </div>
                              </SelectItem>
                              <SelectItem value="1">
                                <div className="flex items-center">
                                  <Truck className="mr-2 h-4 w-4" />
                                  Giao hàng tận nơi
                                </div>
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      {deliveryMethod === 1 && (
                        <div className="mt-2 rounded-lg border border-amber-200 bg-amber-50 p-3">
                          <div className="flex items-start space-x-2">
                            <div className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-600">
                              <TriangleAlert className="h-4 w-4" />
                            </div>
                            <div className="text-sm text-amber-800">
                              <span className="font-medium">Lưu ý:</span> Nếu
                              giá trị đơn hàng trên 2 triệu VNĐ thì phí vận
                              chuyển là miễn phí. Tùy theo địa phương mà có thể
                              có phí vận chuyển khác nhau. Nếu có thắc mắc vui
                              lòng liên hệ hotline để được hỗ trợ.
                            </div>
                          </div>
                        </div>
                      )}
                      {deliveryMethod === 1 && (
                        <div className="mt-2">
                          <Label className="mb-2 block text-sm font-medium text-gray-700">
                            Chọn địa chỉ giao hàng *
                          </Label>

                          <RadioGroup
                            value={selectedAddressId.toString()}
                            onValueChange={(value) =>
                              setSelectedAddressId(Number(value))
                            }
                            className="space-y-3"
                          >
                            {addresses.map((item) => (
                              <Card
                                key={item.id}
                                onClick={() => setSelectedAddressId(item.id)}
                                className={`flex cursor-pointer items-center border-emerald-200 bg-white/50 p-2 shadow-md transition-all ${
                                  selectedAddressId === item.id
                                    ? "border-2 border-emerald-500 ring-2 ring-emerald-100"
                                    : "border"
                                }`}
                              >
                                <div className="items-center gap-6 md:flex">
                                  <div className="mt-0 w-3xs flex-1 p-1 md:w-lg lg:w-xl">
                                    <div className="mb-1 flex gap-2">
                                      <RadioGroupItem
                                        value={item.id.toString()}
                                        id={item.id.toString()}
                                        className="pointer-events-none mt-1"
                                      />
                                      <h4 className="text-sm font-medium italic md:text-lg">
                                        {item.contactName}
                                      </h4>
                                      {item.isDefault && (
                                        <Badge className="bg-green-500 text-xs md:text-sm">
                                          Mặc định
                                        </Badge>
                                      )}
                                    </div>
                                    <p className="mb-1 text-sm text-gray-500 italic md:text-base">
                                      <span className="text-sm font-bold text-black">
                                        Điện thoại:{" "}
                                      </span>{" "}
                                      {item.contactPhone}
                                    </p>
                                    <p className="text-xs italic md:text-base">
                                      <span className="text-sm font-bold text-black">
                                        Địa chỉ:{" "}
                                      </span>{" "}
                                      {item.addressLine}
                                    </p>
                                    {item.note && (
                                      <p className="text-xs italic md:text-sm">
                                        <span className="font-bold">
                                          Ghi chú:{" "}
                                        </span>
                                        {item.note}
                                      </p>
                                    )}
                                  </div>
                                  <div className="mt-2 flex w-25 flex-row gap-2 md:mt-0 md:ml-3 md:flex-col">
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => {
                                        setIsUpdateAddressFormOpen(true);
                                        setAddressUpdate(item);
                                      }}
                                    >
                                      <Pencil className="mr-1 h-4 w-4" />
                                      Sửa
                                    </Button>
                                    <AlertDialog>
                                      <AlertDialogTrigger asChild>
                                        <Button
                                          variant="outline"
                                          size="sm"
                                          className="border-red-200 text-red-500 hover:bg-red-50"
                                          onClick={() => setDeleteId(item.id)}
                                        >
                                          <Trash2 className="h-4 w-4" />
                                        </Button>
                                      </AlertDialogTrigger>
                                      <AlertDialogContent>
                                        <AlertDialogHeader>
                                          <AlertDialogTitle>
                                            Bạn có chắc muốn xóa địa chỉ này?
                                          </AlertDialogTitle>
                                          <AlertDialogDescription>
                                            Hành động này không thể hoàn tác.
                                            Địa chỉ sẽ bị xóa vĩnh viễn.
                                          </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                          <AlertDialogCancel>
                                            Hủy
                                          </AlertDialogCancel>
                                          <AlertDialogAction
                                            onClick={() => {
                                              if (deleteId)
                                                handleDeleteAddress(deleteId);
                                              setDeleteId(null);
                                            }}
                                          >
                                            Xóa
                                          </AlertDialogAction>
                                        </AlertDialogFooter>
                                      </AlertDialogContent>
                                    </AlertDialog>
                                  </div>
                                </div>
                              </Card>
                            ))}
                          </RadioGroup>
                          {addresses.length === 0 && (
                            <div className="mt-6 rounded-lg border border-dashed border-gray-300 bg-white/55 py-8 text-center">
                              <MapPin className="mx-auto mb-2 h-12 w-12 text-gray-400" />
                              <p className="text-gray-500">
                                Bạn chưa có địa chỉ nào
                              </p>
                              <Button
                                variant="outline"
                                className="mt-4"
                                onClick={() => setIsAddressFormOpen(true)}
                              >
                                <PlusCircle className="mr-2 h-4 w-4" />
                                Thêm địa chỉ mới
                              </Button>
                            </div>
                          )}
                          {addresses.length < 3 && addresses.length !== 0 && (
                            <div className="mt-6 h-40 rounded-lg border border-dashed border-emerald-500 bg-white/55 px-2 py-4 text-center">
                              <MapPin className="mx-auto mb-2 h-12 w-12 text-gray-400" />
                              <p className="text-gray-500">
                                Bạn muốn thêm địa chỉ mới ?
                              </p>
                              <Button
                                variant="outline"
                                className="mt-2"
                                onClick={() => setIsAddressFormOpen(true)}
                              >
                                <PlusCircle className="mr-2 h-4 w-4" />
                                Thêm địa chỉ mới tại đây
                              </Button>
                            </div>
                          )}
                        </div>
                      )}

                      <div className="mt-6">
                        <Label className="mb-2 block text-sm font-medium text-gray-700">
                          Ghi chú đơn hàng
                        </Label>
                        <Textarea
                          placeholder="Ghi chú thêm về đơn hàng (tùy chọn)"
                          className="border-emerald-200 focus:border-emerald-500"
                          rows={3}
                          value={note}
                          onChange={(e) => setNote(e.target.value)}
                        />
                      </div>
                    </div>
                  )}
                </>
                {/* Step 2 End*/}

                {/* Step 3: Payment Method */}
                <>
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
                            paymentMethod.toString() === "0"
                              ? "border-emerald-500 bg-emerald-50"
                              : "border-gray-200"
                          }`}
                          onClick={() => setPaymentMethod(0)}
                        >
                          <CardContent className="p-6 text-center">
                            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 text-white">
                              <Package className="h-8 w-8" />
                            </div>
                            <h3 className="mb-2 text-xl font-bold text-gray-800">
                              Tiền mặt khi nhận
                            </h3>
                            <p className="text-sm text-gray-600">
                              Thanh toán khi nhận hàng tại cửa hàng hoặc khi
                              giao hàng
                            </p>
                            <Badge className="mt-3 bg-green-100 text-green-700">
                              Phổ biến
                            </Badge>
                          </CardContent>
                        </Card>

                        <Card
                          className={`cursor-pointer border-2 transition-all duration-300 hover:shadow-lg ${
                            paymentMethod.toString() === "1"
                              ? "border-emerald-500 bg-emerald-50"
                              : "border-gray-200"
                          }`}
                          onClick={() => setPaymentMethod(1)}
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

                      {paymentMethod.toString() === "1" && (
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
                                <strong>Chủ tài khoản:</strong> Nguyễn Quốc
                                Hoàng
                              </p>
                              <p>
                                <strong>Nội dung:</strong> Thanh toan don hang
                                [Số điện thoại]
                              </p>
                            </div>
                          </CardContent>
                        </Card>
                      )}
                    </div>
                  )}
                </>
                {/* Step 3 End*/}

                {/* Step 4: Order Confirmation */}
                <>
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
                              {orderItems.map((item) => {
                                const glassType = product.find(
                                  (type) => type.id === Number(item.productId),
                                );

                                return (
                                  <div
                                    key={item.id}
                                    className="flex items-center justify-between border-b border-gray-100 py-2"
                                  >
                                    <div>
                                      <span className="font-medium">
                                        {glassType?.productName}
                                      </span>
                                      <span className="ml-2 text-sm text-gray-500">
                                        ({item.widthM}m × {item.heightM}m ×{" "}
                                        {item.quantity})
                                      </span>
                                    </div>
                                    <span className="font-semibold">
                                      {(
                                        Math.round(
                                          (item.widthM *
                                            item.heightM *
                                            item.quantity *
                                            item.unitPrice) /
                                            1000,
                                        ) * 1000
                                      ).toLocaleString()}
                                      ₫
                                    </span>
                                  </div>
                                );
                              })}
                              {note && (
                                <div className="flex justify-between">
                                  <p className="font-semibold">
                                    Ghi chú:  <span className="italic font-normal text-sm">{note}</span>
                                  </p>
                                </div>
                              )}
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
                              {deliveryMethod === 1 ? (
                                <>
                                  <div>
                                    <strong>Họ tên: </strong> {address?.contactName}
                                  </div>{" "}
                                  <div>
                                    <strong>Điện thoại:</strong> {address?.contactPhone}
                                  </div>
                                  <div>
                                    <strong>Email:</strong>{" "}
                                    {userProfile?.email}
                                  </div>
                                </>
                              ) : (
                                <>
                                  <div>
                                    <strong>Họ tên: </strong> {userProfile?.fullName}
                                  </div>{" "}
                                  <div>
                                    <strong>Điện thoại:</strong>{userProfile?.phone}
                                  </div>
                                  <div>
                                    <strong>Email:</strong>{" "}
                                    {userProfile?.email}
                                  </div></>
                              )}

                              <div>
                                <strong>Nhận hàng:</strong>{" "}
                                {deliveryMethod === 0
                                  ? "Tại cửa hàng"
                                  : "Giao tận hàng nơi"}
                              </div>
                              {deliveryMethod === 1 && (
                                <div className="md:col-span-2">
                                  <strong>Địa chỉ:</strong> {address?.addressLine}
                                </div>
                              )}
                              {deliveryMethod === 1 && (
                                <div className="md:col-span-2">
                                  <strong>Ghi chú:</strong> {address?.note}
                                </div>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  )}
                </>
                {/* Step 4 End*/}

                {/* Navigation Buttons */}
                <>
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
                          ? () => console.log("Đặt hàng thành công!")
                          : nextStep
                      }
                      className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg transition-all duration-300 hover:from-emerald-700 hover:to-teal-700 hover:shadow-xl"
                    >
                      {currentStep === 4 ? (
                        <>
                          <Button
                            type="button"
                            className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg transition-all duration-300 hover:from-emerald-700 hover:to-teal-700 hover:shadow-xl"
                            onClick={handleOrder}
                          >
                            <CheckCircle className="mr-2 h-5 w-5" />
                            Xác nhận đặt hàng
                          </Button>
                        </>
                      ) : (
                        <>
                          Tiếp tục
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </>
                      )}
                    </Button>
                  </div>
                </>
                {/* Navigation Buttons End*/}
              </CardContent>
            </Card>
          </div>

          {/* Order Summary Sidebar */}
          <>
            <div className="lg:col-span-1">
              <Card className="sticky top-24 border-0 bg-gradient-to-br from-white to-emerald-50/30 shadow-2xl">
                <CardContent className="p-6">
                  <div className="mb-6 flex items-center">
                    <Calculator className="mr-2 h-6 w-6 text-emerald-600" />
                    <h3 className="text-xl font-bold text-gray-800">
                      Tóm tắt đơn hàng
                    </h3>
                  </div>

                  <div className="space-y-2">
                    {orderItems.map((item) => {
                      if (!item.productId || !item.widthM || !item.heightM)
                        return null;
                      const glassType = product.find(
                        (type) => type.id === Number(item.productId),
                      );
                      const itemTotal =
                        item.widthM *
                        item.heightM *
                        item.quantity *
                        item.unitPrice;
                      const roundedTotal = Math.round(itemTotal / 1000) * 1000;

                      return (
                        <div
                          key={item.id}
                          className="rounded-lg border border-emerald-100 bg-white p-3"
                        >
                          <div className="text-sm font-medium text-gray-800">
                            {glassType?.productName}
                          </div>
                          <div className="flex items-center text-xs text-gray-500">
                            {item.quantity} × ({item.widthM}m × {item.heightM}m)
                            <span className="ml-auto text-right text-base font-semibold text-emerald-700">
                              {roundedTotal.toLocaleString()}₫
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-0 border-emerald-200 pt-6">
                    <div className="space-y-2">
                      {deliveryMethod === 1 && (
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">
                            Tạm tính:
                          </span>
                          <span className="text-sm font-medium">
                            {totalAmount.toLocaleString()}₫
                          </span>
                        </div>
                      )}

                      {deliveryMethod === 1 && (
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">
                            Phí vận chuyển:
                          </span>
                          <span className="text-sm font-medium">
                            {shippingFee === 0 ? (
                              <span className="text-green-600">Miễn phí</span>
                            ) : (
                              `${shippingFee.toLocaleString()}₫`
                            )}
                          </span>
                        </div>
                      )}

                      <div className="flex items-center justify-between border-t border-emerald-200 pt-2">
                        <span className="text-lg font-semibold text-gray-800">
                          Tổng cộng:
                        </span>
                        <span className="text-2xl font-bold text-emerald-700">
                          {finalTotal.toLocaleString()}₫
                        </span>
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
          </>
          {/* Order Summary Sidebar End*/}
        </div>

        {/* Add Address */}
        <>
          {isAddressFormOpen && (
            <FromAddress
              userId={userProfile?.id ?? 0}
              onClose={() => setIsAddressFormOpen(false)}
              reloadAddressHandler={handleReloadAddress}
            />
          )}
        </>
        {/* Add Address End*/}
        {/* Update Address */}
        <>
          {isUpdateAddressFormOpen && (
            <UpdateAddress
              address={addressUpdate}
              onClose={() => setIsUpdateAddressFormOpen(false)}
              reloadAddressHandler={handleReloadAddress}
            />
          )}
        </>
        {/* Update Address End*/}
      </main>
    </>
  );
}
export default OrderPage;
