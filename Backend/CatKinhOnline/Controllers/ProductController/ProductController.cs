using CatKinhOnline.Models;
using CatKinhOnline.Services;
using Microsoft.AspNetCore.Mvc;
using static System.Runtime.InteropServices.JavaScript.JSType;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace CatKinhOnline.Controllers.ProductController
    {
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
        {
        private readonly ProductService _productService;
        public ProductController(ProductService productService)
            {
            _productService=productService;
            }
        // GET: api/<ProductController>
        [HttpGet]
        public async Task<IActionResult> Get()
            {
            var products = await _productService.GetAllProduct();
            return Ok(products);
            }

        // GET api/<ProductController>/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
            {
            var product = await _productService.GetProductById(id);
            if (product==null)
                {
                return NotFound($"Product with ID {id} not found.");
                }
            return Ok(product);
            }

        // POST api/<ProductController>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Product product)
            {
            if (!ModelState.IsValid)
                {
                return BadRequest(ModelState);
                }
                var prod = await _productService.AddProduct(product);
                return CreatedAtAction(nameof(Get), new { id = prod.Id }, prod); // 201 - created
            }

        // PUT api/<ProductController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] Product product)
            {
            if (product==null)
                {
                return BadRequest("Product cannot be null.");
                }
            try
                {
                var prod = await _productService.UpdateProduct(product);
                return CreatedAtAction(nameof(Get), new { id = prod.Id }, prod); // 201 - created
                }
            catch (ArgumentNullException ex)
                {
                return BadRequest(new { message = ex.Message }); // 400 - bad request
                }
            }

        // DELETE api/<ProductController>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
            {
            try
                {
                var result = await _productService.DeleteProduct(id);
                if (result)
                    {
                    return Ok($"Product with ID {id} deleted successfully.");
                    }
                else
                    {
                    return NotFound($"Product with ID {id} not found.");
                    }
                }
            catch (Exception ex)
                {
                return BadRequest(new { message = ex.Message }); // 400 - bad request
                }
            }
        }
    }
