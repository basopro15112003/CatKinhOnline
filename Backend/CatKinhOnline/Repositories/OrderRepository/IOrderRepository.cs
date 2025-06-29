using CatKinhOnline.Models;

namespace CatKinhOnline.Repositories.OrderRepository
    {
    public interface IOrderRepository
        {
        Task<List<Order>> GetOrdersAsync();
        Task<Order?> GetOrderByIdAsync(int id);
        Task<Order?> AddOrderAsync(Order order);
        Task<Order?> UpdateOrderAsync(Order order);
        Task<List<Order>?> GetOrdersByUserIdAsync(int userId);

        }
    }
