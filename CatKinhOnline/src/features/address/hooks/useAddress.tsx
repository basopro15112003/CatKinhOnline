  
import { toast } from "@/hooks/use-toast";
import {
  deleteAddress,
  getAddressByUserId,
  updateAddress,
  type Address,
  type Province,
  addressService,
  type District,
  type Ward,
} from "@/services/addressService"; 
import { useEffect, useState } from "react";

//#region Get Address By User Id
export const useGetAddressByUserId = (userId: number) => {
  const [address, setAddress] = useState<Address[]>([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getAddressByUserId(userId);
        if (response.isSuccess) {
          setAddress((response.result as Address[]) || []);
        }else{
          setAddress([]);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
    fetchData();
  }, [userId]);
  return { address, setAddress };
};
//#endregion

//#region Reload Address Handler
export const reloadAddressHandler = async (
  userId: number,
  setAddress: (address: Address[]) => void,
) => {
  const response = await getAddressByUserId(userId);
  if (response.isSuccess) {
    setAddress(response.result as Address[]);
  }
};
//#endregion

//#region Delete Address Handler
export const deleteAddressHandler = async (
  id: number,
  address: Address[],
  setAddress: (address: Address[]) => void,
  userId: number,
) => {
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

//#region Get Provinces
export const useGetProvinces = () => {
  const [provinces, setProvinces] = useState<Province[]>([]);
  useEffect(() => {
    addressService.getProvinces().then(setProvinces);
  }, []);
  return { provinces };
};
//#endregion

//#region Get Districts
export const useGetDistricts = (
  selectedProvince: string,
  setSelectedDistrict: (district: string) => void,
  setSelectedWard: (ward: string) => void,
) => {
  const [districts, setDistricts] = useState<District[]>([]);
  useEffect(() => {
    if (selectedProvince) {
      setSelectedDistrict("");
      setSelectedWard("");
      setDistricts([]);
      addressService.getDistricts(selectedProvince).then(setDistricts);
    }
  }, [selectedProvince, setSelectedDistrict, setSelectedWard]);
  return { districts };
};
//#endregion

//#region Get Wards
export const useGetWards = (
  selectedDistrict: string,
  setSelectedWard: (ward: string) => void,
) => {
  const [wards, setWards] = useState<Ward[]>([]);
  useEffect(() => {
    if (selectedDistrict) {
      setSelectedWard("");
      setWards([]);
      addressService.getWards(selectedDistrict).then(setWards);
    }
  }, [selectedDistrict, setSelectedWard]);
  return { wards };
};
//#endregion



  //#region Update finalAddress based on selected province/district/ward
  export const useUpdateFinalAddress = (
    provinces: Province[],
    districts: District[],
    wards: Ward[],
    selectedProvince: string,
    selectedDistrict: string,
    selectedWard: string,
  ) => {
    const [finalAddress, setFinalAddress] = useState<string>("");
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
  return { finalAddress, setFinalAddress };
};  
//#endregion
