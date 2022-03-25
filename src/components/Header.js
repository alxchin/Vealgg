import React from 'react'
import styled from 'styled-components';

const ZealTitle = styled.h1`
  font-size: 1.9em;
  text-align: center;
  color: white;
  margin-top: 1%;
`;


const Header = () => {
    const siteName = 'veal.gg'
    return (
        <header>
            <ZealTitle> {siteName}</ZealTitle>
        </header>
    )
}

export default Header