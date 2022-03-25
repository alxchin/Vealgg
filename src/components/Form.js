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

const Form = () => {
  return (
    <div className='landingSearch'>
      <Input type='text' placeholder='Player 1, Player 2, Player 3...' /> <Submitbutton type='submit' value='Submit' />
    </div>

  )
}

export default Form