'use client';

import { registerActions, userResponse } from '@/app/_slice/registerSlice';

import React, { useEffect, useState } from 'react';
import useAppDispatch from '@/app/_hooks/useAppDispatch';
import useAppSelector from '@/app/_hooks/useAppSelector';
import { dashBoardActions, dashBoardData } from '@/app/_slice/dashBoardSlice';
import Link from 'next/link';
import SideMenu from '../mydashboard/_components/SideMenu';
import styles from './layout.module.css';

export default function Layout({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();

  const dashBoardDatas = useAppSelector(dashBoardData);


  const userData = useAppSelector(userResponse);

  useEffect(() => {
    dispatch(dashBoardActions.asynchFetchGetDashBoard(1));
  }, [dispatch]);

  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(registerActions.asynchFetchgetUserInfo());
        setIsLoaded(true);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [dispatch]);

  if (!isLoaded) {
    return null;
  }
  return (
    <div style={{ display: 'flex' }}>
      {userData.data ? (
        <>
          <div style={{ height: '100vh' }}>
            <SideMenu dashBoardData={dashBoardDatas?.dashboards} />
          </div>
          <div className={styles.childrenWrapper}>{children}</div>
        </>
      ) : (
        <>
          <div style={{ fontSize: '100px' }}>로그인이 필요합니다</div>
          <div>
            <Link href="/login">
              <button>로그인 하러가기</button>
            </Link>
            <Link href="/">
              <button>메인 페이지로</button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
