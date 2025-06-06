using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace CatKinhOnline.Models
    {
    public class OrderItem
        {
        [Key]
        public int Id { get; set; }

        [Required]
        public int OrderId { get; set; }

        [Required]
        public int ProductId { get; set; }

        [Required, Column(TypeName = "decimal(10,2)")]
        public decimal WidthM { get; set; }   // chiều rộng (mét)

        [Required, Column(TypeName = "decimal(10,2)")]
        public decimal HeightM { get; set; }  // chiều dài (mét)

        [Required]
        public int Quantity { get; set; }

        [Required]
        public int UnitPrice { get; set; }    // Giá tại thời điểm đặt (VNĐ/m²)

        [Required]
        public int Subtotal { get; set; }     // = WidthM * HeightM * Quantity * UnitPrice

        // Navigation properties
        [ForeignKey(nameof(OrderId))]
        public virtual Order Order { get; set; } = new Order();

        [ForeignKey(nameof(ProductId))]
        public virtual Product Product { get; set; } = new Product();
        }
    }
