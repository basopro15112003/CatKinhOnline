import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import {
  addressService,
  updateAddress,
  getAddressByUserId,
  type Address,
  type District,
  type Province,
  type Ward,
} from "@/services/addressService";
import { toast } from "@/hooks/use-toast";

interface UpdateAddressProps {
  address: Address | null;
  onClose: () => void;
  handleReloadAddress: () => void;
}

export function UpdateAddress({
  address,
  onClose,
  handleReloadAddress,
}: UpdateAddressProps) {
  //#region Variable
  const [contactName, setContactName] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWard, setSelectedWard] = useState("");
  const [note, setNote] = useState("");
  const [isDefault, setIsDefault] = useState(false);
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [wards, setWards] = useState<Ward[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [finalAddress, setFinalAddress] = useState("");
  //#endregion  

  //#region Initialize data from address prop
  useEffect(() => {
    if (address) {
      setContactName(address.contactName || "");
      setContactPhone(address.contactPhone || "");
      setNote(address.note || "");
      setIsDefault(address.isDefault || false);
      setFinalAddress(address.addressLine || "");
    }
  }, [address]);
  //#endregion

  //#region Update finalAddress based on selected province/district/ward
  useEffect(() => {
    const selectedProvinceName =
      provinces.find((p) => p.code.toString() === selectedProvince)?.name || "";
    const selectedDistrictName =
      districts.find((d) => d.code.toString() === selectedDistrict)?.name || "";
    const selectedWardName =
      wards.find((w) => w.code.toString() === selectedWard)?.name || "";

    const parts = [
      selectedWardName,
      selectedDistrictName,
      selectedProvinceName,
    ].filter(Boolean);
    if (parts.length > 0) {
      setFinalAddress(parts.join(", "));
    }
  }, [
    provinces,
    districts,
    wards,
    selectedProvince,
    selectedDistrict,
    selectedWard,
  ]);
  //#endregion

  //#region Fetch Data
  useEffect(() => {
    addressService.getProvinces().then(setProvinces);
  }, []);

  useEffect(() => {
    if (selectedProvince) {
      setSelectedDistrict("");
      setSelectedWard("");
      setDistricts([]);
      setWards([]);
      addressService.getDistricts(selectedProvince).then(setDistricts);
    }
  }, [selectedProvince]);

  useEffect(() => {
    if (selectedDistrict) {
      setSelectedWard("");
      setWards([]);
      addressService.getWards(selectedDistrict).then(setWards);
    }
  }, [selectedDistrict]);
  //#endregion

  //#region Handle Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      // Nếu đang set địa chỉ này làm mặc định, thì bỏ mặc định tất cả địa chỉ khác
      if (isDefault) {
        // Lấy danh sách tất cả địa chỉ của user
        const allAddressesResponse = await getAddressByUserId(address!.userId);
        if (allAddressesResponse.isSuccess) {
          const allAddresses = allAddressesResponse.result as Address[];
          
          // Bỏ mặc định tất cả địa chỉ khác (trừ địa chỉ hiện tại)
          for (const addr of allAddresses) {
            if (addr.id !== address!.id && addr.isDefault) {
              await updateAddress(addr.id, {
                ...addr,
                isDefault: false
              });
            }
          }
        }
      }

      const updated = await updateAddress(address!.id, {
        id: address!.id,
        userId: address!.userId,
        contactName,
        contactPhone,
        addressLine: finalAddress,
        note,
        isDefault,
      });
      if (updated) {
        toast.success("Cập nhật địa chỉ thành công");
      }
      handleReloadAddress();
      onClose();
    } catch (error) {
      console.error(error);
      toast.error("Cập nhật địa chỉ thất bại");
    } finally {
      setSubmitting(false);
    }
  };
  //#endregion
  return (
    <>
      {" "}
      <div className="fixed inset-0 z-50 flex w-full items-center justify-center bg-black/50 backdrop-blur-sm md:w-auto">
        <Card className="fixed max-h-screen w-sm overflow-y-auto border-1 border-emerald-300 shadow-sm shadow-emerald-100 md:w-xl">
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle className="mb-2 text-xl">Cập nhật địa chỉ</CardTitle>
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
                    id="specificAddress"
                    placeholder="Số nhà, tên đường, tòa nhà, ..."
                    rows={2}
                    value={finalAddress}
                    onChange={(e) => setFinalAddress(e.target.value)}
                  />
                </div>{" "}
                <div>
                  <Label htmlFor="note">Ghi chú</Label>
                  <Textarea
                    id="note"
                    placeholder="Ghi chú (tùy chọn) đi qua mấy cửa hàng, đi qua mấy ngã tư, qua mấy cây cầu, ..."
                    rows={2}
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                  />
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
              <Button type="submit" disabled={submitting}>
                Cập nhật địa chỉ
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </>
  );
}
