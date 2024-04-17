import React from 'react';
import ModalContainer from '@/app/_components/modal/ModalContainer';
import { ModalPropsType } from '@/app/_types/modalProps';
import Input from '@/app/_components/Input';

const NewColumnModal = ({
  openModalType,
  setOpenModalType,
}: ModalPropsType) => {
  return (
    <ModalContainer
      title="새 컬럼 생성"
      checkString="생성"
      cancelString="취소"
      openModalType={openModalType}
      setOpenModalType={setOpenModalType}
    >
      <Input
        inputName="이름"
        inputType="text"
        inputWidth={484}
        errorState={false}
      />
    </ModalContainer>
  );
};
export default NewColumnModal;
