

using Domain.Entities;
using System.Threading.Tasks;

namespace Application.Interfaces
{
    public interface IUserService
    {
        Task AddUserAsync(UserEntity user);
        Task<UserEntity?> ValidateUserAsync(string email, string password);
    }
}
