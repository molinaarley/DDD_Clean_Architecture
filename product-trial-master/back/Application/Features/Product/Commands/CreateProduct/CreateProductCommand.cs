using Domain.Entities;

using MediatR;


namespace Application.Features.Product.Commands.CreateProduct
{
    public class CreateProductCommand : IRequest
    {
        public ProductEntity Product { get; set; }
        public CreateProductCommand(ProductEntity product) => Product = product;
    }
}
