import { toast } from "@/hooks/use-toast";

export function validateForm(contactName: string, contactPhone: string, finalAddress: string, note: string) {
    if (!contactName.trim()) {
      toast.warning("Vui lòng nhập tên người nhận");
      return false;
    }
    const nameRegex = /^[a-zA-ZÀ-ỹà-ỹ\s'-]+$/u;
    if (!nameRegex.test(contactName.trim())) {
      toast.warning("Tên người nhận chỉ được chứa chữ cái và khoảng trắng, không chứa ký tự đặc biệt hoặc emoji");
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
    if (finalAddress.trim().length > 300) {
      toast.warning("Địa chỉ cụ thể quá dài (tối đa 300 ký tự)");
      return false;
    }
    if (finalAddress.trim().length < 10 ) {
      toast.warning("Địa chỉ cụ thể quá ngắn (tối thiểu 10 ký tự)");
      return false;
    }
    if (note.trim().length > 300) {
      toast.warning("Ghi chú quá dài (tối đa 300 ký tự)");
      return false;
    }
    return true;
  }
      