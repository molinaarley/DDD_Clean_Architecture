using Domain.Entities;
using MediatR;

namespace Application.Features.Auth.Commands.RegisterUser
{
    public class RegisterUserCommand : IRequest<bool>
    {
        public UserEntity User { get; set; }

        public RegisterUserCommand(UserEntity user)
        {
            User = user;
        }
    }
}