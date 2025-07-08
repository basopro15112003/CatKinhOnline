using CatKinhOnline.ModelDTOs;
using CatKinhOnline.Models;
using System.ComponentModel.DataAnnotations;

namespace CatKinhOnline.ModelDTOs
    {
    public class OrderDTO
        {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string? Email { get; set; } = string.Empty;
        public string? Phone { get; set; } = string.Empty;
        public string? FullName { get; set; } = string.Empty;
        public int? ShippingAddressId { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public int Status { get; set; } = 0;
        public int DeliveryType { get; set; }
        public int PaymentMethod { get; set; }
        public string? Note { get; set; }
        public int TotalAmount { get; set; }
        }
    public class OrderCreateRequest
        {
        public OrderDTO? Order { get; set; }
        public List<OrderItemDTO>? OrderItems { get; set; }
        }
    public class ViewOrderDTO
        {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string? Email { get; set; } = string.Empty;
        public string? Phone { get; set; } = string.Empty;
        public string? FullName { get; set; } = string.Empty;
        public int? ShippingAddressId { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public int Status { get; set; } = 0;
        public int DeliveryType { get; set; }
        public int PaymentMethod { get; set; }
        public string? Note { get; set; }
        public int TotalAmount { get; set; }
        public List<OrderItemDTO>? OrderItems { get; set; }
        }
    }
