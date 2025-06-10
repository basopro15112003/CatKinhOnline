using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace CatKinhOnline.Models
    {
    public class Product
        {
        [Key]
        public int Id { get; set; }

        [Required, MaxLength(100, ErrorMessage = "Tên sản phẩm không thể dài hơn 100 ký tự!")]
        public string ProductName { get; set; } = string.Empty;  

        [Required]
        public int CategoryId { get; set; }  

        [Required]
        public int PricePerM2 { get; set; }

        [Required]
        public int Status { get; set; }

        [JsonIgnore]
        [ForeignKey(nameof(CategoryId))]
        public virtual Category? Category { get; set; }
        [JsonIgnore]
        public virtual ICollection<OrderItem>? OrderItems { get; set; }
        }
    }
