using Application.Interfaces;
using Domain.Entities;
using MediatR;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Features.Auth.Queries.LoginUser
{
    public class LoginUserQueryHandler : IRequestHandler<LoginUserQuery, string?>
    {
        private readonly IUserService _userService;
        private readonly IConfiguration _configuration;

        public LoginUserQueryHandler(IUserService userService, IConfiguration configuration)
        {
            _userService = userService;
            _configuration = configuration;
        }

        public async Task<string?> Handle(LoginUserQuery request, CancellationToken cancellationToken)
        {
            var user = await _userService.ValidateUserAsync(request.Email, request.Password);
            if (user == null)
                return null;

            var key = Encoding.UTF8.GetBytes(_configuration["JwtSettings:Key"]);
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Name, user.Username)
            };

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddMinutes(int.Parse(_configuration["JwtSettings:DurationInMinutes"])),
                Issuer = _configuration["JwtSettings:Issuer"],
                Audience = _configuration["JwtSettings:Audience"],
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}