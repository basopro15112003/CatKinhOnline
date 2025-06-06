using System.ComponentModel.DataAnnotations;
using System.Net;

namespace CatKinhOnline.Models
    {
    public class User
        {             
        [Key]
        public int Id { get; set; }

        [Required, MaxLength(150)]
        public string FullName { get; set; } = string.Empty;

        [Required, MaxLength(200)]
        public string Email { get; set; } = string.Empty;

        [Required, MaxLength(20)]
        public string Phone { get; set; } = string.Empty;

        [Required, MaxLength(200)]
        public string PasswordHash { get; set; } = string.Empty;

        [Required]
        public int Role { get; set; }

        [Required]
        public int Status { get; set; }

        public virtual ICollection<Address> Addresses { get; set; } = new List<Address>();

        public virtual ICollection<Order> Orders { get; set; }  = new List<Order>();
        }
    }
