import React, {Component} from 'react';
import {Card, CardHeader, CardBody, Col, Row, Nav, NavItem, NavLink, TabContent, TabPane, Input} from 'reactstrap';
import Highcharts from "highcharts";
import classnames from 'classnames';
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

    componentDidMount() {
        var option = {
            chart: {
                zoomType: 'xy',
                height: 500
            },
            title: {
                text: 'Pertumbuhan Lahan & Produksi Komoditas Pertanian'
            },
            xAxis: [{
                categories: this.state.data.categories,
                crosshair: true
            }],
            yAxis: [ { // Secondary yAxis
                title: {
                    text: 'Hasil Produksi',
                    style: {
                        color: Highcharts.getOptions().colors[0]
                    }
                },
                labels: {
                    formatter: function() {
                        var ret, multi,
                            numericSymbols = [' Ribu', ' Juta', 'M', ,'T'],
                            i = 6;
                        if(this.value >=1000) {
                            while (i-- && ret === undefined) {
                                multi = Math.pow(1000, i + 1);
                                if (this.value >= multi && numericSymbols[i] !== null) {
                                    ret = (this.value / multi) + numericSymbols[i];
                                }
                            }
                        }
                        return (ret ? ret : this.value) + " Ton";
                    }
                },
                opposite: true
            }, { // Primary yAxis
                title: {
                    text: 'Luas Lahan',
                    style: {
                        color: Highcharts.getOptions().colors[0]
                    }
                },
                labels: {
                    formatter: function() {
                        var ret, multi,
                            numericSymbols = [' Ribu', ' Juta', 'M','T'],
                            i = 6;
                        if(this.value >=1000) {
                            while (i-- && ret === undefined) {
                                multi = Math.pow(1000, i + 1);
                                if (this.value >= multi && numericSymbols[i] !== null) {
                                    ret = (this.value / multi) + numericSymbols[i];
                                }
                            }
                        }
                        return  (ret ? ret : this.value) + " m2";
                    }
                }
            },],
            tooltip: {
                shared: true
            },
            legend: {
                layout: 'vertical',
                align: 'left',
                x: 120,
                verticalAlign: 'top',
                y: 100,
                floating: true,
                backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
            },
            series: this.state.data.series
        };
        this.chart = new Highcharts.chart(this.refs.chart, option);
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
