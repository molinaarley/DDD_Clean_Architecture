using Application.Features.Auth.Commands.RegisterUser;
using Application.Features.Auth.Queries.LoginUser;
using Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace AltenEcommerce.API.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class AuthController : ControllerBase
    {
        private readonly IMediator _mediator;

        public AuthController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost("account")]
        public async Task<IActionResult> Register([FromBody] UserEntity user)
        {
            try
            {
                var result = await _mediator.Send(new RegisterUserCommand(user));
                return Ok(new { message = "User created" });
            }
            catch (System.Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }

        [HttpPost("token")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            var token = await _mediator.Send(new LoginUserQuery(request.Email, request.Password));
            if (token == null)
                return Unauthorized();
            return Ok(new { token });
        }
    }

    public class LoginRequest
    {
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }
}