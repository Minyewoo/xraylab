export const createSnapshot = (snapshot) => {
    
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        //make async call to database
        const firestore = getFirestore();
        const profile = getState().firebase.profile;
        const authorId = getState().firebase.auth.uid;

        firestore.collection('snapshots').add({
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
        })
    }
};