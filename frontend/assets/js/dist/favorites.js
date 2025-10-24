"use strict";
const STORAGE_KEY = 'favoriteRestaurants';
function getFavorites() {
    const favorites = localStorage.getItem(STORAGE_KEY);
    return favorites ? JSON.parse(favorites) : [];
}
function saveFavorites(favorites) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
}
function toggleFavorite(restaurantName) {
    const favorites = getFavorites();
    const index = favorites.indexOf(restaurantName);
    if (index > -1) {
        favorites.splice(index, 1);
    }
    else {
        favorites.push(restaurantName);
    }
    saveFavorites(favorites);
    updateFavoriteCount();
    return favorites.includes(restaurantName);
}
function isFavorite(restaurantName) {
    return getFavorites().includes(restaurantName);
}
function updateFavoriteCount() {
    const count = getFavorites().length;
    const countElement = document.getElementById('favCount');
    if (countElement) {
        countElement.textContent = count.toString();
    }
}
function updateAllFavoriteButtons() {
    const buttons = document.querySelectorAll('.favorite-btn');
    buttons.forEach((btn) => {
        const restaurantName = btn.dataset.restaurant;
        if (restaurantName) {
            btn.textContent = isFavorite(restaurantName) ? '❤️' : '🤍';
        }
    });
}
function showFavoritesModal(allRestaurants) {
    const modal = document.getElementById('favoritesModal');
    const content = document.getElementById('favoritesContent');
    if (!modal || !content)
        return;
    const favorites = getFavorites();
    if (favorites.length === 0) {
        content.innerHTML = `
      <div class="text-center py-8">
        <p class="text-gray-500 text-lg mb-2">No favorites yet!</p>
        <p class="text-gray-400">Click the heart icon on any restaurant to add it to your favorites.</p>
      </div>
    `;
    }
    else {
        content.innerHTML = '';
        favorites.forEach((favName) => {
            const restaurant = allRestaurants.find((r) => r.name === favName);
            if (restaurant) {
                const favCard = document.createElement('div');
                favCard.className = 'flex items-center gap-4 bg-gray-50 rounded-lg p-4 mb-3 hover:bg-gray-100 transition-colors';
                favCard.innerHTML = `
          <img src="${restaurant.image}" alt="${restaurant.name}" class="w-24 h-24 object-cover rounded-lg">
          <div class="flex-1">
            <h3 class="text-lg font-semibold">${restaurant.name}</h3>
            <p class="text-gray-600 text-sm">${restaurant.cuisine}</p>
            <p class="text-yellow-500 font-bold">⭐ ${restaurant.rating}</p>
          </div>
          <button class="remove-fav text-red-500 hover:text-red-700 text-2xl" data-restaurant="${restaurant.name}">
            ✕
          </button>
        `;
                const removeBtn = favCard.querySelector('.remove-fav');
                if (removeBtn) {
                    removeBtn.addEventListener('click', () => {
                        toggleFavorite(restaurant.name);
                        showFavoritesModal(allRestaurants);
                        updateAllFavoriteButtons();
                        if (typeof showNotification === 'function') {
                            showNotification(`Removed ${restaurant.name} from favorites`);
                        }
                    });
                }
                content.appendChild(favCard);
            }
        });
    }
    modal.classList.remove('hidden');
}
function closeFavoritesModal() {
    const modal = document.getElementById('favoritesModal');
    if (modal) {
        modal.classList.add('hidden');
    }
}
function displayFavoritesInfo() {
    const favorites = getFavorites();
    if (favorites.length > 0) {
        console.log(`✨ You have ${favorites.length} favorite restaurant(s):`, favorites);
    }
    else {
        console.log('💡 No favorites yet. Click the heart icon on restaurants to save them!');
    }
}
function setupFavoritesEventListeners() {
    const showFavBtn = document.getElementById('showFavoritesBtn');
    const closeModalBtn = document.getElementById('closeModal');
    const modal = document.getElementById('favoritesModal');
    if (showFavBtn) {
        showFavBtn.addEventListener('click', () => {
            const restaurants = window.allRestaurants || [];
            showFavoritesModal(restaurants);
        });
    }
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeFavoritesModal);
    }
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeFavoritesModal();
            }
        });
    }
}

