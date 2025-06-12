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

namespace CatKinhOnline.Controllers.AuthenticationController
    {
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
        {
        private readonly IConfiguration _config;

        public AuthController(IConfiguration config)
            {
            _config=config;
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

        [HttpGet("signin-google")]
        public async Task<IActionResult> GoogleCallback([FromQuery] string returnUrl)
            {
            var auth = await HttpContext.AuthenticateAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            if (!auth.Succeeded) return Unauthorized();

            var email = auth.Principal.FindFirstValue(ClaimTypes.Email);
            var name = auth.Principal.FindFirstValue(ClaimTypes.Name);

            // Sinh JWT
            var key = Encoding.UTF8.GetBytes(_config["Jwt:Key"]);
            var creds = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256);
            var tokenDesc = new SecurityTokenDescriptor
                {
                Subject=new ClaimsIdentity(new[]
                {
                new Claim(ClaimTypes.Email, email!),
                new Claim(ClaimTypes.Name, name!)
            }),
                Expires=DateTime.UtcNow.AddHours(1),
                SigningCredentials=creds
                };
            using (var _db = new MyDbContext())
                {                    // Tìm user
                var user = await _db.Users
                    .FirstOrDefaultAsync(u => u.Email==email);
                // Nếu chưa có thì tạo mới user với email và name của tài khoản 
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
            var handler = new JwtSecurityTokenHandler();
            var jwt = handler.WriteToken(handler.CreateToken(tokenDesc));

            // Redirect về FE (kèm basename nếu có)
            var front = _config["Frontend:BaseUrl"]!.TrimEnd('/');
            var redirect = $"{front}/CatKinhOnline/auth/callback?token={jwt}";
            return Redirect(redirect);
            }
        }
    }
