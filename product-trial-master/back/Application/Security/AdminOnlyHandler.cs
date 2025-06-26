using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Application.Security
{
    public class AdminOnlyHandler : AuthorizationHandler<AdminOnlyRequirement>
    {
        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, AdminOnlyRequirement requirement)
        {
            var email = context.User.FindFirst(ClaimTypes.Email)?.Value;

            if (email == "admin@admin.com")
            {
                context.Succeed(requirement);
            }

            return Task.CompletedTask;
        }
    }
}
