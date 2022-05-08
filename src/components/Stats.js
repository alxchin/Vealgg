import React from 'react';
import styled from 'styled-components';
import { Scatter, Line } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';
import { useLocation } from 'react-router-dom';
import 'chartjs-adapter-date-fns';
ChartJS.register(...registerables);

const Graph = styled.div`
    height: 50%;
    width: 50%;
    margin: 0 auto;
`;

const Stats = () => {

    const { state } = useLocation();


    let playersRR = {};
    for (let i = 0; i < state.players.length; i++) {
        let playersArray = []
        for (let j = 0; j < state.players[i].timeSeriesRR.length; j++) {
            playersArray.push({ y: state.players[i].timeSeriesRR[j]['rr'], x: new Date(state.players[i].timeSeriesRR[j]['date']) })
        }
        playersRR[state.players[i].name] = playersArray
    }





    const label = ['player1', 'player2', 'player3']
    const lineColors = ['rgb(255,99,132)', 'rgb(5,19,75)', 'rgb(50,120,22)', 'rgb(82,95,42)', 'rgb(105,100,20)']

    var count = 0
    const datasets = generateData()
    function generateData() {
        let datasets = []
        for (const key in playersRR) {
            count += 1
            console.log(key)
            console.log(playersRR[key])
            datasets.push({
                label: key,
                borderColor: lineColors[count - 1],
                backgroundColor: lineColors[count - 1],
                data: playersRR[key],
                height: 300,
                width: 300,
                options: {
                    maintainAspectRatio: false,
                },

                showLine: true,
                fill: false,
            })
        }
        return datasets
    }
    const data = {
        datasets,
    };

    const chartOptions = {
        scales: {
            xAxis: {
                type: 'time',
                time: {
                    unit: 'month'
                }
            }
        }
    }



    return (
        <>
            <Graph>
                <Scatter data={data} options={chartOptions} />
            </Graph>
        </>
    )
}

export default Stats