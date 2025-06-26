
using Application.Features.Cart.Queries;
using Application.Interfaces;
using Domain.Entities;
using MediatR;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Features.Cart.Handlers
{
    public class GetCartQueryHandler : IRequestHandler<GetCartQuery, List<ProductEntity>>
    {
        private readonly ICartService _cartService;

        public GetCartQueryHandler(ICartService cartService)
        {
            _cartService = cartService;
        }

        public async Task<List<ProductEntity>> Handle(GetCartQuery request, CancellationToken cancellationToken)
        {
            return await _cartService.GetCartAsync(request.Email);
        }
    }
}
