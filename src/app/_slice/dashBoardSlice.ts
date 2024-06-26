import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../_store/store';

export interface DashBoardInformationType {
  id: number;
  title: string;
  color: string;
  userId: number;
  createAt: string;
  updatedAt: string;
  createdByMe: boolean;
}

interface DashBoardStateType {
  data: {
    dashboards: DashBoardInformationType[];
    totalCount: number;
  } | null;
}

const initialState: DashBoardStateType = {
  data: null,
};

const asynchFetchGetDashBoard = createAsyncThunk(
  'dashBoardSlice/asynchFetchGetDashBoard',

  async (page: number) => {
    const accessToken = localStorage.getItem('accessToken');

    const response = await axios.get(
      `https://sp-taskify-api.vercel.app/4-1/dashboards?navigationMethod=pagination&page=${page}&size=7`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    return response.data;
  },
);

const asynchFetchCreateDashBoard = createAsyncThunk(
  'dashBoardSlice/asynchFetchCreateDashBoard',

  async (createDashBoardValue: { title: string; color: string }) => {
    const { title, color } = createDashBoardValue;
    const accessToken = localStorage.getItem('accessToken');

    const response = await axios.post(
      'https://sp-taskify-api.vercel.app/4-1/dashboards',
      {
        title,
        color,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    return response.data;
  },
);

const asyncFetchUpdateDashBoard = createAsyncThunk(
  'dashBoardSlice/asyncFetchUpdateDashBoard',

  async (updateDashBoardValue: {
    dashBoardId: number;
    title: string;
    color: string;
  }) => {
    const { dashBoardId, title, color } = updateDashBoardValue;
    const accessToken = localStorage.getItem('accessToken');

    const response = await axios.put(
      `https://sp-taskify-api.vercel.app/4-1/dashboards/${dashBoardId}`,
      {
        title,
        color,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    return response.data;
  },
);

const asynchFetchDeleteDashBoard = createAsyncThunk(
  'dashBoardSlice/asynchFetchDeleteDashBoard',
  async (deleteDashBoardValue: { dashBoardId: number }) => {
    const { dashBoardId } = deleteDashBoardValue;
    const accessToken = localStorage.getItem('accessToken');

    const response = await axios.delete(
      `https://sp-taskify-api.vercel.app/4-1/dashboards/${dashBoardId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    return dashBoardId;
  },
);
const dashBoardSlice = createSlice({
  name: 'dashBoardSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      asynchFetchGetDashBoard.fulfilled,
      (state, action: PayloadAction<DashBoardStateType['data']>) => {
        state.data = action.payload;
      },
    );

    builder.addCase(asynchFetchCreateDashBoard.fulfilled, (state, action) => {
      if (state.data) {
        state.data.dashboards.unshift(action.payload);
        state.data.totalCount += 1; // 새로운 대시보드가 추가되면 totalCount 증가
      }
    });

    builder.addCase(asyncFetchUpdateDashBoard.fulfilled, (state, action) => {
      const updateDashBoard = action.payload;
      if (state.data) {
        const index = state.data.dashboards.findIndex(
          (item) => item.id === updateDashBoard.id,
        );
        if (index !== -1) {
          state.data.dashboards[index] = updateDashBoard;
        }
      }
    });

    builder.addCase(
      asynchFetchDeleteDashBoard.fulfilled,
      (state, action: PayloadAction<number>) => {
        const deletedDashBoardId = action.payload;
        if (state.data) {
          state.data.dashboards = state.data.dashboards.filter(
            (item) => item.id !== deletedDashBoardId,
          );
        }
      },
    );
  },
});

export default dashBoardSlice.reducer;

export const dashBoardActions = {
  ...dashBoardSlice.actions,
  asynchFetchGetDashBoard,
  asynchFetchCreateDashBoard,
  asyncFetchUpdateDashBoard,
  asynchFetchDeleteDashBoard,
};

export const dashBoardData = (state: RootState) => state.dashBoardData.data;
