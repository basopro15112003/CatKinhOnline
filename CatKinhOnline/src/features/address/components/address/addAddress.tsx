import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import {
  createAddress,
  getAddressByUserId,
  updateAddress,
  type Address,
} from "@/services/addressService";
import { toast } from "@/hooks/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { validateForm } from "./validateAddress";
import {
  useGetAddressByUserId,
  useGetDistricts,
  useGetProvinces,
  useGetWards,
  useUpdateFinalAddress,
} from "@/features/address/hooks/useAddress";

interface AddressCardFormProps {
  userId: number;
  onClose: () => void;
  reloadAddressHandler: (
    userId: number,
    setAddress: (address: Address[]) => void,
  ) => void;
}

export function FromAddress({
  userId,
  onClose,
  reloadAddressHandler,
}: AddressCardFormProps) {
  //#region Variable
  const [selectedProvince, setSelectedProvince] = useState<string>("");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("");
  const [selectedWard, setSelectedWard] = useState<string>("");
  const [contactName, setContactName] = useState<string>("");
  const [contactPhone, setContactPhone] = useState<string>("");
  const [isDefault, setIsDefault] = useState<boolean>(false);
  const [note, setNote] = useState<string>("");
  const { setAddress } = useGetAddressByUserId(userId);
  const { provinces } = useGetProvinces();
  const { districts } = useGetDistricts(
    selectedProvince,
    setSelectedDistrict,
    setSelectedWard,
  );
  const { wards } = useGetWards(selectedDistrict, setSelectedWard);
  const { finalAddress, setFinalAddress } = useUpdateFinalAddress(
    provinces,
    districts,
    wards,
    selectedProvince,
    selectedDistrict,
    selectedWard,
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  //#endregion

  //#region Handle Event
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm(contactName, contactPhone, finalAddress, note)) {
      return;
    }
    setIsLoading(true);
    const address = {
      userId: userId,
      addressLine: finalAddress,
      contactName: contactName,
      contactPhone: contactPhone,
      note: note,
      isDefault: isDefault,
      isDeleted: false,
      id: 0,
    };

    // Lấy danh sách tất cả địa chỉ của user
    const allAddressesResponse = await getAddressByUserId(address!.userId);
    if (allAddressesResponse.isSuccess) {
      const allAddresses = (allAddressesResponse.result as Address[]) || [];
      console.log(allAddresses);
      if (isDefault) {
        // Bỏ mặc định tất cả địa chỉ khác (trừ địa chỉ hiện tại)
        for (const addr of allAddresses) {
          if (addr.id !== address!.id && addr.isDefault) {
            await updateAddress(addr.id, {
              ...addr,
              isDefault: false,
            });
          }
        }
      }
      if (allAddresses.length === 0) {
        address.isDefault = true;
      }
    }
    const response = await createAddress(address);
    if (response.isSuccess) {
      onClose();
      reloadAddressHandler(userId, setAddress);
      toast.success("Thêm địa chỉ thành công");
    } else {
      toast.error("Thêm địa chỉ thất bại");
    }
    setIsLoading(false);
  };
  //#endregion

  return (
    <>
      <div className="fixed inset-0 z-50 flex w-full items-center justify-center bg-black/50 backdrop-blur-sm md:w-auto">
        <Card className="fixed max-h-screen w-sm overflow-y-auto border-1 border-emerald-300 shadow-sm shadow-emerald-100 md:w-xl">
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle className="mb-2 text-xl">Thêm địa chỉ</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Tên người nhận</Label>
                    <Input
                      id="name"
                      placeholder="Nhập tên người nhận"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Số điện thoại</Label>
                    <Input
                      id="phone"
                      placeholder="Nhập số điện thoại"
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="city">Tỉnh/Thành phố</Label>
                  <Select
                    required
                    onValueChange={(value) => setSelectedProvince(value)}
                    value={selectedProvince}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Chọn tỉnh/thành phố"></SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {provinces.map((p) => (
                        <SelectItem value={p.code.toString()}>
                          {p.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="district">Quận/Huyện</Label>
                  <Select
                    value={selectedDistrict}
                    onValueChange={setSelectedDistrict}
                    disabled={!districts.length}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Chọn quận/huyện"></SelectValue>{" "}
                    </SelectTrigger>
                    <SelectContent>
                      {districts.map((d) => (
                        <SelectItem key={d.code} value={d.code.toString()}>
                          {d.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="ward">Phường/Xã</Label>
                  <Select
                    value={selectedWard}
                    onValueChange={setSelectedWard}
                    disabled={!wards.length}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Chọn phường/xã" />
                    </SelectTrigger>
                    <SelectContent>
                      {wards.map((w) => (
                        <SelectItem key={w.code} value={w.code.toString()}>
                          {w.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="specificAddress">Địa chỉ cụ thể</Label>
                  <Textarea
                  className="w-full max-w-[530px]"
                    id="specificAddress"
                    placeholder="Số nhà, tên đường, tòa nhà, ..."
                    rows={3}
                    maxLength={200}
                    value={finalAddress}
                    onChange={(e) => setFinalAddress(e.target.value)}
                  /> <div className="mt-1 flex justify-between text-xs">
                  <span className="text-gray-500">
                    Ghi chú tối đa 200 ký tự
                  </span>
                  <span
                    className={`${finalAddress.length > 200 ? "text-red-500" : "text-gray-500"}`}
                  >
                    {finalAddress.length}/200
                  </span>
                </div>
                </div>{" "}
                <div>
                  <Label htmlFor="note">Ghi chú</Label>
                  <Textarea
                    className="w-full max-w-[530px]"
                    maxLength={300}
                    id="note"
                    placeholder="Ghi chú (tùy chọn) đi qua mấy cửa hàng, đi qua mấy ngã tư, qua mấy cây cầu, ..."
                    rows={3}
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                  />{" "}
                  <div className="mt-1 flex justify-between text-xs">
                    <span className="text-gray-500">
                      Ghi chú tối đa 300 ký tự
                    </span>
                    <span
                      className={`${note.length > 300 ? "text-red-500" : "text-gray-500"}`}
                    >
                      {note.length}/300
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Label htmlFor="isDefault">Đặt làm địa chỉ mặc định</Label>
                  <Checkbox
                    id="isDefault"
                    checked={isDefault}
                    onCheckedChange={(checked) =>
                      setIsDefault(checked === true)
                    }
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="mt-4 flex justify-end space-x-2">
              <Button variant="outline" onClick={onClose}>
                Hủy
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Đang thêm địa chỉ..." : "Thêm địa chỉ"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </>
  );
}
