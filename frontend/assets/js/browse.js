// =========================
// GLOBAL STATE
// =========================
// Make allRestaurants available globally for favorites.js
window.allRestaurants = [];

// =========================
// FETCH AND DISPLAY RESTAURANTS
// =========================
async function loadRestaurants() {
  const grid = document.getElementById('restaurantGrid');
  
  grid.innerHTML = '<p class="col-span-full text-center text-gray-500">Loading restaurants...</p>';

  try {
    const response = await fetch('data/restaurants.json');
    if (!response.ok) throw new Error('Network response was not ok');
    window.allRestaurants = await response.json();

    grid.innerHTML = '';

    window.allRestaurants.forEach(r => {
      const card = createRestaurantCard(r);
      grid.appendChild(card);
    });

    setupSearch();
    updateFavoriteCount();

  } catch (error) {
    grid.innerHTML = `
      <p class="col-span-full text-center text-red-500 font-semibold">
        Could not load restaurants. Please try again later.
      </p>`;
    console.error('Fetch error:', error);
  }
}

// =========================
// CREATE RESTAURANT CARD
// =========================
function createRestaurantCard(restaurant) {
  const card = document.createElement('div');
  card.className = 'restaurant-card bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-200 hover:scale-105 hover:shadow-lg';
  card.dataset.name = restaurant.name.toLowerCase();

  const isFav = isFavorite(restaurant.name);
  const heartIcon = isFav ? '❤️' : '🤍';

  card.innerHTML = `
    <img src="${restaurant.image}" alt="${restaurant.name}" class="w-full h-48 object-cover">
    <div class="p-4">
      <div class="flex justify-between items-start mb-2">
        <h3 class="text-xl font-semibold">${restaurant.name}</h3>
        <button class="favorite-btn text-2xl hover:scale-110 transition-transform" 
                data-restaurant="${restaurant.name}"
                aria-label="Toggle favorite">
          ${heartIcon}
        </button>
      </div>
      <p class="text-gray-600 mb-1">${restaurant.cuisine}</p>
      <p class="text-gray-500 text-sm">${restaurant.description}</p>
      <p class="mt-2 font-bold text-yellow-500">⭐ ${restaurant.rating}</p>
    </div>
  `;

  const favoriteBtn = card.querySelector('.favorite-btn');
  favoriteBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isFavorited = toggleFavorite(restaurant.name);
    favoriteBtn.textContent = isFavorited ? '❤️' : '🤍';
    
    showNotification(isFavorited ? 
      `Added ${restaurant.name} to favorites!` : 
      `Removed ${restaurant.name} from favorites`
    );
  });

  return card;
}

// =========================
// NOTIFICATION
// =========================
function showNotification(message) {
  const existing = document.querySelector('.notification');
  if (existing) existing.remove();

  const notification = document.createElement('div');
  notification.className = 'notification fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in';
  notification.textContent = message;
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.classList.add('opacity-0', 'transition-opacity', 'duration-500');
    setTimeout(() => notification.remove(), 500);
  }, 2000);
}

// =========================
// SEARCH FUNCTIONALITY
// =========================
function setupSearch() {
  const searchBar = document.querySelector('#searchBar');
  const restaurantCards = document.querySelectorAll('.restaurant-card');

  searchBar.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    
    restaurantCards.forEach(card => {
      const name = card.dataset.name;
      card.style.display = name.includes(term) ? '' : 'none';
    });
  });
}

// =========================
// INITIALIZE
// =========================
document.addEventListener('DOMContentLoaded', () => {
  displayFavoritesInfo();
  setupFavoritesEventListeners();
  loadRestaurants();
});