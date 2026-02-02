<?php
/**
 * Datasheet text block render.
 *
 * @package Datasheets_For_Gutenberg
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$field_name   = isset( $attributes['fieldName'] ) ? sanitize_text_field( $attributes['fieldName'] ) : '';
$fallback_text = isset( $attributes['fallbackText'] ) ? $attributes['fallbackText'] : '';

$value = $field_name ? datasheets_for_gutenberg_get_field_value( $field_name ) : '';

if ( is_array( $value ) ) {
	$value = implode( ', ', array_map( 'sanitize_text_field', $value ) );
}

$display = $value !== '' ? $value : $fallback_text;
?>
<div class="datasheets-text">
	<?php if ( $field_name ) : ?>
		<span class="datasheets-text__label">
			<?php echo esc_html( $field_name ); ?>
		</span>
	<?php endif; ?>
	<p class="datasheets-text__value">
		<?php echo esc_html( $display ); ?>
	</p>
</div>
