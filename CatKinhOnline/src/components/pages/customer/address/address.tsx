import { FromAddress } from "@/components/form/address/addAddress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import {
  deleteAddress,
  getAddressByUserId,
  type Address,
  updateAddress,
} from "@/services/addressService";
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
import { UpdateAddress } from "@/components/form/address/updateAddress";

export default function Address({ userId }: { userId: number }) {
  //#region Variable
  const [isAddressFormOpen, setIsAddressFormOpen] = useState(false);
  const [isUpdateAddressFormOpen, setIsUpdateAddressFormOpen] = useState(false);
  const [address, setAddress] = useState<Address[]>([]);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [addressUpdate, setAddressUpdate] = useState<Address | null>(null);

  //#endregion

  //#region Fetch Data
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getAddressByUserId(userId);
        console.log(response);
        if (response.isSuccess) {
          setAddress(response.result as Address[]);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
    fetchData();
  }, [userId]);

  const handleReloadAddress = async () => {
    const response = await getAddressByUserId(userId);
    if (response.isSuccess) {
      setAddress(response.result as Address[]);
    }
  };
  const handleDeleteAddress = async (id: number) => {
    const response = await deleteAddress(id);
    if (response.isSuccess) {
      setAddress(address.filter((item) => item.id !== id));
      handleReloadAddress();
      toast.success("Xóa địa chỉ thành công");
    } else {
      toast.error("Xóa địa chỉ thất bại");
    }
  };

  const handleSetDefaultAddress = async (addressId: number) => {
    try {
      // Lấy danh sách tất cả địa chỉ của user
      const allAddressesResponse = await getAddressByUserId(userId);
      if (allAddressesResponse.isSuccess) {
        const allAddresses = allAddressesResponse.result as Address[];
        
        // Bỏ mặc định tất cả địa chỉ khác (trừ địa chỉ được chọn)
        for (const addr of allAddresses) {
          if (addr.id !== addressId && addr.isDefault) {
            await updateAddress(addr.id, {
              ...addr,
              isDefault: false,
            });
          }
        }
        
        // Set địa chỉ được chọn làm mặc định
        const targetAddress = allAddresses.find(addr => addr.id === addressId);
        if (targetAddress) {
          const response = await updateAddress(addressId, {
            ...targetAddress,
            isDefault: true,
          });
          
          if (response.isSuccess) {
            toast.success("Đặt địa chỉ mặc định thành công");
            handleReloadAddress();
          } else {
            toast.error("Đặt địa chỉ mặc định thất bại");
          }
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("Đặt địa chỉ mặc định thất bại");
    }
  };

  return (
    <>
      <TabsContent value="address">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Địa chỉ của tôi</h3>
            {address.length < 3 && (
              <Button
                className="bg-gradient-to-br from-emerald-500 to-emerald-700 transition-all duration-300 hover:scale-105 hover:from-emerald-700 hover:to-emerald-700"
                onClick={() => setIsAddressFormOpen(true)}
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                Thêm địa chỉ mới
              </Button>
            )}
          </div>
          {address.length === 0 && (
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
          )}
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
                        {item.contactPhone}
                      </p>
                      <p className="text-sm italic md:text-base">
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
                            onClick={() => handleSetDefaultAddress(item.id)}
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
                                Hành động này không thể hoàn tác. Địa chỉ sẽ bị
                                xóa vĩnh viễn.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Hủy</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => {
                                  if (deleteId) handleDeleteAddress(deleteId);
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
        </div>
      </TabsContent>

      {/* Add Address */}
      {isAddressFormOpen && (
        <FromAddress
          userId={userId}
          onClose={() => setIsAddressFormOpen(false)}
          handleReloadAddress={handleReloadAddress}
        />
      )}

      {/* Update Address */}
      {isUpdateAddressFormOpen && (
        <UpdateAddress
          address={addressUpdate}
          onClose={() => setIsUpdateAddressFormOpen(false)}
          handleReloadAddress={handleReloadAddress}
        />
      )}
    </>
  );
}
