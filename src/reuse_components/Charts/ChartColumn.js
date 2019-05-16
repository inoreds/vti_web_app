import React, {Component} from 'react';
import Highcharts from "highcharts";
import 'react-bootstrap-table/dist//react-bootstrap-table-all.min.css';
import "react-table/react-table.css";

class ChartColumn extends Component {
    constructor(props) {
        super(props);
            this.options = {
            sortIndicator: true,
            hideSizePerPage: true,
            paginationSize: 3,
            hidePageListOnlyOnePage: true,
            clearSearch: true,
            alwaysShowAllBtns: false,
            withFirstAndLast: false
        }
        this.state = {
            loading: false,
            activeTab: '1',
            data: this.props.data,
        }
    }
  

    getDataTable() {
        this.setState({ loading: true });
    }

    renderChart() {
        if (this.chart)
            this.chart.destroy();

        var option = {
            chart: {
                type: 'column',
                height: 500,
            },
            credits: {
                enabled: false,
            },
            title: {
                text: '',
            },
            xAxis: {
                categories: this.state.data.categories,
                crosshair: true
            },
            yAxis: {
                min: 0,
                title: {
                    text: ''
                },
                labels: {
                    formatter: function () {
                        var ret, multi,
                            numericSymbols = [' Ribu', ' Juta', 'M',    'T'],
                            i = 6;
                        if (this.value >= 1000) {
                            while (i-- && ret === undefined) {
                                multi = Math.pow(1000, i + 1);
                                if (this.value >= multi && numericSymbols[i] !== null) {
                                    ret = (this.value / multi) + numericSymbols[i];
                                }
                            }
                        }
                        return  (ret ? ret : this.value);
                    }
                }
            },
            //legend: false,
            legend: {
                layout: 'horizontal',
                align: 'center',
                verticalAlign: 'bottom'
            },
            tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y}</b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0
                }
            },
            series: this.state.data.series
        };
        this.chart = new Highcharts.chart(this.refs.chart, option);
        this.chart.reflow();
    }

    componentDidMount() {
        this.renderChart();
    }

    componentDidUpdate(){
        setTimeout(() => {
            this.chart.reflow();   
        }, 100);
 
    }

    render() {
        return (
            <div ref="chart"></div>
        );
    }
}

export default ChartColumn;
