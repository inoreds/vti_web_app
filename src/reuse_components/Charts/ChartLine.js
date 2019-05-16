import React, {Component} from 'react';
import Highcharts from "highcharts";
import 'react-bootstrap-table/dist//react-bootstrap-table-all.min.css';
import "react-table/react-table.css";

class ChartLine extends Component {
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
            label_x: this.props.label_x,
            label_y: this.props.label_y,
        }
    }

    getDataTable() {
        this.setState({ loading: true });
    }

    renderChart(){
        var option = {
            chart: {
                type: 'line',
                height: 500,
                weight: '100%',
                reflow: true
            },
            credits: {
                enabled: false,
            },
            title: {
                text: '',
            },
            xAxis: {
                categories: this.props.data.categories,
                crosshair: true,
                title: {
                    text: this.props.label_x
                }
            },
            yAxis: {
                min: 0,
                title: {
                    text: this.props.label_y
                },
                labels: {
                    formatter: function () {
                        var ret, multi,
                            numericSymbols = [' Ribu', ' Juta', 'M', 'T'],
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
                },
                line: {
                    dataLabels: {
                        enabled: true
                    }
                }
            },
            series: this.props.data.series
        };
            this.chart = new Highcharts.chart(this.refs.chart, option);
            this.chart.reflow();
    }

    componentDidMount() {
        this.renderChart();
    }
    
    
    componentDidUpdate(prevProps, prevState){
        if(this.props.data !== prevProps.data){
            this.setState({data: this.props.data})
            this.renderChart();
            setTimeout(() => {
                this.chart.reflow();   
            }, 100);
        }
    }

    render() {
        return (
            <div ref="chart"></div>
        );
    }
}

export default ChartLine;
