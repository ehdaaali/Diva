

const cartBtn = document.querySelector('.cart-btn');
const carts = document.querySelector('.carts');
const cartOverlay = document.querySelector('.cart-overlay');
const closeBtn = document.querySelector('.carts-close');

// تأكد من أن السلة والطبقة العلوية غير مرئيين عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    carts.classList.remove('show');
    cartOverlay.classList.remove('show');
});

// أضف حدث عند الضغط على زر السلة
cartBtn.addEventListener('click', () => {
    carts.classList.toggle('show'); 
    cartOverlay.classList.toggle('show'); 
});

// أضف حدث عند الضغط على زر الإغلاق
closeBtn.addEventListener('click', () => {
    carts.classList.remove('show');
    cartOverlay.classList.remove('show');
});

