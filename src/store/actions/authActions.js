export const signIn = (credentials) => {
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();

        firebase.auth().signInWithEmailAndPassword(
            credentials.email,
            credentials.password
        ).then(() => {
            dispatch({type: 'LOGIN_SUCCESS'});
        }).catch((err) => {
            dispatch({type: 'LOGIN_ERROR', err});
        });
    }
}

export const signOut = () => {
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();

        firebase.auth().signOut().then(() => {
            dispatch({type: 'SIGNOUT_SUCCESS' });
        })
    }
}

export const signUp = (newUser) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firebase = getFirebase();
        const firestore = getFirestore();

        firebase.auth().createUserWithEmailAndPassword(
            newUser.email,
            newUser.password
        ).then((resp) => {

            let data = { uid: resp.user.uid }
            var request = new Request('http://localhost:5000/add_user', {
                method: 'POST',
                headers: new Headers({'Content-Type': 'application/json',
                                      'Access-Control-Allow-Origin': 'http://localhost:3000'}),
                body: JSON.stringify(data)
            });

            fetch(request)
            .then( (response) => {
                return response.json()
            }).then( (json) => {
                if(json.error) 
                    throw(json.error);
            //console.log(json);
            //dispatch({type: 'FETCH_SNAPSHOTS_SUCCESS', snapshots: json.snapshots});
            }).catch(error => {
                console.log(error);
            //dispatch({ type: 'FETCH_SNAPSHOTS_ERROR', error: error });
            })

            return firestore.collection('users').doc(resp.user.uid).set({
                nickname: newUser.nickname,
                initials: newUser.nickname[0] + newUser.nickname[1]
            })
        }).then(() => {
            dispatch({ type: 'SIGNUP_SUCCESS' })
        }).catch(err => {
            dispatch({ type: 'SIGNUP_ERROR', err })
        })
    }
}