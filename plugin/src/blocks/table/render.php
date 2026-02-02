<?php
/**
 * Datasheet table block render.
 *
 * @package Datasheets_For_Gutenberg
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$field_name       = isset( $attributes['fieldName'] ) ? sanitize_text_field( $attributes['fieldName'] ) : '';
$fallback_headers = isset( $attributes['fallbackHeaders'] ) ? $attributes['fallbackHeaders'] : '';
$fallback_rows    = isset( $attributes['fallbackRows'] ) ? $attributes['fallbackRows'] : '';

$headers = array_map( 'trim', explode( ',', $fallback_headers ) );
$rows    = array_filter( array_map( 'trim', preg_split( '/\r?\n/', $fallback_rows ) ) );
$rows    = array_map(
	static function ( $row ) {
		return array_map( 'trim', explode( ',', $row ) );
	},
	$rows
);

$value = $field_name ? datasheets_for_gutenberg_get_field_value( $field_name ) : null;

if ( is_array( $value ) && isset( $value['headers'], $value['rows'] ) ) {
	$headers = array_map( 'sanitize_text_field', (array) $value['headers'] );
	$rows    = array_map(
		static function ( $row ) {
			return array_map( 'sanitize_text_field', (array) $row );
		},
		(array) $value['rows']
	);
} elseif ( is_array( $value ) && ! empty( $value ) ) {
	$rows = array_map(
		static function ( $row ) {
			if ( is_array( $row ) ) {
				return array_map( 'sanitize_text_field', $row );
			}
			return [ sanitize_text_field( (string) $row ) ];
		},
		$value
	);
}
?>
<div class="datasheets-table">
	<?php if ( $field_name ) : ?>
		<span class="datasheets-table__label">
			<?php echo esc_html( $field_name ); ?>
		</span>
	<?php endif; ?>
	<table class="datasheets-table__table">
		<?php if ( ! empty( $headers ) ) : ?>
			<thead>
				<tr>
					<?php foreach ( $headers as $header ) : ?>
						<th><?php echo esc_html( $header ); ?></th>
					<?php endforeach; ?>
				</tr>
			</thead>
		<?php endif; ?>
		<tbody>
			<?php foreach ( $rows as $row ) : ?>
				<tr>
					<?php foreach ( $row as $cell ) : ?>
						<td><?php echo esc_html( $cell ); ?></td>
					<?php endforeach; ?>
				</tr>
			<?php endforeach; ?>
		</tbody>
	</table>
</div>
