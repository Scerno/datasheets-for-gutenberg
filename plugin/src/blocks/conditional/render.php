<?php
/**
 * Datasheet conditional block render.
 *
 * @package Datasheets_For_Gutenberg
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$field_name   = isset( $attributes['fieldName'] ) ? sanitize_text_field( $attributes['fieldName'] ) : '';
$condition    = isset( $attributes['condition'] ) ? sanitize_text_field( $attributes['condition'] ) : 'equals';
$match_type   = isset( $attributes['matchType'] ) ? sanitize_text_field( $attributes['matchType'] ) : 'is';
$compare_value = isset( $attributes['compareValue'] ) ? sanitize_text_field( $attributes['compareValue'] ) : '';

$value = $field_name ? datasheets_for_gutenberg_get_field_value( $field_name ) : '';

$should_show = datasheets_for_gutenberg_compare_condition( $value, $condition, $compare_value, $match_type );

if ( ! $should_show ) {
	return '';
}

return sprintf(
	'<div class="datasheets-conditional">%s</div>',
	$content
);
