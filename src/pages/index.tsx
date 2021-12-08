import styles from './index.less';
import { useEffect,useState } from 'react';
import { Button } from 'antd';
import axios from 'axios'
const CancelToken = axios.CancelToken
let cancel:any
export default function IndexPage() {
const [cash,useCash] = useState<any>()
 const onc=()=>{
    cancel?.();
    axios.get('/api/users',{
        cancelToken: new CancelToken(function executor(c) {
            cancel = c;
          }),
        params: {
            time: 5
          },
    })
    .then(function (response) {
    useCash(response.data);
 })
    .catch(function (error) {
     console.log(error);
})
 }

 const onc2=()=>{
    cancel?.();
    axios.get('/api/users',{
        cancelToken: new CancelToken(function executor(c) {
            cancel = c;
          }),
        params: {
            time: 10
          },
    })
    .then(function (response) {
    useCash(response.data);
 })
    .catch(function (error) {
     console.log(error);
})
}
  return (
    <div>
      <h1 className={styles.title}>Page index</h1>
      <Button onClick={onc}>3秒返回数据</Button>
      <Button onClick={onc2}>5秒返回数据</Button>
      <h2>{cash}</h2>
    </div>
  );
}

