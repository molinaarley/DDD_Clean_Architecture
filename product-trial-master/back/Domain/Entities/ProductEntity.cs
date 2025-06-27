
using Domain.Enums;
using System;

namespace Domain.Entities
{
    public class ProductEntity
    {
        public int Id { get; set; }
        public string Code { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Image { get; set; } = string.Empty;
        public string Category { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public int Quantity { get; set; }
        public string InternalReference { get; set; } = string.Empty;
        public int ShellId { get; set; }
        public InventoryStatus InventoryStatus { get; set; }
        public double Rating { get; set; }

        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
    }

}
