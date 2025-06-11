using CatKinhOnline.ModelDTOs;
using CatKinhOnline.Models;
using CatKinhOnline.Repositories.CategoryRepository;
using CatKinhOnline.Repositories.ProductRepository;
using ISUZU_NEXT.Server.Core.Extentions;

namespace CatKinhOnline.Services
    {
    public class ProductService
        {
        private readonly IProductRepository _productRepository;
        public ProductService(IProductRepository productRepository)
            {
            _productRepository=productRepository;
            }

        #region Get All Products
        /// <summary>
        /// get all products from the database.
        /// </summary>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        public async Task<List<ProductDTO>> GetAllProduct()
            {                        
            try
                {
                var models = await _productRepository.GetAllProducts();
                var modelDTOs = new List<ProductDTO>();
                foreach (var item in models)
                    {
                    var dto = new ProductDTO();
                    dto.CopyProperties(item);
                    if (item.Category!=null)
                        {
                        dto.Category=new CategoryDTO()
                            {
                            Id=item.Category.Id,
                            CategoryName=item.Category.CategoryName,
                            Description=item.Category.Description
                            };
                        }
                    modelDTOs.Add(dto);
                    }
                return modelDTOs;
                }
            catch (Exception ex)
                {
                throw new Exception($"Error retrieving products: {ex.Message}");
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
                return await _productRepository.GetProductById(id);
                }
            catch (Exception ex)
                {
                throw new Exception($"Error retrieving product with ID {id}: {ex.Message}");
                }
            }
        #endregion

        #region
        /// <summary>
        /// Add a new product to the database.
        /// </summary>
        /// <param name="product"></param>
        /// <returns></returns>
        /// <exception cref="ArgumentNullException"></exception>
        /// <exception cref="Exception"></exception>
        public async Task<Product> AddProduct(Product product)
            {
            if (product==null)
                {
                throw new ArgumentNullException(nameof(product), "Product cannot be null");
                }
            try
                {
                return await _productRepository.AddProduct(product);
                }
            catch (Exception ex)
                {
                throw new Exception($"Error adding product: {ex.Message}");
                }
            }
        #endregion

        #region update Product
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
                throw new ArgumentNullException(nameof(product), "Product cannot be null");
                }
            try
                {
                return await _productRepository.UpdateProduct(product);
                }
            catch (Exception ex)
                {
                throw new Exception($"Error updating product: {ex.Message}");
                }
            }
        #endregion

        #region Delete Product
        public async Task<bool> DeleteProduct(int id)
            {
            try
                {
                return await _productRepository.DeleteProduct(id);
                }
            catch (Exception ex)
                {
                throw new Exception($"Error deleting product with ID {id}: {ex.Message}");
                }
            }
        #endregion
        }
    }
