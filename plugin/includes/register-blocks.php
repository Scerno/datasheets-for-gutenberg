<?php
add_action('init', function () {
    $dir = plugin_dir_path(__FILE__) . '../build/blocks/';
    if ( ! is_dir($dir) ) return;

    foreach ( glob($dir . '*/block.json') as $meta ) {
        $res = register_block_type_from_metadata(dirname($meta));
        if ( is_wp_error($res) ) {
            error_log('Wizzy Blocks error: ' . $res->get_error_message());
        }
    }
});
