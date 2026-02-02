<?php
/**
 * Datasheet QR code block render.
 *
 * @package Datasheets_For_Gutenberg
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$field_name    = isset( $attributes['fieldName'] ) ? sanitize_text_field( $attributes['fieldName'] ) : '';
$fallback_value = isset( $attributes['fallbackValue'] ) ? sanitize_text_field( $attributes['fallbackValue'] ) : '';

$value = '';
if ( $field_name && function_exists( 'get_field' ) ) {
	$value = get_field( $field_name );
}

if ( is_array( $value ) ) {
	$value = reset( $value );
}

$display_value = $value !== '' ? (string) $value : $fallback_value;
$qr_url        = $display_value ? sprintf(
	'https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=%s',
	rawurlencode( $display_value )
) : '';
?>
<div class="datasheets-qr">
	<?php if ( $field_name ) : ?>
		<span class="datasheets-qr__label">
			<?php echo esc_html( $field_name ); ?>
		</span>
	<?php endif; ?>
	<?php if ( $qr_url ) : ?>
		<img class="datasheets-qr__image" src="<?php echo esc_url( $qr_url ); ?>" alt="<?php echo esc_attr( $display_value ); ?>" />
	<?php else : ?>
		<span class="datasheets-qr__empty"><?php echo esc_html__( 'No QR value provided.', 'datasheets' ); ?></span>
	<?php endif; ?>
</div>
