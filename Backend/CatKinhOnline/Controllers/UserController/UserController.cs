using Azure;
using CatKinhOnline.ModelDTOs;
using CatKinhOnline.Models;
using CatKinhOnline.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace CatKinhOnline.Controllers.UserController
    {
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
        {
        private readonly UserService _userService;
        public UserController(UserService userService)
            {
            _userService=userService;
            }
        // GET: api/<UserController>
        [HttpGet]
        public async Task<IActionResult> Get()
            {
            try
                {
                var users = await _userService.GetAllUser();
                return Ok(users);
                }
            catch (Exception ex)
                {
                return StatusCode(500, $"Internal server error: {ex.Message}");
                }
            }

        // GET api/<UserController>/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id  )
            {
            try
                {
                var response = await _userService.GetUserById(id);
                if (response!.IsSuccess)
                    return Ok(response);
                else return BadRequest(response);
                }
            catch (Exception ex)
                {
                return StatusCode(500, $"Internal server error: {ex.Message}");
                }
            }
        // GET api/<UserController>/5
        [HttpGet]
        [Route("user/{email}")]
        public async Task<IActionResult> GetUserByEmail(string email)
            {
            try
                {
                var response = await _userService.GetUserByEmail(email);
                if (response!.IsSuccess)
                    return Ok(response);
                else return BadRequest(response);
                }
            catch (Exception ex)
                {
                return StatusCode(500, $"Internal server error: {ex.Message}");
                }
            }

        // POST api/<UserController>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] User user)
            {
            try
                {
                APIResponse aPIResponse = new APIResponse();
                aPIResponse=await _userService.AddUser(user);
                return Ok(aPIResponse);
                }
            catch (Exception ex)
                {
                return StatusCode(500, $"Internal server error: {ex.Message}");
                }
            }

        // PUT api/<UserController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] UpdateUserDto user)
            {
            try
                {
                user=await _userService.UpdateUser(user);
                return Ok(user);
                }
            catch (Exception ex)
                {
                return StatusCode(500, $"Internal server error: {ex.Message}");
                }
            }
        [HttpPut("ChangePassword/{email}")]
        public async Task<IActionResult> ChangePassword(string email, [FromBody] ChangePasswordDTO dto)
            {
            try
                {
                APIResponse aPIResponse = new APIResponse();
                aPIResponse = await _userService.ChangePassword(email, dto);
                return Ok(aPIResponse);
                }
            catch (Exception ex)
                {
                return StatusCode(500, $"Internal server error: {ex.Message}");
                }
            }
        }
    }
