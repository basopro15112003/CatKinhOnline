using CatKinhOnline.ModelDTOs;
using CatKinhOnline.Models;
using CatKinhOnline.Repositories.OrderItemRepository;
using ISUZU_NEXT.Server.Core.Extentions;

namespace CatKinhOnline.Services
    {
    public class OrderItemService
        {
        private readonly IOrderItemRepository _orderItemRepository;
        public OrderItemService(IOrderItemRepository orderItemRepository)
            {
            _orderItemRepository=orderItemRepository;
            }

        #region Get All Order Items
        public async Task<APIResponse> GetOrderItems()
            {
            try
                {
                var orders = await _orderItemRepository.GetAllOrderItemsAsync();
                if (orders==null||!orders.Any())
                    {
                    return new APIResponse { IsSuccess=true, Message="Không tìm thấy các đơn hàng." };
                    }
                var orderDTOs = new List<OrderItemDTO>();
                foreach (var order in orders)
                    {
                    var orderDTO = new OrderItemDTO();
                    orderDTO.CopyProperties(order);
                    orderDTOs.Add(orderDTO);
                    }
                return new APIResponse { IsSuccess=true, Result=orderDTOs };
                }
            catch (Exception ex)
                {
                return new APIResponse { Result=null, IsSuccess=false, Message="Lỗi không thể tìm thấy đơn hàng: "+ex.Message };
                }
            }
        #endregion

        #region Get Order Item by Id
        /// <summary>
        /// get an order item by its ID from the database.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<APIResponse> GetOrderItemByIdAsync(int id)
            {
            try
                {
                var orderItem = await _orderItemRepository.GetOrderItemByIdAsync(id);
                if (orderItem==null)
                    {
                    return new APIResponse { IsSuccess=false, Message="Không tìm thấy đơn hàng." };
                    }
                var orderItemDTO = new OrderItemDTO();
                orderItemDTO.CopyProperties(orderItem);
                return new APIResponse { IsSuccess=true, Result=orderItemDTO };
                }
            catch (Exception ex)
                {
                return new APIResponse { Result=null, IsSuccess=false, Message="Lỗi không thể tìm thấy đơn hàng: "+ex.Message };
                }
            }
        #endregion

        #region Calculate Item Price
        /// <summary>
        /// calculate the price of an order item based on its width, height, quantity, and unit price.
        /// </summary>
        /// <param name="width"></param>
        /// <param name="height"></param>
        /// <param name="quantity"></param>
        /// <param name="unitPrice"></param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        public decimal CalculateItemPrice(decimal width, decimal height, int quantity, int unitPrice)
            {
            try
                {
                // Diện tích 1 tấm kính
                decimal area = width*height;
                // Tổng tiền cho 1 sản phẩm
                decimal subtotal = area*quantity*unitPrice;
                return subtotal;     
                }
            catch (Exception ex)
                {
                throw new Exception($"Error calculating item price: {ex.Message}", ex);
                }
            }
        #endregion

        #region Add Order Item
        /// <summary>
        /// add a new order item to the database.
        /// </summary>
        /// <param name="orderItemDTO"></param>
        /// <returns></returns>
        public async Task<APIResponse> AddOrderItemAsync(OrderItemDTO orderItemDTO)
            {
            try
                {
                if (orderItemDTO==null)
                    {
                    return new APIResponse { IsSuccess=false, Message="Đơn hàng không được để trống." };
                    }
                var orderItem = new OrderItem();
                orderItem.CopyProperties(orderItemDTO);
                orderItem.Id=0;
                double subtotal= (int)CalculateItemPrice(orderItemDTO.WidthM, orderItemDTO.HeightM, orderItemDTO.Quantity, orderItemDTO.UnitPrice);
                double subtotalRounded = Math.Round((subtotal)/1000.0)*1000;  // làm tròn bỏ tiền lẻ
                orderItem.Subtotal=(int)subtotalRounded; // Chuyển đổi về int để lưu trong DB
                var itemAdded = await _orderItemRepository.AddOrderItemAsync(orderItem);
                if (itemAdded!= null)
                    {
                    return new APIResponse { IsSuccess=true, Message="Thêm đơn hàng thành công", Result=itemAdded };
                    }
                else
                    {
                    return new APIResponse { IsSuccess=false, Message="Thêm đơn hàng thất bại" };
                    }
                }
            catch (Exception ex)
                {
                return new APIResponse { Result=null, IsSuccess=false, Message="Lỗi khi thêm đơn hàng: "+ex.Message };
                }
            }
        #endregion

        #region Add List Order Items
        /// <summary>
        /// add a list of order items to the database.
        /// </summary>
        /// <param name="orderItems"></param>
        /// <returns></returns>
        public async Task<APIResponse> AddListOrderItemAsync(List<OrderItemDTO> orderItems)
            {
            try
                {
                   foreach(var item in orderItems)
                    {
                    var orderItem = new OrderItem();
                    orderItem.CopyProperties(item);
                    orderItem.Subtotal=(int)CalculateItemPrice(item.WidthM, item.HeightM, item.Quantity, item.UnitPrice);
                    var isSuccess = await _orderItemRepository.AddOrderItemAsync(orderItem);
                    if (isSuccess == null)
                        {
                        return new APIResponse { IsSuccess=false, Message="Thêm đơn hàng thất bại" };
                        }
                    }
                return new APIResponse { IsSuccess=true, Message="Thêm đơn hàng thành công" };
                }
            catch (Exception)
                {
                throw;
                }
            }
        #endregion
        }
    }
