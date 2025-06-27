using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Auth.Commands.RegisterUser
{

    public class RegisterUserCommandValidator : AbstractValidator<RegisterUserCommand>
    {
        public RegisterUserCommandValidator()
        {
            RuleFor(x => x.User)
                .NotNull().WithMessage("User cannot be null.");

            When(x => x.User != null, () =>
            {
                RuleFor(x => x.User.Email)
                .NotEmpty().WithMessage("Email is required.")
                .Matches(@"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$")
                .WithMessage("Email format is invalid.");


                RuleFor(x => x.User.Password)
                    .NotEmpty().WithMessage("Password is required.")
                    .MinimumLength(6).WithMessage("Password must be at least 6 characters.");

                RuleFor(x => x.User.Firstname)
                    .NotEmpty().WithMessage("First name is required.");
            
            });
        }
    }


}
