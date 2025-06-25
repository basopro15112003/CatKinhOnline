using System.ComponentModel.DataAnnotations;

namespace CatKinhOnline.ModelDTOs
    {
    public class AddressDTO
        {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string AddressLine { get; set; } = string.Empty;
        public string ContactName { get; set; } = string.Empty;
        public string ContactPhone { get; set; } = string.Empty;
        public string Note { get; set; } = string.Empty;
        public bool IsDefault { get; set; } = false;
        }
    }
