using CatKinhOnline.ModelDTOs;
using CatKinhOnline.Models;
using CatKinhOnline.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CatKinhOnline.Controllers.OrderController
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly OrderService _orderService;
        public OrderController(OrderService orderService)
            {
            _orderService=orderService;
            }

        [HttpGet]
        public async Task<IActionResult> Get()
            {
             APIResponse aPIResponse = await _orderService.getOrdersAsync();
            if (aPIResponse.IsSuccess)
                {
                return Ok(aPIResponse);
                }
            return BadRequest(aPIResponse);
            }
        [HttpGet]
        [Route("have-order-items")]
        public async Task<IActionResult> GetOrdersHaveOrderItemByAsync()
            {
            APIResponse aPIResponse = await _orderService.getOrdersHaveOrderItemAsync();
            if (aPIResponse.IsSuccess)
                {
                return Ok(aPIResponse);
                }
            return BadRequest(aPIResponse);
            }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetOrderById(int id)
            {
            APIResponse response = await _orderService.getOrdersHaveOrderItemByUserIdAsync(id);
            if (response.IsSuccess)
                {
                return Ok(response);
                }
            return NotFound(response.Message);
            }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] OrderCreateRequest request)
            {
            if (request==null||request.Order==null||request.OrderItems==null)
                return BadRequest("Dữ liệu đơn hàng không hợp lệ.");
            APIResponse response = await _orderService.AddOrderAsync(request.Order, request.OrderItems);
            if (response.IsSuccess)
                return Ok(response);
            return BadRequest(response.Message);
            }

        }
    }
