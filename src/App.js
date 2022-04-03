import React, { useState, useEffect } from 'react'
import Header from './components/Header';
import Image from './components/Image';
import Form from './components/Form';
import Social from './components/Social';

function App() {

  const [apiData, setapiData] = React.useState(null);


  useEffect(() => {
    const getApi = async () => {
      const apiFromServer = await fetchApi()
      setapiData(apiFromServer)
    }
    getApi()
  }, [])

  const fetchApi = async () => {
    const res = await fetch('http://localhost:3001/api')
    const data = await res.json()
    console.log(data)
    return data
  }

  //{!apiData ? "Loading..." : apiData.message}  

  return (
    < div className='backgroundPage' >
      <div className='landingPage'>
        <Image />
        <Header />
      </div>
      <Form />
      <div className='landingInfo'>

        <div className='column'>
          <h4> Chart the Climb</h4>
          <span>"Create leaderboards with your friends to visualize the ranked season" </span>
          <div><img src="./images/phone.PNG" alt="" id="image2" /></div>
        </div>
        <div className='column'>
          <h4> Track Your Daily Progress</h4>
          <span> Keep tabs on today's RR changes and win-loss record at a glance.</span>
          <div> <img src="./images/ranks.PNG" alt="" className="image3" /> </div>
        </div>
        <div className="dockBar">
          <Social />
        </div>
      </div>
    </div>

  )
};

export default App;
