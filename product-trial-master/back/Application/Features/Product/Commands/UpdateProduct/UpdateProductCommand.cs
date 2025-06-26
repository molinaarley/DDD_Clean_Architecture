
using Domain.Entities;
using MediatR;

namespace Application.Features.Product.Commands.UpdateProduct
{
    public class UpdateProductCommand : IRequest<bool>
    {
        public int Id { get; set; }
        public ProductEntity Product { get; set; }

        public UpdateProductCommand(int id, ProductEntity product)
        {
            Id = id;
            Product = product;
        }
    }
}
