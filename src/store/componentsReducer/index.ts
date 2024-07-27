import { createSlice, PayloadAction } from '@reduxjs/toolkit';
/** 单个组件状态类型 */
export type ComponentInfoType = {
    fe_id: string // 前端生成的id, 服务端Mongodb不认这种格式，所以自定义一个fe_id
    type: string  // 组件类型
    title: string
}
/** 组件列表compoentList类型 */
export type ComponentsStateType = {
    selectedId: string;
    componentList: Array<ComponentInfoType>
}
/** 初始化状态 */
const INIT_STATE: ComponentsStateType = {
    selectedId: '',
    componentList: [],
}

/** 创建状态切片 */
export const componentsSlice = createSlice({
    name: 'components',
    initialState: INIT_STATE,
    reducers: {
        /** 重置所有组件 */
        resetComponents: (state: ComponentsStateType, action: PayloadAction<ComponentsStateType>) => {
            return action.payload;
        }
    }
});

export const {
    resetComponents,
} = componentsSlice.actions

export default componentsSlice.reducer;