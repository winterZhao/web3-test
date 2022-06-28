import { useEffect, useState } from 'react';
import styles from './index.module.scss';
import OracleItem from '../../components/oracle-item';
import tool from '../../mock/index';
import { dataItemInterface } from '../../mock/index';
import CoinImg from '../../images/coin.svg';
import VectorImg from '../../images/vector.svg';

const Oracle: React.FC = () => {
  
  const [data, setData] = useState<dataItemInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getData = async () => {
    setLoading(true);
    const result: dataItemInterface[]  = await tool.getData();
    const ids = result.map((item: any) => item.id)
    const arr: any[] = [];
    ids.forEach(item => {
      arr.push(tool.getCoinPrice(item))
    })
    const priceResult: string[] = await Promise.all(arr);
    result.forEach((item, index) => {
      item.coinPrice = priceResult[index];
    })
    console.log(result)
    setData(result);
    setLoading(false)
  }

  const showBorder = (id: string): void => {
    const result: dataItemInterface[] = [];
    data.forEach(item => {
      const o: dataItemInterface = {...item};
      o.currentBorder = false;
      if (o.id === id) o.currentBorder = true;
      result.push(o);
    })
    setData(result);
  }

  useEffect(() => {
    getData()
  }, [])
  return (
    <div className={styles.container}>
      <h2 className={styles.logo}>
        <img className={styles['logo-image']} src={VectorImg} alt="" />
        <span className={styles['logo-title']}>Oracle</span>
      </h2>
      {
        loading && <div className={styles.loading}>
          <div className={styles['loading-span']}></div>
          <div className={styles['loading-span']}></div>
          <div className={styles['loading-span']}></div>
          <div className={styles['loading-span']}></div>
          <div className={styles['loading-span']}></div>
          <div className={styles['loading-span']}></div>
          <div className={styles['loading-span']}></div>
          <div className={styles['loading-span']}></div>
        </div>
      }
      {
        !loading && (
          <div className={styles.main}>
            {
              data.map(item => {
                const { symbol, id, status, coinPrice, expireDate, currentBorder } = item;
                return (
                  <div className={styles['oracle-item-wrapper']} key={id}>
                    <OracleItem id={id} coinImg={CoinImg} coinName={symbol} status={status} coinPrice={coinPrice} expireDate={expireDate} currentBorder={currentBorder} showBorder={showBorder} />
                  </div>
                )
              })
            }
          </div>
        )
      }
    </div>
  )
}

export default Oracle