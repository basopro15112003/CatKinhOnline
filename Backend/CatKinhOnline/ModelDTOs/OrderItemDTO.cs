using System.ComponentModel.DataAnnotations.Schema;

namespace CatKinhOnline.ModelDTOs
    {
    public class OrderItemDTO
        {
        public int Id { get; set; }
        public int OrderId { get; set; }
        public int ProductId { get; set; }
        public decimal WidthM { get; set; }   // chiều rộng (mét)
        public decimal HeightM { get; set; }  // chiều dài (mét)
        public int Quantity { get; set; }
        public int UnitPrice { get; set; }    // Giá tại thời điểm đặt (VNĐ/m²)
        public int Subtotal { get; set; }
        }
    }
