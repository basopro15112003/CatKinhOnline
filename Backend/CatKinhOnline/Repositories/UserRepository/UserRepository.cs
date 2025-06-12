using CatKinhOnline.AppDbContext;
using CatKinhOnline.Models;
using Microsoft.EntityFrameworkCore;

namespace CatKinhOnline.Repositories.UserRepository
    {
    public class UserRepository : IUserRepository
        {
        #region Get All Users 
        /// <summary>
        /// Get all users from the database.
        /// </summary>
        /// <returns></returns>
        public async Task<List<User>> GetAllUser()
            {
            try
                {
                using (var _db = new MyDbContext())
                    {
                    var user = await _db.Users.ToListAsync();
                    return user;
                    }
                }
            catch (Exception ex)
                {
                throw new Exception(ex.Message);
                }
            }
        #endregion

        #region Get User by Id
        /// <summary>
        /// get a user by its ID from the database.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        public async Task<User?> GetUserById(int id)
            {
            try
                {
                using (var _db = new MyDbContext())
                    {
                    return await _db.Users.FindAsync(id);
                    }
                }
            catch (Exception ex)
                {
                throw new Exception(ex.Message);
                }
            }
        #endregion

        #region Add User
        /// <summary>
        /// add a new user to the database.
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        /// <exception cref="ArgumentNullException"></exception>
        /// <exception cref="Exception"></exception>
        public async Task<User> AddUser(User user)
            {
            if (user==null)
                {
                throw new ArgumentNullException(nameof(user), "User cannot be null.");
                }
            try
                {
                using (var _db = new MyDbContext())
                    {
                    await _db.Users.AddAsync(user);
                    await _db.SaveChangesAsync();
                    return user;
                    }
                }
            catch (Exception ex)
                {
                throw new Exception(ex.Message);
                }
            }
        #endregion

        #region Update User
        /// <summary>
        /// update an existing user in the database.
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        /// <exception cref="ArgumentNullException"></exception>
        /// <exception cref="Exception"></exception>
        public async Task<User> UpdateUser(User user)
            {
            if (user==null)
                {
                throw new ArgumentNullException(nameof(user), "User cannot be null.");
                }
            try
                {
                using (var _db = new MyDbContext())
                    {
                    _db.Users.Update(user);
                    await _db.SaveChangesAsync();
                    return user;
                    }
                }
            catch (Exception ex)
                {
                throw new Exception(ex.Message);
                }
            }
        #endregion

        #region Change User Status
        /// <summary>
        /// 
        /// </summary>
        /// <param name="id"></param>
        /// <param name="status"></param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        public async Task<bool> ChangeUserStatus(int id, int status)
            {
            try
                {
                using (var _db = new MyDbContext())
                    {
                    var user = await _db.Users.FindAsync(id);
                    if (user==null)
                        {
                        return false; // User not found
                        }
                    user.Status=status;
                    _db.Users.Update(user);
                    await _db.SaveChangesAsync();
                    return true; // Status updated successfully
                    }
                }
            catch (Exception ex)
                {
                throw new Exception(ex.Message);
                }
            }
        #endregion

        #region Change Selected Status
        /// <summary>
        /// change the status of multiple users by their IDs.
        /// </summary>
        /// <param name="ids"></param>
        /// <param name="status"></param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        public async Task<bool> ChangeSelectedStatus(List<int> ids, int status)
            {
            try
                {
                using (var _db = new MyDbContext())
                    {
                    var users = await _db.Users.Where(u => ids.Contains(u.Id)).ToListAsync();
                    if (users.Count==0)
                        {
                        return false; // No users found
                        }
                    foreach (var user in users)
                        {
                        user.Status=status;
                        }
                    _db.Users.UpdateRange(users);
                    await _db.SaveChangesAsync();
                    return true; // Status updated successfully
                    }
                }
            catch (Exception ex)
                {
                throw new Exception(ex.Message);
                }
            }
        #endregion

        #region get user by email
        /// <summary>
        /// get a user by their email address from the database.
        /// </summary>
        /// <param name="email"></param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        public async Task<User?> GetUserByEmail(string email)
            {
            try
                {
                using (var _db = new MyDbContext())
                    {
                    return await _db.Users.FirstOrDefaultAsync(u => u.Email==email);
                    }
                }
            catch (Exception ex)
                {
                throw new Exception(ex.Message);
                }
            }
        #endregion

        #region Login
        /// <summary>
        /// login a user by email and password.
        /// </summary>
        /// <param name="email"></param>
        /// <param name="password"></param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        public async Task<User?> Login(string email, string password)
            {
            try
                {
                using (var _db = new MyDbContext())
                    {
                    var user = await _db.Users.FirstOrDefaultAsync(u => u.Email==email&&u.PasswordHash==password);
                    return user;
                    }
                }
            catch (Exception ex)
                {
                throw new Exception(ex.Message);
                }
            }
        #endregion

        #region Register 
        /// <summary>
        /// user registration method that adds a new user to the database.
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        /// <exception cref="ArgumentNullException"></exception>
        /// <exception cref="Exception"></exception>
        public async Task<User> Register(User user)
            {
            if (user==null)
                {
                throw new ArgumentNullException(nameof(user), "User cannot be null.");
                }
            try
                {
                using (var _db = new MyDbContext())
                    {
                    await _db.Users.AddAsync(user);
                    await _db.SaveChangesAsync();
                    return user;
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
