using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using CatKinhOnline.AppDbContext;
using CatKinhOnline.Models;
using Microsoft.EntityFrameworkCore;
using CatKinhOnline.Services;
using CatKinhOnline.ModelDTOs;

namespace CatKinhOnline.Controllers.AuthenticationController
    {
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
        {
        private readonly IConfiguration _config;
        private readonly AuthService _authService;

        public AuthController(IConfiguration config, AuthService authService)
            {
            _config=config;
            _authService=authService;
            }

 
        [HttpPost("loginJWT")]
        public async Task<IActionResult> Login([FromBody]LoginDTO loginDTO)
            {
            if(loginDTO ==null)
                {
                return BadRequest("Tài khoản mật khẩu không thể để trống");
                }
            try
                {
                var user = await _authService.Login(loginDTO.Email, loginDTO.Password);
                if(user ==null)
                    {
                    return BadRequest("Lỗi không tìm thấy người dùng khi đăng nhập");
                    }
                var token = GenerateJwtToken(user.Email,user.FullName);
                return Ok(token);
                }
            catch (ArgumentNullException ex)
                {
                return BadRequest(ex.Message);
                }
            catch (UnauthorizedAccessException ex)
                {
                return Unauthorized(ex.Message);
                }
            catch (Exception ex)
                {
                return StatusCode(500, "Internal server error: "+ex.Message);
                }
            }

        [HttpGet("login")]
        public IActionResult Login([FromQuery] string returnUrl)
            {
            // Build absolute callback URI on backend that Google sẽ gọi về
            var callbackUrl = Url.Action(
                nameof(GoogleCallback),
                "Auth",
                new { returnUrl },
                protocol: Request.Scheme,
                host: Request.Host.ToString()
            );
            var props = new AuthenticationProperties { RedirectUri=callbackUrl };
            return Challenge(props, GoogleDefaults.AuthenticationScheme);
            }
        /// <summary>
        /// generate JWT token for the user
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        private string GenerateJwtToken(string email, string fullname)
            {
            // Sinh JWT
            var key = Encoding.UTF8.GetBytes(_config["Jwt:Key"]);
            var creds = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256);
            var tokenDesc = new SecurityTokenDescriptor
                {
                Subject=new ClaimsIdentity(new[]
                {
                new Claim(ClaimTypes.Email, email!),
                new Claim(ClaimTypes.Name, fullname!),
            }),
                Expires=DateTime.UtcNow.AddHours(1),
                SigningCredentials=creds
                };
            JwtSecurityTokenHandler? handler = new JwtSecurityTokenHandler();
            var jwt = handler.WriteToken(handler.CreateToken(tokenDesc));

            return jwt;
            }

        [HttpGet("signin-google")]
        public async Task<IActionResult> GoogleCallback([FromQuery] string returnUrl)
            {
            var auth = await HttpContext.AuthenticateAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            if (!auth.Succeeded) return Unauthorized();

            var email = auth.Principal.FindFirstValue(ClaimTypes.Email);
            var name = auth.Principal.FindFirstValue(ClaimTypes.Name);
            using (var _db = new MyDbContext())
                {                    // Tìm user
                var user = await _db.Users
                .FirstOrDefaultAsync(u => u.Email==email);
                if (user==null)
                    {
                    user=new User
                        {
                        Email=email,
                        FullName=User.FindFirstValue(ClaimTypes.Name)??string.Empty,
                        Phone=string.Empty,
                        Status=1,
                        Role=1
                        };
                    _db.Users.Add(user);
                    await _db.SaveChangesAsync();
                    }
                }
            // Sinh JWT
            var jwt = GenerateJwtToken(email!,name!);

      
            // Redirect về FE (kèm basename nếu có)
            var front = _config["Frontend:BaseUrl"]!.TrimEnd('/');
            var redirect = $"{front}/CatKinhOnline/auth/callback?token={jwt}";
            return Redirect(redirect);
            }
        }
    }
