import { configureStore } from '@reduxjs/toolkit';
import componentsReducer, { ComponentsStateType } from './componentsReducer';

export default configureStore({
  reducer: {
    components: componentsReducer,
  },
});

export type StateType = {
  components: ComponentsStateType;
};
