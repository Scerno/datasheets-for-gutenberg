<?php
/**
 * Datasheet list block render.
 *
 * @package Datasheets_For_Gutenberg
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$field_name    = isset( $attributes['fieldName'] ) ? sanitize_text_field( $attributes['fieldName'] ) : '';
$fallback_items = isset( $attributes['fallbackItems'] ) ? $attributes['fallbackItems'] : '';

$value = [];
if ( $field_name && function_exists( 'get_field' ) ) {
	$value = get_field( $field_name );
}

if ( ! is_array( $value ) ) {
	$value = preg_split( '/\r?\n|,/', (string) $value, -1, PREG_SPLIT_NO_EMPTY );
}

if ( empty( $value ) ) {
	$value = preg_split( '/\r?\n/', $fallback_items, -1, PREG_SPLIT_NO_EMPTY );
}
?>
<div class="datasheets-list">
	<?php if ( $field_name ) : ?>
		<span class="datasheets-list__label">
			<?php echo esc_html( $field_name ); ?>
		</span>
	<?php endif; ?>
	<ul class="datasheets-list__items">
		<?php foreach ( $value as $item ) : ?>
			<li><?php echo esc_html( $item ); ?></li>
		<?php endforeach; ?>
	</ul>
</div>
