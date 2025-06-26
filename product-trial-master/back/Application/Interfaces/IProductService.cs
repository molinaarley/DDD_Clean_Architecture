using Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;
using Domain.Entities;


namespace Application.Interfaces
{
    public interface IProductService
    {
        Task<IEnumerable<ProductEntity>> GetAllAsync();
        Task<ProductEntity?> GetByIdAsync(int id);
        Task AddAsync(ProductEntity product);
        Task<bool> UpdateAsync(int id, ProductEntity updatedProduct);
        Task<bool> DeleteAsync(int id);
    }
}