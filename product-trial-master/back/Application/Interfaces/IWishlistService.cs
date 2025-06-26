
using Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Application.Interfaces
{
    public interface IWishlistService
    {
        Task<bool> AddToWishlistAsync(string email, List<ProductEntity> products);
        Task<List<ProductEntity>> GetWishlistAsync(string email);
    }
}
