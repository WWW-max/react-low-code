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
/**
 * 获取下一个 选中id
 * @param fe_id 当前id
 * @param componentList 组件列表
 */
export function getNextSelectedId(fe_id: string, componentList: ComponentInfoType[]) {
  // const visibleComponentList = componentList.filter(c => !c.isHidden);
  const index = componentList.findIndex(c => c.fe_id === fe_id);
  if (index < 0) return '';

  // 重新计算selectdId
  let newSelectedId = '';
  const length = componentList.length;
  if (length <= 1) {
    // 只有一个组件，删除后没有选中的组件
    newSelectedId = '';
  } else {
    // 组件长度 > 1
    if (index + 1 === length) {
      // 删除最后一个，则选中上一个
      newSelectedId = componentList[index - 1].fe_id;
    } else {
      // 删除的不是最后一个，则选中下一个
      newSelectedId = componentList[index + 1].fe_id;
    }
  }

  return newSelectedId;
}
