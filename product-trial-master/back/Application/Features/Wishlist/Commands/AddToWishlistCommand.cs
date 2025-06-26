
using Domain.Entities;
using MediatR;
using System.Collections.Generic;

namespace Application.Features.Wishlist.Commands
{
    public class AddToWishlistCommand : IRequest<bool>
    {
        public string Email { get; set; } = string.Empty;
        public List<ProductEntity> Products { get; set; } = new();
    }
}
