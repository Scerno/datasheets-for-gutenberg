import apiFetch from '@wordpress/api-fetch';
import { __ } from '@wordpress/i18n';
import { useEffect, useMemo, useState } from '@wordpress/element';

const buildOptions = ( data ) => {
	const options = [ { label: __( '— Select —', 'datasheets' ), value: '' } ];
	const coreFields = data?.fields?.core ?? [];
	const acfFields = data?.fields?.acf ?? [];

	coreFields.forEach( ( field ) => {
		options.push( {
			label: `${ __( 'Core', 'datasheets' ) }: ${ field.label }`,
			value: field.value,
		} );
	} );

	acfFields.forEach( ( field ) => {
		options.push( {
			label: `${ __( 'ACF', 'datasheets' ) }: ${ field.label }`,
			value: field.value,
		} );
	} );

	return options;
};

const useFieldOptions = () => {
	const [ data, setData ] = useState( null );
	const [ isLoading, setIsLoading ] = useState( true );

	useEffect( () => {
		let isMounted = true;
		setIsLoading( true );

		apiFetch( { path: '/datasheets-gb/v1/fields' } )
			.then( ( response ) => {
				if ( isMounted ) {
					setData( response );
				}
			} )
			.catch( () => {
				if ( isMounted ) {
					setData( null );
				}
			} )
			.finally( () => {
				if ( isMounted ) {
					setIsLoading( false );
				}
			} );

		return () => {
			isMounted = false;
		};
	}, [] );

	const options = useMemo( () => buildOptions( data ), [ data ] );

	return { options, isLoading, postType: data?.post_type || '' };
};

export default useFieldOptions;
