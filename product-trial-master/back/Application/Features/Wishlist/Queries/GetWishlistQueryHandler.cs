
using Application.Features.Wishlist.Queries;
using Application.Interfaces;
using Domain.Entities;
using MediatR;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Features.Wishlist.Handlers
{
    public class GetWishlistQueryHandler : IRequestHandler<GetWishlistQuery, List<ProductEntity>>
    {
        private readonly IWishlistService _wishlistService;

        public GetWishlistQueryHandler(IWishlistService wishlistService)
        {
            _wishlistService = wishlistService;
        }

        public async Task<List<ProductEntity>> Handle(GetWishlistQuery request, CancellationToken cancellationToken)
        {
            return await _wishlistService.GetWishlistAsync(request.Email);
        }
    }
}
