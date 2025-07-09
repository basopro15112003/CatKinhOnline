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
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Humanizer;
using Microsoft.VisualStudio.Web.CodeGenerators.Mvc.Templates.BlazorIdentity.Pages.Manage;

namespace CatKinhOnline.Controllers.AuthenticationController
    {
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
        {
        private readonly IConfiguration _config;
        private readonly AuthService _authService;
        private readonly UserService _userService;
        private readonly IEmailSender _emailSender;

        public AuthController(IConfiguration config, AuthService authService, UserService userService, IEmailSender emailSender)
            {
            _config=config;
            _authService=authService;
            _userService=userService;
            _emailSender=emailSender;
            }


        [HttpPost("loginJWT")]
        [AllowAnonymous]
        public async Task<IActionResult> Login([FromBody] LoginDTO loginDTO)
            {
            if (loginDTO==null)
                {
                return BadRequest("Tài khoản mật khẩu không thể để trống");
                }
            try
                {
                var user = await _authService.Login(loginDTO.Email, loginDTO.Password);
                if (user==null)
                    {
                    return BadRequest("Lỗi không tìm thấy người dùng khi đăng nhập");
                    }
                var token = GenerateJwtToken(user.Email, user.FullName, user.Role.ToString());

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
        [AllowAnonymous]
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
        private string GenerateJwtToken(string email, string fullname, string role)
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
                new Claim(ClaimTypes.Role, role)
            }),
                Expires=DateTime.UtcNow.AddHours(1),
                Issuer="NhomKinhQuocThuan",
                Audience="NhomKinhQuocThuanUser",
                SigningCredentials=creds
                };
            JwtSecurityTokenHandler? handler = new JwtSecurityTokenHandler();
            var jwt = handler.WriteToken(handler.CreateToken(tokenDesc));

            return jwt;
            }

        private string GenerateResetPasswordToken(int userId, string email)
            {
            var key = Encoding.UTF8.GetBytes(_config["Jwt:Key"]);
            SigningCredentials? creds = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256);
            var tokenDescriptor = new SecurityTokenDescriptor
                {
                Subject=new ClaimsIdentity(new[]
                {
            new Claim("userId", userId.ToString()),
            new Claim("email", email)
        }),
                Expires=DateTime.UtcNow.AddMinutes(5),
                SigningCredentials=creds
                };

            JwtSecurityTokenHandler? handler = new JwtSecurityTokenHandler();
            var jwt = handler.WriteToken(handler.CreateToken(tokenDescriptor));
            return jwt;
            }

        [AllowAnonymous]
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
            var jwt = GenerateJwtToken(email!, name!, "1");

            // Redirect về FE (kèm basename nếu có)
            string? front = _config["Frontend:BaseUrl"]!.TrimEnd('/');
            var redirect = $"{front}/auth/callback?token={jwt}";
            return Redirect(redirect);
            }

        [AllowAnonymous]
        [HttpPost("forgot-password")]
        public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordRequest model)
            {
            var user = await _userService.GetUserByEmailAsync(model.Email);
            if (user==null)
                return Ok();

            var token = GenerateResetPasswordToken(user.Id, user.Email);
            string? front = _config["Frontend:BaseUrl"]!.TrimEnd('/');
            var resetLink = $"{front}/reset-password?token={Uri.EscapeDataString(token)}&email={Uri.EscapeDataString(model.Email)}";

            // Bước 2: Đọc file template
            var templatePath = Path.Combine(Directory.GetCurrentDirectory(), "Services", "EmailSender", "email.html");
            var htmlBody = System.IO.File.ReadAllText(templatePath);

            // Bước 3: Thay thế biến động
            htmlBody=htmlBody.Replace("${userEmail}", user.Email)
                               .Replace("${resetLink}", resetLink);
            await _emailSender.SendEmailAsync(user.Email, "Đặt lại mật khẩu - Nhôm Kính Quốc Thuần",htmlBody);
            return Ok();
            }

        [AllowAnonymous]
        [HttpPost("reset-password")]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordRequest model)
            {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes(_config["Jwt:Key"]);
            try
                {
                tokenHandler.ValidateToken(model.Token, new TokenValidationParameters
                    {
                    ValidateIssuer=false,
                    ValidateAudience=false,
                    ValidateLifetime=true,
                    IssuerSigningKey=new SymmetricSecurityKey(key),
                    ValidateIssuerSigningKey=true
                    }, out SecurityToken validatedToken);

                var jwtToken = (JwtSecurityToken)validatedToken;
                var email = jwtToken.Claims.First(x => x.Type=="email").Value;
                // var userId = int.Parse(jwtToken.Claims.First(x => x.Type == "userId").Value);
                var user = await _userService.ChangePasswordForget(email, model.NewPassword);
                if (user.IsSuccess)
                    {
                    return Ok(user);
                    }
                else
                    {
                    return BadRequest(user);
                    }
                }
            catch (Exception ex)
                {
                return BadRequest("Token không hợp lệ hoặc đã hết hạn: "+ex.Message);
                }
            }
        }
    }
