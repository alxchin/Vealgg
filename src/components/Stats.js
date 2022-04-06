import React from 'react';
import styled from 'styled-components';
import { Scatter, Line } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';
import { useLocation } from 'react-router-dom';
ChartJS.register(...registerables);

const Graph = styled.div`
    height: 50%;
    width: 50%;
    margin: 0 auto;
`;

const Stats = () => {

    const { state } = useLocation();
    console.log(state)


    let playersRR = [];
    for (let i = 0; i < state.players.length; i++) {
        let playersArray = []
        for (let j = 0; j < state.players[i].timeSeriesRR.length; j++) {
            playersArray.push(state.players[i].timeSeriesRR[j]['rr'])
        }
        playersRR.push(playersArray)
    }

    let playersDate = [];
    for (let i = 0; i < state.players.length; i++) {
        let dateArray = []
        for (let j = 0; j < state.players[i].timeSeriesRR.length; j++) {
            dateArray.push(state.players[i].timeSeriesRR[j]['date'])
        }
        playersDate.push(dateArray)
    }
    console.log(playersDate)


    const labels = [
        'January',
        'February',
        'March',
        'April',


    ];

    const label = ['player1', 'player2', 'player3']
    const lineColors = ['rgb(255,99,132)', 'rgb(5,19,75)', 'rgb(50,120,22)', 'rgb(82,95,42)', 'rgb(105,100,20)']

    const datasets = playersRR.map((data, index) => {
        return {
            label: label[index],
            borderColor: lineColors[index],
            backgroundColor: lineColors[index],
            data: data,
            height: 300,
            width: 300,
            options: { maintainAspectRatio: false },
        }
    })

    const data = {
        labels: labels,
        datasets,
    };



    return (
        <>
            <Graph>
                <Line data={data} />
            </Graph>
        </>
    )
}

export default Stats