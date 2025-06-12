using CatKinhOnline.Models;

namespace CatKinhOnline.Repositories.UserRepository
    {
    public interface IUserRepository
        {
        Task<List<User>> GetAllUser();
        Task<User?> GetUserById(int id);
        Task<User> AddUser(User user);
        Task<User> UpdateUser(User user);
        Task<User?> GetUserByEmail(string email);
        Task<User?> Login(string email, string password);
        }
    }
