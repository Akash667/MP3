import React, { useState } from 'react';
import logo from './logo.svg';
import styles from './App.module.css';
import { Button, Card, CardContent, Input, Paper, Slider, TextField, Typography } from '@material-ui/core';
import { Animated } from 'react-animated-css';

function App() {

  const [press, setPress] = useState(false);

  const [valueHook,setValueHook] = useState(20);

  return (
    <div className={styles.app} >
      <Paper elevation={4} className={`${styles.menu} ${styles.box}`}>
            <canvas className={styles.canva} >

            </canvas>
      </Paper>

      <Paper elevation={4} className={`${styles.menu} ${styles.toolbar}`}>
        <Typography id="continuous-slider" gutterBottom>
        Seam
        </Typography>
        <Slider value={valueHook} onChange={(event,value)=> setValueHook((value as number))} aria-labelledby="continuous-slider"/>
      </Paper>

    </div >
  );
}



export default App;
