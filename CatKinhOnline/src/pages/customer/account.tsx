import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  changePassword,
  getUserProfile,
  updateUserProfile,
  type ChangePasswordInput,
  type UpdateUserDto,
  type UserProfile,
} from "@/services/userService";
import { toast } from "@/hooks/use-toast";
import { CustomerOrders } from "@/components/pages/customer/account/orders";
import { MapPin, Pencil, PlusCircle, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Dialog } from "@/components/ui/dialog";
import { FromAddress } from "@/components/form/address/address";

export default function Account() {
  //#region Variable
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
  const [isAddressFormOpen, setIsAddressFormOpen] = useState(false);
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

  //#region Open & Close form

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
              <TabsTrigger value="address">Địa chỉ</TabsTrigger>
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

            {/* Tab Địa chỉ */}
            <TabsContent value="address">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Địa chỉ của tôi</h3>
                  <Button className="bg-gradient-to-br from-emerald-500 to-emerald-700 transition-all duration-300 hover:scale-105 hover:from-emerald-700 hover:to-emerald-700"
                  onClick={() => setIsAddressFormOpen(true)}>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Thêm địa chỉ mới
                  </Button>
                </div>
                <div className="rounded-lg border border-dashed border-gray-300 py-8 text-center">
                  <MapPin className="mx-auto mb-2 h-12 w-12 text-gray-400" />
                  <p className="text-gray-500">Bạn chưa có địa chỉ nào</p>
                  <Button variant="outline" className="mt-4">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Thêm địa chỉ mới
                  </Button>
                </div>{" "}
                <div className="grid gap-4">
                  <Card className="overflow-hidden">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="mb-1 flex items-center gap-2">
                            <h4 className="font-medium">Nguyễn Quốc Hoàng</h4>
                            <Badge className="bg-green-500">Mặc định</Badge>
                          </div>
                          <p className="mb-1 text-sm text-gray-500">
                            0333744591
                          </p>
                          <p className="text-sm">
                            123 Đường Lê Lợi, Phường An Thạnh, Quận Ninh Kiều,
                            Thành phố Cần Thơ
                          </p>
                        </div>
                        <div className="flex gap-2 ">
                          <Button variant="outline" size="sm">
                            <Pencil className="mr-1 h-4 w-4" />
                            Sửa
                          </Button>
                          <>
                            <Button variant="outline" size="sm">
                              Đặt mặc định
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-red-200 text-red-500 hover:bg-red-50"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
            {/* Manage Order Start */}
            <>
              <CustomerOrders></CustomerOrders>
            </>
            {/* Manage Order End */}
          </Tabs>
        </CardContent>
      </Card>
                {!isAddressFormOpen && (
                  <div className="rounded-lg border border-dashed border-gray-300 py-8 text-center">
                    <MapPin className="mx-auto mb-2 h-12 w-12 text-gray-400" />
                    <p className="text-gray-500">Bạn chưa có địa chỉ nào</p>
                  </div>
                )}

                {isAddressFormOpen && <FromAddress onClose={() => setIsAddressFormOpen(false)} />}

    </div>
  );
}
