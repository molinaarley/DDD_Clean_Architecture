using Xunit;
using System;
using System.IO;
using System.Threading.Tasks;
using System.Collections.Generic;
using Domain.Entities;
using Infrastructure.Services;

namespace API.Tests.Services
{
    public class WishlistServiceTest : IDisposable
    {
        private readonly string _testWishlistFolder;
        private readonly WishlistService _service;

        public WishlistServiceTest()
        {
            _testWishlistFolder = Path.Combine(Path.GetTempPath(), Guid.NewGuid().ToString());
            Directory.CreateDirectory(_testWishlistFolder);
            _service = new WishlistService(_testWishlistFolder);
        }

        [Fact]
        public async Task AddToWishlistAsync_ShouldAddProducts()
        {
            string email = "wishlist@example.com";
            var products = new List<ProductEntity>
            {
                new ProductEntity { Name = "Wish 1", Price = 5 },
                new ProductEntity { Name = "Wish 2", Price = 15 }
            };

            var result = await _service.AddToWishlistAsync(email, products);
            Assert.True(result);

            var wishlist = await _service.GetWishlistAsync(email);
            Assert.Equal(2, wishlist.Count);
        }

        [Fact]
        public async Task GetWishlistAsync_ShouldReturnEmptyIfFileNotExist()
        {
            var wishlist = await _service.GetWishlistAsync("nouser@example.com");
            Assert.NotNull(wishlist);
            Assert.Empty(wishlist);
        }

        [Fact]
        public async Task AddToWishlistAsync_ShouldAppendProducts()
        {
            string email = "append@example.com";
            var list1 = new List<ProductEntity> { new ProductEntity { Name = "First" } };
            var list2 = new List<ProductEntity> { new ProductEntity { Name = "Second" } };

            await _service.AddToWishlistAsync(email, list1);
            await _service.AddToWishlistAsync(email, list2);

            var wishlist = await _service.GetWishlistAsync(email);
            Assert.Equal(2, wishlist.Count);
        }

        public void Dispose()
        {
            if (Directory.Exists(_testWishlistFolder))
                Directory.Delete(_testWishlistFolder, recursive: true);
        }
    }
}
