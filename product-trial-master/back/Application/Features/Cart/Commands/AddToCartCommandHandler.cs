
using Application.Interfaces;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Features.Cart.Commands
{
    public class AddToCartCommandHandler : IRequestHandler<AddToCartCommand, bool>
    {
        private readonly ICartService _cartService;

        public AddToCartCommandHandler(ICartService cartService)
        {
            _cartService = cartService;
        }

        public async Task<bool> Handle(AddToCartCommand request, CancellationToken cancellationToken)
        {
            return await _cartService.AddToCartAsync(request.Email, request.Products);
        }
    }
}
