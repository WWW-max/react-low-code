import { configureStore } from '@reduxjs/toolkit';
import componentsReducer, { ComponentsStateType } from './componentsReducer';
import pageInfoReducer, { PageInfoType } from './pageInfoReducer';

export default configureStore({
  reducer: {
    components: componentsReducer,

    pageInfo: pageInfoReducer,
  },
});

export type StateType = {
  components: ComponentsStateType;
  pageInfo: PageInfoType;
};
