using CatKinhOnline.Models;

namespace CatKinhOnline.Repositories.OrderItemRepository
    {
    public interface IOrderItemRepository
        {
        Task<List<OrderItem>> GetAllOrderItemsAsync();
        Task<OrderItem?> GetOrderItemByIdAsync(int id);
        Task<OrderItem?> AddOrderItemAsync(OrderItem orderItem);
        }
    }
