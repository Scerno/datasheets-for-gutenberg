import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { PanelBody, SelectControl, TextControl } from '@wordpress/components';
import metadata from './block.json';
import useFieldOptions from '../shared/use-field-options';

import './editor.css';

const ImageEdit = ( { attributes, setAttributes } ) => {
	const { fieldName, fallbackUrl, fallbackAlt } = attributes;
	const { options, isLoading, postType } = useFieldOptions();
	const blockProps = useBlockProps( {
		className: 'datasheets-image',
	} );

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Field settings', 'datasheets' ) } initialOpen={ true }>
					<SelectControl
						label={ __( 'Field source', 'datasheets' ) }
						help={ postType
							? __( 'Fields are loaded from the Datasheets post type setting.', 'datasheets' )
							: __( 'Select a field from the Datasheets post type.', 'datasheets' ) }
						value={ fieldName }
						options={ options }
						onChange={ ( value ) => setAttributes( { fieldName: value } ) }
						disabled={ isLoading }
					/>
					<TextControl
						label={ __( 'Fallback image URL', 'datasheets' ) }
						value={ fallbackUrl }
						onChange={ ( value ) => setAttributes( { fallbackUrl: value } ) }
						placeholder={ __( 'https://example.com/image.jpg', 'datasheets' ) }
					/>
					<TextControl
						label={ __( 'Fallback alt text', 'datasheets' ) }
						value={ fallbackAlt }
						onChange={ ( value ) => setAttributes( { fallbackAlt: value } ) }
					/>
				</PanelBody>
			</InspectorControls>
			<div { ...blockProps }>
				<span className="datasheets-image__label">
					{ fieldName
						? __( 'Field:', 'datasheets' )
						: __( 'Set a field in the sidebar.', 'datasheets' ) }
				</span>
				{ fallbackUrl ? (
					<img
						className="datasheets-image__preview"
						src={ fallbackUrl }
						alt={ fallbackAlt }
					/>
				) : (
					<div className="datasheets-image__placeholder">
						{ __( 'Image preview appears here.', 'datasheets' ) }
					</div>
				) }
			</div>
		</>
	);
};

registerBlockType( metadata.name, {
	...metadata,
	edit: ImageEdit,
	save: () => null,
} );
