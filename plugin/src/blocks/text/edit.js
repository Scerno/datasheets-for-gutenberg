import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { PanelBody, SelectControl, TextareaControl } from '@wordpress/components';
import metadata from './block.json';
import useFieldOptions from '../shared/use-field-options';

import './editor.css';

const TextEdit = ( { attributes, setAttributes } ) => {
	const { fieldName, fallbackText } = attributes;
	const { options, isLoading, postType } = useFieldOptions();
	const blockProps = useBlockProps( {
		className: 'datasheets-text',
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
						? __( 'Field:', 'datasheets' )
						: __( 'Set a field in the sidebar.', 'datasheets' ) }
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
