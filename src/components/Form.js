import React, { useState } from 'react'
import styled from 'styled-components';

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

`;


const Form = ({ getPlayerNames }) => { //needs to pass through parameter getPlayerName which was made in app.js in order to be used here (because here has the data)
  const [playerSearch, setPlayerSearch] = useState('')

  const handleSearch = (event) => {
    event.preventDefault(); //stops page from refreshing after 'event' happens
    // displaying the searched names 
    const playerNamesArray = playerSearch.split(',');
    getPlayerNames(playerNamesArray); //this is how you pass it back to the app.js
    console.log(playerNamesArray);
  }

  return (
    <form onSubmit={handleSearch}>
      <div className='landingSearch'>
        <Input type='text' placeholder='Player 1, Player 2, Player 3...' value={playerSearch} required onChange={(event) => setPlayerSearch(event.target.value)} /> <Submitbutton type='submit' value='Search' />
      </div>
    </form>

  )
}

export default Form