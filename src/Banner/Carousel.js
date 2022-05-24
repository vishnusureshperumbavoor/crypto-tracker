import React, { useEffect } from 'react'
import {makeStyles} from '@material-ui/core'
import axios from 'axios'
import { CryptoState } from '../CryptoContext'
import { TrendingCoins } from '../Config/Api'
import { useState } from 'react'

const useStyles = makeStyles(()=>({
    Carousel:{
        height:"50%",
        display:"flex",
        alignItems:"center"
    }
}))

function Carousel() {
  const classes = useStyles();
  const {currency} = CryptoState();
  const [trending,setTrending] = useState([])
  const fetchTrendingCoins=async()=>{
      const {data} = await axios.get(TrendingCoins(currency))
      setTrending(data)
  }
  console.log(trending);
  useEffect(()=>{
      fetchTrendingCoins();
  },[currency])
  return (
    <div className={classes.Carousel}>Carousel</div>
  )
}

export default Carousel