import { useEffect, useState } from 'react';
import styles from './index.module.scss';

const localhost = 'http://127.0.0.1:7545'
const web3 = new (window as any).Web3()
web3.setProvider(localhost)

const Oracle: React.FC = () => {
  const [currentAccount, setCurrentAccount] = useState<string>('')
  const [currentBalance, setCurrentBalance] = useState<string>('')
  const [targetAddress, setTargetAddress] = useState<string>('')
  const [amount, setAmount] = useState<number>(0)

  const getData = async () => {
    const result = await web3.eth.getAccounts();
    const balance = await web3.eth.getBalance(result[0]);
    setCurrentAccount(result[0]);
    setCurrentBalance(balance);
    setTargetAddress(result[1])
  }

  const modifyTargetAddress = (e: any) => {
    setTargetAddress(e.target.value)
  }

  const modifyTokenAmount = (e: any) => {
    setAmount(e.target.value)
  }

  const transfer = async () => {
    try {
      if (targetAddress.length !== 42) {
        alert('收款人账号不正确')
        return
      }
      if (amount > parseFloat(currentBalance)) {
        alert('账户余额不足')
        return
      }
      console.log({
        from: currentAccount,
        to: targetAddress,
        value: amount
      })
      const result = await web3.eth.sendTransaction({
        from: currentAccount,
        to: targetAddress,
        value: amount
      })
      console.log(result);
      if (result && result.blockHash) {
        alert('交易发送成功')
      } else {
        alert('交易发送失败')
      }      
    } catch (e) {
      console.log(e)
      alert('交易发送失败')
    }
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div className={styles.container}>
      <h2>Transfer</h2>
      <p>Transfer your Token here</p>
      <div>currentAddress</div>
      <p>{currentAccount}</p>
      <div>Balance</div>
      <p>{currentBalance}</p>
      <div>targetAddress</div>
      <input placeholder='target Address' onChange={(e) => { modifyTargetAddress(e) }} value={targetAddress} />
      <div>Token Amount</div>
      <input placeholder='token amount' onChange={(e) => { modifyTokenAmount(e) }} value={amount} />
      <p>Make sure you have IYO Token</p>
      <br/>
      <button onClick={() => {transfer()}}>Transfer</button>
    </div>
  )
}

export default Oracle