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
            Confirmed = 1,   // Đã xác nhận đơn
            Processing = 2,  // Đang xử lý đơn
            Shipping = 3,    // Đang giao
            Completed = 4,   // Đã giao hàng, đã nhận hàng
            Cancelled = 5    // Đã hủy
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
        
        public enum ProductStatus
            {
            Available = 0, // Sản phẩm có sẵn
            Unavailable = 1 // Sản phẩm hết hàng
            }
        }
    }
