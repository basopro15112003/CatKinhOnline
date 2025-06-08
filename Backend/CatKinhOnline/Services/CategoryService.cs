using CatKinhOnline.Models;
using CatKinhOnline.Repositories.CategoryRepository;
using Microsoft.AspNetCore.Http.HttpResults;

namespace CatKinhOnline.Services
    {
    public class CategoryService
        {
        private readonly ICategoryRepository _categoryRepository;
        public CategoryService(ICategoryRepository categoryRepository)
            {
            _categoryRepository=categoryRepository;
            }

        #region Get All Category
        /// <summary>
        /// get all categories from the database.
        /// </summary>
        /// <returns></returns>
        public async Task<List<Category>> Categories()
            {
            var cate = await _categoryRepository.GetAllCategories();
            return cate;
            }
        #endregion

        #region Get Category by Id
        /// <summary>
        /// get a category by its ID from the database.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        public async Task<Category?> CategoryById(int id)
            {
            var cate = await _categoryRepository.GetCategoryById(id);
            if (cate==null)
                {
                throw new ArgumentNullException($"Category with ID {id} not found.");
                }
            return cate;
            }
        #endregion

        #region Add Category
        /// <summary>
        /// add a new category to the database.
        /// </summary>
        /// <param name="category"></param>
        /// <returns></returns>
        /// <exception cref="ArgumentNullException"></exception>
        public async Task<Category> AddCategory(Category category)
            {
            if (category==null)
                {
                throw new ArgumentNullException(nameof(category), "Category cannot be null.");
                }
            var addedCategory = await _categoryRepository.AddCategory(category);
            return addedCategory;
            }
        #endregion

        #region Update Category
        /// <summary>
        /// update an existing category in the database.
        /// </summary>
        /// <param name="category"></param>
        /// <returns></returns>
        /// <exception cref="ArgumentNullException"></exception>
        public async Task<Category> UpdateCategory(Category category)
            {
            if (category==null)
                {
                throw new ArgumentNullException(nameof(category), "Category cannot be null.");
                }
            var updatedCategory = await _categoryRepository.UpdateCategory(category);
            return updatedCategory;
            }
        #endregion

        #region Delete Category
        /// <summary>
        /// delete a category by its ID from the database.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        /// <exception cref="ArgumentOutOfRangeException"></exception>
        public async Task<bool> DeleteCategory(int id)
            {
            if (id<=0)
                {
                throw new ArgumentOutOfRangeException(nameof(id), "ID must be greater than zero.");
                }
            var result = await _categoryRepository.DeleteCategory(id);
            return result;
            }
        #endregion
        }
    }
