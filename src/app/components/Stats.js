import React from "react";
import ChartistGraph from 'react-chartist';

export class Stats extends React.Component {
    state = {
        stats: [],
    };

    componentDidMount(){
        $.get('https://stravareact.herokuapp.com/stats').then((res) => this.setState({ stats: res }));
    }

    render() {
        const all_rides = ((this.state.stats || {}).all_ride_totals || {}).count;
        const all_runs = ((this.state.stats || {}).all_run_totals || {}).count;
        const all_swims = ((this.state.stats || {}).all_swim_totals || {}).count;
        const total = (all_runs + all_swims + all_rides) / 100;

        const data = {
            labels: ['Runs ' + Math.round(all_runs / total) + '%', 'Swims ' + Math.round(all_swims / total) + '%', 'Rides ' + Math.round(all_rides / total) + '%'],
            series: [all_runs, all_swims, all_rides]
        };

        const options = {
            labelInterpolationFnc: function (value) {
                return value[0]
            }
        };

        const responsiveOptions = [
            ['screen and (min-width: 640px)', {
                chartPadding: 30,
                labelOffset: 100,
                labelDirection: 'explode',
                labelInterpolationFnc: function (value) {
                    return value;
                }
            }],
            ['screen and (min-width: 1024px)', {
                labelOffset: 80,
                chartPadding: 20
            }]
        ];

        const type='Pie';

        return (
            <div>
                <div>
                    <ChartistGraph
                        data={data}
                        options={options}
                        responsiveOptions={responsiveOptions}
                        type={type}
                    />
                </div>
            </div>
        );
    }
}
