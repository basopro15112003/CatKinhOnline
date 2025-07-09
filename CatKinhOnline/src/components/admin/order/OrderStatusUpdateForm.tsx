import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { updateOrderStatus, type ViewOrder } from "@/services/orderService";

interface OrderStatusUpdateFormProps {
  id: number;
  order: ViewOrder;
  onClose: () => void;
  onUpdateSuccess?: (updatedOrder: ViewOrder) => void;
}

export function OrderStatusUpdateForm({ 
  id,
  order, 
  onClose, 
  onUpdateSuccess 
}: OrderStatusUpdateFormProps) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(order.status.toString());

  const statusOptions = [
    { value: "0", label: "Chờ xác nhận" },
    { value: "1", label: "Đã xác nhận" },
    { value: "2", label: "Đang thực hiện" },
    { value: "3", label: "Đang giao hàng" },
    { value: "4", label: "Đã hoàn thành" },
    { value: "5", label: "Đã hủy" },
  ];

  const getStatusLabel = (status: number) => {
    return statusOptions.find(option => option.value === status.toString())?.label || "Không xác định";
  };

  const handleStatusUpdate = async () => {
    if (selectedStatus === order.status.toString()) {
     toast.warning("Trạng thái không thay đổi");
      return;
    }

    setIsUpdating(true);
    try {
      const response = await updateOrderStatus(id, parseInt(selectedStatus));
      
      if (response.isSuccess) {
        toast.success("Cập nhật trạng thái đơn hàng thành công");
        
        
        // Cập nhật order trong parent component
        const updatedOrder = { ...order, status: parseInt(selectedStatus) };
        if (onUpdateSuccess) {
          onUpdateSuccess(updatedOrder);
        }
        onClose();
      } else {
        toast.error(response.message || "Có lỗi xảy ra khi cập nhật trạng thái");
      }
    } catch (error) {
      console.error("Error updating order status:", error);
      toast({
        title: "Lỗi",
        description: "Có lỗi xảy ra khi kết nối tới máy chủ",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-xl text-green-800">
            Cập nhật trạng thái đơn hàng
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Thông tin đơn hàng */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label className="font-semibold">Mã đơn hàng:</Label>
              <span className="text-green-800 font-bold">
                DH#{order.id.toString().padStart(4, "0")}
              </span>
            </div>
            <div className="flex justify-between">
              <Label className="font-semibold">Tên khách hàng:</Label>
              <span>{order.fullName}</span>
            </div>
            <div className="flex justify-between">
              <Label className="font-semibold">Số điện thoại:</Label>
              <span>{order.phone}</span>
            </div>
            <div className="flex justify-between">
              <Label className="font-semibold">Trạng thái hiện tại:</Label>
              <span className="text-blue-600 font-medium">
                {getStatusLabel(order.status)}
              </span>
            </div>
          </div>

          {/* Select trạng thái mới */}
          <div className="space-y-2">
            <Label htmlFor="status">Trạng thái mới</Label>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Chọn trạng thái mới" />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Buttons */}
          <div className="flex gap-2 pt-4">
            <Button 
              onClick={handleStatusUpdate} 
              disabled={isUpdating}
              className="flex-1 bg-green-600 hover:bg-green-700"
            >
              {isUpdating ? "Đang cập nhật..." : "Cập nhật"}
            </Button>
            <Button 
              variant="outline" 
              onClick={onClose}
              disabled={isUpdating}
              className="flex-1"
            >
              Hủy
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 