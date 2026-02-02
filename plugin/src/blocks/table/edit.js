import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { PanelBody, TextareaControl, TextControl } from '@wordpress/components';
import metadata from './block.json';

import './editor.css';

const parseRows = ( rows ) =>
	rows
		.split( /\r?\n/ )
		.map( ( row ) => row.split( ',' ).map( ( cell ) => cell.trim() ) )
		.filter( ( row ) => row.length && row.some( Boolean ) );

const TableEdit = ( { attributes, setAttributes } ) => {
	const { fieldName, fallbackHeaders, fallbackRows } = attributes;
	const headers = fallbackHeaders.split( ',' ).map( ( header ) => header.trim() );
	const rows = parseRows( fallbackRows );
	const blockProps = useBlockProps( {
		className: 'datasheets-table',
	} );

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Field settings', 'datasheets' ) } initialOpen={ true }>
					<TextControl
						label={ __( 'ACF field name', 'datasheets' ) }
						value={ fieldName }
						onChange={ ( value ) => setAttributes( { fieldName: value } ) }
						placeholder={ __( 'e.g. specs_table', 'datasheets' ) }
					/>
					<TextControl
						label={ __( 'Fallback headers', 'datasheets' ) }
						help={ __( 'Comma-separated headers.', 'datasheets' ) }
						value={ fallbackHeaders }
						onChange={ ( value ) => setAttributes( { fallbackHeaders: value } ) }
					/>
					<TextareaControl
						label={ __( 'Fallback rows', 'datasheets' ) }
						help={ __( 'Each line is a row; separate columns with commas.', 'datasheets' ) }
						value={ fallbackRows }
						onChange={ ( value ) => setAttributes( { fallbackRows: value } ) }
					/>
				</PanelBody>
			</InspectorControls>
			<div { ...blockProps }>
				<span className="datasheets-table__label">
					{ fieldName
						? __( 'ACF field:', 'datasheets' )
						: __( 'Set an ACF field name in the sidebar.', 'datasheets' ) }
				</span>
				<table className="datasheets-table__preview">
					<thead>
						<tr>
							{ headers.map( ( header ) => (
								<th key={ header }>{ header }</th>
							) ) }
						</tr>
					</thead>
					<tbody>
						{ rows.map( ( row, index ) => (
							<tr key={ `row-${ index }` }>
								{ row.map( ( cell, cellIndex ) => (
									<td key={ `${ cell }-${ cellIndex }` }>{ cell }</td>
								) ) }
							</tr>
						) ) }
					</tbody>
				</table>
			</div>
		</>
	);
};

registerBlockType( metadata.name, {
	...metadata,
	edit: TableEdit,
	save: () => null,
} );
