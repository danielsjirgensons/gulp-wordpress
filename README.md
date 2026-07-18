# WordPress Theme with Gulp Build System

Modern WordPress theme starter with an optimized Gulp 5 build pipeline for static assets.

## Features

- **SCSS to CSS**: Modern Sass compilation with Autoprefixer and minification
- **JavaScript Bundling**: Webpack 5 with Babel transpilation and tree-shaking
- **Image Optimization**: Sharp-based image processing for optimal file sizes
- **SVG Management**: Optimization and sprite generation for SVG icons
- **Modern Asset Loading**: Deferred script loading for better performance
- **Development Mode**: File watching with automatic rebuilds
- **Production Ready**: Optimized builds with source maps and minification

## Requirements

- **Node.js**: `>=18.20.0 <25`
- **npm**: `>=9.0.0`
- **PHP**: `>=8.0`
- **WordPress**: `>=6.0`

## Installation

```bash
npm install
```

This will install dependencies and run an initial production build.

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start development mode with file watching |
| `npm run dev` | Same as start |
| `npm run watch` | Same as start |
| `npm run build` | Production build for all asset groups |
| `npm run clean` | Remove all generated assets |
| `npm test` | Run tests (not configured yet) |

## Build Tasks

### Main Task Groups

- **default** (`npm start`): Development watch mode for all asset types
- **build** (`npm run build`): Production build with optimizations
- **clean** (`npm run clean`): Remove all built assets

### Individual Asset Tasks

Each asset type has its own tasks:

```bash
gulp fonts:dev       # Build fonts (development)
gulp fonts:prod      # Build fonts (production)
gulp fonts:watch     # Watch fonts for changes

gulp scripts:dev     # Build JavaScript (development)
gulp scripts:prod    # Build JavaScript (production)
gulp scripts:watch   # Watch JavaScript for changes

gulp styles:dev      # Build CSS (development)
gulp styles:prod     # Build CSS (production)
gulp styles:watch    # Watch CSS for changes

gulp images:dev      # Optimize images (development)
gulp images:prod     # Optimize images (production)

gulp svg:dev         # Optimize SVGs
gulp sprite:dev      # Generate SVG sprites
```

## Project Structure

```
├── src/                   # Source files
│   ├── js/               # JavaScript source
│   │   ├── main.js      # Main entry point
│   │   └── _*.js        # Modules (underscore prefix)
│   ├── scss/            # Sass stylesheets
│   │   ├── main.scss    # Main stylesheet
│   │   ├── global/      # Global styles
│   │   ├── components/  # Component styles
│   │   └── partials/    # Partial styles
│   ├── images/          # Source images
│   ├── fonts/           # Font files
│   └── svg/             # SVG files and sprites
│
├── assets/              # Built assets (generated)
│   ├── css/            # Compiled CSS
│   ├── js/             # Bundled JavaScript
│   ├── images/         # Optimized images
│   ├── fonts/          # Processed fonts
│   └── svg/            # Optimized SVGs
│
├── app/                # PHP application logic
│   ├── Classes/        # PHP classes
│   ├── autoload.php    # Class autoloader
│   └── helpers.php     # Helper functions
│
├── templates/          # Page templates
├── partials/           # Reusable PHP partials
└── gulp/               # Build configuration
    └── core/
        ├── config/     # Task configurations
        ├── recipes/    # Task implementations
        └── utils/      # Build utilities
```

## Asset Enqueuing

Assets are automatically enqueued in WordPress with proper versioning:

**Development**: Uses theme version with `-dev` suffix (e.g., `1.0.0-dev`)  
**Production**: Uses theme version from [style.css](style.css)

Scripts are loaded with the `defer` strategy for optimal performance.

## Development Workflow

1. Start the development server:
   ```bash
   npm start
   ```

2. Edit files in `src/`:
   - JavaScript: `src/js/`
   - Styles: `src/scss/`
   - Images: `src/images/`

3. Built assets automatically update in `assets/`

4. (Optional) Enable BrowserSync in [gulpfile.js](gulpfile.js) for live reload

## Production Build

Create optimized production assets:

```bash
npm run build
```

This will:
- Minify CSS and remove comments
- Bundle and minify JavaScript
- Remove console statements from JS
- Optimize images with Sharp
- Generate compressed SVG sprites
- Disable source maps

## Browser Support

Configured via `browserslist` in [package.json](package.json):
- Modern browsers (> 0.5% market share)
- Last 2 versions
- Firefox ESR
- Excludes IE11 and Opera Mini

## Code Quality

- **ESLint**: JavaScript linting with modern ES2022+ rules
- **Babel**: Transpilation for browser compatibility
- **Tree Shaking**: Automatic removal of unused code
- **Source Maps**: Development debugging support

## WordPress Integration

The theme uses modern WordPress practices:
- Environment-aware configuration (`wp_get_environment_type()`)
- Proper asset versioning and caching
- Deferred script loading
- Clean HTML5 output
- Optimized enqueue strategy

## Customization

### Webpack Configuration
Edit [gulp/core/config/scripts.js](gulp/core/config/scripts.js) for:
- Babel presets and plugins
- Webpack optimization settings
- Code splitting (currently disabled)
- Source map configuration

### Sass Configuration  
Edit [gulp/core/config/styles.js](gulp/core/config/styles.js) for:
- Output style (expanded/compressed)
- Autoprefixer settings
- Minification options
- Include paths

## Troubleshooting

### Build fails after npm install
```bash
npm run clean
npm run build
```

### Assets not loading
Check that paths in [app/Classes/Theme.php](app/Classes/Theme.php) match your asset structure.

### Watch mode not detecting changes
Restart the watch task:
```bash
npm start
```

## Performance Tips

1. Use image optimization in `src/images/` before building
2. Enable Gzip/Brotli compression on your server
3. Consider using a CDN for static assets
4. Enable BrowserSync only in local development
5. Keep JavaScript bundles under 500KB

## Future Enhancements

- [ ] Critical CSS extraction strategy
- [ ] Optional BrowserSync configuration
- [ ] CI/CD workflow integration
- [ ] Automated testing setup
- [ ] PHP asset enqueue documentation
- [ ] Component library documentation

## License

MIT

## Author

Daniels Jirgensons  
[https://danielsjirgensons.github.io](https://danielsjirgensons.github.io)
