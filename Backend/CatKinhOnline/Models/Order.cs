using static CatKinhOnline.Models.Enum;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace CatKinhOnline.Models
    {
    public class Order
        {
        [Key]
        public int Id { get; set; }

        [Required]
        public int UserId { get; set; }

        public int? ShippingAddressId { get; set; }

        [Required]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        [Required]
        public OrderStatus Status { get; set; } = OrderStatus.Pending;

        [Required]
        public DeliveryType DeliveryType { get; set; } = DeliveryType.Pickup;

        [Required]
        public PaymentMethod PaymentMethod { get; set; } = PaymentMethod.COD;

        public DateTime? EstimatedDate { get; set; }

        [Required]
        public int TotalAmount { get; set; }

        [ForeignKey(nameof(UserId))]
        public virtual User User { get; set; } = new User();

        [ForeignKey(nameof(ShippingAddressId))]
        public virtual Address ShippingAddress { get; set; } = new Address();

        public virtual ICollection<OrderItem> OrderItems { get; set; }  = new List<OrderItem>();
        }
    }
