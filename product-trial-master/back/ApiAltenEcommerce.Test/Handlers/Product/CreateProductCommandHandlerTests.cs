using Xunit;
using System;
using System.IO;
using System.Threading;
using System.Threading.Tasks;
using Application.Features.Product.Commands.CreateProduct;
using Domain.Entities;
using Infrastructure.Services;

namespace ApiAltenEcommerce.Test.Handlers.Product
{
    public class CreateProductCommandHandlerTests : IDisposable
    {
        private readonly string _testFilePath;
        private readonly ProductFileService _productService;
        private readonly CreateProductCommandHandler _handler;

        public CreateProductCommandHandlerTests()
        {
            _testFilePath = Path.Combine(Path.GetTempPath(), Guid.NewGuid() + ".json");
            File.WriteAllText(_testFilePath, "[]");

            _productService = new ProductFileService(_testFilePath);
            _handler = new CreateProductCommandHandler(_productService);
        }

        [Fact]
        public async Task Handle_ShouldAddProductToFile()
        {
            // Arrange
            var product = new ProductEntity
            {
                Name = "Test Product",
                Description = "A test product",
                Price = 99.99m,
                Image = "image.jpg"
            };

            var command = new CreateProductCommand(product);

            // Act
            await _handler.Handle(command, CancellationToken.None);

            // Assert
            var products = await _productService.GetAllAsync();
            Assert.Single(products);
            Assert.Equal("Test Product", products.First().Name);
        }

        public void Dispose()
        {
            if (File.Exists(_testFilePath))
                File.Delete(_testFilePath);
        }
    }
}
