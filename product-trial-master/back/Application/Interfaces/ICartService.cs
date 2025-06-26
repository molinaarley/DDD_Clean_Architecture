
using Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Application.Interfaces
{
    public interface ICartService
    {
        Task<bool> AddToCartAsync(string email, List<ProductEntity> products);
        Task<List<ProductEntity>> GetCartAsync(string email);
    }
}
