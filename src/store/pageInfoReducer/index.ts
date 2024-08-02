import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { produce } from 'immer';

export type PageInfoType = {
  title?: string;
  desc?: string;
  js?: string;
  css?: string;
  isPublished?: boolean;
};

const INIT_STATE: PageInfoType = {
  title: '',
  desc: '',
  js: '',
  css: '',
  isPublished: false,
};

const pageInfoSlice = createSlice({
  name: 'pageInfo',
  initialState: INIT_STATE,
  reducers: {
    resetPageInfo: (state: PageInfoType, action: PayloadAction<PageInfoType>) => {
      return action.payload;
    },
    /** 修改标题 */
    changePageTile: produce((draft: PageInfoType, action: PayloadAction<string>) => {
      draft.title = action.payload;
    }),
  },
});

export const { resetPageInfo, changePageTile } = pageInfoSlice.actions;

export default pageInfoSlice.reducer;
