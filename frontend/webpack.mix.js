let mix = require('laravel-mix');
let tailwindcss = require('tailwindcss')

mix.sass('src/assets/sass/app.scss', 'src/assets/css/app.css')
    .options({
    processCssUrls: false,
    postCss: [ tailwindcss('tailwind.config.js') ],
});