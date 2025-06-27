using FluentValidation;
using Domain.Enums;
using Application.Features.Product.Commands.CreateProduct;

public class CreateProductCommandValidator : AbstractValidator<CreateProductCommand>
{
    public CreateProductCommandValidator()
    {
        RuleFor(x => x.Product.Name)
            .NotEmpty().WithMessage("Le nom du produit est requis.");

        RuleFor(x => x.Product.Price)
            .GreaterThan(0).WithMessage("Le prix doit être supérieur à zéro.");

        RuleFor(x => x.Product.InventoryStatus)
            .IsInEnum().WithMessage("Le statut d'inventaire n'est pas valide.");

        RuleFor(x => x.Product.Category)
            .NotEmpty().WithMessage("La catégorie du produit est requise.");

    }
}
