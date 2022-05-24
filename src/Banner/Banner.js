import React from 'react'
import { makeStyles ,Container, Typography } from '@material-ui/core'
import Carousel from './Carousel'
const useStyles = makeStyles(()=>({
    banner:{
        backgroundImage:"url(./banner2.jpg)"
    },
    bannerContent:{
        height:400,
        display:"flex",
        flexDirection:"column",
        paddingTop:25,
        justifyContext:"space-around"
    },
    tagline:{
        height:"40%",
        display:"flex",
        flexDirection:"column",
        textAlign:"center",
        justifyContext:"center"
    }
}))
function Banner() {
    const classes = useStyles()
  return (
    <div className={classes.banner} >
        <Container className={classes.bannerContent} >
            <div className={classes.tagline}>
            <Typography  className={classes.title} variant='h2' style={{fontWeight:"bold",marginBottom:15,fontFamily:"Montserrat"}} >
                      Crypto VSP
                  </Typography>
        <Typography  className={classes.title} variant='h6' style={{color:"darkgrey",textTransform:"capitalize",fontFamily:"Montserrat"}}>
                      Get all the Info regarding your favorite Crypto Currency
                  </Typography>
            </div>
            <Carousel/>
        </Container>
    </div>
  )
}

export default Banner