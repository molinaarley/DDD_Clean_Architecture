
using Domain.Entities;
using MediatR;
using System.Collections.Generic;

namespace Application.Features.Cart.Queries
{
    public record GetCartQuery(string Email) : IRequest<List<ProductEntity>>;
}
