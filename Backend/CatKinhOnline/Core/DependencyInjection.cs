using CatKinhOnline.Repositories.AddressRepository;
using CatKinhOnline.Repositories.CategoryRepository;
using CatKinhOnline.Repositories.OrderItemRepository;
using CatKinhOnline.Repositories.OrderRepository;
using CatKinhOnline.Repositories.ProductRepository;
using CatKinhOnline.Repositories.UserRepository;
using CatKinhOnline.Services;

namespace CatKinhOnline.Core
    {
    public static class DependencyInjection
        {
        public static void ConfigureDependencyInjection(this IServiceCollection services)
            {
            #region Register the repository
            services.AddScoped<ICategoryRepository, CategoryRepository>();
            services.AddScoped<IProductRepository, ProductRepository>();
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IAddressRepository, AddressRepository>();
            services.AddScoped<IOrderRepository, OrderRepository>();
            services.AddScoped<IOrderItemRepository, OrderItemRepository>();


            #endregion

            #region Register Service
            services.AddScoped<CategoryService>();
            services.AddScoped<ProductService>();
            services.AddScoped<UserService>();
            services.AddScoped<AuthService>();
            services.AddScoped<AddressService>();
            services.AddScoped<OrderService>();
            services.AddScoped<OrderItemService>();

            services.AddHttpClient();
            services.AddAuthorization();
            #endregion
            }
        }
    }
