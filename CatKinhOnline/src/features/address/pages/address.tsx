import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { deleteAddress, type Address } from "@/services/addressService";
import { MapPin, Pencil, PlusCircle, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import {
  reloadAddressHandler,
  useGetAddressByUserId,
} from "@/features/address/hooks/useAddress";
import { updateAddress } from "@/services/addressService";
import { toast } from "@/hooks/use-toast";
import { FromAddress } from "../components/address/addAddress";
import { UpdateAddress } from "../components/address/updateAddress";

export default function Address({ userId }: { userId: number }) {
  //#region Variable
  const [isAddressFormOpen, setIsAddressFormOpen] = useState(false);
  const [isUpdateAddressFormOpen, setIsUpdateAddressFormOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [addressUpdate, setAddressUpdate] = useState<Address | null>(null);
  const { address, setAddress } = useGetAddressByUserId(userId);
  const reloadMyAddress = () => reloadAddressHandler(userId, setAddress);

  //#endregion

  //#region Set Default Address Handler
  const setDefaultAddressHandler = async (addressId: number) => {
    try {
      // Lấy danh sách tất cả địa chỉ của user
      // Bỏ mặc định tất cả địa chỉ khác (trừ địa chỉ được chọn)
      for (const addr of address) {
        if (addr.id !== addressId && addr.isDefault) {
          await updateAddress(addr.id, {
            ...addr,
            isDefault: false,
          });
        }
      }
      // Set địa chỉ được chọn làm mặc định
      const targetAddress = address.find((addr) => addr.id === addressId);
      if (targetAddress) {
        const response = await updateAddress(addressId, {
          ...targetAddress,
          isDefault: true,
        });
        if (response.isSuccess) {
          toast.success("Đặt địa chỉ mặc định thành công");
          reloadAddressHandler(userId, setAddress);
        } else {
          toast.error("Đặt địa chỉ mặc định thất bại");
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("Đặt địa chỉ mặc định thất bại");
    }
  };

  useEffect(() => {
    reloadAddressHandler(userId, setAddress);
  }, [userId]);
  //#endregion

  //#region Delete Address Handler

  const deleteAddressHandler = async (id: number) => {
    const deletedAddr = address.find((item) => item.id === id);
    const response = await deleteAddress(id);

    if (response.isSuccess) {
      const newAddressList = address.filter((item) => item.id !== id); // Tìm ra những địa chỉ khác có id khác với id địa chỉ bị xóa
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
      setAddress(newAddressList);
      reloadAddressHandler(userId, setAddress);
      toast.success("Xóa địa chỉ thành công");
    } else {
      toast.error("Xóa địa chỉ thất bại");
    }
  };
  //#endregion

  return (
    <>
      <TabsContent value="address">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Địa chỉ của tôi</h3>
            {(!address || address.length < 3) && (
              <Button
                className="bg-gradient-to-br from-emerald-500 to-emerald-700 transition-all duration-300 hover:scale-105 hover:from-emerald-700 hover:to-emerald-700"
                onClick={() => setIsAddressFormOpen(true)}
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                Thêm địa chỉ mới
              </Button>
            )}
          </div>
          { !address || address.length === 0 ? (
            <div className="rounded-lg border border-dashed border-gray-300 py-8 text-center">
              <MapPin className="mx-auto mb-2 h-12 w-12 text-gray-400" />
              <p className="text-gray-500">Bạn chưa có địa chỉ nào</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => setIsAddressFormOpen(true)}
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                Thêm địa chỉ mới
              </Button>
            </div>
          ) : (
            <div className="grid gap-4">
              {address.map((item) => (
                <Card
                  className="overflow-hidden border-1 border-emerald-200 shadow-md shadow-emerald-100"
                  key={item.id}
                >
                  <CardContent className="">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="mb-1 flex items-center gap-2">
                          <h4 className="text-sm font-medium italic md:text-lg">
                            {item.contactName}
                          </h4>
                          {item.isDefault === true && (
                            <Badge className="bg-green-500 text-xs md:text-sm">
                              Mặc định
                            </Badge>
                          )}
                        </div>
                        <p className="mb-1 text-sm text-gray-500 italic md:text-base">
                          <span className="font-bold">Số điện thoại : </span>{" "}
                          {item.contactPhone}
                        </p>
                        <p className="text-sm italic md:text-base max-w-xl break-words" style={{ wordBreak: "break-word" }}>
                          <span className="font-bold">Địa chỉ : </span>{" "}
                          {item.addressLine}
                        </p>
                        {item.note && (
                          <p className="text-xs italic md:text-sm">
                            <span className="font-bold">Ghi chú : </span>{" "}
                            {item.note}
                          </p>
                        )}
                      </div>
                      <div className="ml-3 flex flex-col gap-2 md:ml-0 md:flex-row">
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
                        <>
                          {!item.isDefault && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setDefaultAddressHandler(item.id)}
                            >
                              Đặt mặc định
                            </Button>
                          )}
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
                                  Hành động này không thể hoàn tác. Địa chỉ sẽ
                                  bị xóa vĩnh viễn.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Hủy</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => {
                                    if (deleteId)
                                      deleteAddressHandler(deleteId);
                                    setDeleteId(null);
                                  }}
                                >
                                  Xóa
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </TabsContent>

      {/* Add Address */}
      {isAddressFormOpen && (
        <FromAddress
          userId={userId}
          onClose={() => setIsAddressFormOpen(false)}
          reloadAddressHandler={reloadMyAddress}
        />
      )}

      {/* Update Address */}
      {isUpdateAddressFormOpen && (
        <UpdateAddress
          address={addressUpdate}
          onClose={() => setIsUpdateAddressFormOpen(false)}
          reloadAddressHandler={reloadMyAddress}
        />
      )}
    </>
  );
}
