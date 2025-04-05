document.addEventListener('DOMContentLoaded', () => {
    const categoryItems = document.querySelectorAll('.category-item');
    const itemCountDisplay = document.querySelector('.item-count-display');

    categoryItems.forEach(item => {
        item.addEventListener('click', () => {
            const itemCount = item.getAttribute('data-items');
            
            if (itemCount === "0") {
                itemCountDisplay.textContent = "Aucun article disponible pour cette catégorie";
            } else {
                itemCountDisplay.textContent = `${itemCount} article${itemCount > 1 ? 's' : ''} disponible${itemCount > 1 ? 's' : ''} dans cette catégorie`;
            }

            itemCountDisplay.classList.add('show');

            setTimeout(() => {
                itemCountDisplay.classList.remove('show');
            }, 3000);
        });
    });
});