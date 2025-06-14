import React, { useEffect, useMemo, useState } from "react";
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
import { DetailOrder } from "@/components/form/detailOrder";
import {
  changePassword,
  getUserProfile,
  updateUserProfile,
  type ChangePasswordInput,
  type UpdateUserDto,
  type UserProfile,
} from "@/services/userService";
import { toast } from "@/hooks/use-toast";
export default function Account() {
  //#region Variable
  const [isDetailModalOpen, setIsDetailOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile>();
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState<UpdateUserDto>({
    id: 0,
    fullName: "",
    phone: "",
  });
  const [changePasswordForm, setChangePasswordForm] =
    useState<ChangePasswordInput>({
      newPassword: "",
      oldPassword: "",
    });
  const [confirmNewPassword, setConfirmPassword] = useState<string>("");
  //#endregion

  //#region Fetch Handle Data

  //#region  Fetch Data Account, Update User Data
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
          setForm({
            id: response.id,
            fullName: response.fullName,
            phone: response.phone,
          });
        }
      } catch (error) {
        console.error("Lỗi khi fetch profile:", error);
      }
    }
    fetchData();
  }, []);
  const handleChange = (field: keyof UpdateUserDto, value: string) =>
    setForm((f) => ({ ...f, [field]: value }));

  function validateForm() {
    if (!userProfile) return false;
    // Validate form
    if (!form.fullName.trim()) {
      toast.warning("Vui lòng nhập họ tên");
      return false;
    }
    if (form.fullName.trim().length < 6) {
      toast.warning("Họ tên quá ngắn (tối thiểu 6 ký tự)");
      return false;
    }

    if (form.fullName.trim().length > 50) {
      toast.warning("Họ tên quá dài (tối đa 50 ký tự)");
      return false;
    }
    if (!form.phone.trim()) {
      toast.warning("Vui lòng nhập số điện thoại");
      return false;
    }
    // Validate phone number format (Vietnam)
    const phoneRegex = /^(84|0[35789])[0-9]{8}$/;
    if (!phoneRegex.test(form.phone)) {
      toast.warning("Số điện thoại không hợp lệ");
      return false;
    }
    return true;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setSubmitting(true);
    try {
      const updated = await updateUserProfile(userProfile!.id, form);
      if (updated) {
        toast.success("Cập nhật tài khoản thành công");
      }
    } catch (err) {
      console.error(err);
      toast.error("Cập nhật tài khoản thất bại");
    } finally {
      setTimeout(() => {
        setSubmitting(false);
      }, 2000);
    }
  };
  //#endregion

  //#region Change Password

  const handleChangePassword = (
    field: keyof ChangePasswordInput,
    value: string,
  ) => setChangePasswordForm((f) => ({ ...f, [field]: value }));

  function validateFormChangePassword() {
    if (!changePasswordForm.oldPassword.trim()) {
      toast.warning("Vui lòng nhập mật khẩu cũ");
      return false;
    }
    if (!changePasswordForm.newPassword.trim()) {
      toast.warning("Vui lòng nhập mật khẩu mới");
      return false;
    }
    if (!confirmNewPassword.trim()) {
      toast.warning("Vui lòng xác nhận mật khẩu mới");
      return false;
    }
    if (changePasswordForm.newPassword !== confirmNewPassword) {
      toast.warning("Mật khẩu xác nhận không khớp");
      return false;
    }
    return true;
  }

  const handleSubmitChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateFormChangePassword()) return;
    setSubmitting(true);
    try {
      const response = await changePassword(
        userProfile!.email,
        changePasswordForm,
      );
      if (response.isSuccess) {
        setChangePasswordForm({
          oldPassword: "",
          newPassword: "",
        });
        setConfirmPassword("");
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        setSubmitting(false);
      }, 2000);
    }
  };
  //#endregion

  //#endregion

  const openDetail = (order: Order) => {
    setSelectedOrder(order);
    setIsDetailOpen(true);
  };

  const closeDetail = () => {
    setIsDetailOpen(false);
  };

  type OrderItem = {
    id: number;
    productName: string;
    width: number;
    height: number;
    quantity: number;
    unitPrice: number;
    subtotal: number;
  };

  type Order = {
    id: string;
    date: string;
    status: number;
    deliveryType: string;
    shippingAddress?: string;
    paymentMethod: string;
    totalAmount: number;
    items: OrderItem[];
  };

  //#region  Mock 10 order data
  const orders: Order[] = useMemo(
    () => [
      {
        id: "DH001",
        date: "2023-11-01",
        status: 2,
        deliveryType: "shipping",
        shippingAddress: "227 Phong Điền, Cần Thơ",
        paymentMethod: "cod",
        items: [
          {
            id: 1,
            productName: "Kính cường lực 8 ly",
            width: 1.2,
            height: 0.8,
            quantity: 2,
            unitPrice: 260000,
            subtotal: Math.round(1.2 * 0.8 * 2 * 260000),
          },
          {
            id: 2,
            productName: "Kính trắng 5 ly",
            width: 1,
            height: 1,
            quantity: 1,
            unitPrice: 157000,
            subtotal: Math.round(1 * 1 * 1 * 157000),
          },
        ],
        totalAmount: 2 * 1.2 * 0.8 * 260000 + 1 * 1 * 157000,
      },
      {
        id: "DH002",
        date: "2023-11-03",
        status: 1,
        deliveryType: "pickup",
        paymentMethod: "online",
        items: [
          {
            id: 1,
            productName: "Kính bông",
            width: 0.8,
            height: 0.8,
            quantity: 3,
            unitPrice: 150000,
            subtotal: Math.round(0.8 * 0.8 * 3 * 150000),
          },
        ],
        totalAmount: Math.round(0.8 * 0.8 * 3 * 150000),
      },
      {
        id: "DH003",
        date: "2023-11-05",
        status: 0,
        deliveryType: "shipping",
        shippingAddress: "123 Nguyễn Huệ, TP HCM",
        paymentMethod: "cod",
        items: [
          {
            id: 1,
            productName: "Kính trắng 4 ly",
            width: 1,
            height: 2,
            quantity: 1,
            unitPrice: 135000,
            subtotal: Math.round(1 * 2 * 1 * 135000),
          },
        ],
        totalAmount: Math.round(1 * 2 * 1 * 135000),
      },
      {
        id: "DH004",
        date: "2023-11-07",
        status: 4,
        deliveryType: "pickup",
        paymentMethod: "online",
        items: [
          {
            id: 1,
            productName: "Kính trắng 8 ly",
            width: 1.5,
            height: 1,
            quantity: 2,
            unitPrice: 240000,
            subtotal: Math.round(1.5 * 1 * 2 * 240000),
          },
        ],
        totalAmount: Math.round(1.5 * 1 * 2 * 240000),
      },
    ],
    [],
  );
  //#endregion

  return (
    <div>
      <Card className="relative mx-auto mt-7 mb-13 max-w-7xl">
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

            {/* Manage Account Start */}
            <>
              <TabsContent value="profile">
                <form onSubmit={handleSubmit}>
                  <div className="grid max-w-lg gap-4">
                    <div>
                      <Label>Email</Label>
                      <Input value={userProfile?.email ?? ""} disabled />
                      <Input hidden disabled value={form.id} />
                    </div>
                    <div>
                      <Label>Họ tên</Label>
                      <Input
                        required
                        value={form.fullName}
                        onChange={(e) =>
                          handleChange("fullName", e.target.value)
                        }
                      />
                    </div>
                    <div>
                      <Label>Số điện thoại</Label>
                      <Input
                        required
                        value={form?.phone}
                        type="text"
                        onChange={(e) => handleChange("phone", e.target.value)}
                      />
                    </div>
                    <Button
                      className="mt-4"
                      type="submit"
                      disabled={submitting}
                    >
                      {submitting ? "Đang lưu..." : "Lưu thay đổi"}
                    </Button>{" "}
                  </div>
                </form>
              </TabsContent>
            </>
            {/* Manage Account End */}

            {/* Manage Order Start */}
            <>
              {" "}
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
                    {orders.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>{item.id}</TableCell>
                        <TableCell>{item.date}</TableCell>
                        <TableCell>
                          {item.status === 0
                            ? "Chờ xác nhận"
                            : item.status === 1
                              ? "Đã xác nhận"
                              : item.status === 2
                                ? "Đang thực hiện"
                                : item.status === 3
                                  ? "Đang giao hàng"
                                  : item.status === 4
                                    ? "Đã hoàn thành"
                                    : "Đã hủy"}
                        </TableCell>
                        <TableCell>
                          {item.totalAmount.toLocaleString()} vn₫
                        </TableCell>
                        <TableCell className="w-1 space-x-1 text-right">
                          {item.status === 0 ? (
                            <Button
                              type="button"
                              variant="destructive"
                              size="sm"
                            >
                              Hủy
                            </Button>
                          ) : (
                            <></>
                          )}
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => openDetail(item)}
                          >
                            Xem
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>
            </>
            {/* Manage Order End */}

            {/* Change Password Start */}
            <>
              {" "}
              <form onSubmit={handleSubmitChangePassword}>
                <TabsContent value="changepass">
                  <div className="grid max-w-md gap-4">
                    <div>
                      <Label>Mật khẩu cũ</Label>
                      <Input
                        type="password"
                        value={changePasswordForm.oldPassword}
                        onChange={(e) =>
                          handleChangePassword("oldPassword", e.target.value)
                        }
                      />
                    </div>{" "}
                    <div>
                      <Label>Mật khẩu mới</Label>
                      <Input
                        type="password"
                        name="newPassword"
                        value={changePasswordForm.newPassword}
                        onChange={(e) =>
                          handleChangePassword("newPassword", e.target.value)
                        }
                      />
                    </div>{" "}
                    <div>
                      <Label>Xác nhận mật khẩu mới</Label>
                      <Input
                        type="password"
                        name="confirmPassword"
                        value={confirmNewPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </div>
                    <Button
                      className="mt-4"
                      type="submit"
                      disabled={submitting}
                    >
                      {submitting ? "Đang lưu..." : "Lưu thay đổi"}
                    </Button>{" "}
                  </div>
                </TabsContent>
              </form>
            </>
            {/* Change Password End */}
          </Tabs>
        </CardContent>
      </Card>
      {isDetailModalOpen && selectedOrder && (
        <DetailOrder
          selectedOrder={selectedOrder}
          closeDetail={closeDetail}
        ></DetailOrder>
      )}
    </div>
  );
}
