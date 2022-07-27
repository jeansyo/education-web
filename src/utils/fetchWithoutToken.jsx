export const fetchWithoutToken = ( endpoint, data, method="GET" ) => {
    const baseUrl = import.meta.env.VITE_BASE_URL;

    const url = `${ baseUrl }/${ endpoint }`;
    if( method === "GET" ){
        return fetch( url );
    } else {
        return fetch( url, {
            method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify( data )
        } );
    }
}