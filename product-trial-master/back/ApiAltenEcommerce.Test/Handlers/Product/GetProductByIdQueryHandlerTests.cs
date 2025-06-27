using Xunit;
using System;
using System.IO;
using System.Threading;
using System.Threading.Tasks;
using Domain.Entities;
using Infrastructure.Services;
using Application.Features.Product.Queries.GetProductByIdQuery;

namespace ApiAltenEcommerce.Test.Handlers.Product
{
    public class GetProductByIdQueryHandlerTests : IDisposable
    {
        private readonly string _testFilePath;
        private readonly ProductFileService _productService;
        private readonly GetProductByIdQueryHandler _handler;

        public GetProductByIdQueryHandlerTests()
        {
            _testFilePath = Path.Combine(Path.GetTempPath(), Guid.NewGuid() + ".json");
            File.WriteAllText(_testFilePath, "[]");

            _productService = new ProductFileService(_testFilePath);
            _handler = new GetProductByIdQueryHandler(_productService);
        }

        [Fact]
        public async Task Handle_ShouldReturnProduct_WhenExists()
        {
            // Arrange
            var product = new ProductEntity
            {
                Name = "Test Product",
                Description = "Test Desc",
                Price = 99.99m,
                Image = "img.png"
            };

            await _productService.AddAsync(product);
            var added = await _productService.GetAllAsync();
            var id = added.First().Id;

            var query = new GetProductByIdQuery(id);

            // Act
            var result = await _handler.Handle(query, CancellationToken.None);

            // Assert
            Assert.NotNull(result);
            Assert.Equal("Test Product", result!.Name);
        }

        [Fact]
        public async Task Handle_ShouldReturnNull_WhenNotFound()
        {
            var query = new GetProductByIdQuery(999);

            var result = await _handler.Handle(query, CancellationToken.None);

            Assert.Null(result);
        }

        public void Dispose()
        {
            if (File.Exists(_testFilePath))
                File.Delete(_testFilePath);
        }
    }
}
