const initState = {
    isPending: false,
    snapshots: [],
    get_error: null,
    create_error: null,
    delete_error: null,
    isLoaded: false,
    isDescriptionUpdated: false,
    update_error: null,
    pin_error: null,
    unpin_error: null
}

const snapshotReducer = (state = initState, action) => {
    switch (action.type) {
        case 'CREATE_SNAPSHOT':
            return {
                ...state,
                snapshots: [action.snapshot].concat(state.snapshots)
            }

        case 'CREATE_SNAPSHOT_ERROR':
            return {
                ...state,
                create_error: action.error
            }

            case 'DELETE_SNAPSHOT':
                return {
                    ...state,
                    snapshots: state.snapshots.filter((value, index, arr) => {

                        return value.id !== action.snapshot_id;
                    
                    })
                }
    
            case 'DELETE_SNAPSHOT_ERROR':
                return {
                    ...state,
                    delete_error: action.error
                }

        case 'FETCH_SNAPSHOTS_PENDING':
            
            return {
                ...state,
                isPending: true
            }

        case 'FETCH_SNAPSHOTS_SUCCESS':
            return {
                ...state,
                isPending: false,
                isLoaded: true,
                snapshots: action.snapshots
            }

        case 'FETCH_SNAPSHOTS_ERROR':
            return {
                ...state,
                isPending: false,
                get_error: action.error
            }

        case 'UPDATE_DESCRIPTION':
            
            return {
                ...state,
                isDescriptionUpdated: true
            }

        case 'UPDATE_DESCRIPTION_ERROR':
            
            return {
                ...state,
                update_error: action.error
            }

        case 'PIN_SNAPSHOT':
            
            return {
                ...state,
            }

        case 'PIN_SNAPSHOT_ERROR':
            
            return {
                ...state,
                pin_error: action.error
            }

        case 'UNPIN_SNAPSHOT':
            
            return {
                ...state,
            }
    
        case 'UNPIN_SNAPSHOT_ERROR':
                
            return {
                ...state,
                unpin_error: action.error
            }

        default:
            return state;
    }
}

export default snapshotReducer;