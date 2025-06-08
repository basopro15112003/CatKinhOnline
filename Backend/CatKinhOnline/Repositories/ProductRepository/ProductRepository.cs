using CatKinhOnline.AppDbContext;
using CatKinhOnline.Models;
using Microsoft.EntityFrameworkCore;

namespace CatKinhOnline.Repositories.ProductRepository
    {
    public class ProductRepository : IProductRepository
        {
        #region Get All Products in DB
        /// <summary>
        /// get all products from the database.
        /// </summary>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        public async Task<List<Product>> GetAllProducts()
            {
            try
                {
                using (var context = new MyDbContext())
                    {
                    return await context.Products.ToListAsync();
                    }
                }
            catch (Exception ex)
                {
                throw new Exception(ex.Message);
                }
            }
        #endregion

        #region Get Product by Id
        /// <summary>
        /// get a product by its ID from the database.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        public async Task<Product?> GetProductById(int id)
            {
            try
                {
                using (var context = new MyDbContext())
                    {
                    return await context.Products.FindAsync(id);
                    }
                }
            catch (Exception ex)
                {
                throw new Exception(ex.Message);
                }
            }
        #endregion

        #region Add Product
        /// <summary>
        /// add a new product to the database.
        /// </summary>
        /// <param name="product"></param>
        /// <returns></returns>
        /// <exception cref="ArgumentNullException"></exception>
        /// <exception cref="Exception"></exception>
        public async Task<Product> AddProduct(Product product)
            {
            if (product==null)
                {
                throw new ArgumentNullException(nameof(product), "Product cannot be null.");
                }
            try
                {
                using (var context = new MyDbContext())
                    {
                    context.Products.Add(product);
                    await context.SaveChangesAsync();
                    return product;
                    }
                }
            catch (Exception ex)
                {
                throw new Exception(ex.Message);
                }
            }
        #endregion

        #region Update Product
        /// <summary>
        /// update an existing product in the database.
        /// </summary>
        /// <param name="product"></param>
        /// <returns></returns>
        /// <exception cref="ArgumentNullException"></exception>
        /// <exception cref="Exception"></exception>
        public async Task<Product> UpdateProduct(Product product)
            {
            if (product==null)
                {
                throw new ArgumentNullException(nameof(product), "Product cannot be null.");
                }
            try
                {
                using (var context = new MyDbContext())
                    {
                    context.Products.Update(product);
                    await context.SaveChangesAsync();
                    return product;
                    }
                }
            catch (Exception ex)
                {
                throw new Exception(ex.Message);
                }
            }
        #endregion

        #region Delete Product
        /// <summary>
        /// delete a product from the database by its ID.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        public async Task<bool> DeleteProduct(int id)
            {
            try
                {
                using (var context = new MyDbContext())
                    {
                    var product = await context.Products.FindAsync(id);
                    if (product==null)
                        {
                        return false; // Product not found
                        }
                    context.Products.Remove(product);
                    await context.SaveChangesAsync();
                    return true; // Product deleted successfully
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
