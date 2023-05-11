import React, { useEffect, useState } from 'react';
import './account.css';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
} from 'chart.js';
import { Line } from 'react-chartjs-2';


const Account = (props) => {
    const [stats, setStats] = useState([])
    const [labels, setLabels] = useState([])
    const [wpm, setWpm] = useState([])
    const [accuracy, setAccuracy] = useState([])
    const [color, setColor] = useState()
    const [miscStats, setMiscStats] = useState()
    const [seconds, setSeconds] = useState(0)
    const getStats = async () => {
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(props.credentials)
        }
        fetch('/api/account/stats', options)
        .then((response) => {
            return response.json()
        }).then((response) => {
            setStats(response)
        })

        fetch('/api/account/miscstats', options)
        .then((response) => {
            return response.json()
        }).then((response) => {
            setMiscStats(response)
        })

    }
    useEffect(() => {
        if (props.credentials != undefined) {
            getStats()
        }
    }, [props.credentials])

    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip
    );

    useEffect(() => {
        setLabels(stats.map((obj) => new Date(obj.timestamp).toLocaleString()))
        setWpm(stats.map((obj) => obj.wpm))
        setAccuracy(stats.map((obj) => obj.accuracy))
    }, [stats])

    useEffect(() => {
        console.log(miscStats)
        let tempSeconds = 0
        if(miscStats != undefined){
            for(let i = 0; i < miscStats.length; i++){
                tempSeconds += miscStats[i].seconds
            }
            setSeconds(tempSeconds)
        }
        // let tempSeconds = miscStats.map((obj) => obj.seconds)
        // console.log(tempSeconds)

    }, [miscStats])


    // useEffect(() => {
    //     const observer = new MutationObserver(() => {
    //         console.log('here')
    //         setColor(getComputedStyle(document.documentElement).getPropertyValue('--box-color'))
    //     })
    //     observer.observe(document.documentElement, {attributes: true})

        
    //     return () => observer.disconnect();
    // }, [])

    // useEffect(() => {
    //     console.log(color)
    // }, [color])

    const data = {
        labels,
        datasets: [
            {
                data: wpm,
                borderColor: '#844ec7',
                backgroundColor: '#c8a1f7',
                tension: 0.3,
                yAxisID: 'y',
                label: 'wpm',
            },
            {
                data: accuracy,
                borderColor: 'rgb(90, 90, 90)',
                backgroundColor: 'rgb(190, 190, 190)',
                tension: 0.3,
                yAxisID: 'y1',
                label: 'accuracy',
            }
        ],
    };

    const options = {
        type: 'line',
        data: data,
        responsive: true,
        interaction: {
            mode: 'index',
        },
        stacked: false,
        scales: {
            x: {
                display: false
            },
            y: {
                type: 'linear',
                display: true,
                position: 'left',
                title: {
                    display: true,
                    text: 'Words Per Minute (WPM)',
                    color: '#844ec7',
                },
                grid: {
                    color: '#4a4a4a',
                },
            },
            y1: {
                type: 'linear',
                display: true,
                position: 'right',
                grid: {
                    drawOnChartArea: false
                },
                title: {
                    display: true,
                    text: 'Accuracy (%)',
                    color: 'white',
                    // color: 'rgb(90, 90, 90)',
                }
            }
        },
        plugins: {
            tooltip:{
                callbacks: {
                    label: function(context){
                        var label = context.dataset.label || '';
                        var value = context.parsed.y;
                        return label + ': ' + value;
                    },
                }
            }
        },
    };

    // useEffect(() => {
    //     console.log('here')
    //     options.scales.y.grid.color = color
    // }, [color])

    return (
        <>
            {labels.length > 1 &&
            <div className="account-container">
                <div className='username'>
                    Welcome back, {props.credentials.username}
                </div>
                <div className="graph-container">
                    <div className="graph">
                        <Line options={options} data={data} />
                    </div>
                </div>
                <div className='stats'>
                    <div className='stats-line'>
                        <div className='text'>You have completed <div className='stat'>{labels.length}</div> tests</div>
                        <div className='text'>You have typed for <div className='stat'>{seconds}</div> seconds</div>
                    </div>
                    <div className='stats-line'>
                        <div className='text'>More <div className='stat'>stats</div> coming soon</div>
                        {/* <div className='text'>You have typed for <div className='stat'>{seconds}</div> seconds</div> */}
                    </div>
                </div>
                <button onClick={() => props.handleLogout()}>Log Out</button>
            </div>
            }
            {labels.length < 2 &&
            <div className='account-container'>
                <div className='text'>Must complete atleast <div className='stat'>2</div> tests to view stats</div>
                <div className='text'>You have completed <div className='stat'>{labels.length}</div> tests</div>
                <button onClick={() => props.handleLogout()}>Log Out</button>
            </div>
            }
        </>
    )
}

export default Account;