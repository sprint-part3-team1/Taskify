import React, { useState, useRef } from 'react';
import Image from 'next/image';
import styles from './InputModal.module.css';
import ImageEditIcon from '../../../../public/assets/icons/imageEditIcon.svg';
import PlusIcon from '../../../../public/assets/icons/plusIcon.svg';

/** 임의로 만든 input 입니다. */

type InputModalProps = {
  title: string;
  essential?: boolean;
  type: string;
};

const InputModal = ({ title, essential, type }: InputModalProps) => {
  const LOGO_IMAGE = '/assets/images/logoImg.svg';
  const [selectedImagePath, setSelectedImagePath] = useState();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImagePath(imageUrl);
    }
  };

  switch (type) {
    case 'multiLine':
      return (
        <div className={styles.container}>
          <p id={styles.title}>
            {title} {essential && <span id={styles.essential}>*</span>}
          </p>
          <textarea
            rows={2}
            className={`${styles.input} ${styles.multiLineInput}`}
          />
        </div>
      );
    case 'image':
      return (
        <div className={styles.container}>
          <p id={styles.title}>
            {title} {essential && <span id={styles.essential}>*</span>}
          </p>
          <div
            className={`${selectedImagePath ? styles.imageContainer : styles.noImageDiv}`}
          >
            <label htmlFor="fileInput" className={styles.customFileInput}>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                className={styles.fileInput}
              />
              {selectedImagePath ? (
                <div className={styles.imageDiv}>
                  <Image
                    fill
                    src={selectedImagePath}
                    alt="대시보드 이미지"
                    className={styles.image}
                  />
                  <ImageEditIcon className={styles.editIcon} />
                </div>
              ) : (
                <PlusIcon />
              )}
            </label>
          </div>
        </div>
      );
    default:
      return (
        <div className={styles.container}>
          <p id={styles.title}>
            {title} {essential && <span id={styles.essential}>*</span>}
          </p>
          <input className={styles.input} />
        </div>
      );
  }
};

export default InputModal;
