using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace CatKinhOnline.Models
    {
    public class Address
        {
        [Key]
        public int Id { get; set; }

        [Required]
        public int UserId { get; set; }

        [Required, MaxLength(300)]
        public string AddressLine { get; set; } = string.Empty;

        [MaxLength(150)]
        public string ContactName { get; set; } = string.Empty;

        [MaxLength(20)]
        public string ContactPhone { get; set; } = string.Empty;

        [MaxLength(500)]
        public string Note { get; set; } = string.Empty;

        public bool IsDefault { get; set; } = false;

        // Navigation property              
        [ForeignKey(nameof(UserId))]
        public virtual User User { get; set; } = new User();

        public virtual ICollection<Order> OrdersShipping { get; set; }  = new List<Order>();
        }
    }
