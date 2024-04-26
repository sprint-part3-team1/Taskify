import Link from 'next/link';
import { dashBoardDetailData } from '@/app/_slice/dashBoardDetail';
import useAppSelector from '@/app/_hooks/useAppSelector';
import styles from './BackDashBoardButton.module.css';
import arrow from '../../../../../public/assets/icons/arrow.svg';

const BackDashBoardButton = () => {
  const dashBoardDetailDatas = useAppSelector(dashBoardDetailData);
  const boardId = dashBoardDetailDatas?.id;
  return (
    <Link href={`/dashboard/${boardId}`} className={styles.button}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
      >
        <path
          d="M7.64075 10.0007L13.918 16.2779C14.0836 16.4435 14.1643 16.6406 14.16 16.8693C14.1557 17.0979 14.0708 17.295 13.9052 17.4606C13.7396 17.6262 13.5425 17.709 13.3139 17.709C13.0852 17.709 12.8881 17.6262 12.7225 17.4606L6.3427 11.068C6.19206 10.9173 6.08042 10.7485 6.00777 10.5616C5.93513 10.3746 5.89881 10.1876 5.89881 10.0007C5.89881 9.81371 5.93513 9.62675 6.00777 9.43978C6.08042 9.25282 6.19207 9.08402 6.3427 8.93338L12.7353 2.54076C12.9009 2.37516 13.0959 2.29449 13.3203 2.29876C13.5446 2.30303 13.7396 2.38797 13.9052 2.55357C14.0708 2.71917 14.1536 2.91628 14.1536 3.1449C14.1536 3.37353 14.0708 3.57064 13.9052 3.73623L7.64075 10.0007Z"
          fill="#333236"
        />
      </svg>
      돌아가기
    </Link>
  );
};

export default BackDashBoardButton;
