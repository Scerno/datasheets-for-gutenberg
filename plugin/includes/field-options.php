<?php
/**
 * REST endpoint for field options.
 *
 * @package Datasheets_For_Gutenberg
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Get the post type configured in the Datasheets plugin.
 *
 * @return string
 */
function datasheets_for_gutenberg_get_post_type() {
	$post_type = get_option( 'datasheets_post_type' );

	if ( ! $post_type ) {
		$post_type = get_option( 'datasheets_selected_post_type' );
	}

	if ( ! $post_type ) {
		$post_type = 'post';
	}

	/**
	 * Filter the post type used for field lookups.
	 *
	 * @param string $post_type Post type slug.
	 */
	return apply_filters( 'datasheets_for_gutenberg_post_type', $post_type );
}

/**
 * Collect core and ACF fields for a post type.
 *
 * @param string $post_type Post type slug.
 * @return array
 */
function datasheets_for_gutenberg_core_fields() {
	return [
		[ 'label' => __( 'Post ID', 'datasheets-for-gutenberg' ), 'value' => 'ID' ],
		[ 'label' => __( 'Post Title', 'datasheets-for-gutenberg' ), 'value' => 'post_title' ],
		[ 'label' => __( 'Post Slug', 'datasheets-for-gutenberg' ), 'value' => 'post_name' ],
		[ 'label' => __( 'Post Status', 'datasheets-for-gutenberg' ), 'value' => 'post_status' ],
		[ 'label' => __( 'Post Date', 'datasheets-for-gutenberg' ), 'value' => 'post_date' ],
		[ 'label' => __( 'Post Modified Date', 'datasheets-for-gutenberg' ), 'value' => 'post_modified' ],
		[ 'label' => __( 'Post Excerpt', 'datasheets-for-gutenberg' ), 'value' => 'post_excerpt' ],
		[ 'label' => __( 'Post Content', 'datasheets-for-gutenberg' ), 'value' => 'post_content' ],
		[ 'label' => __( 'Post Author', 'datasheets-for-gutenberg' ), 'value' => 'post_author' ],
	];
}

/**
 * Collect core and ACF fields for a post type.
 *
 * @param string $post_type Post type slug.
 * @return array
 */
function datasheets_for_gutenberg_collect_fields( $post_type ) {
	$core_fields = datasheets_for_gutenberg_core_fields();

	$acf_fields = [];
	if ( function_exists( 'acf_get_field_groups' ) && function_exists( 'acf_get_fields' ) ) {
		$field_groups = acf_get_field_groups( [ 'post_type' => $post_type ] );
		foreach ( $field_groups as $group ) {
			$fields = acf_get_fields( $group );
			if ( empty( $fields ) ) {
				continue;
			}
			foreach ( $fields as $field ) {
				if ( empty( $field['name'] ) ) {
					continue;
				}
				$acf_fields[] = [
					'label' => sprintf(
						'%s (%s)',
						sanitize_text_field( $field['label'] ?? $field['name'] ),
						sanitize_text_field( $field['name'] )
					),
					'value' => sanitize_text_field( $field['name'] ),
				];
			}
		}
	}

	return [
		'core' => $core_fields,
		'acf'  => $acf_fields,
	];
}

/**
 * Determine whether a field name is a core post field.
 *
 * @param string $field_name Field name.
 * @return bool
 */
function datasheets_for_gutenberg_is_core_field( $field_name ) {
	$core_fields = wp_list_pluck( datasheets_for_gutenberg_core_fields(), 'value' );
	return in_array( $field_name, $core_fields, true );
}

/**
 * Fetch a field value from core post data or ACF.
 *
 * @param string $field_name Field name.
 * @param int    $post_id Optional post ID.
 * @return mixed
 */
function datasheets_for_gutenberg_get_field_value( $field_name, $post_id = 0 ) {
	if ( ! $field_name ) {
		return '';
	}

	$post_id = $post_id ? (int) $post_id : get_the_ID();

	if ( ! $post_id ) {
		return '';
	}

	if ( datasheets_for_gutenberg_is_core_field( $field_name ) ) {
		if ( 'ID' === $field_name ) {
			return $post_id;
		}

		return get_post_field( $field_name, $post_id );
	}

	if ( function_exists( 'get_field' ) ) {
		return get_field( $field_name, $post_id );
	}

	return '';
}

/**
 * Register the REST route for field options.
 */
function datasheets_for_gutenberg_register_field_route() {
	register_rest_route(
		'datasheets-gb/v1',
		'/fields',
		[
			'methods'             => 'GET',
			'callback'            => function ( WP_REST_Request $request ) {
				$post_type = $request->get_param( 'post_type' ) ?: datasheets_for_gutenberg_get_post_type();

				return rest_ensure_response( [
					'post_type' => $post_type,
					'fields'    => datasheets_for_gutenberg_collect_fields( $post_type ),
				] );
			},
			'permission_callback' => function () {
				return current_user_can( 'edit_posts' );
			},
		]
	);
}
add_action( 'rest_api_init', 'datasheets_for_gutenberg_register_field_route' );
