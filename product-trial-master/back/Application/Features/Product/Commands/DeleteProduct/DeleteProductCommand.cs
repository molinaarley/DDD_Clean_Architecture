
using MediatR;

namespace Application.Features.Product.Commands.DeleteProduct
{
    public class DeleteProductCommand : IRequest<bool>
    {
        public int Id { get; set; }
        public DeleteProductCommand(int id) => Id = id;
    }
}
