using CatKinhOnline.AppDbContext;
using CatKinhOnline.Core;
using CatKinhOnline.Models;
using CatKinhOnline.Services.OrderServices;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title="CatKinhOnline API", Version="v1" });
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
        {
        Description="JWT Authorization header using the Bearer scheme. Example: \"Bearer {token}\"",
        Name="Authorization",
        In=ParameterLocation.Header,
        Type=SecuritySchemeType.ApiKey,
        Scheme="Bearer"
        });
    c.AddSecurityRequirement(new OpenApiSecurityRequirement()
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                },
                Scheme = "oauth2",
                Name = "Bearer",
                In = ParameterLocation.Header,
            },
            new List<string>()
        }
    });
});

// Đăng ký DbContext
builder.Services.AddDbContext<MyDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("HoangConnection")));

builder.Services.ConfigureDependencyInjection();
builder.Configuration.AddUserSecrets<Program>(optional: true);
builder.Services.AddSignalR(); 
builder.Services.AddAuthorization();
// 1) Cấu hình một lần AddAuthentication với 3 schemes
builder.Services.AddAuthentication(options =>
{
    options.DefaultScheme=CookieAuthenticationDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme=GoogleDefaults.AuthenticationScheme;
})
.AddCookie(CookieAuthenticationDefaults.AuthenticationScheme)
.AddGoogle(GoogleDefaults.AuthenticationScheme, options =>
{
options.ClientId=builder.Configuration["Authentication:Google:ClientId"]!;
options.ClientSecret=builder.Configuration["Authentication:Google:ClientSecret"]!;
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
    ValidateIssuer=true,
    ValidIssuer="NhomKinhQuocThuan",
    ValidateAudience=true          ,
    ValidAudience="NhomKinhQuocThuanUser"

    };
});


builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        policy => 
        {
            policy
                   .SetIsOriginAllowed(_ => true)
                   .AllowAnyHeader()
                   .AllowAnyMethod()
                   .AllowCredentials();
        });
});
builder.Services.AddAuthorization();

var app = builder.Build();
app.UseCors("AllowAll");
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
    {
    app.UseSwagger();
    app.UseSwaggerUI();
    }
app.MapHub<OrderHub>("/api/orderHub");
app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();


app.Run();
