# Choose Your Own Adventure Game

A beautiful, mobile-friendly "choose your own adventure" game engine with value tracking and Google Sheets data collection.

![Game Preview](https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=600&q=80)

## Features

- 📱 **Mobile-first responsive design** - Looks great on any device
- 🎨 **Beautiful dark theme** with elegant gold accents
- 🎮 **Easy content editing** - Modify the adventure by editing `js/app.js`
- 📊 **Value tracking** - Each choice can add values to multiple categories
- 📈 **Google Sheets integration** - Collect response data automatically
- ⚡ **No build required** - Pure HTML, CSS, and JavaScript

## Quick Start

### 1. Local Development

Simply open `index.html` in a browser, or use a local server:

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (npx)
npx serve .

# Using PHP
php -S localhost:8000
```

Then open `http://localhost:8000` in your browser.

### 2. Deploy to GitHub Pages

1. Create a new GitHub repository
2. Push this code to the repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git push -u origin main
   ```
3. Go to your repository Settings → Pages
4. Under "Source", select "Deploy from a branch"
5. Select `main` branch and `/ (root)` folder
6. Click Save

Your game will be available at: `https://YOUR_USERNAME.github.io/YOUR_REPO/`

## Customizing Your Adventure

### Editing the Adventure Content

Open `js/app.js` and find the `ADVENTURE_DATA` object. This contains all your game content:

#### Value Categories

Define what you're tracking:

```javascript
valueCategories: [
    { id: 'risk', label: 'Risk Tolerance' },
    { id: 'growth', label: 'Growth Focus' },
    // Add more categories as needed
]
```

#### Scenes

Each scene has:
- `id` - Unique identifier
- `image` - URL to the scene image
- `text` - The story text shown to the player
- `choices` - Array of choices

```javascript
scenes: {
    myScene: {
        id: 'myScene',
        image: 'https://example.com/image.jpg',
        text: 'You find yourself at a crossroads...',
        choices: [
            {
                text: 'Go left',
                values: { risk: 1, growth: 2 },
                nextScene: 'leftPath'
            },
            {
                text: 'Go right',
                values: { risk: 2, growth: 1 },
                nextScene: 'rightPath'
            }
        ]
    }
}
```

#### Results

Define outcomes based on accumulated values:

```javascript
results: [
    {
        id: 'adventurer',
        title: 'The Bold Adventurer',
        description: 'You embrace risk...',
        image: 'https://example.com/result.jpg',
        condition: (values) => values.risk >= 5
    },
    // Last result should be the default fallback
    {
        id: 'balanced',
        title: 'The Balanced One',
        condition: (values) => true  // Always matches
    }
]
```

### Changing the Theme

Edit `css/style.css` and modify the CSS variables at the top:

```css
:root {
    --color-bg: #0d0d12;
    --color-primary: #c9a227;
    --font-display: 'Crimson Pro', serif;
    /* ... more variables */
}
```

## Google Sheets Integration

### Setup Steps

1. **Create a Google Sheet**
   - Go to [Google Sheets](https://sheets.google.com) and create a new spreadsheet
   - Name it something like "Adventure Game Responses"

2. **Open Apps Script**
   - Go to Extensions → Apps Script
   - Delete any existing code

3. **Copy the Script**
   - Open `google-apps-script.js` from this project
   - Copy all the code and paste it into the Apps Script editor
   - Save the project (Ctrl+S / Cmd+S)

4. **Deploy as Web App**
   - Click "Deploy" → "New deployment"
   - Click the gear icon and select "Web app"
   - Set **Execute as**: "Me"
   - Set **Who has access**: "Anyone"
   - Click "Deploy"
   - Authorize when prompted (click through any warnings about unverified app)

5. **Copy the Web App URL**
   - After deployment, you'll see a Web App URL
   - It looks like: `https://script.google.com/macros/s/ABC123.../exec`
   - Copy this URL

6. **Configure Your Game**
   - Open `js/app.js`
   - Find the `CONFIG` object at the top
   - Paste your URL:
   ```javascript
   const CONFIG = {
       GOOGLE_SCRIPT_URL: 'https://script.google.com/macros/s/YOUR_URL_HERE/exec',
       ENABLE_TRACKING: true,
       DEBUG: true
   };
   ```

### Data Collected

The spreadsheet will automatically receive:
| Column | Description |
|--------|-------------|
| Timestamp | When the data was received |
| Session ID | Unique ID for each game session |
| Start Time | When the player started |
| End Time | When they finished |
| Result | Which result profile they got |
| Risk/Growth/etc. | Value scores for each category |
| Choices Path | The path they took through the game |
| User Agent | Browser/device information |

### Testing the Integration

1. Set `DEBUG: true` in the CONFIG
2. Open your browser's Developer Tools (F12) → Console
3. Play through the game
4. Check the console for "Submitting to Google Sheets" messages
5. Check your Google Sheet for new rows

## File Structure

```
financial_survey/
├── index.html              # Main HTML file
├── css/
│   └── style.css           # All styles
├── js/
│   └── app.js              # Game logic and adventure data
├── google-apps-script.js   # Script for Google Sheets (copy to Apps Script)
└── README.md               # This file
```

## Tips for Creating Great Adventures

1. **Keep text concise** - Mobile screens are small
2. **Use high-quality images** - They set the mood (Unsplash is great for free images)
3. **Balance your choices** - Not all paths should lead to the same result
4. **Test on mobile** - Use Chrome DevTools device mode
5. **Keep value ranges sensible** - Values of 1-3 per choice work well

## Browser Support

- Chrome (recommended)
- Safari
- Firefox
- Edge

## License

MIT License - Feel free to use and modify!

