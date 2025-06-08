using CatKinhOnline.Models;

namespace CatKinhOnline.Repositories.CategoryRepository
    {
    public interface ICategoryRepository
        {
        Task<List<Category>> GetAllCategories();
        Task<Category?> GetCategoryById(int id);
        Task<Category> AddCategory(Category category);
        Task<Category> UpdateCategory(Category category);
        Task<bool> DeleteCategory(int id);
        }
    }
