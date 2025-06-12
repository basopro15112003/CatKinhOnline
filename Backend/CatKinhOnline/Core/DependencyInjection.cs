using CatKinhOnline.Repositories.CategoryRepository;
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

            #endregion

            #region Register Service
            services.AddScoped<CategoryService>();
            services.AddScoped<ProductService>();
            services.AddScoped<UserService>();
            services.AddScoped<AuthService>();

            services.AddHttpClient();
            services.AddAuthorization();
            #endregion
            }
        }
    }
