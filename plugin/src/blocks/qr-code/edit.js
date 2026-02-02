import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';
import metadata from './block.json';

import './editor.css';

const QrCodeEdit = ( { attributes, setAttributes } ) => {
	const { fieldName, fallbackValue } = attributes;
	const blockProps = useBlockProps( {
		className: 'datasheets-qr',
	} );

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Field settings', 'datasheets' ) } initialOpen={ true }>
					<TextControl
						label={ __( 'ACF field name', 'datasheets' ) }
						value={ fieldName }
						onChange={ ( value ) => setAttributes( { fieldName: value } ) }
						placeholder={ __( 'e.g. product_url', 'datasheets' ) }
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
						? __( 'ACF field:', 'datasheets' )
						: __( 'Set an ACF field name in the sidebar.', 'datasheets' ) }
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
