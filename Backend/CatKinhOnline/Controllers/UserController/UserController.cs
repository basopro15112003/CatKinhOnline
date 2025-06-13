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
        [HttpGet("{email}")]
        public async Task<IActionResult> Get(string email)
            {
            try
                {
                var user = await _userService.GetUserByEmail(email);
                if (user==null)
                    {
                    return NotFound($"User with Email {email} not found.");
                    }
                return Ok(user);
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
            if (user==null)
                {
                return BadRequest("User data is null.");
                }
            try
                {
                var createdUser = await _userService.AddUser(user);
                return CreatedAtAction(nameof(Get), new { id = createdUser.Id }, createdUser);
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
        }
    }
