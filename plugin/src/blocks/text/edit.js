import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { PanelBody, TextareaControl, TextControl } from '@wordpress/components';
import metadata from './block.json';

import './editor.css';

const TextEdit = ( { attributes, setAttributes } ) => {
	const { fieldName, fallbackText } = attributes;
	const blockProps = useBlockProps( {
		className: 'datasheets-text',
	} );

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Field settings', 'datasheets' ) } initialOpen={ true }>
					<TextControl
						label={ __( 'ACF field name', 'datasheets' ) }
						help={ __( 'Match the field name used on your selected post type.', 'datasheets' ) }
						value={ fieldName }
						onChange={ ( value ) => setAttributes( { fieldName: value } ) }
						placeholder={ __( 'e.g. short_description', 'datasheets' ) }
					/>
					<TextareaControl
						label={ __( 'Fallback text', 'datasheets' ) }
						value={ fallbackText }
						onChange={ ( value ) => setAttributes( { fallbackText: value } ) }
						placeholder={ __( 'Sample text for template preview', 'datasheets' ) }
					/>
				</PanelBody>
			</InspectorControls>
			<div { ...blockProps }>
				<span className="datasheets-text__label">
					{ fieldName
						? __( 'ACF field:', 'datasheets' )
						: __( 'Set an ACF field name in the sidebar.', 'datasheets' ) }
				</span>
				<p className="datasheets-text__preview">
					{ fieldName ? `${ fieldName }` : fallbackText }
				</p>
			</div>
		</>
	);
};

registerBlockType( metadata.name, {
	...metadata,
	edit: TextEdit,
	save: () => null,
} );
