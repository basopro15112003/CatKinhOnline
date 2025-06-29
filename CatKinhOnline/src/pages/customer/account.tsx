import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CustomerOrders } from "@/components/pages/customer/account/customerOrder";
import Address from "@/features/address/pages/address";
import type { ChangePasswordInput, UpdateUserDto, UserProfile } from "@/services/userService";
import { useState, useEffect } from "react";
import { changePassword, getUserProfile, updateUserProfile } from "@/services/userService";
import { toast } from "@/hooks/use-toast";
      
export default function Account() {

  const [userProfile, setUserProfile] = useState<UserProfile>();
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState<UpdateUserDto>({
    id: 0,
    fullName: "",
    phone: "",
  });

  // Fetch user profile
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
          console.log("setUserProfile", response); // Thêm log ở đây
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

  const validateForm = () => {
    if (!userProfile) return false;
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
    const phoneRegex = /^(84|0[35789])[0-9]{8}$/;
    if (!phoneRegex.test(form.phone)) {
      toast.warning("Số điện thoại không hợp lệ");
      return false;
    }
    return true;
  };

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
  const [changePasswordSubmitting, setChangePasswordSubmitting] = useState(false);
  const [changePasswordForm, setChangePasswordForm] =
    useState<ChangePasswordInput>({
      newPassword: "",
      oldPassword: "",
    });
  const [confirmNewPassword, setConfirmPassword] = useState<string>("");

  const handleChangePassword = (
    field: keyof ChangePasswordInput,
    value: string,
  ) => setChangePasswordForm((f) => ({ ...f, [field]: value }));

  const validateFormChangePassword = () => {
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
  };

  const handleSubmitChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateFormChangePassword()) return;
    setSubmitting(true);
    try {
      const response = await changePassword(userProfile!.email, changePasswordForm);
      console.log(response);
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
        setChangePasswordSubmitting(false);
      }, 2000);
    }
  };


  return (
    <div>
      <Card className="relative mx-auto mt-7 mb-13 max-w-7xl">
        <CardHeader>
          <CardTitle className="text-2xl text-green-700">
            Tài khoản khách hàng
          </CardTitle>
        </CardHeader>
        <CardContent className="">
          <Tabs defaultValue="profile" className="">
            <TabsList className="mx-auto mb-4 grid h-max w-86 grid-cols-2 md:mx-0 md:w-xl md:grid-cols-4">
              <TabsTrigger className="text-sm md:text-base" value="profile">
                Thông tin cá nhân
              </TabsTrigger>{" "}
              <TabsTrigger className="text-sm md:text-base" value="address">
                Địa chỉ
              </TabsTrigger>
              <TabsTrigger className="text-sm md:text-base" value="changepass">
                Đổi mật khẩu
              </TabsTrigger>
              <TabsTrigger className="text-sm md:text-base" value="orders">
                Quản lý đơn hàng
              </TabsTrigger>
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
                        disabled={changePasswordSubmitting}
                    >
                      {changePasswordSubmitting ? "Đang lưu..." : "Lưu thay đổi"}
                    </Button>{" "}
                  </div>
                </TabsContent>
              </form>
            </>
            {/* Change Password End */}

            {/* Tab Địa chỉ */}
            {userProfile && <Address userId={userProfile.id} />}
            {/* Tab Địa chỉ End */}

            {/* Manage Order Start */}
            {userProfile && <CustomerOrders userId={userProfile.id}></CustomerOrders>}
            {/* Manage Order End */}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
