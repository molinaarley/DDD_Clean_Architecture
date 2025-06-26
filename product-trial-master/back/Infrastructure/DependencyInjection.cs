using Application.Interfaces;
using Infrastructure.Services;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;


namespace AltenEcommerce.Infrastructure
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
        {

            services.AddSingleton<IProductService, ProductFileService>();
            services.AddSingleton<IUserService, UserFileService>();

            services.AddSingleton<ICartService, CartService>();
            services.AddSingleton<IWishlistService, WishlistService>();



            return services;
        }
    }
}
