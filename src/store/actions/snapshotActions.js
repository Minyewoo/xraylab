export const createSnapshot = (snapshot) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        //make async call to database
        const firestore = getFirestore();
        firestore.collection('snapshots').add({
            author: 'Minyewoo',
            conclusion: snapshot.conclusion,
            image: snapshot.image,
            mask: snapshot.mask,
            createdAt: new Date()
        }).then(() => {
            dispatch({ type: 'CREATE_SNAPSHOT', snapshot});
        }).catch((err) => {
            dispatch({ type: 'CREATE_SNAPSHOT_ERROR', err});
        })
    }
};