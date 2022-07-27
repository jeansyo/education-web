const baseUrl = import.meta.env.VITE_BASE_URL;
export const fetchWithToken = ( endpoint, data={}, method="GET" ) => {
    const token = localStorage.getItem( "EDU-TKN" ) || '';
    const url = `${ baseUrl }/${ endpoint }`

    let headers = new Headers();

    headers.append( 'Content-Type', 'application/json' );
    headers.append( 'X-token', token );

    if( method === "GET" ){
        return fetch( url, {
            headers: {
                'Content-Type': 'application/json',
                'X-token': token,
            },
            method,
        } )
    } else {
        return fetch( url, {
            headers: {
                'Content-Type': 'application/json',
                'X-token': token,
            },
            method,
            body: JSON.stringify( data )
        } )
    }

}
