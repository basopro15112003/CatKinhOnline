using CatKinhOnline.AppDbContext;
using CatKinhOnline.Models;
using Microsoft.EntityFrameworkCore;

namespace CatKinhOnline.Repositories.OrderItemRepository
    {
    public class OrderItemRepository : IOrderItemRepository
        {
        #region Get All Order Items
        /// <summary>
        /// get all order items from the database.
        /// </summary>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        public async Task<List<OrderItem>> GetAllOrderItemsAsync()
            {
            try
                {
                using (var _db = new MyDbContext()) 
                    {
                    return await _db.OrderItems.ToListAsync();
                    }
                }
            catch (Exception ex)
                {
                throw new Exception($"Error retrieving order items: {ex.Message}", ex);
                }
            }
        #endregion

        #region Get Order Item by Id
        /// <summary>
        /// get an order item by its ID from the database.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        public async Task<OrderItem?> GetOrderItemByIdAsync(int id)
            {
            try
                {
                using (var _db = new MyDbContext())
                    {
                    return await _db.OrderItems.FirstOrDefaultAsync(o => o.Id==id);
                    }
                }
            catch (Exception ex)
                {
                throw new Exception($"Error retrieving order item with ID {id}: {ex.Message}", ex);
                }
            }
        #endregion

        #region Add Order Item
        /// <summary>
        /// add a new order item to the database.   
        /// </summary>
        /// <param name="orderItem"></param>
        /// <returns></returns>
        /// <exception cref="ArgumentNullException"></exception>
        /// <exception cref="Exception"></exception>
        public async Task<OrderItem?> AddOrderItemAsync(OrderItem orderItem)
            {
            if (orderItem==null)
                {
                throw new ArgumentNullException(nameof(orderItem), "Order item cannot be null.");
                }
            try
                {
                using (var _db = new MyDbContext())
                    {
                    await _db.OrderItems.AddAsync(orderItem);
                    await _db.SaveChangesAsync();
                    return orderItem;
                    }
                }
            catch (Exception ex)
                {
                throw new Exception($"Error adding order item: {ex.Message}", ex);
                }
            }
        #endregion
        }
    }
