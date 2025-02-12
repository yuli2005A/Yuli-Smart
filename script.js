document.addEventListener("DOMContentLoaded", () => {
    const cart = [];
    const cartSection = document.querySelector(".cart-section");
    const cartList = document.createElement("div");
    cartList.classList.add("cart");
    cartList.innerHTML = `
        <h2>Carrito de Compras</h2>
        <div id="cart-items"></div>
        <div class="cart-total">Total: $0.00</div>
    `;
    cartSection.appendChild(cartList);

    const updateCartUI = () => {
        const cartItemsContainer = document.getElementById("cart-items");
        const cartTotalElement = cartList.querySelector(".cart-total");
        
        cartItemsContainer.innerHTML = "";

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = `<p>El carrito está vacío.</p>`;
            cartTotalElement.textContent = "Total: $0.00";
            return;
        }

        let total = 0;
        cart.forEach(item => {
            const cartItem = document.createElement("div");
            cartItem.classList.add("cart-item");
            cartItem.innerHTML = `
                <span>${item.name}</span>
                <span>$${item.price.toFixed(2)}</span>
            `;
            cartItemsContainer.appendChild(cartItem);
            total += item.price;
        });

        cartTotalElement.textContent = `Total: $${total.toFixed(2)}`;
    };

    const addToCart = (productName, productPrice) => {
        cart.push({ name: productName, price: productPrice });
        updateCartUI();
    };

    // Add event listeners to product buttons
    document.querySelectorAll(".product-card button").forEach(button => {
        button.addEventListener("click", () => {
            const productCard = button.closest(".product-card");
            const productName = productCard.querySelector("h3").textContent;
            const productPrice = parseFloat(productCard.getAttribute("data-price"));

            addToCart(productName, productPrice);
        });
    });

    // Smooth scroll for navigation
    document.querySelectorAll(".nav a").forEach(anchor => {
        anchor.addEventListener("click", function(e) {
            e.preventDefault();

            const targetId = this.getAttribute("href").substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - document.querySelector(".header").offsetHeight,
                    behavior: "smooth"
                });
            }
        });
    });

    // Product card hover effect
    document.querySelectorAll(".product-card").forEach(card => {
        card.addEventListener("mouseenter", () => {
            card.style.boxShadow = "0 6px 20px rgba(0, 0, 0, 0.2)";
        });

        card.addEventListener("mouseleave", () => {
            card.style.boxShadow = "none";
        });
    });

    // Comments functionality
    const commentForm = document.getElementById("comment-form");
    const commentsList = document.getElementById("comments-list");

    commentForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const textarea = commentForm.querySelector("textarea");
        const commentText = textarea.value.trim();

        if (commentText) {
            const comment = document.createElement("div");
            comment.classList.add("comment");
            comment.textContent = commentText;

            commentsList.appendChild(comment);
            textarea.value = "";
        }
    });
});
