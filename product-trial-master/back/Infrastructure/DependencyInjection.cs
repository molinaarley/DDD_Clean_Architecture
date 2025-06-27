using Application.Interfaces;
using Infrastructure.Services;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System.IO;


namespace AltenEcommerce.Infrastructure
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
        {

      
            var productFilePath = Path.Combine(Directory.GetCurrentDirectory(), "Data", "products.json");
            services.AddSingleton<IProductService>(new ProductFileService(productFilePath));

            services.AddSingleton<IUserService, UserFileService>();
            services.AddSingleton<ICartService, CartService>();
            services.AddSingleton<IWishlistService, WishlistService>();


            return services;
        }
    }
}
