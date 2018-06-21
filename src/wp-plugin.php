<?php
/*
Plugin Name: Vue Natural Expression Calculator
Plugin URI: https://www.elsewebdevelopment.com/
Description: Vue App For Natural Expression Calculation
Version: 1.0
Author: David Else
Author URI: https://www.elsewebdevelopment.com/
*/

// is_home()
// is_front_page()
// is_page() = when any page is being displayed.
// is_single() = when any single post page is being displayed
// is_single( 'es6-zombie-attack' ) = load only on this post_title
// is_single( array( 'beef-stew', 'pea-soup', 'chili' ) )

add_action('wp_enqueue_scripts', 'vue_ne_enqueue');
function vue_ne_enqueue() {
    if (is_single( 'vuejs-natural-expression-calculator-application' )) {
        wp_enqueue_style(
            'vunecss',
            plugin_dir_url(__FILE__).'main.css'
        );
        wp_enqueue_script(
            'vuejs',
            plugin_dir_url(__FILE__).'vue.min.js', false, false, true // vital true is the 5th value or it won't go in footer!
        );
        wp_enqueue_script(
            'vunejs',
            plugin_dir_url(__FILE__).'bundle.js', false, false, true // vital true is the 5th value or it won't go in footer!
        );
    }
}
