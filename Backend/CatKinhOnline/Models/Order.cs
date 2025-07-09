using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace CatKinhOnline.Models
    {
    public class Order
        {
        [Key]
        public int Id { get; set; }

        [Required]
        public int UserId { get; set; }

        [Required, MaxLength(200)]
        public string? Email { get; set; } = string.Empty;

        [Required, MaxLength(20)]
        public string? Phone { get; set; } = string.Empty;

        [Required, MaxLength(200)]
        public string? FullName { get; set; } = string.Empty;

        public int? ShippingAddressId { get; set; }

        [Required]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        [Required]
        public int Status { get; set; }

        [Required]
        public int DeliveryType { get; set; }

        [Required]
        public int PaymentMethod { get; set; } 

        public string? Note { get; set; }

        [Required]
        public int TotalAmount { get; set; }

        [ForeignKey(nameof(UserId))]
        [JsonIgnore]
        public virtual User? User { get; set; }

        [ForeignKey(nameof(ShippingAddressId))]
        [JsonIgnore]
        public virtual Address? ShippingAddress { get; set; }

        [JsonIgnore]
        public virtual ICollection<OrderItem>? OrderItems { get; set; }
        }
    }
