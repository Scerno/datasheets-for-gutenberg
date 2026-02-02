<?php
/**
 * Datasheet image block render.
 *
 * @package Datasheets_For_Gutenberg
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$field_name   = isset( $attributes['fieldName'] ) ? sanitize_text_field( $attributes['fieldName'] ) : '';
$fallback_url = isset( $attributes['fallbackUrl'] ) ? esc_url_raw( $attributes['fallbackUrl'] ) : '';
$fallback_alt = isset( $attributes['fallbackAlt'] ) ? sanitize_text_field( $attributes['fallbackAlt'] ) : '';

$value = $field_name ? datasheets_for_gutenberg_get_field_value( $field_name ) : null;

$image_html = '';

if ( is_array( $value ) && isset( $value['url'] ) ) {
	$image_html = sprintf(
		'<img class="datasheets-image__asset" src="%s" alt="%s" />',
		esc_url( $value['url'] ),
		esc_attr( $value['alt'] ?? '' )
	);
} elseif ( is_numeric( $value ) ) {
	$image_html = wp_get_attachment_image( (int) $value, 'full', false, [ 'class' => 'datasheets-image__asset' ] );
} elseif ( is_string( $value ) && $value !== '' ) {
	$image_html = sprintf(
		'<img class="datasheets-image__asset" src="%s" alt="" />',
		esc_url( $value )
	);
} elseif ( $fallback_url ) {
	$image_html = sprintf(
		'<img class="datasheets-image__asset" src="%s" alt="%s" />',
		esc_url( $fallback_url ),
		esc_attr( $fallback_alt )
	);
}
?>
<div class="datasheets-image">
	<?php if ( $field_name ) : ?>
		<span class="datasheets-image__label">
			<?php echo esc_html( $field_name ); ?>
		</span>
	<?php endif; ?>
	<?php if ( $image_html ) : ?>
		<?php echo $image_html; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
	<?php else : ?>
		<span class="datasheets-image__empty"><?php echo esc_html__( 'No image selected.', 'datasheets' ); ?></span>
	<?php endif; ?>
</div>
