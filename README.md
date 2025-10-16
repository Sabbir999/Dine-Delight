# Dine Delight

Dine Delight is a web application designed to enhance your dining experience by helping users discover, review, and share their favorite restaurants.


## ✨ Features

- **Restaurant Browsing** - View a curated list of restaurants with images, ratings, and descriptions
- **Real-time Search** - Filter restaurants by name as you type
- **Favorites System** - Save your favorite restaurants with localStorage persistence
- **TypeScript Integration** - Type-safe favorites module with full type annotations
- **Responsive Design** - Mobile-friendly layout using Tailwind CSS
- **Interactive UI** - Smooth animations, hover effects, and notifications
- **Favorites Modal** - View and manage all your saved favorites in one place

## 🚀 Tech Stack

- **HTML5** - Semantic markup
- **CSS3** - Custom animations with Tailwind CSS
- **JavaScript (ES6+)** - Modern async/await, DOM manipulation
- **TypeScript** - Type-safe favorites module
- **localStorage** - Client-side data persistence
- **Tailwind CSS** - Utility-first CSS framework

## 📁 Project Structure

```
DINE-DELIGHT/
├── frontend/
│   ├── assets/
│   │   ├── css/
│   │   ├── images/
│   │   │   ├── restaurant1.jpg
│   │   │   ├── restaurant2.jpg
│   │   │   └── restaurant3.jpg
│   │   └── js/
│   │       ├── src/
│   │       │   └── favorites.ts      # TypeScript source
│   │       ├── dist/
│   │       │   ├── favorites.js      # Compiled output
│   │       │   └── favorites.js.map  # Source map
│   │       └── browse.js             # Main JavaScript
│   ├── data/
│   │   └── restaurants.json          # Restaurant data
│   ├── Browse.html
│   ├── index.html
│   ├── about.html
│   └── Contact.html
├── backend/                           # (Future API integration)
├── node_modules/
├── package.json
├── package-lock.json
├── tsconfig.json                      # TypeScript config
└── README.md
```

## 🛠️ Setup & Installation

### Prerequisites

- Node.js (v14 or higher)
- npm (comes with Node.js)
- A local development server (e.g., Live Server for VS Code)

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/dine-delight.git
   cd dine-delight
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Compile TypeScript**
   ```bash
   npm run build
   ```

4. **Start development server**
   - Using VS Code: Right-click `Browse.html` → "Open with Live Server"
   - Or use any local server that serves static files

## 📜 Available Scripts

```bash
# Compile TypeScript once
npm run build

# Watch mode - auto-compiles on file changes
npm run watch
```

## 🎯 Usage

### Browsing Restaurants

1. Open `Browse.html` in your browser
2. View the list of available restaurants
3. Use the search bar to filter by restaurant name

### Managing Favorites

1. Click the **heart icon (🤍)** on any restaurant card to add it to favorites
2. The heart will turn red (**❤️**) when favorited
3. Click the **"My Favorites"** button in the header to view all saved restaurants
4. Remove favorites by clicking the **✕** button in the modal
5. Your favorites persist across page reloads using localStorage

### Search Functionality

1. Type in the search bar at the top of the page
2. Results filter in real-time as you type
3. Search is case-insensitive

## 🔧 Configuration

### TypeScript Configuration (`tsconfig.json`)

```json
{
  "compilerOptions": {
    "target": "ES6",
    "outDir": "./frontend/assets/js/dist",
    "rootDir": "./frontend/assets/js/src",
    "strict": true,
    "sourceMap": true
  }
}
```

### Restaurant Data Format (`restaurants.json`)

```json
[
  {
    "name": "Restaurant Name",
    "cuisine": "Cuisine Type",
    "rating": 4.5,
    "image": "assets/images/restaurant.jpg",
    "description": "Brief description"
  }
]
```

## 🧩 Key Components

### TypeScript Module: `favorites.ts`

**Type-safe favorites management with:**
- `Restaurant` interface for type checking
- localStorage wrapper functions
- Modal display logic
- Event listener setup

**Key Functions:**
- `getFavorites(): string[]` - Retrieve saved favorites
- `toggleFavorite(name: string): boolean` - Add/remove favorite
- `isFavorite(name: string): boolean` - Check favorite status
- `showFavoritesModal(restaurants: Restaurant[]): void` - Display modal

### JavaScript Module: `browse.js`

**Restaurant browsing functionality:**
- Async fetch from JSON
- Dynamic card creation
- Real-time search filtering
- Notification system

## 🎨 Features in Detail

### localStorage Persistence

Favorites are stored in localStorage under the key `favoriteRestaurants`:
```javascript
["The Spice Garden", "Olive Garden"]
```

Data persists across:
- Page reloads
- Browser sessions
- Tab closures

### Type Safety

TypeScript provides compile-time type checking:
```typescript
interface Restaurant {
  name: string;
  cuisine: string;
  rating: number;
  image: string;
  description: string;
}
```

## 🐛 Troubleshooting

### CORS Error when fetching JSON

**Problem:** `Failed to fetch` error in console

**Solution:** Use a local development server (Live Server, http-server, etc.) instead of opening HTML files directly with `file://`

### TypeScript not compiling

**Problem:** `tsc` command not found

**Solution:**
```bash
npm install
npm run build
```

### Favorites not persisting

**Problem:** Favorites disappear on page reload

**Solution:** Check that:
1. You're using a proper http server (not `file://`)
2. Browser localStorage is enabled
3. Not in incognito/private mode

## 🚀 Future Enhancements

- [ ] User authentication
- [ ] Backend API integration
- [ ] Restaurant reviews and comments
- [ ] Advanced filtering (by cuisine, rating, price)
- [ ] Map integration
- [ ] Online ordering system
- [ ] Admin dashboard for restaurant management

## 📝 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Your Name**
- GitHub: 
- Email: 

## 🙏 Acknowledgments

- Tailwind CSS for styling framework
- TypeScript for type safety
- Live Server for development

---

**Built with ❤️ by [Saifur Sabbir]**