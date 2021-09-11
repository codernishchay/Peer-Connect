
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import { Container } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import {useState, useRef, useEffect} from 'react'
import ProfileCard from './profileCard';


const useStyles = makeStyles((theme) => ({
  root: {
    margin :  'auto',
    padding : '5px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));


function Search() {
    const [search, setsearch] = useState(null)
    const [generate, setgenerate] = useState([1,2,3,4])
    const inputRef = useRef()
    function focus(){
          console.log(search)
     }



  const classes = useStyles()
  return (

  
     <div>
      <Container maxWidth="sm">
      <Paper component="form" className={classes.root}>
      <Divider orientation="vertical" className={classes.divider}></Divider>
      <InputBase
        className={classes.input}
        placeholder="search for peers"
        onChange={(e)=>{
            setsearch(e.target.value)
        }}
        ref={inputRef}
      />
      <IconButton type="submit" className={classes.iconButton} aria-label="search" onClick={focus}>
        <SearchIcon />
      </IconButton>
      <Divider className={classes.divider} orientation="vertical" />
   
    </Paper>
    
      </Container>
      <div>
         {generate.map(()=>{
              return <ProfileCard/> 
         })} 
          </div>   
       </div>
  ) 
}


export default Search;
