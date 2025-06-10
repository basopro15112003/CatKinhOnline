using CatKinhOnline.Models;

namespace CatKinhOnline.Repositories.UserRepository
    {
    public interface IUserRepository
        {
        Task<List<User>> GetAllUser();
        Task<User?> GetUserById(int id);
        Task<User> AddUser(User user);
        Task<User> UpdateUser(User user);
        }
    }
