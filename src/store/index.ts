import { configureStore } from '@reduxjs/toolkit';
import componentsReducer, { ComponentsStateType } from './componentsReducer';
import pageInfoReducer, { PageInfoType } from './pageInfoReducer';
import undoable, { excludeAction, StateWithHistory } from 'redux-undo';
import userReducer, { UserStateType } from './userReducer/userReducer';

export type StateType = {
  user: UserStateType;
  // components: ComponentsStateType;
  components: StateWithHistory<ComponentsStateType>; // 增加了 undo
  pageInfo: PageInfoType;
};

export default configureStore({
  reducer: {
    user: userReducer,
    /** 没有undo 功能 */
    // components: componentsReducer,

    /** 增加了undo功能 */
    components: undoable(componentsReducer, {
      limit: 20, // 限制 undo 20 步
      filter: excludeAction([
        'components/resetComponents',
        'components/changeSelectedId',
        'components/selectPrevComponent',
        'components/selectNextComponent',
      ]),
    }),

    pageInfo: pageInfoReducer,
  },
});
