document.addEventListener('DOMContentLoaded', () => { // Wait for the DOM content to be fully loaded
  const cart = [];

  document.querySelectorAll('.add-to-cart').forEach((button, index) => {
      button.addEventListener('click', event => {
          // Get the product details
          const productCard = event.target.closest('.product-card');
          const title = productCard.querySelector('.product-title').textContent;
          const price = parseFloat(productCard.querySelector('.product-price').textContent.replace('$', ''));
          const size = productCard.querySelector(`select[name="size"]`).value;
          const color = productCard.querySelector(`select[name="color"]`).value;
          const quantity = parseInt(productCard.querySelector(`select[name="quantity"]`).value);

          const existingProduct = cart.find(product => 
              product.title === title && product.size === size && product.color === color // Check if the product already exists in the cart
          );

          if (existingProduct) { // Product already exists in the cart
              existingProduct.quantity += quantity;
          } else {
              const product = { title, size, color, price, quantity }; // Create a new product object
              cart.push(product);
          }
          updateCartSummary(); // Update the cart summary
      });
  });

  document.querySelector('.checkout-button').addEventListener('click', () => { // Proceed to checkout
      if (cart.length === 0) {
          alert('Please add at least one product to the cart before proceeding to checkout.');
      } else {
          window.location.href = 'checkout.html';
      }
  });

  function updateCartSummary() { // Update the cart summary
      const cartSummary = document.querySelector('.cart-summary');
      cartSummary.innerHTML = '<h2> <i class="fa-solid fa-cart-shopping"></i> Shopping Cart</h2>'; // Cart title

      cart.forEach((product, index) => {
          const productItem = document.createElement('div');
          productItem.className = 'cart-item';
          productItem.innerHTML = `
              <span>${index + 1}. ${product.title}</span>
              <span>(${product.size}, ${product.color})</span>
              <span>Quantity: ${product.quantity}</span>
              <span>$${(product.price * product.quantity).toFixed(2)}</span>
          `;

          const removeButton = document.createElement('button'); // Remove button
          removeButton.textContent = 'X';
          removeButton.className = 'remove-button';
          removeButton.addEventListener('click', () => {
              cart.splice(index, 1);
              updateCartSummary();
          });

          productItem.appendChild(removeButton);
          cartSummary.appendChild(productItem);
      });

      const hr = document.createElement('hr');
      cartSummary.appendChild(hr);

      const total = cart.reduce((sum, product) => sum + (product.price * product.quantity), 0);// Calculate the total amount
      const shipping = total * 0.05; // Calculate the shipping amount
      const subtotal = total + shipping; // Calculate the subtotal amount

      const totalElement = document.createElement('div');
      totalElement.className = 'total';
      totalElement.innerHTML = `<strong>Total:</strong> <span>$${total.toFixed(2)}</span>`;
      cartSummary.appendChild(totalElement);

      // Save the total, shipping, and subtotal amounts to local storage
      localStorage.setItem('totalAmount', total.toFixed(2));
      localStorage.setItem('shippingAmount', shipping.toFixed(2));
      localStorage.setItem('subtotalAmount', subtotal.toFixed(2));
  }
});


    // check out page
    if (window.location.pathname.endsWith('checkout.html')) {
        const totalAmount = localStorage.getItem('totalAmount');
        const shippingAmount = localStorage.getItem('shippingAmount');
        const subtotalAmount = localStorage.getItem('subtotalAmount');

        if (totalAmount && shippingAmount && subtotalAmount) { // Display the total, shipping, tax, and subtotal amounts
            document.getElementById('total-price').textContent = `$${totalAmount}`;
            document.getElementById('shipping-price').textContent = `$${shippingAmount}`;
            document.getElementById('tax-price').textContent = `$0.00`;
            document.getElementById('subtotal-price').textContent = `$${subtotalAmount}`;
        }
    }


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

// form validations
const personalDetailsForm = document.getElementById('personal-details-form');
const billingDetailsForm = document.getElementById('billing-details-form');
const saveButton = document.querySelector('.save-button');

// save button event listener
saveButton.addEventListener('click', (event) => {
  event.preventDefault(); // Prevent the form from submitting
  validateForms(); // Validate the forms
});

function validateForms() {
  const personalDetailsValid = validatePersonalDetails();
  const billingDetailsValid = validateBillingDetails();

  if (personalDetailsValid && billingDetailsValid) {
    // Forms are valid, display success message
    alert('Details saved successfully!');
    printNameAndAddress(); // Print the name and address

  } else {
    // Forms are not valid, display error messages
    console.log('Forms are not valid!');
  }
}

// Validate the personal details form
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
  // Validate the billing details form
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
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // Email regex
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
  const phoneRegex = /^\d{10}$/; // 10 digits
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

function printNameAndAddress() {
  // Get the values from the personal details form
    const firstName = document.getElementById("first-name").value;
    const lastName = document.getElementById("last-name").value;
    const address = document.getElementById("address").value;
    const city = document.getElementById("city").value;
    const state = document.getElementById("state").value;
    const zip = document.getElementById("zip").value;

    const fullName = `${firstName} ${lastName}`;
    const fullAddress = `${address}, ${city}, ${state}, ${zip}`;

    console.log(`Full Name: ${fullName}`);
    console.log(`Full Address: ${fullAddress}`);

    document.getElementById("saved-name").textContent = ` ${fullName}`; // Display the full name
    document.getElementById("saved-address").textContent = ` ${fullAddress}`;// Display the full address

    document.getElementById("saved-details").style.display = 'block';
}