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
import { useEffect, useState } from "react";
import {
  addressService,
  createAddress,
  type District,
  type Province,
  type Ward,
} from "@/services/addressService";
import { toast } from "@/hooks/use-toast";
import { Checkbox } from "@/components/ui/checkbox";

interface AddressCardFormProps {
  userId: number;
  onClose: () => void;
  handleReloadAddress: () => void;
}

export function FromAddress({
  userId,
  onClose,
  handleReloadAddress,
}: AddressCardFormProps) {
  //#region Variable
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [wards, setWards] = useState<Ward[]>([]);

  const [selectedProvince, setSelectedProvince] = useState<string>("");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("");
  const [selectedWard, setSelectedWard] = useState<string>("");
  const [finalAddress, setFinalAddress] = useState<string>("");
  const [contactName, setContactName] = useState<string>("");
  const [contactPhone, setContactPhone] = useState<string>("");
  const [isDefault, setIsDefault] = useState<boolean>(false);
  const [note, setNote] = useState<string>("");
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

  //#region Handle Event
  function validateForm() {
    if (!contactName.trim()) {
      toast.warning("Vui lòng nhập tên người nhận");
      return false;
    }
    if (contactName.trim().length < 6) {
      toast.warning("Tên người nhận quá ngắn (tối thiểu 6 ký tự)");
      return false;
    }
    if (contactName.trim().length > 50) {
      toast.warning("Tên người nhận quá dài (tối đa 50 ký tự)");
      return false;
    }
    if (!contactPhone.trim()) {
      toast.warning("Vui lòng nhập số điện thoại");
      return false;
    }
    if (!contactPhone.trim().match(/^0[0-9]{9}$/)) {
      toast.warning("Số điện thoại không hợp lệ");
      return false;
    }
    if (!finalAddress.trim()) {
      toast.warning("Vui lòng nhập địa chỉ cụ thể");
      return false;
    }
    return true;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    const address = {
      userId: userId,
      addressLine: finalAddress,
      contactName: contactName,
      contactPhone: contactPhone,
      note: note,
      isDefault: isDefault,
      id: 0,
    };
    const response = await createAddress(address);
    if (response.isSuccess) {
      onClose();
      handleReloadAddress();
      toast.success("Thêm địa chỉ thành công");
    } else {
      toast.error("Thêm địa chỉ thất bại");
    }
  };
  useEffect(() => {
    const selectedProvinceName =
      provinces.find((p) => p.code.toString() === selectedProvince)?.name || "";
    const selectedDistrictName =
      districts.find((p) => p.code.toString() === selectedDistrict)?.name || "";
    const selectedWardName =
      wards.find((p) => p.code.toString() === selectedWard)?.name || "";
    const parts = [
      selectedWardName,
      selectedDistrictName,
      selectedProvinceName,
    ].filter(Boolean);
    setFinalAddress(parts.join(", "));
  }, [
    districts,
    provinces,
    wards,
    selectedDistrict,
    selectedProvince,
    selectedWard,
  ]);
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
              <Button type="submit">Thêm địa chỉ</Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </>
  );
}
