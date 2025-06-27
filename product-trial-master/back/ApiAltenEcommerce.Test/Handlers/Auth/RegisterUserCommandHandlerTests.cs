using Xunit;
using Moq;
using System.Threading;
using System.Threading.Tasks;
using Domain.Entities;
using Application.Features.Auth.Commands.RegisterUser;
using Application.Interfaces;

namespace ApiAltenEcommerce.Test.Handlers.Auth
{
    public class RegisterUserCommandHandlerTests
    {
        private readonly Mock<IUserService> _mockUserService;
        private readonly RegisterUserCommandHandler _handler;

        public RegisterUserCommandHandlerTests()
        {
            _mockUserService = new Mock<IUserService>();
            _handler = new RegisterUserCommandHandler(_mockUserService.Object);
        }

        [Fact]
        public async Task Handle_ShouldCallAddUserAsync_AndReturnTrue()
        {
            // Arrange
            var user = new UserEntity
            {
                Email = "test@example.com",
                Password = "secure123",
                Firstname = "John",
                Username = "Doe"
            };
            var command = new RegisterUserCommand(user);

            // Act
            var result = await _handler.Handle(command, CancellationToken.None);

            // Assert
            Assert.True(result);
            _mockUserService.Verify(us => us.AddUserAsync(user), Times.Once);
        }
    }
}
