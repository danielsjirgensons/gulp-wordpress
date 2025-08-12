// utils
const deepMerge = require('../utils/deepMerge');

// config
const assets = require('./common').paths.assets;

/**
 * Style Building
 * Configuration
 * Object
 *
 * @type {{}}
 */
module.exports = deepMerge({
    paths: {
        watch: [
            assets.src + '/scss/**/*.scss',
            '!' + assets.src + '/scss/**/*_tmp\\d+.scss'
        ],
        src: [
            assets.src + '/scss/**/*.scss',
            '!' + assets.src + '/scss/**/_*'
        ],
        dest: assets.dest + '/css',
        clean: assets.dest + '/css/**/*.{css,map}'
    },

    options: {
        sass: {
            implementation: require('sass'), // Use dart-sass for performance
            precision: 5, // Ensures accurate decimal calculations
            includePaths: ['node_modules', assets.src + '/scss'], // Allow SCSS imports from both npm and project
            cache: true // Enable caching for faster builds
        },
        autoprefixer: {
            overrideBrowserslist: [
                'last 2 versions',
                '> 1%',
                'not dead'
            ]
        },
        minify: {
            preset: [
                'default',
                {
                    discardComments: { removeAllButFirst: true } // Remove all comments except the first one
                }
            ]
        }
    }
});
