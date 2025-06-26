
using Application.Interfaces;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;

namespace Infrastructure.Services
{
    public class UserFileService : IUserService
    {
        private readonly string _filePath = Path.Combine(Directory.GetCurrentDirectory(), "Data", "users.json");

        public UserFileService()
        {
            if (!File.Exists(_filePath))
            {
                Directory.CreateDirectory(Path.GetDirectoryName(_filePath)!);
                File.WriteAllText(_filePath, "[]");
            }
        }

        public async Task AddUserAsync(UserEntity user)
        {
            var users = await LoadUsersAsync();
            if (users.Any(u => u.Email.ToLower() == user.Email.ToLower()))
                throw new Exception("Email already exists.");

            users.Add(user);
            await SaveUsersAsync(users);
        }

        public async Task<UserEntity?> ValidateUserAsync(string email, string password)
        {
            var users = await LoadUsersAsync();
            return users.FirstOrDefault(u => u.Email == email && u.Password == password);
        }

        private async Task<List<UserEntity>> LoadUsersAsync()
        {
            var json = await File.ReadAllTextAsync(_filePath);
            return JsonSerializer.Deserialize<List<UserEntity>>(json) ?? new List<UserEntity>();
        }

        private async Task SaveUsersAsync(List<UserEntity> users)
        {
            var json = JsonSerializer.Serialize(users, new JsonSerializerOptions { WriteIndented = true });
            await File.WriteAllTextAsync(_filePath, json);
        }
    }
}
