import React, { useEffect, useState } from 'react';
import './App.css';
import Container from '@material-ui/core/Container';
import { CssBaseline, Typography } from '@material-ui/core';
import TypingArea from './components/TypingArea/TypingArea'
import getDefault from './util/getDefault';

const App: React.FC = () => {

  type Start = {
    originalText: string,
    kanaText: string
  }[]
  const start = [
    {
      originalText: "犬も歩けば棒に当たる",
      kanaText: "いぬもあるけばぼうにあたる"
    }
  ]
  const [defaultTexts, setDefaultTexts] = useState<Start | undefined>(start);


  

  // 副作用フック
  useEffect(() => {
    let unmounted = false;

    //非同期無名関数の即時呼び出し
    (async () => {

      //非同期でデータを取得
      const result = await getDefault();//架空の関数
      console.log(result);

      //アンマウントされていなければステートを更新
      if (!unmounted) {
        setDefaultTexts(result);
      };

    })();

    //クリーンアップ関数を返す
    return () => { unmounted = true; };
  }, []);



  return (
    <>
      <CssBaseline />
      <Container fixed>
        <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '100vh', alignContent: 'center' }} >
          <TypingArea kotowaza={defaultTexts} />
        </Typography>
        {JSON.stringify(defaultTexts)}
      </Container>
    </>

  );
}

export default App;
