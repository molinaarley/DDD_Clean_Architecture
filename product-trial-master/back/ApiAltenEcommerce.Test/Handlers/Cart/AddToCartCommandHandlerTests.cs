using Xunit;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Features.Cart.Commands;
using Application.Interfaces;
using Domain.Entities;
using Infrastructure.Services;

namespace ApiAltenEcommerce.Test.Handlers.Cart
{
    public class AddToCartCommandHandlerTests
    {
        private readonly AddToCartCommandHandler _handler;
        private readonly string _tempFolder;
        private readonly ICartService _cartService;

        public AddToCartCommandHandlerTests()
        {
            // Usa una carpeta temporal de prueba
            _tempFolder = Path.Combine(Path.GetTempPath(), Path.GetRandomFileName());
            Directory.CreateDirectory(_tempFolder);
            _cartService = new CartService(_tempFolder);
            _handler = new AddToCartCommandHandler(_cartService);
        }

        [Fact]
        public async Task Handle_ShouldAddProductsToCart()
        {
            // Arrange
            var command = new AddToCartCommand
            {
                Email = "testuser@example.com",
                Products = new List<ProductEntity>
                {
                    new ProductEntity { Name = "Item1", Price = 10 },
                    new ProductEntity { Name = "Item2", Price = 20 }
                }
            };

            // Act
            var result = await _handler.Handle(command, CancellationToken.None);

            // Assert
            Assert.True(result);

            var cart = await _cartService.GetCartAsync(command.Email);
            Assert.Equal(2, cart.Count);
        }

        ~AddToCartCommandHandlerTests()
        {
            // Limpieza del entorno de prueba
            if (Directory.Exists(_tempFolder))
                Directory.Delete(_tempFolder, true);
        }
    }
}
