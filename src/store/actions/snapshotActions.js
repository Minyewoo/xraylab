const communicationPair = {
    client_adress: 'http://127.0.0.1:3000',
    server_adress: 'http://80.240.20.31:3030',
}

export const createSnapshot = (snapshot) => {
    return (dispatch, getState/*, {getFirebase, getFirestore}*/) => {
        //make async call to database
        //const firestore = getFirestore();
        //const profile = getState().firebase.profile;
        //const authorId = getState().firebase.auth.uid;

        /*firestore.collection('snapshots').add({
            author: profile.nickname,
            authorId: authorId,
            conclusion: snapshot.conclusion,
            image: snapshot.image,
            mask: snapshot.mask,
            createdAt: new Date()
        }).then(() => {
            dispatch({ type: 'CREATE_SNAPSHOT', snapshot});
        }).catch((err) => {
            dispatch({ type: 'CREATE_SNAPSHOT_ERROR', err});
        })*/
        const uid = getState().firebase.auth.uid;
        let data = {
            uid: uid,
            conclusion: snapshot.conclusion,
            image: snapshot.image,
            mask: snapshot.mask,
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
                dispatch({ type: 'CREATE_SNAPSHOT', snapshot: snapshot });

            }).catch(error => {
                dispatch({ type: 'CREATE_SNAPSHOT_ERROR', error: error });
            })
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