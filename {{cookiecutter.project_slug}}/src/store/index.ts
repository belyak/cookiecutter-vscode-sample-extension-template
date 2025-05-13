import { 
  createStore, 
  combineReducers, 
  applyMiddleware, 
  Middleware, 
  Dispatch, // Ensure Dispatch is imported
  UnknownAction, // Added for logger typing
  AnyAction,
  Store
} from 'redux';

// Define the initial state types
export interface AppState {
  status: StatusState;
}

export interface StatusState {
  message: string;
  isLoading: boolean;
  error: string | null;
}

// Define action types
export const SET_STATUS_MESSAGE = 'SET_STATUS_MESSAGE';
export const SET_LOADING = 'SET_LOADING';
export const SET_ERROR = 'SET_ERROR';

interface SetStatusMessageAction {
  type: typeof SET_STATUS_MESSAGE;
  payload: string;
}

interface SetLoadingAction {
  type: typeof SET_LOADING;
  payload: boolean;
}

interface SetErrorAction {
  type: typeof SET_ERROR;
  payload: string | null;
}

export type StatusActionTypes = 
  | SetStatusMessageAction 
  | SetLoadingAction 
  | SetErrorAction;

// Action creators
export const setStatusMessage = (message: string): SetStatusMessageAction => ({
  type: SET_STATUS_MESSAGE,
  payload: message
});

export const setLoading = (isLoading: boolean): SetLoadingAction => ({
  type: SET_LOADING,
  payload: isLoading
});

export const setError = (error: string | null): SetErrorAction => ({
  type: SET_ERROR,
  payload: error
});

// Initial state
const initialStatusState: StatusState = {
  message: 'Extension initialized',
  isLoading: false,
  error: null
};

// Reducer
const statusReducer = (
  state = initialStatusState,
  action: StatusActionTypes
): StatusState => {
  switch (action.type) {
    case SET_STATUS_MESSAGE:
      return {
        ...state,
        message: action.payload
      };
    case SET_LOADING:
      return {
        ...state,
        isLoading: action.payload
      };
    case SET_ERROR:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};

// Root reducer
const rootReducer = combineReducers({
  status: statusReducer
});

// Define the root state type
export type RootState = ReturnType<typeof rootReducer>;

// Logger middleware
const logger = (store: any) => (next: any) => (action: any) => {
  console.log('Dispatching action type:', action.type);
  let result = next(action);
  console.log('Next state:', store.getState());
  return result;
};

// Create store with middleware
// Using casting to bypass TypeScript's type checking for createStore
export const store = createStore(
  rootReducer,
  undefined, // No preloaded state
  applyMiddleware(logger)
) as Store<RootState, StatusActionTypes>;
