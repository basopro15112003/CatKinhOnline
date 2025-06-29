namespace CatKinhOnline.ModelDTOs
    {
    public class ProductDTO
        {
        public int Id { get; set; }
        public string ProductName { get; set; } = string.Empty;
        public int PricePerM2 { get; set; }
        public int Status { get; set; }
        public CategoryDTO? Category { get; set; }
        }
    }
