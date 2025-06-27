using Xunit;
using System;
using System.IO;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using System.Collections.Generic;
using Domain.Entities;
using Infrastructure.Services;
using Application.Features.Product.Queries.GetAllProductsQuery;

namespace ApiAltenEcommerce.Test.Handlers.Product
{
    public class GetAllProductsQueryHandlerTests : IDisposable
    {
        private readonly string _testFilePath;
        private readonly ProductFileService _productService;
        private readonly GetAllProductsQueryHandler _handler;

        public GetAllProductsQueryHandlerTests()
        {
            _testFilePath = Path.Combine(Path.GetTempPath(), Guid.NewGuid() + ".json");
            File.WriteAllText(_testFilePath, "[]");

            _productService = new ProductFileService(_testFilePath);
            _handler = new GetAllProductsQueryHandler(_productService);
        }

        [Fact]
        public async Task Handle_ShouldReturnAllProducts()
        {
            // Arrange
            var productsToAdd = new List<ProductEntity>
            {
                new ProductEntity { Name = "Product A", Price = 10m },
                new ProductEntity { Name = "Product B", Price = 20m }
            };

            foreach (var product in productsToAdd)
            {
                await _productService.AddAsync(product);
            }

            var query = new GetAllProductsQuery();

            // Act
            var result = (await _handler.Handle(query, CancellationToken.None)).ToList();

            // Assert
            Assert.NotNull(result);
            Assert.Equal(2, result.Count);
            Assert.Contains(result, p => p.Name == "Product A");
            Assert.Contains(result, p => p.Name == "Product B");
        }

        public void Dispose()
        {
            if (File.Exists(_testFilePath))
                File.Delete(_testFilePath);
        }
    }
}
