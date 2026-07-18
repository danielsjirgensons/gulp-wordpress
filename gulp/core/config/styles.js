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
            implementation: require('sass'),
            outputStyle: 'expanded',
            precision: 5,
            includePaths: ['node_modules', assets.src + '/scss'],
            quietDeps: true,
            silenceDeprecations: ['import', 'global-builtin']
        },
        autoprefixer: {
            grid: 'autoplace',
            cascade: false
        },
        minify: {
            preset: [
                'default',
                {
                    discardComments: { removeAll: true },
                    normalizeWhitespace: true,
                    colormin: true,
                    convertValues: true,
                    mergeLonghand: true,
                    mergeRules: true
                }
            ]
        }
    }
});
