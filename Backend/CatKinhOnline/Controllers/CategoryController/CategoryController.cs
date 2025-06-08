using CatKinhOnline.Models;
using CatKinhOnline.Services;
using Microsoft.AspNetCore.Mvc;
using static System.Runtime.InteropServices.JavaScript.JSType;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace CatKinhOnline.Controllers.CategoryController
    {
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
        {
           private readonly CategoryService _categoryService;
        public CategoryController(CategoryService categoryService)
            {
            _categoryService=categoryService;
            }
        // GET: api/<CategoryController>
        [HttpGet]
        public async Task<IActionResult> Get()
            {
            List<Category> cate = await _categoryService.Categories();
            return Ok(cate);
            }

        // GET api/<CategoryController>/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
            {
            try
                {
                var category = await _categoryService.CategoryById(id);
                return Ok(category);
                }
            catch (KeyNotFoundException ex)
                {
                return NotFound(new { message = ex.Message }); // 404 - not found
                }
            }

        // POST api/<CategoryController>
        [HttpPost]
        public async Task<IActionResult> Post(Category cate)
            {
            try
                {
                  var category = await _categoryService.AddCategory(cate);
                return CreatedAtAction(nameof(Get), new { id = category.Id }, category); // 201 - created
                }
            catch (ArgumentNullException ex)
                {
                return BadRequest(new { message = ex.Message }); // 400 - bad request
                }
            }

        // PUT api/<CategoryController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, Category category)
        {
            try
                {
                var cate = await _categoryService.UpdateCategory(category);
                return Ok(cate); // 200 - OK
                }
            catch (ArgumentNullException ex)
                {
                return BadRequest(new { message = ex.Message }); // 400 - bad request
                }
            }

        // DELETE api/<CategoryController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
            {

            }
        }
    }
