export const createSnapshot = (snapshot) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        //make async call to database
        const firestore = getFirestore();
        firestore.collection('snapshots').add({
            authorId: 'Minyewoo',
            conclusion: snapshot.content,
            snapshot: snapshot.content,
            createdAt: new Date()
        }).then(() => {
            dispatch({ type: 'CREATE_SNAPSHOT', snapshot});
        }).catch((err) => {
            dispatch({ type: 'CREATE_SNAPSHOT_ERROR', err});
        })
    }
};