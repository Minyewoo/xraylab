const communicationPair = {
    client_adress: 'http://127.0.0.1:3000',
    server_adress: 'http://116.203.222.52:3030',
}

export const createSnapshot = (snapshot) => {
    return (dispatch, getState) => {

        const uid = getState().firebase.auth.uid;
        const images = snapshot.images;

        images.forEach(image => {
            let data = {
                uid: uid,
                image: image
            }
            var request = new Request(communicationPair.server_adress + '/create_snapshot', {
                method: 'POST',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': communicationPair.client_adress
                }),
                body: JSON.stringify(data)
            });
            fetch(request)
                .then((response) => {
                    return response.json()
                }).then((json) => {
                    if (json.error) {
                        throw (json.error);
                    }
                    //console.log(json);
                    dispatch({ type: 'CREATE_SNAPSHOT', snapshot: json.snapshot });
    
                }).catch(error => {
                    dispatch({ type: 'CREATE_SNAPSHOT_ERROR', error: error });
                })
        });
        
    }
};

export const fetchSnapshots = () => {
    return (dispatch, getState) => {
        const uid = getState().firebase.auth.uid;
        dispatch({ type: 'FETCH_SNAPSHOTS_PENDING' });
        let data = { uid: uid }
        var request = new Request(communicationPair.server_adress + '/get_snapshots', {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': communicationPair.client_adress
            }),
            body: JSON.stringify(data)
        });
        fetch(request)
            .then((response) => {
                return response.json()
            }).then((json) => {
                if (json.error) {
                    throw (json.error);
                }
                //console.log(json);
                dispatch({ type: 'FETCH_SNAPSHOTS_SUCCESS', snapshots: json.snapshots });

            }).catch(error => {
                dispatch({ type: 'FETCH_SNAPSHOTS_ERROR', error: error });
            })
    }
};