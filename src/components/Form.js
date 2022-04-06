import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, Link } from 'react-router-dom';



const Input = styled.input`
padding: 0.8em;
margin: 0.5em;
color: black;
background: papayawhip;
border: none;
border-radius: 3px;
position: relative;
width: 80%;
font-size: 0.8em
`;

const Submitbutton = styled.input`
  margin: 0em;
  color: black;
  background: papayawhip;
  border: none;
  border-radius: 5px;
  padding: 1.5em 2em;
`

const Form = () => {
  const [players, setPlayers] = useState('');
  const [region, setRegion] = useState('NA');

  const navigate = useNavigate()

  function fetchPlayerStats(formattedPlayerNames) {
    return fetch("http://localhost:3001/search", { headers: { 'Content-Type': 'application/json' }, method: 'POST', body: JSON.stringify(formattedPlayerNames) })
      .then(function (res) {
        return res.json()
      })
      .then(function (data) {
        return data
      })
  }

  function validatePlayerNames(formattedPlayerNames) {
    let playerNamesArray = players.split(',')
    playerNamesArray.forEach(playerName => {
      if (!playerName.includes('#')) {
        playerNamesArray = []
        return alert(`Invalid user(s) found: ${playerName} missing '#'`)
      }
      else if (playerName.includes('#')) {
        let checkPlayerName = playerName.split('#')
        if ((checkPlayerName[0]).trim().length < 3 && checkPlayerName[0].trim().length <= 16) {
          playerNamesArray = []
          return alert(`Invalid user(s) found: ${checkPlayerName[0]}. Player name's length must be greater than 3`)
        }
        else if ((checkPlayerName[1]).trim().length < 3 && checkPlayerName[1].trim().length <= 5) {
          playerNamesArray = []
          return alert(`invalid user(s) found: ${checkPlayerName[1]}. '#' length must be greater than 3`)
        }
        formattedPlayerNames.push({ name: checkPlayerName[0].trim(), tag: checkPlayerName[1].trim() })
      }
    })
    return formattedPlayerNames
  }

  function handleSubmit(e) {
    e.preventDefault()
    let formattedPlayerNames = []
    validatePlayerNames(formattedPlayerNames)
    if (formattedPlayerNames.length) {
      fetchPlayerStats(formattedPlayerNames).then((data) => navigate('/stats', { state: data }))
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <div className='landingSearch'>
        <Input type='text' placeholder='Player 1, Player 2, Player 3...' value={players} required onChange={(e) => setPlayers(e.target.value)} /> <Submitbutton type='submit' value='Search'></Submitbutton>
      </div>
      <div className='landingRegion'> Region:
        <select onChange={(e) => setRegion(e.target.value)} defaultValue="NA" >
          <option defaultValue required > North America </option>
          <option value="EU"> Europe</option>
          <option value="KR"> South Korea</option>
          <option value="TR"> Turkey</option>
          <option value="JP"> Japan</option>
          <option value="BR"> Brazil</option>
          <option value="LATAM"> Latam</option>
          <option value="OCE"> Oceania</option>
        </select> <br />
      </div>
    </form>

  )
}

export default Form