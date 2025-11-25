<?php
/**
 * Registers all compiled Gutenberg blocks for Datasheets For Gutenberg.
 *
 * @package Datasheets_For_Gutenberg
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Registers every block found under /build/blocks/
 */
function datasheets_for_gutenberg_register_blocks() {

	$blocks_dir = DATASHEETS_GB_DIR . 'build/blocks/';

	if ( ! file_exists( $blocks_dir ) ) {
		return;
	}

	foreach ( glob( $blocks_dir . '*/block.json' ) as $file ) {
		$block_dir = dirname( $file );

		if ( file_exists( $block_dir . '/render.php' ) ) {
			register_block_type(
				$block_dir,
				[
					'render_callback' => function ( $attributes, $content ) use ( $block_dir ) {
						ob_start();
						include $block_dir . '/render.php';
						return ob_get_clean();
					},
				]
			);
		} else {
			register_block_type( $block_dir );
		}
	}
}
