using Xunit;
using System;
using System.IO;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Text.Json;
using Domain.Entities;
using Infrastructure.Services;
using System.Reflection;

namespace API.Tests.Services
{
    public class CartServiceTest : IDisposable
    {
        private readonly string _testCartFolder;
        private readonly CartService _service;

        public CartServiceTest()
        {
            _testCartFolder = Path.Combine(Path.GetTempPath(), Guid.NewGuid().ToString());
            Directory.CreateDirectory(_testCartFolder);
            _service = new CartService(_testCartFolder);
        }

        [Fact]
        public async Task AddToCartAsync_ShouldAddProductsToUserCart()
        {
            string email = "test@example.com";
            var products = new List<ProductEntity>
            {
                new ProductEntity { Name = "Test1", Price = 10 },
                new ProductEntity { Name = "Test2", Price = 20 }
            };

            var result = await _service.AddToCartAsync(email, products);

            Assert.True(result);

            var cart = await _service.GetCartAsync(email);
            Assert.Equal(2, cart.Count);
            Assert.Contains(cart, p => p.Name == "Test1");
            Assert.Contains(cart, p => p.Name == "Test2");
        }

        [Fact]
        public async Task GetCartAsync_WhenFileNotExists_ShouldReturnEmptyList()
        {
            var cart = await _service.GetCartAsync("nouser@example.com");
            Assert.NotNull(cart);
            Assert.Empty(cart);
        }

        [Fact]
        public async Task AddToCartAsync_ShouldAppendIfFileAlreadyExists()
        {
            string email = "append@example.com";
            var first = new List<ProductEntity> { new ProductEntity { Name = "First", Price = 1 } };
            var second = new List<ProductEntity> { new ProductEntity { Name = "Second", Price = 2 } };

            await _service.AddToCartAsync(email, first);
            await _service.AddToCartAsync(email, second);

            var cart = await _service.GetCartAsync(email);
            Assert.Equal(2, cart.Count);
        }

        public void Dispose()
        {
            if (Directory.Exists(_testCartFolder))
                Directory.Delete(_testCartFolder, recursive: true);
        }

        // Subclase para sobrescribir ruta de carpeta de cart
        private class TestableCartService : CartService
        {
            public TestableCartService(string customFolderPath)
            {
                typeof(CartService)
                 .GetField("FolderPath", BindingFlags.NonPublic | BindingFlags.Static)
                 .SetValue(null, customFolderPath);
            }
        }
    }
}
