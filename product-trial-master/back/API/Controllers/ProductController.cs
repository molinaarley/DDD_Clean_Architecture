
using Application.Features.Product.Commands.CreateProduct;
using Application.Features.Product.Commands.DeleteProduct;
using Application.Features.Product.Commands.UpdateProduct;
using Application.Features.Product.Queries.GetAllProductsQuery;
using Application.Features.Product.Queries.GetProductByIdQuery;
using Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace AltenEcommerce.API.Controllers
{
    [ApiController]
    [Route("products")]
    public class ProductController : ControllerBase
    {
        private readonly IMediator _mediator;

        public ProductController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var result = await _mediator.Send(new GetAllProductsQuery());
            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var result = await _mediator.Send(new GetProductByIdQuery(id));
            if (result == null)
                return NotFound();
            return Ok(result);
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] ProductEntity product)
        {
            await _mediator.Send(new CreateProductCommand(product));
            return Ok();
        }

        [Authorize]
        [HttpPatch("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] ProductEntity product)
        {
            var success = await _mediator.Send(new UpdateProductCommand(id, product));
            if (!success)
                return NotFound();
            return NoContent();
        }

        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var success = await _mediator.Send(new DeleteProductCommand(id));
            if (!success)
                return NotFound();
            return NoContent();
        }
    }
}
