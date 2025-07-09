using CatKinhOnline.Models;
using CatKinhOnline.Repositories.UserRepository;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace CatKinhOnline.Services
    {
    public class AuthService
        {
        private readonly IUserRepository _userRepository;
        private readonly IConfiguration _config;

        public AuthService(IUserRepository userRepository, IConfiguration config)
            {
            _userRepository=userRepository;
            _config=config;
            }


        #region HashPassword
        /// <summary>
        /// Hashing password
        /// </summary>
        /// <param name="plainPassword"></param>
        /// <returns></returns>
        public string HashPassword(string plainPassword)
            {
            using (SHA256 sha256 = SHA256.Create())
                {
                byte[] bytes = Encoding.UTF8.GetBytes(plainPassword);
                byte[] hashBytes = sha256.ComputeHash(bytes);
                return Convert.ToBase64String(hashBytes);
                }
            }
        #endregion

        #region Login
        /// <summary>
        /// Logs in a user with the provided email and password.
        /// </summary>
        /// <param name="email"></param>
        /// <param name="password"></param>
        /// <returns></returns>
        /// <exception cref="ArgumentNullException"></exception>
        /// <exception cref="Exception"></exception>
        /// <exception cref="UnauthorizedAccessException"></exception>
        public async Task<User?> Login(string email, string password)
            {
            if (string.IsNullOrEmpty(email)||string.IsNullOrEmpty(password))
                {
                throw new ArgumentNullException("Email and password cannot be null or empty.");
                }
            string hashPassword = HashPassword(password);
            var existingUser = await _userRepository.GetUserByEmail(email);
            if (existingUser==null)
                {
                throw new UnauthorizedAccessException("Email Not esxist.");
                }
            var user = await _userRepository.Login(email, hashPassword);
            if (user==null)
                {
                throw new UnauthorizedAccessException("Invalid email or password.");
                }
            return user;
            }
        #endregion



        }
    }
