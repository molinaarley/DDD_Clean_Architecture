using System.Collections.Generic;
using System.IO;
using System;
using System.Text.Json;
using System.Threading.Tasks;
using System.Linq;
using Domain.Entities;
using Application.Interfaces;

namespace AltenEcommerce.Infrastructure.Services
{
    public class ProductFileService : IProductService
    {
        private readonly string _filePath = Path.Combine(Directory.GetCurrentDirectory(), "Data", "products.json");

        public ProductFileService()
        {
            // Ensure file exists
            if (!File.Exists(_filePath))
            {
                Directory.CreateDirectory(Path.GetDirectoryName(_filePath)!);
                File.WriteAllText(_filePath, "[]");
            }
        }

        public async Task<IEnumerable<ProductEntity>> GetAllAsync()
        {
            var json = await File.ReadAllTextAsync(_filePath);
            return JsonSerializer.Deserialize<List<ProductEntity>>(json) ?? new List<ProductEntity>();
        }

        public async Task<ProductEntity?> GetByIdAsync(int id)
        {
            var products = await GetAllAsync();
            return products.FirstOrDefault(p => p.Id == id);
        }

        public async Task AddAsync(ProductEntity product)
        {
            var products = (await GetAllAsync()).ToList();
            product.Id = products.Any() ? products.Max(p => p.Id) + 1 : 1;
            product.CreatedAt = DateTime.UtcNow;
            product.UpdatedAt = DateTime.UtcNow;
            products.Add(product);
            await SaveAllAsync(products);
        }

        public async Task<bool> UpdateAsync(int id, ProductEntity updatedProduct)
        {
            var products = (await GetAllAsync()).ToList();
            var index = products.FindIndex(p => p.Id == id);
            if (index == -1) return false;

            updatedProduct.Id = id;
            updatedProduct.UpdatedAt = DateTime.UtcNow;
            updatedProduct.CreatedAt = products[index].CreatedAt;
            products[index] = updatedProduct;

            await SaveAllAsync(products);
            return true;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var products = (await GetAllAsync()).ToList();
            var product = products.FirstOrDefault(p => p.Id == id);
            if (product == null) return false;

            products.Remove(product);
            await SaveAllAsync(products);
            return true;
        }

        private async Task SaveAllAsync(List<ProductEntity> products)
        {
            var json = JsonSerializer.Serialize(products, new JsonSerializerOptions { WriteIndented = true });
            await File.WriteAllTextAsync(_filePath, json);
        }
    }
}
