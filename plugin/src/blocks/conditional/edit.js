import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import { InspectorControls, InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import { PanelBody, SelectControl, TextControl } from '@wordpress/components';
import metadata from './block.json';
import useFieldOptions from '../shared/use-field-options';

import './editor.css';

const CONDITION_OPTIONS = [
	{ label: __( 'Equals', 'datasheets' ), value: 'equals' },
	{ label: __( 'Contains', 'datasheets' ), value: 'contains' },
	{ label: __( 'Starts with', 'datasheets' ), value: 'starts_with' },
	{ label: __( 'Ends with', 'datasheets' ), value: 'ends_with' },
	{ label: __( 'Greater than', 'datasheets' ), value: 'greater_than' },
	{ label: __( 'Less than', 'datasheets' ), value: 'less_than' },
];

const MATCH_OPTIONS = [
	{ label: __( 'Is', 'datasheets' ), value: 'is' },
	{ label: __( 'Is not', 'datasheets' ), value: 'is_not' },
];

const ConditionalEdit = ( { attributes, setAttributes } ) => {
	const { fieldName, condition, matchType, compareValue } = attributes;
	const { options, isLoading, postType } = useFieldOptions();
	const blockProps = useBlockProps( {
		className: 'datasheets-conditional',
	} );

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Show if', 'datasheets' ) } initialOpen={ true }>
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
					<SelectControl
						label={ __( 'Condition', 'datasheets' ) }
						value={ condition }
						options={ CONDITION_OPTIONS }
						onChange={ ( value ) => setAttributes( { condition: value } ) }
					/>
					<SelectControl
						label={ __( 'Match type', 'datasheets' ) }
						value={ matchType }
						options={ MATCH_OPTIONS }
						onChange={ ( value ) => setAttributes( { matchType: value } ) }
					/>
					<TextControl
						label={ __( 'Compare value', 'datasheets' ) }
						value={ compareValue }
						onChange={ ( value ) => setAttributes( { compareValue: value } ) }
						placeholder={ __( 'Enter value to compare', 'datasheets' ) }
					/>
				</PanelBody>
			</InspectorControls>
			<div { ...blockProps }>
				<div className="datasheets-conditional__summary">
					<span>
						{ fieldName
							? __( 'Field:', 'datasheets' )
							: __( 'Select a field in the sidebar.', 'datasheets' ) }
					</span>
					{ fieldName && (
						<strong>{ fieldName }</strong>
					) }
					{ fieldName && (
						<span>
							{ matchType === 'is_not'
								? __( 'is not', 'datasheets' )
								: __( 'is', 'datasheets' ) }
							{ ' ' }
							{ CONDITION_OPTIONS.find( ( option ) => option.value === condition )?.label?.toLowerCase() }
							{ ' ' }
							{ compareValue ? `"${ compareValue }"` : __( '(no value)', 'datasheets' ) }
						</span>
					) }
				</div>
				<div className="datasheets-conditional__content">
					<InnerBlocks />
				</div>
			</div>
		</>
	);
};

registerBlockType( metadata.name, {
	...metadata,
	edit: ConditionalEdit,
	save: () => <InnerBlocks.Content />,
} );
