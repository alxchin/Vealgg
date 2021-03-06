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


    function generateData() {
        let datasets = []
        var variations = 0
        for (const key in playersRR) {
            variations += 1
            datasets.push({
                label: key,
                borderColor: lineColors[variations - 1],
                backgroundColor: lineColors[variations - 1],
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

    const lineColors = ['rgb(255,99,132)', 'rgb(5,19,75)', 'rgb(50,120,22)', 'rgb(82,95,42)', 'rgb(105,100,20)']
    const datasets = generateData()

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