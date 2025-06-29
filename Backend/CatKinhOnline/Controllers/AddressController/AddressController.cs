using CatKinhOnline.ModelDTOs;
using CatKinhOnline.Models;
using CatKinhOnline.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CatKinhOnline.Controllers.AddressController
    {
    [Route("api/[controller]")]
    [ApiController]
    public class AddressController : ControllerBase
        {
        private readonly AddressService _addressService;
        public AddressController(AddressService addressService)
            {
            _addressService=addressService;
            }

        [HttpGet]
        public async Task<IActionResult> Get()
            {
            var address = await _addressService.GetAllAddress();
            if (address.IsSuccess)
                {
                return Ok(address);
                }
            return BadRequest(address.Message);
            }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetAddressById(int id)
            {
            APIResponse? address = await _addressService.GetAddressById(id);
            return Ok(address);
            }

        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetAddressByUserId(int userId)
            {
            APIResponse? address = await _addressService.GetAddressByUserId(userId);
                return Ok(address);
            }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] AddressDTO address)
            {
            var response = await _addressService.AddAddress(address);
            if (response.IsSuccess)
                return Ok(response);
            return BadRequest(response.Message);
            }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] AddressDTO address)
            {
            address.Id=id;
            var response = await _addressService.UpdateAddress(address);
            if (response.IsSuccess)
                {
                return Ok(response); // 200 - OK
                }
            return BadRequest(response.Message);
            }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
            {
            var result = await _addressService.DeleteAddress(id);
            if (result.IsSuccess)
                {
                return Ok(result);
                }
            return BadRequest(result.Message);
            }
        }
    }
