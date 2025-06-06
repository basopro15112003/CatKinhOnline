using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CatKinhOnline.Models
    {
    public class Product
        {
        [Key]
        public int Id { get; set; }

        [Required, MaxLength(100)]
        public string ProductName { get; set; } = string.Empty;  

        [Required, MaxLength(50)]
        public int CategoryId { get; set; }  

        [Required]
        public int PricePerM2 { get; set; }

        [Required]
        public int Status { get; set; }
        [ForeignKey(nameof(CategoryId))]
        public virtual Category Category { get; set; } = new Category();
        public virtual ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();
        }
    }
