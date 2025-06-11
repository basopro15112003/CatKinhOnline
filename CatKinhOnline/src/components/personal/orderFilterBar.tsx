import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

export default function FilterBar({ value, onChange }: { value: string; onChange: (val: string) => void }) {
  return (
    <Select onValueChange={onChange} value={value}>
      <SelectTrigger className="w-48">
        <SelectValue placeholder="Lọc theo trạng thái" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">Tất cả</SelectItem>
        <SelectItem value="done">Đã hoàn thành</SelectItem>
        <SelectItem value="pending">Chờ xác nhận</SelectItem>
      </SelectContent>
    </Select>
  );
}
