import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { PanelBody, TextareaControl, TextControl } from '@wordpress/components';
import metadata from './block.json';

import './editor.css';

const ListEdit = ( { attributes, setAttributes } ) => {
	const { fieldName, fallbackItems } = attributes;
	const items = fallbackItems.split( /\r?\n/ ).filter( Boolean );
	const blockProps = useBlockProps( {
		className: 'datasheets-list',
	} );

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Field settings', 'datasheets' ) } initialOpen={ true }>
					<TextControl
						label={ __( 'ACF field name', 'datasheets' ) }
						value={ fieldName }
						onChange={ ( value ) => setAttributes( { fieldName: value } ) }
						placeholder={ __( 'e.g. features', 'datasheets' ) }
					/>
					<TextareaControl
						label={ __( 'Fallback list items', 'datasheets' ) }
						help={ __( 'One item per line.', 'datasheets' ) }
						value={ fallbackItems }
						onChange={ ( value ) => setAttributes( { fallbackItems: value } ) }
					/>
				</PanelBody>
			</InspectorControls>
			<div { ...blockProps }>
				<span className="datasheets-list__label">
					{ fieldName
						? __( 'ACF field:', 'datasheets' )
						: __( 'Set an ACF field name in the sidebar.', 'datasheets' ) }
				</span>
				<ul className="datasheets-list__preview">
					{ items.map( ( item, index ) => (
						<li key={ `${ item }-${ index }` }>{ item }</li>
					) ) }
				</ul>
			</div>
		</>
	);
};

registerBlockType( metadata.name, {
	...metadata,
	edit: ListEdit,
	save: () => null,
} );
