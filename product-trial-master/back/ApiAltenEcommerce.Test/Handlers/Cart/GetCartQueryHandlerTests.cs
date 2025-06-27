using Xunit;
using System;
using System.Collections.Generic;
using System.IO;
using System.Threading;
using System.Threading.Tasks;
using Application.Features.Cart.Handlers;
using Application.Features.Cart.Queries;
using Domain.Entities;
using Infrastructure.Services;

namespace ApiAltenEcommerce.Test.Handlers.Cart
{
    public class GetCartQueryHandlerTests : IDisposable
    {
        private readonly string _tempCartFolder;
        private readonly GetCartQueryHandler _handler;
        private readonly CartService _cartService;

        public GetCartQueryHandlerTests()
        {
            _tempCartFolder = Path.Combine(Path.GetTempPath(), Guid.NewGuid().ToString());
            Directory.CreateDirectory(_tempCartFolder);
            _cartService = new CartService(_tempCartFolder);
            _handler = new GetCartQueryHandler(_cartService);
        }

        [Fact]
        public async Task Handle_ShouldReturnCartForUser()
        {
            // Arrange
            string email = "testuser@example.com";
            var products = new List<ProductEntity>
            {
                new ProductEntity { Name = "Product 1", Price = 10 },
                new ProductEntity { Name = "Product 2", Price = 20 }
            };

            await _cartService.AddToCartAsync(email, products);

            var query = new GetCartQuery(email);


            // Act
            var result = await _handler.Handle(query, CancellationToken.None);

            // Assert
            Assert.NotNull(result);
            Assert.Equal(2, result.Count);
            Assert.Equal("Product 1", result[0].Name);
        }

        public void Dispose()
        {
            if (Directory.Exists(_tempCartFolder))
                Directory.Delete(_tempCartFolder, recursive: true);
        }
    }
}
