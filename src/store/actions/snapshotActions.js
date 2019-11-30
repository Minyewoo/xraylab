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

export const deleteSnapshot = (snap_id) => {
    return (dispatch, getState) => {
        const uid = getState().firebase.auth.uid;
        let data = {
            uid: uid,
            snap_id: snap_id
        }

        var request = new Request(communicationPair.server_adress + '/delete_snapshot', {
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
                    dispatch({ type: 'DELETE_SNAPSHOT', snapshot_id: snap_id });
    
                }).catch(error => {
                    dispatch({ type: 'DELETE_SNAPSHOT_ERROR', error: error });
                })
    };
};

export const updateDescription = (snap_id, snap_description) => {
    return (dispatch, getState) => {
        const uid = getState().firebase.auth.uid;
        let data = {
            uid: uid,
            snap_id: snap_id,
            description: snap_description
        }

        var request = new Request(communicationPair.server_adress + '/update_description', {
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
                    dispatch({ type: 'UPDATE_DESCRIPTION'});
    
                }).catch(error => {
                    dispatch({ type: 'UPDATE_DESCRIPTION_ERROR', description_update_error: error });
                })
    };
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

export const pinSnapshot = (snap_id) => {
    return (dispatch, getState) => {
        const uid = getState().firebase.auth.uid;
        let data = {
            uid: uid,
            snap_id: snap_id,
        }

        var request = new Request(communicationPair.server_adress + '/pin_snapshot', {
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
                    dispatch({ type: 'PIN_SNAPSHOT'});
    
                }).catch(error => {
                    dispatch({ type: 'PIN_SNAPSHOT_ERROR', error: error });
                })
    };
};

export const unpinSnapshot = (snap_id) => {
    return (dispatch, getState) => {
        const uid = getState().firebase.auth.uid;
        let data = {
            uid: uid,
            snap_id: snap_id,
        }

        var request = new Request(communicationPair.server_adress + '/unpin_snapshot', {
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
                    dispatch({ type: 'UNPIN_SNAPSHOT'});
    
                }).catch(error => {
                    dispatch({ type: 'UNPIN_SNAPSHOT_ERROR', error: error });
                })
    };
};