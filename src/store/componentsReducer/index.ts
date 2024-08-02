import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { produce } from 'immer';
import { insertNewComponent } from './utils';
import { ComponentPropsType } from '../../components/QuestionComponents';
/** 单个组件状态类型 */
export type ComponentInfoType = {
  fe_id: string; // 前端生成的id, 服务端Mongodb不认这种格式，所以自定义一个fe_id
  type: string; // 组件类型
  title: string;
  props: ComponentPropsType;
};
/** 编辑页面状态类型 */
export type ComponentsStateType = {
  /** 当前选中的组件Id */
  selectedId: string;
  /** 当前编辑页面对应的组件列表 */
  componentList: Array<ComponentInfoType>;
};
/** 初始化状态 */
const INIT_STATE: ComponentsStateType = {
  selectedId: '',
  componentList: [],
};

/** 创建状态切片 */
export const componentsSlice = createSlice({
  name: 'components',
  initialState: INIT_STATE,
  reducers: {
    /** 重置所有组件 */
    resetComponents: (state: ComponentsStateType, action: PayloadAction<ComponentsStateType>) => {
      return action.payload;
    },
    /** 添加新组件 */
    addComponent: produce(
      (draft: ComponentsStateType, action: PayloadAction<ComponentInfoType>) => {
        const newComponent = action.payload;
        insertNewComponent(draft, newComponent);
      }
    ),
    /** 修改选中id */
    changeSelectedId: produce((draft: ComponentsStateType, action: PayloadAction<string>) => {
      draft.selectedId = action.payload;
    }),
    /** 修改组件属性 */
    changeComponentProps: produce(
      (
        draft: ComponentsStateType,
        action: PayloadAction<{ fe_id: string; newProps: ComponentPropsType }>
      ) => {
        const { fe_id, newProps } = action.payload;

        // 当前要修改的这个组件
        const curComp = draft.componentList.find(c => c.fe_id === fe_id);
        if (curComp) {
          curComp.props = {
            ...curComp.props,
            ...newProps,
          };
        }
      }
    ),
  },
});

export const { resetComponents, addComponent, changeSelectedId, changeComponentProps } =
  componentsSlice.actions;

export default componentsSlice.reducer;
