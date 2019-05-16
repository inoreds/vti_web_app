import React, {Component} from 'react';
import Highcharts from "highcharts";
import 'react-bootstrap-table/dist//react-bootstrap-table-all.min.css';
import "react-table/react-table.css";

class ChartPie extends Component {
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
        var option = {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie',
                height: 500,
            },
            title: {
                text: null
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b><br>{point.percentage:.1f} %',
                        style: {
                            color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black',
                            fontSize: '16px'
                        },
                        distance: -90,
                        
                    }
                }
            },
            series: [{
                name: 'Brands',
                colorByPoint: true,
                data: this.props.data.series
            }]
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
        // console.log(this.state.data)
        return (
            <div ref="chart"></div>
        );
    }
}

export default ChartPie;
