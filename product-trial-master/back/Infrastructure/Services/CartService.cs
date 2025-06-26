
using Application.Interfaces;
using Domain.Entities;
using System.Collections.Generic;
using System.IO;
using System.Text.Json;
using System.Threading.Tasks;

namespace Infrastructure.Services
{
    public class CartService : ICartService
    {
        private const string FolderPath = "Data/Cart";

        public CartService()
        {
            if (!Directory.Exists(FolderPath))
                Directory.CreateDirectory(FolderPath);
        }

        public async Task<bool> AddToCartAsync(string email, List<ProductEntity> products)
        {
            var path = Path.Combine(FolderPath, $"{email}.json");
            var existing = new List<ProductEntity>();

            if (File.Exists(path))
            {
                var json = await File.ReadAllTextAsync(path);
                existing = JsonSerializer.Deserialize<List<ProductEntity>>(json) ?? new();
            }

            existing.AddRange(products);
            var updated = JsonSerializer.Serialize(existing);
            await File.WriteAllTextAsync(path, updated);

            return true;
        }

        public async Task<List<ProductEntity>> GetCartAsync(string email)
        {
            var path = Path.Combine(FolderPath, $"{email}.json");
            if (!File.Exists(path)) return new List<ProductEntity>();

            var json = await File.ReadAllTextAsync(path);
            return JsonSerializer.Deserialize<List<ProductEntity>>(json) ?? new List<ProductEntity>();
        }
    }
}