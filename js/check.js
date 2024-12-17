document.addEventListener('DOMContentLoaded', () => {
    const checkoutBtn = document.getElementById('checkout-btn');
    const shippingForm = document.getElementById('shipping-form');
    const shippingMessage = document.getElementById('shipping-message');
    const form = document.getElementById('form');
    const modalOverlay = document.getElementById('modal-overlay');
    const closeIcon = document.querySelector('.close-icon'); // اختيار أيقونة الإغلاق

    checkoutBtn.addEventListener('click', () => {
        shippingForm.classList.remove('hidden');
        modalOverlay.classList.remove('hidden');
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        shippingForm.classList.add('hidden');
        modalOverlay.classList.add('hidden');

        shippingMessage.classList.add('show');
        modalOverlay.classList.add('show');
    });

    modalOverlay.addEventListener('click', () => {
        shippingMessage.classList.remove('show');
        modalOverlay.classList.remove('show');
    });

    closeIcon.addEventListener('click', () => {
        shippingMessage.classList.remove('show');
        modalOverlay.classList.remove('show');
    });
});


  