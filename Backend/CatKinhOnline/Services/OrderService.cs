using CatKinhOnline.ModelDTOs;
using CatKinhOnline.Models;
using CatKinhOnline.Repositories.OrderRepository;
using ISUZU_NEXT.Server.Core.Extentions;
using static NuGet.Packaging.PackagingConstants;

namespace CatKinhOnline.Services
    {
    public class OrderService
        {
        private readonly IOrderRepository _orderRepository;
        private readonly OrderItemService _orderItemService;
        private readonly AddressService _addressService;
        public OrderService(IOrderRepository orderRepository, OrderItemService orderItemService, AddressService addressService)
            {
            _orderRepository=orderRepository;
            _orderItemService=orderItemService;
            _addressService=addressService;
            }

        #region Get All Orders
        /// <summary>
        /// get all orders from the database.
        /// </summary>
        /// <returns></returns>
        public async Task<APIResponse> getOrdersAsync()
            {
            try
                {
                var orders = await _orderRepository.GetOrdersAsync();
                if (orders==null||!orders.Any())
                    {
                    return new APIResponse { IsSuccess=true, Message="Không tìm thấy các đơn hàng." };
                    }
                var orderDTOs = new List<OrderDTO>();
                foreach (var order in orders)
                    {
                    var orderDTO = new OrderDTO();
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

        #region Get All Orders have OrderItems
        /// <summary>
        /// get all orders from the database.
        /// </summary>
        /// <returns></returns>
        public async Task<APIResponse> getOrdersHaveOrderItemAsync()
            {
            try
                {
                var orders = await _orderRepository.GetOrdersAsync();
                if (orders==null||!orders.Any())
                    {
                    return new APIResponse { IsSuccess=true, Message="Không tìm thấy các đơn hàng." };
                    }
                var orderDTOs = new List<ViewOrderDTO>();
                foreach (var order in orders)
                    {
                    var orderDTO = new ViewOrderDTO();
                    orderDTO.CopyProperties(order);
                    if (order.OrderItems!=null)
                        {
                        List<OrderItemDTO> orderItemDTOs = new List<OrderItemDTO>();
                        foreach (var item in order.OrderItems)
                            {
                            var orderItemDTO = new OrderItemDTO();
                            orderItemDTO.CopyProperties(item);
                            orderItemDTOs.Add(orderItemDTO);
                            }
                        orderDTO.OrderItems=orderItemDTOs; 
                        }
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

        #region Get All Orders have Orderitems by User Id
        /// <summary>
        /// get all orders by user ID from the database that have order items.
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        public async Task<APIResponse> getOrdersHaveOrderItemByUserIdAsync(int userId)
            {
            try
                {
                var orders = await _orderRepository.GetOrdersByUserIdAsync(userId);
                if (orders==null||!orders.Any())
                    {
                    return new APIResponse { IsSuccess=true, Message="Không tìm thấy các đơn hàng." };
                    }
                var orderDTOs = new List<ViewOrderDTO>();
                foreach (var order in orders)
                    {
                    var orderDTO = new ViewOrderDTO();
                    orderDTO.CopyProperties(order);
                    if (order.OrderItems!=null)
                        {
                        List<OrderItemDTO> orderItemDTOs = new List<OrderItemDTO>();
                        foreach (var item in order.OrderItems)
                            {
                            var orderItemDTO = new OrderItemDTO();
                            orderItemDTO.CopyProperties(item);
                            orderItemDTOs.Add(orderItemDTO);
                            }
                        orderDTO.OrderItems=orderItemDTOs;
                        }
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

        #region Get Order by Id
        /// <summary>
        /// get an order by its ID from the database.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<APIResponse> getOrderByIdAsync(int id)
            {
            try
                {
                var order = await _orderRepository.GetOrderByIdAsync(id);
                if (order==null)
                    {
                    return new APIResponse { IsSuccess=false, Message="Không tìm thấy đơn hàng." };
                    }
                    var orderDTO = new ViewOrderDTO();
                    orderDTO.CopyProperties(order);
                    if (order.OrderItems!=null)
                        {
                        List<OrderItemDTO> orderItemDTOs = new List<OrderItemDTO>();
                        foreach (var item in order.OrderItems)
                            {
                            var orderItemDTO = new OrderItemDTO();
                            orderItemDTO.CopyProperties(item);
                            orderItemDTOs.Add(orderItemDTO);
                            }
                        orderDTO.OrderItems=orderItemDTOs;
                        }
                return new APIResponse { IsSuccess=true, Result=orderDTO };
                }
            catch (Exception ex)
                {
                return new APIResponse { Result=null, IsSuccess=false, Message="Lỗi khi tìm đơn hàng: "+ex.Message };
                }
            }
        #endregion

        #region Update Order Total
        public async Task UpdateOrderTotalAsync(int orderId, int total)
            {
            var order = await _orderRepository.GetOrderByIdAsync(orderId);
            if (order!=null)
                {
                order.TotalAmount=total;
                await _orderRepository.UpdateOrderAsync(order);
                }
            }
        #endregion

        #region Add Order
        /// <summary>
        /// add a new order to the database.
        /// </summary>
        /// <param name="order"></param>
        /// <returns></returns>
        public async Task<APIResponse> AddOrderAsync(OrderDTO order, List<OrderItemDTO> orderItems)
            {
            if (order==null)
                {
                return new APIResponse { IsSuccess=false, Message="Đơn hàng không được để trống." };
                }
            try
                {
                int totalAmount = 0;
                if (order.DeliveryType==0)
                    {
                    order.ShippingAddressId=null;
                    }
                else
                    {
                    if (order.ShippingAddressId==null)
                        {
                        return new APIResponse { IsSuccess=true, Message="Địa chỉ giao hàng không được để trống." };
                        }
                    var address = await _addressService.GetAddressById(order.ShippingAddressId.Value);
                    if (address.IsSuccess && address.Result == null)
                        {
                        return new APIResponse { IsSuccess=true, Message="Địa chỉ giao hàng không tồn tại." };
                        }
                    }
                    var orderEntity = new Order();
                orderEntity.CopyProperties(order);
                orderEntity.CreatedAt=DateTime.UtcNow;
                var orderAdded = await _orderRepository.AddOrderAsync(orderEntity);
                if (orderAdded==null)
                    {
                    return new APIResponse { IsSuccess=false, Message="Thêm đơn hàng thất bại" };
                    }
                foreach (var item in orderItems)
                    {
                    item.OrderId=orderAdded.Id;
                    var resposne = await _orderItemService.AddOrderItemAsync(item);
                    var orderItem = resposne.Result as OrderItem;
                    if (orderItem==null)
                        {
                        return new APIResponse { IsSuccess=false, Message="Thêm đơn hàng thất bại" };
                        }
                    totalAmount+=orderItem.Subtotal;
                    }
                if (totalAmount<=2000000){totalAmount+=200000; } // If totalAmount lower 2 million add 200k shipping
                await UpdateOrderTotalAsync(orderAdded.Id, totalAmount);
                return new APIResponse { IsSuccess=true, Message="Thêm đơn hàng thành công", Result=orderAdded };
                }
            catch (Exception ex)
                {
                return new APIResponse { Result=null, IsSuccess=false, Message="Lỗi khi thêm đơn hàng: "+ex.Message };
                }
            }
        #endregion

        //#region Update Order
        //public async Task<APIResponse> UpdateOrderAsync(OrderDTO order)
        //    {
        //    try
        //        {
        //        if (order==null)
        //            {
        //            return new APIResponse { IsSuccess=false, Message="Đơn hàng không được để trống." };
        //            }
        //        var orderEntity = new Order();
        //        orderEntity.CopyProperties(order);
        //        var isSuccess = await _orderRepository.UpdateOrderAsync(orderEntity);
        //        if (isSuccess==true)
        //            {
        //            return new APIResponse { IsSuccess=true, Message="Cập nhật đơn hàng thành công" };
        //            }
        //        return new APIResponse { IsSuccess=false, Message="Cập nhật đơn hàng thất bại" };
        //        }
        //    catch (Exception ex)
        //        {
        //        return new APIResponse { Result=null, IsSuccess=false, Message="Lỗi khi cập nhật đơn hàng: "+ex.Message };
        //        }
        //    }
        //#endregion

        }
    }