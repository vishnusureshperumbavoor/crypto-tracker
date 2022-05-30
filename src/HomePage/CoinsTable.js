import React, { useEffect, useState } from 'react'
import { CoinList } from '../Config/Api'
import axios from 'axios';
import { CryptoState } from '../CryptoContext';
import { ThemeProvider,createTheme, Container, Typography, TextField, TableContainer, LinearProgress, Table, TableHead, TableRow, TableCell, TableBody, makeStyles } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import { numberWithCommas } from '../HomePage/Carousel';
import { Pagination } from '@material-ui/lab';
const darkTheme = createTheme({
    palette: {
        primary:{
            main:"#fff"
        },
      type: 'dark',
    }
}); 
function CoinsTable() {
    const [coins,setCoins] = useState([]);
    const [loading,setLoading] = useState(false);
    const {currency,symbol} = CryptoState();
    const [search,setSearch] = useState("");
    const [page,setPage] = useState(1);
    const navigate = useNavigate();
    const fetchCoins=async()=>{
        setLoading(true)
        const {data} = await axios.get(CoinList(currency));
        setCoins(data)
        setLoading(false)
    }
    console.log(coins)
    useEffect(()=>{
        fetchCoins()
    },[currency])
    const handleSearch=()=>{
        return coins.filter((coin)=>(
            coin.name.toLowerCase().includes(search) || 
            coin.symbol.toLowerCase().includes(search)            
        ))
    }    
    const useStyles = makeStyles(()=>({
        row:{
            backgroundColor:"#16171a",
            cursor:"pointer",
            "&:hover":{
                backgroundColor:"#131111"
            },
            fontFamily:"Montserrat"
        },
        pagination:{
            "& .MuiPaginationItem-root":{
                color:"gold"
            }
        }
    }))
    const classes = useStyles();
  return (
    
    <ThemeProvider theme={darkTheme}>
        <Container style={{textAlign:"center"}}>
            <Typography variant='h4' style={{margin:18,fontFamily:"Montserrat"}} >
                      CryptoCurrency Prices by Market Cap
            </Typography>
            <TextField label="Search for a Crypto Currency..." variant="outlined"
            style={{marginBottom:20,width:"100%"}}
            onChange={(e)=>setSearch(e.target.value)}>
            </TextField>
            <TableContainer>
                {
                    loading?(
                        <LinearProgress style={{background:"gold"}}>

                        </LinearProgress>
                    ):(
                        <Table>
                            <TableHead style={{backgroundColor:"#EEBC1D"}} >
                                <TableRow>
                                    {
                                        ["Coin","Price","24h Change","Market Cap"].map((head)=>(
                                        <TableCell style={{
                                            color:"black",fontWeight:"700",fontFamily:"MontSerrat"
                                        }}
                                        key={head} align={head==="Coin" ? "" : "right"}
                                        >
                                            {head}
                                        </TableCell>
                                        ))
                                    }
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {handleSearch()
                                .slice((page-1)*10,(page-1)*10+10)
                                .map((row)=>{
                                    const profit = row.price_change_percentage_24h > 0;
                                    return(
                                        <TableRow onClick={()=>navigate(`/coins/${row.id}`)}
                                            className={classes.row}
                                            key={row.name}>
                                                <TableCell component='th' scope='row'
                                                style={{
                                                    display:"flex", gap:15
                                                }} >
                                                   <img src={row?.image} alt={row.name} height="80" style={{marginBottom:10}} /> 
                                                <div style={{textTransform:"flex",flexDirection:"column"}} >
                                                    <span style={{textTransform:"uppercase",fontSize:22}} >
                                                        {row.symbol}
                                                    </span><br></br>
                                                    <span style={{color:"darkgrey"}} >
                                                        {row.name}
                                                    </span>

                                                </div>
                                                </TableCell>
                                                <TableCell align="right" >
                                                    {symbol}{""}
                                                    {numberWithCommas(row.current_price.toFixed(2))}
                                                </TableCell>
                                                <TableCell align="right" style={{
                                                    color:profit > 0 ? "green" : "red",
                                                    fontWeight:500
                                                }} > 
                                                {profit && "+" }
                                                {row.price_change_percentage_24h.toFixed(2)}%
                                                </TableCell>
                                                <TableCell align="right" >
                                                    {symbol}{""}
                                                    {numberWithCommas(row.market_cap.toString().slice(0,-6))}M
                                                </TableCell>
                                        </TableRow>
                                    )
                                })}
                                
                            </TableBody>
                        </Table>
                    )
                }
            </TableContainer>
            <Pagination style={{
                padding : 20,width:"100%",display:"flex",
                justifyContent:"center"
            }} count={(handleSearch()?.length/10).toFixed(0)}
            classes={{ul:classes.pagination}} 
            onChange={(_,value)=>{
                setPage(value);
                window.scroll(0,450)
            }}
            >
            
            </Pagination>
        </Container>
    </ThemeProvider>
  )
}

export default CoinsTable