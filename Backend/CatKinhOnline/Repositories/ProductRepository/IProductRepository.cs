using CatKinhOnline.Models;

namespace CatKinhOnline.Repositories.ProductRepository
    {
    public interface IProductRepository
        {
        Task<List<Product>> GetAllProducts();
        Task<Product?> GetProductById(int id);
        Task<Product> AddProduct(Product product);
        Task<Product> UpdateProduct(Product product);
        Task<bool> DeleteProduct(int id);
        }
    }
