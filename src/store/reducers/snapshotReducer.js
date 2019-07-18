const initState = {
    snapshots: [
        {id: '1', title: 'Title1', content: 'Content1'},
        {id: '2', title: 'Title2', content: 'Content2'},
        {id: '3', title: 'Title3', content: 'Content3'},

    ]
}

const snapshotReducer = (state = initState, action) => {
    switch (action.type) {
        case 'CREATE_SNAPSHOT':
            console.log('created snapshot', action.snapshot);
            return state;
        case 'CREATE_SNAPSHOT_ERROR':
            console.log('create snapshot error', action.err);
            return state;
        default:
            return state;
    }
}

export default snapshotReducer