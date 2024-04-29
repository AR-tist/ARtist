import { exampleActions } from './exampleSlice';

export const exampleAction = (exampleVar) => {
    return (dispatch) => {
        dispatch(exampleActions.action({ examVar: exampleVar }));
    };
}
