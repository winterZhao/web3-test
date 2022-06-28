import styles from './index.module.scss';
import ActiveImg from '../../images/active.svg';
import SuspendedImg from '../../images/suspended.svg';
import TerminatedImg from '../../images/terminated.svg';

interface Props {
  id: string,
  coinName: string,
  status: number, // 状态  0: Active, 1: Suspended, 2: Terminated
  coinPrice: string,
  expireDate: string,
  coinImg: any,
  showBorder: (id: string) => void //触发元素点击事件
  currentBorder: boolean,  // 当前元素是否显示边框
}

const statusMap = ['Active', 'Suspended', 'Terminated']

const OracleItem: React.FC<Props> = ({
  id,
  coinName,
  status,
  coinPrice,
  expireDate,
  coinImg,
  showBorder,
  currentBorder
})  => {

  return (
    <div className={`${styles['item-container']} ${currentBorder ? styles.current : ''}`} onClick={() => { showBorder(id)}}>
      <div className={styles['item-header']}>
        <div className={styles['item-header-left']}>
          <span className={styles['item-header-left-title']} >{coinName}</span>
        </div>
        <div className={styles['item-header-right']}>
          {
            status === 0 && <>
              <img className={styles['item-header-right-icon']} src={ActiveImg} alt="" />
              <span className={`${styles['item-header-right-Active']}`}>
                {statusMap[status]}
              </span>
            </>
          }
          {
            status === 1 && <>
              <img className={styles['item-header-right-icon']} src={SuspendedImg} alt="" />
              <span className={`${styles['item-header-right-Suspended']}`}>
                {statusMap[status]}
              </span>
            </>
          }
          {
            status === 2 && <>
              <img className={styles['item-header-right-icon']} src={TerminatedImg} alt="" />
              <span className={`${styles['item-header-right-Terminated']}`}>
                {statusMap[status]}
              </span>
            </>
          }
        </div>
      </div>
      <div className={styles['item-body']}>
        <img className={styles['item-body-img']} src={coinImg} alt="" />
        <div className={styles['item-body-right']}>
          <span className={styles['item-body-right-title']} >$ {coinPrice}</span><br/>
          <span className={styles['item-body-right-desc']} >End: {expireDate}</span>
        </div>
      </div>
    </div>
  )
}

export default OracleItem