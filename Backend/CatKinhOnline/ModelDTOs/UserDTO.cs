using System.ComponentModel.DataAnnotations;

namespace CatKinhOnline.ModelDTOs
    {
    public class UserDTO
        {
        public int Id { get; set; }

        public string FullName { get; set; } = string.Empty;

        public string Email { get; set; } = string.Empty;

        public string Phone { get; set; } = string.Empty;

        public string PasswordHash { get; set; } = string.Empty;

        public int Role { get; set; }

        public int Status { get; set; }
        }

    public class UpdateUserDto
        {
        public int Id { get; set; }
        public string FullName { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        }

    }
