using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using CatKinhOnline.AppDbContext;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.OpenApi;
using Microsoft.EntityFrameworkCore;

namespace CatKinhOnline.Models
    {
    public class Category
        {
        [Key]
        public int Id { get; set; }

        [Required, MaxLength(100)]
        public string CategoryName { get; set; } = string.Empty;

        [MaxLength(250)]
        public string Description { get; set; } = string.Empty;

        // Quan hệ 1 Category có nhiều Product
        [JsonIgnore]
        public virtual ICollection<Product> Products { get; set; } = new List<Product>();
        }
   }
