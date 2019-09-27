const initState = {
    isPending: false,
    snapshots: [],
    get_error: null,
    create_error: null,
    isLoaded: false
}

const snapshotReducer = (state = initState, action) => {
    switch (action.type) {
        case 'CREATE_SNAPSHOT':
            //console.log('created snapshot', action.snapshot);
            //state.snapshots.push(action.snapshot);
            //console.log(state)
            return {
                ...state,
                snapshots: state.snapshots.concat(action.snapshot)
            }

        case 'CREATE_SNAPSHOT_ERROR':
            console.log('create snapshot error', action.error);
            return {
                ...state,
                create_error: action.error
            }

        case 'FETCH_SNAPSHOTS_PENDING':
            console.log('pending loading') 
            return {
                ...state,
                isPending: true
            }

        case 'FETCH_SNAPSHOTS_SUCCESS':
            console.log('snapshots loaded')

            return {
                ...state,
                isPending: false,
                isLoaded: true,
                snapshots: action.snapshots
            }

        case 'FETCH_SNAPSHOTS_ERROR':
            console.log('snapshots loading error', action.error)
            return {
                ...state,
                isPending: false,
                get_error: action.error
            }

        default:
            return state;
    }
}

export default snapshotReducer;