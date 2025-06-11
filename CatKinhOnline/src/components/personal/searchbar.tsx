import { Input } from "@/components/ui/input";

export default function SearchBar({ value, onChange }: { value: string; onChange: (val: string) => void }) {
  return <Input className="lg:w-1/5" placeholder="Tìm tên khách hàng" value={value} onChange={(e) => onChange(e.target.value)} />;
}
