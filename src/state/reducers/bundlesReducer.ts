import { produce } from 'immer';
import { ActionType } from '../action-types';
import { Action } from '../actions';

interface BundlesState {
  [key: string]:
    | {
        loading: boolean;
        code: string;
        err: string;
      }
    | undefined;
}

const initialState: BundlesState = {};

// Note: There is no need to call "return state" because immer will return automatically;
//       However, TypeScript will wrongly think that the reducer could be undefined
//       if "return state" is not given or we just do an empty "return".
//       Therefore, we are doing a redundant "return state" here so that TypeScript
//       won't have the wrong assumption
const reducer = produce(
  (state: BundlesState = initialState, action: Action): BundlesState => {
    switch (action.type) {
      case ActionType.BUNDLE_START: {
        const { cellId } = action.payload;
        state[cellId] = {
          loading: true,
          code: '',
          err: '',
        };
        return state;
      }
      case ActionType.BUNDLE_COMPLETE: {
        const {
          cellId,
          bundle: { code, err },
        } = action.payload;
        state[cellId] = {
          loading: false,
          code: code,
          err,
        };
        return state;
      }
      default:
        return state;
    }
  },
  initialState,
);

export default reducer;
