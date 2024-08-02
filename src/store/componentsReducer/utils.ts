import { ComponentInfoType, ComponentsStateType } from './index';

/**
 *
 * @param draft state draft
 * @param newComponent 新组件
 */
export function insertNewComponent(draft: ComponentsStateType, newComponent: ComponentInfoType) {
  const { selectedId, componentList } = draft;
  /** 当前选中组件的索引 */
  const index = componentList.findIndex(c => c.fe_id === selectedId);

  if (index < 0) {
    // 没有选中任何组件，则尾插
    draft.componentList.push(newComponent);
  } else {
    // 选中了组件，则插入到选中组件的下一个
    draft.componentList.splice(index + 1, 0, newComponent);
  }
  /** 选中id改为新组件的id */
  draft.selectedId = newComponent.fe_id;
}
