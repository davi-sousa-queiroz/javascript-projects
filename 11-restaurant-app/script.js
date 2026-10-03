const foodCards = document.querySelectorAll(".food-card");
const addToOrderButtons = document.querySelectorAll(".add-button");
const categoryLinks = document.querySelectorAll(".category-link");
const cartLink = document.querySelector(".header-cart");
const cartCountLabels = document.querySelectorAll(".cart-count");
const cartPanel = document.querySelector(".cart-panel");
const cartEmptyState = document.querySelector(".cart-empty");
const cartSummary = document.querySelector(".cart-summary");
const totalElement = document.querySelector(".cart-summary .total-row strong");
const checkoutButton = document.querySelector(".checkout-button");

const data = [

    sundayMargarita = {
        price: 16
    },

    marketGardenBowl = {
        price: 14
    },

    rosemaryFries = {
        price: 7
    },

    gardenLemonade = {
        price: 5
    }
    
]