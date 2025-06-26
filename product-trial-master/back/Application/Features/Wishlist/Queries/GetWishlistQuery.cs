
using Domain.Entities;
using MediatR;
using System.Collections.Generic;

namespace Application.Features.Wishlist.Queries
{
    public record GetWishlistQuery(string Email) : IRequest<List<ProductEntity>>;
}
