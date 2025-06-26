using FluentValidation;
using Application.Features.Product.Commands.DeleteProduct;

namespace Application.Features.Product.Commands.DeleteProduct
{
    public class DeleteProductCommandValidator : AbstractValidator<DeleteProductCommand>
    {
        public DeleteProductCommandValidator()
        {
            RuleFor(x => x.Id)
                .NotEmpty().WithMessage("L'identifiant du produit est requis.");
        }
    }
}
