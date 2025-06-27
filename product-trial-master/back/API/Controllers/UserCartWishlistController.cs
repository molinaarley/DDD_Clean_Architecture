
using Application.Features.Cart.Commands;
using Application.Features.Cart.Queries;
using Application.Features.Wishlist.Commands;
using Application.Features.Wishlist.Queries;
using Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AltenEcommerce.API.Controllers
{
    [ApiController]
    [Route("api/user")]
    [Authorize]
    public class UserCartWishlistController : ControllerBase
    {
        private readonly IMediator _mediator;

        public UserCartWishlistController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost("cart")]
        public async Task<IActionResult> AddToCart([FromBody] AddToCartCommand command)
        {
            var result = await _mediator.Send(command);
            return Ok(new { success = result });
        }

        [HttpGet("cart")]
        public async Task<IActionResult> GetCart([FromQuery] string email)
        {
            var result = await _mediator.Send(new GetCartQuery(email));
            return Ok(result);
        }

        [HttpPost("wishlist")]
        public async Task<IActionResult> AddToWishlist([FromBody] AddToWishlistCommand command)
        {
            var result = await _mediator.Send(command);
            return Ok(new { success = result });
        }

        [HttpGet("wishlist")]
        public async Task<IActionResult> GetWishlist([FromQuery] string email)
        {
            var result = await _mediator.Send(new GetWishlistQuery(email));
            return Ok(result);
        }
    }
}
