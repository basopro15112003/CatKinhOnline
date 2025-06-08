using CatKinhOnline.AppDbContext;
using CatKinhOnline.Models;
using Microsoft.EntityFrameworkCore;

namespace CatKinhOnline.Repositories.CategoryRepository
    {
    public class CategoryRepository : ICategoryRepository
        {
        #region Get All Category in DB
        /// <summary>
        /// Get all categories from the database.
        /// </summary>
        /// <returns></returns>
        public async Task<List<Category>> GetAllCategories()
            {
            try
                {
                using (var context = new MyDbContext())
                    {
                    return await context.Categories.ToListAsync();
                    }
                }
            catch (Exception ex)
                {
                throw new Exception(ex.Message);
                }
            }
        #endregion

        #region Get Category by Id
        /// <summary>
        /// Get a category by its ID from the database.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        public async Task<Category?> GetCategoryById(int id)
            {
            try
                {
                using (var context = new MyDbContext())
                    {
                    return await context.Categories.FindAsync(id);
                    }
                }
            catch (Exception ex)
                {
                throw new Exception(ex.Message);
                }
            }
        #endregion

        #region Add Category
        /// <summary>
        /// add a new category to the database.
        /// </summary>
        /// <param name="category"></param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        public async Task<Category> AddCategory(Category category)
            {
            try
                {
                using (var context = new MyDbContext())
                    {
                    context.Categories.Add(category);
                    await context.SaveChangesAsync();
                    return category;
                    }
                }
            catch (Exception ex)
                {
                throw new Exception(ex.Message);
                }
            }
        #endregion

        #region Update Category
        /// <summary>
        /// update an existing category in the database.
        /// </summary>
        /// <param name="category"></param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        public async Task<Category> UpdateCategory(Category category)
            {
            try
                {
                using (var context = new MyDbContext())
                    {
                    context.Categories.Update(category);
                    await context.SaveChangesAsync();
                    return category;
                    }
                }
            catch (Exception ex)
                {
                throw new Exception(ex.Message);
                }
            }
        #endregion

        #region Delete Category
        /// <summary>
        /// delete a category by its ID from the database.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        public async Task<bool> DeleteCategory(int id)
            {
            try
                {
                using (var context = new MyDbContext())
                    {
                    var category = await context.Categories.FindAsync(id);
                    if (category==null)
                        {
                        return false;
                        }
                    context.Categories.Remove(category);
                    await context.SaveChangesAsync();
                    return true; 
                    }
                }
            catch (Exception ex)
                {
                throw new Exception(ex.Message);
                }
            }
        #endregion
        }
    }     
