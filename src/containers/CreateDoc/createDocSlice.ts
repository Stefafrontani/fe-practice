import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface createDocState { 
    docType: string 
};

const initialState: createDocState = { 
    docType: '' 
};

export const createDocSlice = createSlice({
  name: 'createDoc',
  initialState,
  reducers: {
    setDocType: (state, action: PayloadAction<string>) => {
      state.docType = action.payload;
    },
  },
});

export const { setDocType } = createDocSlice.actions;

export default createDocSlice.reducer;
