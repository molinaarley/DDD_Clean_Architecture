
using Application.Interfaces;
using Domain.Entities;
using System.Collections.Generic;
using System.IO;
using System.Text.Json;
using System.Threading.Tasks;

namespace Infrastructure.Services
{
    public class WishlistService : IWishlistService
    {
        private readonly string _folderPath;

        public WishlistService(string? folderPath = null)
        {
            _folderPath = folderPath ?? Path.Combine(Directory.GetCurrentDirectory(), "Data", "Wishlist");

            if (!Directory.Exists(_folderPath))
                Directory.CreateDirectory(_folderPath);
        }

        public async Task<bool> AddToWishlistAsync(string email, List<ProductEntity> products)
        {
            var path = Path.Combine(_folderPath, $"{email}.json");
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

        public async Task<List<ProductEntity>> GetWishlistAsync(string email)
        {
            var path = Path.Combine(_folderPath, $"{email}.json");
            if (!File.Exists(path)) return new List<ProductEntity>();

            var json = await File.ReadAllTextAsync(path);
            return JsonSerializer.Deserialize<List<ProductEntity>>(json) ?? new List<ProductEntity>();
        }
    }
}