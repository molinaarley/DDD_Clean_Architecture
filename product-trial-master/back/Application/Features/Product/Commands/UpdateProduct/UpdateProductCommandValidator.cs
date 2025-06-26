using FluentValidation;
using Application.Features.Product.Commands.UpdateProduct;
using Domain.Enums;

namespace Application.Features.Product.Commands.UpdateProduct
{
    public class UpdateProductCommandValidator : AbstractValidator<UpdateProductCommand>
    {
        public UpdateProductCommandValidator()
        {
            RuleFor(x => x.Product.Id)
                .NotEmpty().WithMessage("L'identifiant du produit est requis.");

            RuleFor(x => x.Product.Name)
                .NotEmpty().WithMessage("Le nom du produit est requis.");

            RuleFor(x => x.Product.Price)
                .GreaterThan(0).WithMessage("Le prix doit être supérieur à zéro.");

            RuleFor(x => x.Product.Category)
                .NotEmpty().WithMessage("La catégorie est requise.");

            RuleFor(x => x.Product.Quantity)
                .GreaterThanOrEqualTo(0).WithMessage("La quantité ne peut pas être négative.");

            RuleFor(x => x.Product.InventoryStatus)
                .IsInEnum().WithMessage("Le statut d'inventaire n'est pas valide.");
        }
    }
}
