
using Application.Interfaces;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Features.Wishlist.Commands
{
    public class AddToWishlistCommandHandler : IRequestHandler<AddToWishlistCommand, bool>
    {
        private readonly IWishlistService _wishlistService;

        public AddToWishlistCommandHandler(IWishlistService wishlistService)
        {
            _wishlistService = wishlistService;
        }

        public async Task<bool> Handle(AddToWishlistCommand request, CancellationToken cancellationToken)
        {
            return await _wishlistService.AddToWishlistAsync(request.Email, request.Products);
        }
    }
}
