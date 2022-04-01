import React, { Component } from 'react'
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

class Form extends Component {
  constructor(props) {
    super(props)

    this.state = {
      players: "",
      region: "NA",
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  playerhandler = (event) => {
    this.setState({
      players: event.target.value
    })
  }
  regionhandler = (event) => {
    this.setState({
      region: event.target.value
    })
  }

  handleSubmit = (event) => {


    event.preventDefault()
    console.log(this.state)
    this.setState({
      players: "",
      region: "NA",
    })
    let playerNamesArray = this.state.players.split(',')
    let formattedPlayerNames = []

    playerNamesArray.forEach(playerName => {
      if (!playerName.includes('#')) {
        playerNamesArray = []
        return alert(`Invalid user(s) found: ${playerName} missing '#'`)
      }
      else if (playerName.includes('#')) {
        let checkPlayerName = playerName.split('#')
        if ((checkPlayerName[0]).trim().length < 3) {
          playerNamesArray = []
          return alert(`Invalid user(s) found: ${checkPlayerName[0]}. Player name's length must be greater than 3`)
        }
        else if ((checkPlayerName[1]).trim().length < 3) {
          playerNamesArray = []
          return alert(`invalid user(s) found: ${checkPlayerName[1]} '#' length must be greater than 3`)
        }
        else if (((checkPlayerName[0].trim().length >= 3) && (checkPlayerName[0].trim().length <= 16)) && ((checkPlayerName[1].trim().length >= 3) && (checkPlayerName[1].trim().length <= 5))) {
          formattedPlayerNames.push({ name: checkPlayerName[0].trim(), tag: checkPlayerName[1].trim() })
        }
      }
    })
    console.log(formattedPlayerNames)
    fetch("http://localhost:3001/search", { headers: { 'Content-Type': 'application/json' }, method: 'POST', body: JSON.stringify(formattedPlayerNames) })
    return formattedPlayerNames

  }

  //SKIPPY#124, JACKET#1234, BOBBY#4321

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className='landingSearch'>
          <Input type='text' placeholder='Player 1, Player 2, Player 3...' value={this.state.players} required onChange={this.playerhandler} /> <Submitbutton type='submit' value='Search' />
        </div>
        <div className='landingRegion'> Region:
          <select onChange={this.regionhandler} defaultValue="NA" >
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
}

export default Form