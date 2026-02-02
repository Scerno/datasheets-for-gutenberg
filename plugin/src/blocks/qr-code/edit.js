import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { PanelBody, SelectControl, TextControl } from '@wordpress/components';
import metadata from './block.json';
import useFieldOptions from '../shared/use-field-options';

import './editor.css';

const QrCodeEdit = ( { attributes, setAttributes } ) => {
	const { fieldName, fallbackValue } = attributes;
	const { options, isLoading, postType } = useFieldOptions();
	const blockProps = useBlockProps( {
		className: 'datasheets-qr',
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
						label={ __( 'Fallback QR value', 'datasheets' ) }
						value={ fallbackValue }
						onChange={ ( value ) => setAttributes( { fallbackValue: value } ) }
						placeholder={ __( 'https://example.com', 'datasheets' ) }
					/>
				</PanelBody>
			</InspectorControls>
			<div { ...blockProps }>
				<span className="datasheets-qr__label">
					{ fieldName
						? __( 'Field:', 'datasheets' )
						: __( 'Set a field in the sidebar.', 'datasheets' ) }
				</span>
				<div className="datasheets-qr__preview">
					<span className="datasheets-qr__value">
						{ fieldName ? fieldName : fallbackValue }
					</span>
					<span className="datasheets-qr__hint">
						{ __( 'QR output renders on the front-end.', 'datasheets' ) }
					</span>
				</div>
			</div>
		</>
	);
};

registerBlockType( metadata.name, {
	...metadata,
	edit: QrCodeEdit,
	save: () => null,
} );
