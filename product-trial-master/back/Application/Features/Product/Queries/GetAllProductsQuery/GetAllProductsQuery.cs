using Domain.Entities;
using MediatR;
using System.Collections.Generic;

namespace Application.Features.Product.Queries.GetAllProductsQuery
{
    public class GetAllProductsQuery : IRequest<IEnumerable<ProductEntity>> { }
}
