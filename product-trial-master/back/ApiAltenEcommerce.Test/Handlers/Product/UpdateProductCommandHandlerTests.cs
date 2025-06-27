using Xunit;
using System;
using System.IO;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Domain.Entities;
using Infrastructure.Services;
using Application.Features.Product.Commands.UpdateProduct;

namespace ApiAltenEcommerce.Test.Handlers.Product
{
    public class UpdateProductCommandHandlerTests : IDisposable
    {
        private readonly string _testFilePath;
        private readonly ProductFileService _productService;
        private readonly UpdateProductCommandHandler _handler;

        public UpdateProductCommandHandlerTests()
        {
            _testFilePath = Path.Combine(Path.GetTempPath(), Guid.NewGuid() + ".json");
            File.WriteAllText(_testFilePath, "[]");

            _productService = new ProductFileService(_testFilePath);
            _handler = new UpdateProductCommandHandler(_productService);
        }

        [Fact]
        public async Task Handle_ShouldUpdateExistingProduct()
        {
            // Arrange
            var originalProduct = new ProductEntity { Name = "Old Name", Price = 10m };
            await _productService.AddAsync(originalProduct);

            var existing = (await _productService.GetAllAsync()).ToList();
            var idToUpdate = existing.First().Id;

            var updatedProduct = new ProductEntity
            {
                Name = "Updated Name",
                Description = "Updated Description",
                Price = 99.99m,
                Image = "updated.png"
            };

            var command = new UpdateProductCommand(idToUpdate, updatedProduct);

            // Act
            var result = await _handler.Handle(command, CancellationToken.None);

            // Assert
            Assert.True(result);
            var finalList = (await _productService.GetAllAsync()).ToList();
            Assert.Single(finalList);
            Assert.Equal("Updated Name", finalList.First().Name);
            Assert.Equal("Updated Description", finalList.First().Description);
        }

        [Fact]
        public async Task Handle_ShouldReturnFalse_WhenProductDoesNotExist()
        {
            // Arrange
            var nonExistentProduct = new ProductEntity { Name = "Ghost", Price = 5 };
            var command = new UpdateProductCommand(999, nonExistentProduct);

            // Act
            var result = await _handler.Handle(command, CancellationToken.None);

            // Assert
            Assert.False(result);
        }

        public void Dispose()
        {
            if (File.Exists(_testFilePath))
                File.Delete(_testFilePath);
        }
    }
}
