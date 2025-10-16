// =========================
// TYPE DEFINITIONS
// =========================

/**
 * Restaurant data structure
 */
interface Restaurant {
  name: string;
  cuisine: string;
  rating: number;
  image: string;
  description: string;
}

/**
 * Storage key constant for localStorage
 */
const STORAGE_KEY: string = 'favoriteRestaurants';

// =========================
// FAVORITES MODULE
// =========================

/**
 * Get favorites from localStorage
 * @returns Array of favorite restaurant names
 */
function getFavorites(): string[] {
  const favorites: string | null = localStorage.getItem(STORAGE_KEY);
  return favorites ? JSON.parse(favorites) : [];
}

/**
 * Save favorites to localStorage
 * @param favorites - Array of restaurant names to save
 */
function saveFavorites(favorites: string[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
}

/**
 * Toggle a restaurant's favorite status
 * @param restaurantName - Name of the restaurant to toggle
 * @returns true if restaurant is now favorited, false otherwise
 */
function toggleFavorite(restaurantName: string): boolean {
  const favorites: string[] = getFavorites();
  const index: number = favorites.indexOf(restaurantName);
  
  if (index > -1) {
    favorites.splice(index, 1);
  } else {
    favorites.push(restaurantName);
  }
  
  saveFavorites(favorites);
  updateFavoriteCount();
  return favorites.includes(restaurantName);
}

/**
 * Check if a restaurant is favorited
 * @param restaurantName - Name of the restaurant to check
 * @returns true if restaurant is favorited
 */
function isFavorite(restaurantName: string): boolean {
  return getFavorites().includes(restaurantName);
}

/**
 * Update the favorite count badge in the UI
 */
function updateFavoriteCount(): void {
  const count: number = getFavorites().length;
  const countElement: HTMLElement | null = document.getElementById('favCount');
  
  if (countElement) {
    countElement.textContent = count.toString();
  }
}

/**
 * Update all heart buttons on the page to reflect current favorite status
 */
function updateAllFavoriteButtons(): void {
  const buttons: NodeListOf<HTMLButtonElement> = document.querySelectorAll('.favorite-btn');
  
  buttons.forEach((btn: HTMLButtonElement) => {
    const restaurantName: string | undefined = btn.dataset.restaurant;
    if (restaurantName) {
      btn.textContent = isFavorite(restaurantName) ? '❤️' : '🤍';
    }
  });
}

/**
 * Display favorites modal with all favorited restaurants
 * @param allRestaurants - Array of all available restaurants
 */
function showFavoritesModal(allRestaurants: Restaurant[]): void {
  const modal: HTMLElement | null = document.getElementById('favoritesModal');
  const content: HTMLElement | null = document.getElementById('favoritesContent');
  
  if (!modal || !content) return;
  
  const favorites: string[] = getFavorites();

  if (favorites.length === 0) {
    content.innerHTML = `
      <div class="text-center py-8">
        <p class="text-gray-500 text-lg mb-2">No favorites yet!</p>
        <p class="text-gray-400">Click the heart icon on any restaurant to add it to your favorites.</p>
      </div>
    `;
  } else {
    content.innerHTML = '';
    
    favorites.forEach((favName: string) => {
      const restaurant: Restaurant | undefined = allRestaurants.find(
        (r: Restaurant) => r.name === favName
      );
      
      if (restaurant) {
        const favCard: HTMLDivElement = document.createElement('div');
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
        
        const removeBtn: HTMLButtonElement | null = favCard.querySelector('.remove-fav');
        
        if (removeBtn) {
          removeBtn.addEventListener('click', (): void => {
            toggleFavorite(restaurant.name);
            showFavoritesModal(allRestaurants);
            updateAllFavoriteButtons();
            
            // Call showNotification if it exists (from browse.js)
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

/**
 * Close the favorites modal
 */
function closeFavoritesModal(): void {
  const modal: HTMLElement | null = document.getElementById('favoritesModal');
  if (modal) {
    modal.classList.add('hidden');
  }
}

/**
 * Display favorites info in console (for debugging)
 */
function displayFavoritesInfo(): void {
  const favorites: string[] = getFavorites();
  
  if (favorites.length > 0) {
    console.log(`✨ You have ${favorites.length} favorite restaurant(s):`, favorites);
  } else {
    console.log('💡 No favorites yet. Click the heart icon on restaurants to save them!');
  }
}

/**
 * Setup event listeners for favorites modal
 */
function setupFavoritesEventListeners(): void {
  const showFavBtn: HTMLElement | null = document.getElementById('showFavoritesBtn');
  const closeModalBtn: HTMLElement | null = document.getElementById('closeModal');
  const modal: HTMLElement | null = document.getElementById('favoritesModal');

  if (showFavBtn) {
    showFavBtn.addEventListener('click', (): void => {
      // Get allRestaurants from window (set by browse.js)
      const restaurants: Restaurant[] = (window as any).allRestaurants || [];
      showFavoritesModal(restaurants);
    });
  }

  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeFavoritesModal);
  }
  
  if (modal) {
    modal.addEventListener('click', (e: MouseEvent): void => {
      if (e.target === modal) {
        closeFavoritesModal();
      }
    });
  }
}

// Declare showNotification as it comes from browse.js
declare function showNotification(message: string): void;