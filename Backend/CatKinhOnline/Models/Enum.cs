namespace CatKinhOnline.Models
    {
    public class Enum
        {
        public enum Role
            {
            Admin = 0,     
            Customer = 1,    
            }

        public enum OrderStatus
            {
            Pending = 0,     // Đang xử lý
            Shipping = 1,    // Đang giao
            Completed = 2,   // Đã giao
            Cancelled = 3    // Đã hủy
            }

        public enum DeliveryType
            {
            Pickup = 0,  // Nhận tại cửa hàng
            Shipping = 1 // Giao tận nhà
            }

        public enum PaymentMethod
            {
            COD = 0,    // Tiền mặt khi nhận
            Online = 1  // Chuyển khoản / online
            }
        }
    }
