using Xunit;
using System;
using System.IO;
using System.Threading;
using System.Threading.Tasks;
using System.Linq;
using Domain.Entities;
using Infrastructure.Services;
using Application.Features.Product.Commands.DeleteProduct;

namespace ApiAltenEcommerce.Test.Handlers.Product
{
    public class DeleteProductCommandHandlerTests : IDisposable
    {
        private readonly string _testFilePath;
        private readonly ProductFileService _productService;
        private readonly DeleteProductCommandHandler _handler;

        public DeleteProductCommandHandlerTests()
        {
            _testFilePath = Path.Combine(Path.GetTempPath(), Guid.NewGuid() + ".json");
            File.WriteAllText(_testFilePath, "[]");

            _productService = new ProductFileService(_testFilePath);
            _handler = new DeleteProductCommandHandler(_productService);
        }

        [Fact]
        public async Task Handle_ShouldDeleteProduct()
        {
            // Arrange
            var product = new ProductEntity { Name = "ToDelete", Price = 10.0m };
            await _productService.AddAsync(product);

            var existing = (await _productService.GetAllAsync()).ToList();
            Assert.Single(existing); // aseguramos que fue agregado
            int productId = existing.First().Id;

            var command = new DeleteProductCommand(productId);

            // Act
            var result = await _handler.Handle(command, CancellationToken.None);

            // Assert
            Assert.True(result);
            var finalList = await _productService.GetAllAsync();
            Assert.Empty(finalList);
        }

        public void Dispose()
        {
            if (File.Exists(_testFilePath))
                File.Delete(_testFilePath);
        }
    }
}
