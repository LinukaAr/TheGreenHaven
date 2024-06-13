document.addEventListener('DOMContentLoaded', () => {
    const cart = [];

    document.querySelectorAll('.add-to-cart').forEach((button, index) => {
        button.addEventListener('click', event => {
            const productCard = event.target.closest('.product-card');
            const title = productCard.querySelector('.product-title').textContent;
            const price = parseFloat(productCard.querySelector('.product-price').textContent.replace('$', ''));
            const size = productCard.querySelector(`select[name="size"]`).value;
            const color = productCard.querySelector(`select[name="color"]`).value;

            const product = { title, size, color, price };
            cart.push(product);

            updateCartSummary();
        });
    });

    function updateCartSummary() {
        const cartSummary = document.querySelector('.cart-summary');
        cartSummary.innerHTML = '<h2> <i class="fa-solid fa-cart-shopping"></i> Shopping Cart</h2>';

        cart.forEach((product, index) => {
            const productItem = document.createElement('div');
            productItem.className = 'cart-item';
            productItem.innerHTML = `
                <span>${index + 1}. ${product.title}</span>
                <span>(${product.size}, ${product.color})</span>
                <span>$${product.price.toFixed(2)}</span>
            `;
            cartSummary.appendChild(productItem);
        });

        const hr = document.createElement('hr');
        cartSummary.appendChild(hr);

        const total = cart.reduce((sum, product) => sum + product.price, 0);
        const shipping = total * 0.05;
        const subtotal = total + shipping;

        const totalElement = document.createElement('div');
        totalElement.className = 'total';
        totalElement.innerHTML = `<strong>Total:</strong> <span>$${total.toFixed(2)}</span>`;
        cartSummary.appendChild(totalElement);

        localStorage.setItem('totalAmount', total.toFixed(2));
        localStorage.setItem('shippingAmount', shipping.toFixed(2));
        localStorage.setItem('subtotalAmount', subtotal.toFixed(2));
    }

    document.querySelector('.checkout-button').addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Please add at least one product to the cart before proceeding to checkout.');
        } else {
            window.location.href = 'checkout.html';
        }
    });

    // check out page
    if (window.location.pathname.endsWith('checkout.html')) {
        const totalAmount = localStorage.getItem('totalAmount');
        const shippingAmount = localStorage.getItem('shippingAmount');
        const subtotalAmount = localStorage.getItem('subtotalAmount');

        if (totalAmount && shippingAmount && subtotalAmount) {
            document.getElementById('total-price').textContent = `$${totalAmount}`;
            document.getElementById('shipping-price').textContent = `$${shippingAmount}`;
            document.getElementById('tax-price').textContent = `$0.00`;
            document.getElementById('subtotal-price').textContent = `$${subtotalAmount}`;
        }

        const form = document.getElementById('checkout-form');
        const orderConfirmation = document.getElementById('order-confirmation');

        form.addEventListener('submit', (event) => {
            event.preventDefault();

            const fields = ['first-name', 'last-name', 'email', 'phone', 'address', 'city', 'state', 'zip'];
            let isValid = true;

            fields.forEach(field => {
                const input = document.getElementById(field);
                const errorMessage = document.getElementById(`${field}-error`);

                if (!input.value) {
                    errorMessage.textContent = 'This field is required.';
                    isValid = false;
                } else {
                    errorMessage.textContent = '';
                }
            });

            if (isValid) {
                form.style.display = 'none';
                orderConfirmation.style.display = 'block';
            }
        });
    }
});

// Payment option selection
document.querySelectorAll('.payment-option').forEach(option => {
    option.addEventListener('click', event => {
        document.querySelectorAll('.payment-option').forEach(opt => {
            opt.style.border = 'none'; // Reset border for all options
        });

        const selectedOption = event.target;
        selectedOption.style.border = '2px solid blue'; // Highlight selected option

        const paymentMethod = selectedOption.id;
        document.getElementById('selected-payment-method').value = paymentMethod;
    });
});
;