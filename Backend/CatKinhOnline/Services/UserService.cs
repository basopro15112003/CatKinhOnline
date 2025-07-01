using CatKinhOnline.ModelDTOs;
using CatKinhOnline.Models;
using CatKinhOnline.Repositories.UserRepository;
using ISUZU_NEXT.Server.Core.Extentions;

namespace CatKinhOnline.Services
    {
    public class UserService
        {
        private readonly IUserRepository _userRepository;
        private readonly AuthService _authService;
        public UserService(IUserRepository userRepository, AuthService authService)
            {
            _userRepository=userRepository;
            _authService=authService;
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
        public async Task<APIResponse?> GetUserById(int id)
            {
            try
                {
                var user = await _userRepository.GetUserById(id);
                if (user==null)
                    {
                    return new APIResponse
                        {
                        IsSuccess=true,
                        Message="Người dùng không tồn tại."
                        };
                    }
                var userDTO = new ViewUserDTO();
                userDTO.CopyProperties(user);
                return new APIResponse
                    {
                    IsSuccess=true,
                    Message="Lấy thông tin người dùng thành công.",
                    Result=userDTO
                    };
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
        public async Task<APIResponse?> GetUserByEmail(string email)
            {
            try
                {
                var user = await _userRepository.GetUserByEmail(email);
                if (user==null)
                    {
                    return new APIResponse
                        {
                        IsSuccess=true,
                        Message="Người dùng không tồn tại."
                        };
                    }
                var userDTO = new ViewUserDTO();
                userDTO.CopyProperties(user);
                return new APIResponse
                    {
                    IsSuccess=true,
                    Message="Lấy thông tin người dùng thành công.",
                    Result=userDTO
                    };
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
        public async Task<APIResponse> AddUser(User user)
            {
            try
                {
                APIResponse aPIResponse = new APIResponse();
                user.Status=1;
                user.Role=1;
                user.PasswordHash=_authService.HashPassword(user.PasswordHash);
                #region 1. Validation
                var checkEmailEsixst = await GetUserByEmail(user.Email);
                var checkPhoneEsixst = await _userRepository.GetUserByPhone(user.Phone);
                List<(bool condition, string errorMessage)>? validations = new List<(bool condition, string errorMessage)>
            {
                  (user == null, "Người dùng không thể trống"),
                  (checkEmailEsixst != null, "Email này đã tồn tại trong hệ thống."),
                  (checkPhoneEsixst != null, "Số điện thoại này đã tồn tại trong hệ thống."),
            };
                foreach (var validation in validations)
                    {
                    if (validation.condition)
                        {
                        return new APIResponse
                            {
                            IsSuccess=false,
                            Message=validation.errorMessage
                            };
                        }
                    }
                #endregion
                var addedUser = await _userRepository.AddUser(user!);
                return aPIResponse;
                }
            catch (Exception ex)
                {
                return new APIResponse
                    {
                    IsSuccess=false,
                    Message=ex.Message
                    };
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

        #region Change password
        /// <summary>
        /// change password for a user.
        /// </summary>
        /// <param name="userDTO"></param>
        /// <param name="changePasswordDto"></param>
        /// <returns></returns>
        public async Task<APIResponse> ChangePassword(string email, ChangePasswordDTO changePasswordDto)
            {
            try
                {
                var user = await _userRepository.GetUserByEmail(email);
                if (user==null)
                    {
                    return new APIResponse{IsSuccess=false,Message="Người dùng không tồn tại."};
                    }
                changePasswordDto.OldPassword=_authService.HashPassword(changePasswordDto.OldPassword);
                if (user.PasswordHash!=changePasswordDto.OldPassword)
                    {
                return new APIResponse { IsSuccess=false, Message="Mật khẩu cũ không đúng." };}
                user.PasswordHash=_authService.HashPassword(changePasswordDto.NewPassword);
                await _userRepository.UpdateUser(user);
                return new APIResponse { IsSuccess=true, Message="Đổi mật khẩu thành công."
                    };
                }
            catch (Exception ex)
                {
                return new APIResponse {
                    IsSuccess=false,
                    Message=ex.Message
                    };
                }
            }
        #endregion
        }
    }
