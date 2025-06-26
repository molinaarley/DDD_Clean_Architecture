using Domain.Entities;
using MediatR;

namespace Application.Features.Product.Queries.GetProductByIdQuery
{
    public class GetProductByIdQuery : IRequest<ProductEntity?>
    {
        public int Id { get; set; }
        public GetProductByIdQuery(int id) => Id = id;
    }
}
