import React, { useState, useEffect } from 'react'
import Header from './components/Header';
import Image from './components/Image';
import Form from './components/Form';
import Social from './components/Social';
import cypherIcon from './images/cypherIcon.png'
import jettIcon from './images/jettIcon.png'
import sovaIcon from './images/sovaIcon.png'

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
    <div className='backgroundPage' >
      <div className='backgroundEllipse'>
        <div className='landingPage'>
          <Image />
          <Header />
        </div>
        <Form />
      </div>
      <div className='landingInfoContainer'>

        <div className='column'>
          <img src={jettIcon} alt="" />
          <h4 className='ValorantTitleText'>Chart the Climb</h4>
          <span>Create leaderboards with your friends to visualize the ranked season</span>
        </div>
        <div className='column'>
          <img src={cypherIcon} alt="" />
          <h4 className='ValorantTitleText'>Progress Stats</h4>
          <span>Track your daily progress to improve your gameplay</span>
        </div>
        <div className='column'>
          <img src={sovaIcon} alt="" />
          <h4 className='ValorantTitleText'>Track Changes</h4>
          <span>Keep tabs on RR changes and win-loss records</span>
        </div>
        <div className="dockBar">
          {/* <Social /> */}
        </div>
      </div>

    </div>

  )
};

export default App;
