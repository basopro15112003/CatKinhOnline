using CatKinhOnline.Core;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.ConfigureDependencyInjection();
builder.Configuration.AddUserSecrets<Program>(optional: true);

// 1) Cấu hình một lần AddAuthentication với 3 schemes
builder.Services.AddAuthentication(options =>
{
    options.DefaultScheme=CookieAuthenticationDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme=GoogleDefaults.AuthenticationScheme;
})
.AddCookie(CookieAuthenticationDefaults.AuthenticationScheme)
.AddGoogle(GoogleDefaults.AuthenticationScheme, options =>
{
options.ClientId=builder.Configuration["Authentication:Google:ClientId"];
options.ClientSecret=builder.Configuration["Authentication:Google:ClientSecret"];
options.CallbackPath="/signin-google";
options.Scope.Add("email");
options.Scope.Add("profile");
})
.AddJwtBearer(JwtBearerDefaults.AuthenticationScheme, options =>
{
var key = Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]);
options.TokenValidationParameters=new TokenValidationParameters
{
ValidateIssuerSigningKey=true,
IssuerSigningKey=new SymmetricSecurityKey(key),
ValidateIssuer=false,
ValidateAudience=false
};
});

builder.Services.AddAuthorization();

var app = builder.Build();
app.UseCors(cors =>
 cors.AllowAnyOrigin()
     .AllowAnyMethod()
     .AllowAnyHeader()
);
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
    {
    app.UseSwagger();
    app.UseSwaggerUI();
    }

app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();


app.Run();
