import moment from 'moment'

export interface dataItemInterface {
  id: string,
  status: number,
  createdTimestamp: number,
  updatedTimestamp: number,
  coinPrice: string,
  expireDate: string,
  leaseEnd: number,
  symbol: string,
  blockNumber: number,
  currentBorder: boolean,
}

function getRandomStatus () {
  const num = Math.floor(Math.random() * 10);
  return num % 3;
}

function getRandomId() {
  return `${Math.floor(Math.random() * 100000)}${new Date().getTime()}`
}

function getRandomTimeStamp() {
  return new Date().getTime();
}

function getExpiredTime(createdTimestamp: number, leaseEnd: number, blockNumber: number): number {
  return createdTimestamp + 3000 * leaseEnd - blockNumber
}

const sampleData = {
    "id": 71,
    "blockNumber": 12297450,
    "transactionIndex": 6, 
    "sources": [ 0, 1, 2, 3],
    "symbol": "eth",
    "slug": "ethereum",
    "status": 0,
    "leaseEnd": 12499050,
    "subscriptionId": 7, 
    "networkId": 0, 
    "aggregationStrategy": 1, 
    "reportingStrategy": 0, 
    "client": { 
      "clientType": 0, 
      "connectionInfo": {
        "contractAddress": "0x0F9dfd6043965B02e74D01188c13936fBE71D688",
        "networkId": 0 
      }
    },
    "createdTimestamp": "2021-09-12T08:36:26.555",
    "updatedTimestamp": "2021-09-12T08:36:26.555",
    "display": true 
}



const tool = {
    getData(): Promise<dataItemInterface[]> {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const arr: any[] = [];
          for (let i = 0; i < 10; i++) {
            const o: any = {...sampleData};
            o.id = getRandomId()
            o.status = getRandomStatus();
            o.createdTimestamp = getRandomTimeStamp();
            o.updatedTimestamp = getRandomTimeStamp();
            o.expireDate1 = getExpiredTime(o.createdTimestamp, o.leaseEnd, o.blockNumber)
            o.expireDate = moment(o.expireDate1).format('DD/MM/YYYY h:mm');
            o.currentBorder = false;
            arr.push(o)
          }
          resolve(arr);
        }, 3000)
      })
    },
    getCoinPrice(subscriptionId: string): Promise<string> {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const result = (subscriptionId + '').substr(1,8)
          resolve(result)
        }, 100) 
      })
    }
} 

export default tool