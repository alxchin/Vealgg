import React from 'react'
import styled from 'styled-components';

const ZealTitle = styled.h1`
    font-size: 1.9em;
    text-align: center;
    color: white;
    margin-top: 1%;
`;


const Header = () => {
    return (
        <header>
            <ZealTitle className="ValorantTitleText"> UPDRAFT.GG</ZealTitle>
        </header>
    )
}

export default Header