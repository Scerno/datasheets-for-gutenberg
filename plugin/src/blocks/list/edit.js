import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { PanelBody, SelectControl, TextareaControl } from '@wordpress/components';
import metadata from './block.json';
import useFieldOptions from '../shared/use-field-options';

import './editor.css';

const ListEdit = ( { attributes, setAttributes } ) => {
	const { fieldName, fallbackItems } = attributes;
	const { options, isLoading, postType } = useFieldOptions();
	const items = fallbackItems.split( /\r?\n/ ).filter( Boolean );
	const blockProps = useBlockProps( {
		className: 'datasheets-list',
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
						? __( 'Field:', 'datasheets' )
						: __( 'Set a field in the sidebar.', 'datasheets' ) }
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
