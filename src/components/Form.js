import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, Link } from 'react-router-dom';
import searchIcon from '../images/searchIcon.png';


const SearchBar = styled.div`
  background: transparent;
  border: 1px solid;
  border-image: linear-gradient(to top, rgba(255, 255, 255, 0.75), rgba(255, 255, 255, 0.4)) 1;
  height: 44px;
  position: relative;
  width: 80%;
  margin-right: 10px;
  color: white;
`
const SearchIcon = styled.img`
  width: 23px;
  height: auto;
  place-self: center;
  margin: 0px 10px;
`
const Input = styled.input`
  width: 100%;
  background: transparent;
  position: relative;
  font-size: 0.8em;
  border: none;
  color: white;
  height: 100%;
  outline: none;
  padding: 0;
`

const Submitbutton = styled.input`
  padding: unset;
  color: white;
  display:flex;
  justify-content:center;
  background: transparent;
  border: 1px solid;
  border-image: linear-gradient(to top, rgba(255,255,255,0.75), rgba(255,255,255,0.4)) 1;
  height: 46px;
  width: 135px;
  font-family: Roboto;
  font-weight: 400;
  font-size: 18px;
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
        <SearchBar className='searchContainer'>
          <SearchIcon src={searchIcon} alt="" />
          <Input type='text' value={players} required onChange={(e) => setPlayers(e.target.value)} />
        </SearchBar>
        <Submitbutton type='submit' value='Search'></Submitbutton>
      </div>
    </form>

  )
}

export default Form