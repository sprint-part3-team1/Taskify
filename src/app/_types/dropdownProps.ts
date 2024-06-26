import React, { SetStateAction } from 'react';

export type MemberInfoType = {
  createdAt: string;
  email: string;
  id: number;
  isOwner: boolean;
  nickname: string;
  profileImageUrl: string | null;
  updatedAt: string;
  userId: number;
};

export type DropDownPropsType = {
  title: string;
  setStatusColumnId?: React.Dispatch<React.SetStateAction<number | undefined>>;
  columnId?: number | null;
  clickedMember?: MemberInfoType | null;
  clickedMemberIndex?: number | null;
  setClickedMember?:
    | React.Dispatch<SetStateAction<MemberInfoType | null | undefined>>
    | undefined;
};

export type StatusTagPropsType = {
  status: string;
};

export type PopupDropDwnPropsType = {
  options: {
    name: string;
    onOptionSelect: () => void;
  }[];
  setIsPressedMoreIcon: React.Dispatch<React.SetStateAction<boolean>>;
};
