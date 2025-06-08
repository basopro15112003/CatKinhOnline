using CatKinhOnline.Repositories.CategoryRepository;
using CatKinhOnline.Services;

namespace CatKinhOnline.Core
    {
    public static class DependencyInjection
        {
        public static void ConfigureDependencyInjection(this IServiceCollection services)
            {
            #region Register the repository
            services.AddScoped<ICategoryRepository, CategoryRepository>();
            #endregion

            #region Register Service
            services.AddScoped<CategoryService>();

            services.AddHttpClient();
            services.AddAuthorization();
            #endregion
            }
        }
    }
