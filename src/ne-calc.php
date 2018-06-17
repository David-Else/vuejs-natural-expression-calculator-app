<?php
/*
Plugin Name: Natural Expression Calculator
Plugin URI: https://www.elsewebdevelopment.com/
Description: App For Natural Expression Calculation
Version: 1.0
Author: David Else
Author URI: https://www.elsewebdevelopment.com/
*/

add_action('wp_enqueue_scripts', 'ne_enqueue');
function ne_enqueue() {
        wp_enqueue_style(
            'necss',
            plugin_dir_url(__FILE__).'bundle.css'
        );
        wp_enqueue_script(
            'nejs',
            plugin_dir_url(__FILE__).'bundle.js', false, false, true // vital true is the 5th value or it won't go in footer!
        );
}

// uncomment this to make it only load on front page

// add_action('wp_enqueue_scripts', 'ne_enqueue');
// function ne_enqueue() {
//     if (is_front_page()) {
//         wp_enqueue_style(
//             'necss',
//             plugin_dir_url(__FILE__).'bundle.css'
//         );
//         wp_enqueue_script(
//             'nejs',
//             plugin_dir_url(__FILE__).'bundle.js', false, false, true // vital true is the 5th value or it won't go in footer!
//         );
//     }
// }
