import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { produce } from 'immer';
import { getNextSelectedId, insertNewComponent } from './utils';
import { ComponentPropsType } from '../../components/QuestionComponents';
import { arrayMove } from '@dnd-kit/sortable';
import cloneDeep from 'lodash.clonedeep';
import { nanoid } from 'nanoid';
/** 单个组件状态类型 */
export type ComponentInfoType = {
  fe_id: string; // 前端生成的id, 服务端Mongodb不认这种格式，所以自定义一个fe_id
  type: string; // 组件类型
  title: string;
  isHidden?: boolean; // 组件是否隐藏
  isLocked?: boolean; // 组件是否被锁定
  props: ComponentPropsType;
};
/** 编辑器页面状态类型 */
export type ComponentsStateType = {
  /** 当前选中的组件Id */
  selectedId: string;
  /** 当前编辑页面对应的组件列表 */
  componentList: Array<ComponentInfoType>;
  /** 存放复制的组件 */
  copiedComponent: ComponentInfoType | null;
};
/** 初始化状态 */
const INIT_STATE: ComponentsStateType = {
  selectedId: '',
  componentList: [],
  copiedComponent: null,
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
    /** 移动组件位置 */
    moveComponent: produce(
      (
        draft: ComponentsStateType,
        action: PayloadAction<{ oldIndex: number; newIndex: number }>
      ) => {
        const { oldIndex, newIndex } = action.payload;
        const { componentList: curComponentList } = draft;
        draft.componentList = arrayMove(curComponentList, oldIndex, newIndex);
      }
    ),
    /** 删除选中的组件 */
    removeSelectedComponent: produce((draft: ComponentsStateType) => {
      const { componentList = [], selectedId: removeId } = draft;
      if (!removeId) return;

      // 重新计算 选中id
      const newSelectedId = getNextSelectedId(removeId, componentList);
      draft.selectedId = newSelectedId;

      const index = componentList.findIndex(c => c.fe_id === removeId);
      componentList.splice(index, 1);
    }),
    /** 隐藏/显示选中组件 */
    changeComponentHidden: produce(
      (draft: ComponentsStateType, action: PayloadAction<{ fe_id: string; isHidden: boolean }>) => {
        const { componentList = [] } = draft;
        const { fe_id, isHidden } = action.payload;

        // 重新计算 selectedId
        let newSelectedId = '';
        if (isHidden) {
          // 要隐藏
          newSelectedId = getNextSelectedId(fe_id, componentList);
        } else {
          // 要显示
          newSelectedId = fe_id;
        }
        draft.selectedId = newSelectedId;

        const curComponent = componentList.find(c => c.fe_id === fe_id);
        if (curComponent) {
          curComponent.isHidden = isHidden;
        }
      }
    ),
    /** 锁定/解锁组件 */
    toggleComponentLocked: produce(
      (draft: ComponentsStateType, action: PayloadAction<{ fe_id: string }>) => {
        const { fe_id } = action.payload;

        const curComp = draft.componentList.find(c => c.fe_id === fe_id);
        if (curComp) {
          curComp.isLocked = !curComp.isLocked;
        }
      }
    ),
    /** 拷贝当前选中的组件 */
    copySelectedComponent: produce((draft: ComponentsStateType) => {
      const { selectedId, componentList = [] } = draft;
      const selectedComponent = componentList.find(c => c.fe_id === selectedId);
      if (selectedComponent == null) return;
      draft.copiedComponent = cloneDeep(selectedComponent); // 深拷贝
    }),
    /** 粘贴组件 */
    pasteCopiedComponent: produce((draft: ComponentsStateType) => {
      const { copiedComponent } = draft;
      if (copiedComponent == null) return;

      // 要把 fe_id 给修改了，重要！！
      copiedComponent.fe_id = nanoid();

      // 插入 copiedComponent
      insertNewComponent(draft, copiedComponent);
    }),
    /** 选中上一个 */
    selectPrevComponent: produce((draft: ComponentsStateType) => {
      const { selectedId, componentList } = draft;
      const selectedIndex = componentList.findIndex(c => c.fe_id === selectedId);

      if (selectedIndex < 0) return; // 未选中组件
      if (selectedIndex <= 0) return; // 已经选中了第一个，无法在向上选中

      draft.selectedId = componentList[selectedIndex - 1].fe_id;
    }),

    /** 选中下一个 */
    selectNextComponent: produce((draft: ComponentsStateType) => {
      const { selectedId, componentList } = draft;
      const selectedIndex = componentList.findIndex(c => c.fe_id === selectedId);

      if (selectedIndex < 0) return; // 未选中组件
      if (selectedIndex + 1 === componentList.length) return; // 已经选中了最后一个，无法再向下选中

      draft.selectedId = componentList[selectedIndex + 1].fe_id;
    }),
  },
});
export const {
  resetComponents,
  addComponent,
  changeSelectedId,
  changeComponentProps,
  moveComponent,
  removeSelectedComponent,
  changeComponentHidden,
  toggleComponentLocked,
  copySelectedComponent,
  pasteCopiedComponent,
  selectPrevComponent,
  selectNextComponent,
} = componentsSlice.actions;

export default componentsSlice.reducer;
