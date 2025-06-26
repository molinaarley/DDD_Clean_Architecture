using MediatR;

namespace Application.Features.Auth.Queries.LoginUser
{
    public class LoginUserQuery : IRequest<string?>
    {
        public string Email { get; set; }
        public string Password { get; set; }

        public LoginUserQuery(string email, string password)
        {
            Email = email;
            Password = password;
        }
    }
}