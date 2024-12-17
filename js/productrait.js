
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import {
  getFirestore,
  addDoc,
  getDoc,
  updateDoc,
  collection,
  onSnapshot,
  deleteDoc,
  doc
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js"
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-storage.js";

// import { getFirestore } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-storage.js"

const firebaseConfig = {
    apiKey: "AIzaSyB62d8FtJeTUfcbFCs0HhzLMgf32CD82yk",
    authDomain: "diva-cd2d3.firebaseapp.com",
    projectId: "diva-cd2d3",
    storageBucket: "diva-cd2d3.appspot.com",
    messagingSenderId: "752108842622",
    appId: "1:752108842622:web:1fa4612b85904fcd1e722f",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const firestore = getFirestore(app);

// Initialize Srorage
const storage = getStorage(app);


let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
// دالة لحساب عدد المنتجات في السلة



// استرجاع المنتجات من Firestore
onSnapshot(collection(firestore, 'Product'), function (snapshot) {
    var products = [];
    for (const doc of snapshot.docs) {
        products.push({ id: doc.id, ...doc.data() });
    }
    displayProducts(cartItems); // عرض المنتجات الموجودة في cart
}, function (error) {
    console.error("Error fetching products:", error); 
});

// دالة لعرض المنتجات الموجودة في السلة فقط
function displayProducts(products) {
    const productDetailContainer = document.getElementById('carts');
    productDetailContainer.innerHTML = ''; // تفريغ  السابق

    if (products.length === 0) {
        productDetailContainer.innerHTML = '<p class="carts-empty">No Product In Cart</p>'; 
        document.getElementById('total-price').textContent = '$0.00'; 
        updateCartCount(); 
        return;
    }

    products.forEach(product => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('carts-item');
        cartItem.innerHTML = `
            <img src="${product.ImageURL}" alt="${product.Title}">
            <div class="carts-item-detail">
                <h3>${product.Title}</h3>
                <h5>$ ${product.Price}</h5>
                <div class="carts-item-amount">
                    <i class="ri-subtract-line ricon decrease-qty"></i>
                    <span class="qty">${product.qty}</span>
                    <i class="ri-add-line ricon increase-qty"></i>
                    <span class="carts-item-price">$${(product.Price * product.qty).toFixed(2)}</span>
                    <button class="remove-item"><i class="ri-file-excel-2-line"></i></button> 
                </div>
            </div>
        `;

        productDetailContainer.appendChild(cartItem);

        const qtySpan = cartItem.querySelector('.qty');
        const priceSpan = cartItem.querySelector('.carts-item-price');
        let qty = product.qty;

        // زيادة الكمية
        cartItem.querySelector('.increase-qty').addEventListener('click', () => {
            qty++;
            qtySpan.textContent = qty;
            priceSpan.textContent = `$${(product.Price * qty).toFixed(2)}`;
            product.qty = qty; // تحديث الكمية في السلة
            updateLocalStorage(); // تحديث Local Storage
            updateTotalPrice(); // تحديث السعر الكلي
        });

        // تقليل الكمية
        cartItem.querySelector('.decrease-qty').addEventListener('click', () => {
            if (qty > 1) {
                qty--;
                qtySpan.textContent = qty;
                priceSpan.textContent = `$${(product.Price * qty).toFixed(2)}`;
                product.qty = qty; // تحديث الكمية في السلة
                updateLocalStorage(); // تحديث Local Storage
                updateTotalPrice(); // تحديث السعر الكلي
            }
        });

        // إزالة المنتج من السلة
        cartItem.querySelector('.remove-item').addEventListener('click', () => {
            removeFromCart(product.id); // استدعاء الدالة لإزالة المنتج
        });
    });

    updateTotalPrice(); // تحديث السعر الكلي عند عرض المنتجات
}

// دالة لإضافة منتج إلى السلة
function addToCart(product) {
    const existingItem = cartItems.find(item => item.id === product.id);
    if (existingItem) {
        existingItem.qty++; // زيادة الكمية إذا كان المنتج موجودًا بالفعل
    } else {
        cartItems.push({ ...product, qty: 1 }); // إضافة المنتج إلى السلة مع كمية 1
    }
    
    updateLocalStorage(); // تحديث Local Storage
    displayProducts(cartItems); // تحديث سلة التسوق لعرض المنتجات الموجودة
    updateCartCount()
}

// دالة لإزالة منتج من السلة
function removeFromCart(productId) {
    cartItems = cartItems.filter(item => item.id !== productId); // إزالة المنتج بناءً على معرّفه
    updateLocalStorage(); // تحديث Local Storage
    displayProducts(cartItems); // تحديث عرض السلة
    updateCartCount()
}

// دالة لإزالة جميع المنتجات من السلة
function clearCart() {
    cartItems = []; // تفريغ السلة
    updateLocalStorage(); // تحديث Local Storage
    displayProducts(cartItems); // تحديث عرض السلة
    updateCartCount()
}

// دالة لتحديث Local Storage
function updateLocalStorage() {
    localStorage.setItem('cartItems', JSON.stringify(cartItems)); // حفظ السلة في Local Storage
}

// دالة لحساب السعر الإجمالي لكل المنتجات في السلة
function updateTotalPrice() {
    const totalPrice = cartItems.reduce((acc, product) => acc + (product.Price * product.qty), 0);
    document.getElementById('total-price').textContent = `$${totalPrice.toFixed(2)}`; // تحديث السعر الكلي
}

// استرجاع معرّف المنتج من عنوان URL (اختياري، إذا كنت تريد عرض منتج معين)
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

if (productId) {
    // استرجاع المنتج باستخدام المعرّف
    const productRef = doc(firestore, 'Product', productId);
    
    getDoc(productRef).then((doc) => {
        if (doc.exists()) {
            const product = { id: doc.id, ...doc.data() };
            addToCart(product); // إضافة المنتج المحدد إلى السلة
        } else {
            console.error('No such document!');
        }
    }).catch((error) => {
        console.error('Error getting document:', error);
    });
}

// استرجاع السلة من Local Storage عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    displayProducts(cartItems); // عرض المنتجات الموجودة في السلة
});
function updateCartCount() {
    const totalCount = cartItems.reduce((acc, product) => acc + product.qty, 0);
    document.getElementById('total-product').textContent = totalCount.toString().padStart(1, '0'); // تحديث عدد المنتجات
}

// استمع لحدث النقر على أزرار "Add to Cart"
document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault(); // منع السلوك الافتراضي (إذا كان عنصرًا داخل رابط <a>)
            
            const productId = button.getAttribute('data-id');
            
            // استرجاع المنتج بناءً على معرفه من Firestore
            const productRef = doc(firestore, 'Product', productId);
            
            getDoc(productRef).then((doc) => {
                if (doc.exists()) {
                    const product = { id: doc.id, ...doc.data() };
                    
                    // استدعاء دالة لإضافة المنتج إلى السلة
                    addToCart(product);

                    // يمكنك هنا فتح السلة (تغيير العرض أو فتح نافذة السلة)
                    document.getElementById('cart').classList.add('open');
                } else {
                    console.error('No such document!');
                }
            }).catch((error) => {
                console.error('Error getting document:', error);
            });
        });
    });
});

// إضافة زر لمسح جميع المنتجات من السلة في HTML
document.getElementById('clear-cart').addEventListener('click', clearCart);

