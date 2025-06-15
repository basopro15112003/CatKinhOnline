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
  type District,
  type Province,
  type Ward,
} from "@/services/addressService";

interface AddressCardFormProps {
  onClose: () => void;
}

export function FromAddress({ onClose }: AddressCardFormProps) {
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [wards, setWards] = useState<Ward[]>([]);

  const [selectedProvince, setSelectedProvince] = useState<string>("");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("");
  const [selectedWard, setSelectedWard] = useState<string>("");
  const [finalAddress, setFinalAddress] = useState<string>("");

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: gọi API lưu địa chỉ
  };

     useEffect(() => {
    const selectedProvinceName = provinces.find(p => p.code.toString() === selectedProvince)?.name || "";
    const selectedDistrictName = districts.find(p => p.code.toString() === selectedDistrict)?.name || "";
    const selectedWardName = wards.find(p => p.code.toString() === selectedWard)?.name || "";

    const parts = [selectedWardName, selectedDistrictName, selectedProvinceName].filter(Boolean);
    setFinalAddress(parts.join(", "));
  }, [districts, provinces, wards, selectedDistrict, selectedProvince, selectedWard]);


  return (
    <>
      <div className="fixed inset-0 z-50 flex w-auto items-center justify-center bg-black/50 backdrop-blur-sm">
        <Card className="w-xl fixed border-1 border-emerald-300 shadow-sm shadow-emerald-100 overflow-y-auto max-h-screen">
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle className="mb-2 text-xl">Thêm địa chỉ</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Tên người nhận</Label>
                    <Input id="name" placeholder="Nhập tên người nhận" />
                  </div>
                  <div>
                    <Label htmlFor="phone">Số điện thoại</Label>
                    <Input id="phone"  placeholder="Nhập số điện thoại" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="city">Tỉnh/Thành phố</Label>
                  <Select required
                    onValueChange={(value) => setSelectedProvince(value)}
                    value={selectedProvince}
                  >
                    <SelectTrigger  className="w-full">
                      <SelectValue  placeholder="Chọn tỉnh/thành phố"></SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {provinces.map((p) => (
                        <SelectItem   value={p.code.toString()}>
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
                    onChange={(e)=>setFinalAddress(e.target.value)}
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
