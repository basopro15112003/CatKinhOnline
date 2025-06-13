using CatKinhOnline.ModelDTOs;
using CatKinhOnline.Models;
using CatKinhOnline.Repositories.ProductRepository;
using CatKinhOnline.Repositories.UserRepository;

namespace CatKinhOnline.Services
    {
    public class UserService
        {
        private readonly IUserRepository _userRepository;
        public UserService(IUserRepository userRepository)
            {
            _userRepository=userRepository;
            }

        #region Get All Users
        /// <summary>
        /// get all users from the database.
        /// </summary>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        public async Task<List<User>> GetAllUser()
            {
            try
                {
                return await _userRepository.GetAllUser();
                }
            catch (Exception ex)
                {
                throw new Exception($"Error retrieving users: {ex.Message}");
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
                return await _userRepository.GetUserById(id);
                }
            catch (Exception ex)
                {
                throw new Exception($"Error retrieving user with ID {id}: {ex.Message}");
                }
            }
        #endregion

        #region Get User by Email
        /// <summary>
        /// get a user by its email from the database.
        /// </summary>
        /// <param name="email"></param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        public async Task<User?> GetUserByEmail(string email)
            {
            try
                {
                return await _userRepository.GetUserByEmail(email);
                }
            catch (Exception ex)
                {
                throw new Exception($"Error retrieving user with email {email}: {ex.Message}");
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
                user.Status=1;
                user.Role=1;
                var addedUser = await _userRepository.AddUser(user);
                return addedUser;
                }
            catch (Exception ex)
                {
                throw new Exception($"Error adding user: {ex.Message}");
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
        public async Task<UpdateUserDto> UpdateUser(UpdateUserDto userDTO)
            {
            if (userDTO==null)
                {
                throw new ArgumentNullException(nameof(userDTO), "User cannot be null.");
                }
            try
                {
                var user = await _userRepository.GetUserById(userDTO.Id)??throw new Exception("User not found");
                user.FullName=userDTO.FullName;
                user.Phone=userDTO.Phone;
                var updatedUser = await _userRepository.UpdateUser(user);

                return userDTO;
                }
            catch (Exception ex)
                {
                throw new Exception($"Error updating user: {ex.Message}");
                }
            }
        #endregion
        }
    }
