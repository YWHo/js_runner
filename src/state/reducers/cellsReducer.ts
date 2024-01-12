import { produce } from 'immer';
import { ActionType } from '../action-types';
import { Action } from '../actions';
import { Cell } from '../cell';

interface CellsState {
  loading: boolean;
  error: string | null;
  order: string[];
  data: {
    [key: string]: Cell;
  };
}

const initialState: CellsState = {
  loading: false,
  error: null,
  order: [],
  data: {},
};

// Note: There is no need to call "return state" because immer will return automatically;
//       However, TypeScript will wrongly think that the reducer could be undefined
//       if "return state" is not given or we just do an empty "return".
//       Therefore, we are doing a redundant "return state" here so that TypeScript
//       won't have the wrong assumption
const reducer = produce((state: CellsState = initialState, action: Action) => {
  switch (action.type) {
    case ActionType.UPDATE_CELL: {
      const { id, content } = action.payload;
      state.data[id].content = content;
      return state;
    }
    case ActionType.DELETE_CELL: {
      const givenId = action.payload;
      delete state.data[givenId];
      state.order = state.order.filter((id) => id !== givenId);
      return state;
    }
    case ActionType.MOVE_CELL: {
      const { id: givenId, direction } = action.payload;
      const index = state.order.findIndex((id) => id === givenId);
      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex > state.order.length - 1) {
        return state;
      }
      state.order[index] = state.order[targetIndex];
      state.order[targetIndex] = givenId;
      return state;
    }

    case ActionType.INSERT_CELL_BEFORE: {
      const { id: givenId, type } = action.payload;
      const cell: Cell = {
        content: '',
        type,
        id: randomId(),
      };

      state.data[cell.id] = cell;
      const index = state.order.findIndex((id) => id === givenId);
      if (index < 0) {
        state.order.push(cell.id);
      } else {
        state.order.splice(index, 0, cell.id);
      }
      return state;
    }
    default:
      return state;
  }
}, initialState);

const randomId = () => {
  return Math.random().toString(36).substring(2, 9);
};

export default reducer;
