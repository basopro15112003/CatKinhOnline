namespace CatKinhOnline.ModelDTOs
    {
    public class LoginDTO
        {
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        }
    public class ForgotPasswordRequest
        {
        public string? Email { get; set; }
        }

    public class ResetPasswordRequest
        {
        public string? Email { get; set; }
        public string? Token { get; set; }
        public string? NewPassword { get; set; }
        }
    }
