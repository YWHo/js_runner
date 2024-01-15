import { useSelector, TypedUseSelectorHook } from 'react-redux';
import { RootState } from '../state/reducers';

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

// Refer to: https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-8.html#:~:text=TypeScript%203.8%20adds%20a%20new,export%20type%20%7B%20SomeThing%20%7D%3B
export type { RootState };
