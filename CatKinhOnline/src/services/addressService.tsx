import axios from "axios";

export interface Ward {
  code: string;
  name: string;
}
export interface District {
  code: string;
  name: string;
}
export interface Province {
  code: string;
  name: string;
}

const API_BASE = "https://provinces.open-api.vn/api";

export const addressService = {
  async getProvinces(): Promise<Province[]> {
    const res = await axios.get<Province[]>(`${API_BASE}/p?depth=1`);
    return res.data;
  },
  async getDistricts(provinceCode: string): Promise<District[]> {
    const res = await axios.get<{ districts: District[] }>(
      `${API_BASE}/p/${provinceCode}?depth=2`,
    );
    return res.data.districts;
  },

  async getWards(districtCode: string): Promise<Ward[]> {
    const res = await axios.get<{ wards: Ward[] }>(
      `${API_BASE}/d/${districtCode}?depth=2`,
    );
    return res.data.wards;
  },
};
