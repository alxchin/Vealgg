import React from 'react'

const Button = () => {
    return (
        <div className='landingRegion'> Region:
            <select>
                <option Selected value="north america"> North America</option>
                <option value="europe"> Europe</option>
                <option value="south korea"> South Korea</option>
                <option value="turkey"> Turkey</option>
                <option value="japan"> Japan</option>
                <option value="brazil"> Brazil</option>
                <option value="latam"> Latam</option>
                <option value="cis"> Cis</option>
                <option value="asia pacific"> Asia Pacific</option>
                <option value="oceania"> Oceania</option>
                <option value="mena"> Mena</option>
            </select>
        </div>

    )
}
export default Button