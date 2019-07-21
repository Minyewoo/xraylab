export const createSnapshot = (snapshot) => {
    
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        //make async call to database
        const firestore = getFirestore();
        var date = new Date();
        firestore.collection('snapshots').add({
            author: '',
            conclusion: snapshot.conclusion,
            image: snapshot.image,
            mask: snapshot.mask,
            createdAt: date
        }).then(() => {
            dispatch({ type: 'CREATE_SNAPSHOT', snapshot});
        }).catch((err) => {
            dispatch({ type: 'CREATE_SNAPSHOT_ERROR', err});
        })
    }
};