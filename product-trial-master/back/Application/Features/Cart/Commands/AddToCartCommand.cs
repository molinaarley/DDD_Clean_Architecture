
using Domain.Entities;
using MediatR;
using System.Collections.Generic;

namespace Application.Features.Cart.Commands
{
    public class AddToCartCommand : IRequest<bool>
    {
        public string Email { get; set; } = string.Empty;
        public List<ProductEntity> Products { get; set; } = new();
    }
}
