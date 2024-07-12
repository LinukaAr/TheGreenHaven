// store
document.addEventListener('DOMContentLoaded', () => {
    const cart = [];

    document.querySelectorAll('.add-to-cart').forEach((button, index) => {
        button.addEventListener('click', event => {
            const productCard = event.target.closest('.product-card');
            const title = productCard.querySelector('.product-title').textContent;
            const price = parseFloat(productCard.querySelector('.product-price').textContent.replace('$', ''));
            const size = productCard.querySelector(`select[name="size"]`).value;
            const color = productCard.querySelector(`select[name="color"]`).value;
            const quantity = parseInt(productCard.querySelector(`select[name="quantity"]`).value);

            const existingProduct = cart.find(product => 
                product.title === title && product.size === size && product.color === color
            );

            if (existingProduct) {
                existingProduct.quantity += quantity;
            } else {
                const product = { title, size, color, price, quantity };
                cart.push(product);
            }
            updateCartSummary();

            document.querySelector('.checkout-button').addEventListener('click', () => {
                if (cart.length === 0) {
                    alert('Please add at least one product to the cart before proceeding to checkout.');
                } else {
                    
                    window.location.href = 'checkout.html';
                }
            });

           
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
                <span>Quantity: ${product.quantity}</span>
                <span>$${(product.price * product.quantity).toFixed(2)}</span>
            `;
            cartSummary.appendChild(productItem);
        });

        const hr = document.createElement('hr');
        cartSummary.appendChild(hr);

        const total = cart.reduce((sum, product) => sum + (product.price * product.quantity), 0);
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

const personalDetailsForm = document.getElementById('personal-details-form');
const billingDetailsForm = document.getElementById('billing-details-form');
const saveButton = document.querySelector('.save-button');

saveButton.addEventListener('click', (event) => {
  event.preventDefault();
  validateForms();
});

function validateForms() {
  const personalDetailsValid = validatePersonalDetails();
  const billingDetailsValid = validateBillingDetails();

  if (personalDetailsValid && billingDetailsValid) {
    // Forms are valid, display success message
    alert('All fields filled successfully!');
  } else {
    // Forms are not valid, display error messages
    console.log('Forms are not valid!');
  }
}

function validatePersonalDetails() {
  const firstNameInput = document.getElementById('first-name');
  const lastNameInput = document.getElementById('last-name');
  const emailInput = document.getElementById('email');
  const phoneInput = document.getElementById('phone');

  const firstNameValid = validateInput(firstNameInput);
  const lastNameValid = validateInput(lastNameInput);
  const emailValid = validateEmail(emailInput);
  const phoneValid = validatePhone(phoneInput);

  return firstNameValid && lastNameValid && emailValid && phoneValid;
}

function validateBillingDetails() {
  const addressInput = document.getElementById('address');
  const cityInput = document.getElementById('city');
  const stateInput = document.getElementById('state');
  const zipInput = document.getElementById('zip');

  const addressValid = validateInput(addressInput);
  const cityValid = validateInput(cityInput);
  const stateValid = validateInput(stateInput);
  const zipValid = validateInput(zipInput);

  return addressValid && cityValid && stateValid && zipValid;
}

function validateInput(input) {
  if (input.value.trim() === '') {
    displayErrorMessage(input, 'This field is required.');
    return false;
  } else {
    const errorMessage = input.nextElementSibling;
    errorMessage.textContent = '';
    return true;
  }
}

function validateEmail(emailInput) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(emailInput.value)) {
    displayErrorMessage(emailInput, 'Invalid email address.');
    return false;
  } else {
    const errorMessage = emailInput.nextElementSibling;
    errorMessage.textContent = '';
    return true;
  }
}

function validatePhone(phoneInput) {
  const phoneRegex = /^\d{10}$/;
  if (!phoneRegex.test(phoneInput.value)) {
    displayErrorMessage(phoneInput, 'Invalid phone number.');
    return false;
  } else {
    const errorMessage = phoneInput.nextElementSibling;
    errorMessage.textContent = '';
    return true;
  }
}

function displayErrorMessage(input, message) {
  const errorMessage = input.nextElementSibling;
  errorMessage.textContent = message;
}