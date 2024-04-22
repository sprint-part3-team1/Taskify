import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../_store/store';

interface MembersResponseType {
  data: {
    members: [
      {
        id: number;
        email: string;
        nickname: string;
        profileImageUrl: string | null;
        createdAt: string;
        updatedAt: string;
        isOwner: boolean;
        userId: number;
      },
    ];
    totalCount: number;
  } | null;
}

const initialState: MembersResponseType = {
  data: null,
};

const asyncGetMembers = createAsyncThunk(
  'memberSlice/asyncGetMembers',

  async (createdDashboard: { dashboardId: number }) => {
    const { dashboardId } = createdDashboard;
    const accessToken = localStorage.getItem('accessToken');
    const response = await axios.get(
      `https://sp-taskify-api.vercel.app/4-1/members?page=1&size=20&dashboardId=${dashboardId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    console.log(response.data);
    return response.data;
  },
);

const asyncDeleteMember = createAsyncThunk(
  'memberSlice/asyncDeleteMember',

  async (deleteMember: { memberId: number }) => {
    const { memberId } = deleteMember;
    const accessToken = localStorage.getItem('accessToken');
    const response = await axios.delete(
      `https://sp-taskify-api.vercel.app/4-1/members/${memberId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    console.log(memberId);
    return memberId;
  },
);

const memberSlice = createSlice({
  name: 'memberSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      asyncGetMembers.fulfilled,
      (state, action: PayloadAction<MembersResponseType['data']>) => {
        state.data = action.payload;
      },
    );
    builder.addCase(asyncDeleteMember.fulfilled, (state, action) => {
      const memberId = action.payload;
      const updatedMembers = state.data?.members?.filter(
        (item) => item.id !== memberId,
      );
      state.data.members = updatedMembers;
      if (state.data && state.data.totalCount !== null) {
        state.data.totalCount--;
      }
    });
  },
});

export default memberSlice.reducer;

export const memberActions = {
  ...memberSlice.actions,
  asyncGetMembers,
  asyncDeleteMember,
};

export const memberData = (state: RootState) => state.memberData.data;