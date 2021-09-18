import React from 'react'
import './bigprofile.css'

import { useState, useEffect } from 'react'


const axios = require('axios') 

export default function BigProfile() {
    const [data, setdata] = useState({rating: 4, skillset:"java", name: "Johh", country: "thiscournbterytfdsioutg"}) 
    
    useEffect(() => {
        getData() ; 

        function getData(){
        const response =  axios.get('')
   
        setdata(response.data) ; 
                    }
        return () => {
        }
    }, [])

    return (
      <div style={{margin:'auto'}}>
          <div class="gradient">
  <div id="panel" class="">
    <div id="inside-panel">
      <div class="gradient-border">
    <h1>{data&& data.name ? data.name : "hello here"} </h1>
        <hr/>
        <img src="https://images.unsplash.com/photo-1521119989659-a83eee488004?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=728&q=80" />
        <ul>
          <li><b>{data&&data.rating? data.rating : 0}</b><span id="age">36</span></li>
          <li><b>{data&&data.skillset ? data.skillset:"no skills " }</b><span id="title">Wonderful Title</span></li>
          <li><b>{data&&data.country ? data.country : "pakistaan"}</b><span id="hometown">Some City, Some Country</span></li>
          {/* <li><b>Website:</b><span id="website"><a href="#">www.mywebsite.com</span></a></li> */}
        </ul>
        </div>
    </div>
  </div>
</div>
      </div>
    )
}
