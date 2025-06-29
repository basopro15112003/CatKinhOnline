using CatKinhOnline.AppDbContext;
using CatKinhOnline.Models;
using Microsoft.EntityFrameworkCore;
using System.Net;

namespace CatKinhOnline.Repositories.OrderRepository
    {
    public class OrderRepository : IOrderRepository
        {
        #region Get All Orders
        /// <summary>
        /// get all orders from the database.
        /// </summary>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        public async Task<List<Order>> GetOrdersAsync()
            {
            try
                {
                using (var context = new MyDbContext())
                    {
                    return await context.Orders
                        .Include(o => o.OrderItems)
                        .ToListAsync();
                    }
                }
            catch (Exception ex)
                {
                throw new Exception($"An error occurred while retrieving orders: {ex.Message}", ex);
                }
            }
        #endregion

        #region Get Order by Id
        /// <summary>
        /// get an order by its ID from the database.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        public async Task<Order?> GetOrderByIdAsync(int id)
            {
            try
                {
                using (var context = new MyDbContext())
                    {
                    return await context.Orders.Include(o => o.OrderItems)
                        .FirstOrDefaultAsync(o => o.Id==id);
                    }
                }
            catch (Exception ex)
                {
                throw new Exception($"An error occurred while retrieving the order with ID {id}: {ex.Message}", ex);
                }
            }
        #endregion

        #region get Order by User Id
        /// <summary>
        /// get an order by user ID from the database that has order items.
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        public async Task<List<Order>?> GetOrdersByUserIdAsync(int userId)
            {
            try
                {
                using (var context = new MyDbContext())
                    {
                    return await context.Orders.Include(o => o.OrderItems)
                        .Where(o => o.UserId==userId).ToListAsync();
                    }
                }
            catch (Exception ex)
                {
                throw new Exception($"An error occurred while retrieving the order for user ID {userId}: {ex.Message}", ex);
                }
            }
        #endregion

        #region Add Order
        /// <summary>
        /// add a new order to the database.
        /// </summary>
        /// <param name="order"></param>
        /// <returns></returns>
        /// <exception cref="ArgumentNullException"></exception>
        /// <exception cref="Exception"></exception>
        public async Task<Order?> AddOrderAsync(Order order)
            {
            if (order==null)
                {
                throw new ArgumentNullException(nameof(order), "Order cannot be null");
                }
            try
                {
                using (var context = new MyDbContext())
                    {
                    context.Orders.Add(order);
                    await context.SaveChangesAsync();
                    return order;
                    }
                }
            catch (Exception ex)
                {
                throw new Exception($"An error occurred while adding the order: {ex.Message}", ex);
                }
            }
        #endregion

        #region Update Order
        /// <summary>
        /// update an existing order in the database.
        /// </summary>
        /// <param name="order"></param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        public async Task<Order?> UpdateOrderAsync(Order order)
            {
            if (order==null)
                {
                throw new ArgumentNullException(nameof(order), "Order cannot be null");
                }
            try
                {
                using (var context = new MyDbContext())
                    {
                    context.Orders.Update(order);
                    await context.SaveChangesAsync();
                    return order;
                    }
                }
            catch (Exception ex)
                {
                throw new Exception($"An error occurred while updating the order: {ex.Message}", ex);
                }
            }
        #endregion
        }

    }
