using Xunit;
using System.IO;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Text.Json;
using System;
using System.Linq;
using Domain.Entities;
using Infrastructure.Services;

namespace API.Tests.Services
{
    public class ProductFileServiceTest : IDisposable
    {
        private readonly string _testFilePath;
        private readonly ProductFileService _service;

        public ProductFileServiceTest()
        {
            // Crear un archivo temporal único para test
            _testFilePath = Path.Combine(Path.GetTempPath(), Guid.NewGuid() + ".json");
            File.WriteAllText(_testFilePath, "[]");

       
            _service = new ProductFileService(_testFilePath);

        }

        [Fact]
        public async Task AddAsync_ShouldAddProduct()
        {
            var product = new ProductEntity { Name = "Test Product", Price = 9.99M };

            await _service.AddAsync(product);
            var all = (await _service.GetAllAsync()).ToList();

            Assert.Single(all);
            Assert.Equal("Test Product", all[0].Name);
        }

        [Fact]
        public async Task GetByIdAsync_ShouldReturnCorrectProduct()
        {
            var product = new ProductEntity { Name = "Test", Price = 1.0M };
            await _service.AddAsync(product);

            var result = await _service.GetByIdAsync(1);
            Assert.NotNull(result);
            Assert.Equal("Test", result!.Name);
        }

        [Fact]
        public async Task DeleteAsync_ShouldRemoveProduct()
        {
            var product = new ProductEntity { Name = "ToDelete", Price = 1.0M };
            await _service.AddAsync(product);
            var deleted = await _service.DeleteAsync(1);

            Assert.True(deleted);
            Assert.Empty(await _service.GetAllAsync());
        }

        public void Dispose()
        {
            if (File.Exists(_testFilePath))
                File.Delete(_testFilePath);
        }


        
    }
}
