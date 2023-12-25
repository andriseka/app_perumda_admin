import React from 'react'

import Highcharts from "highcharts/highmaps";
import HighchartsReact from "highcharts-react-official";
import HighchartsMap from "highcharts/modules/map";
import tileWebMap from 'highcharts/modules/tiledwebmap'

// icon
import { green_location, red_location } from '../../icons/index'

tileWebMap(Highcharts);

const Maps = () => {
    if (typeof window !== 'undefined') {
        HighchartsMap(Highcharts);
    }

    const options = {
        chart : {
            margin: 0,
        },
        title: {
            text: ''
        },
    
        subtitle: {
            text: ''
        },
        navigation: {
            buttonOptions: {
                align: 'left',
                theme: {
                    stroke: '#e6e6e6'
                }
            }
        },
        mapNavigation: {
            enabled: true,
            buttonOptions: {
                alignTo: 'spacingBox'
            }
        },
        mapView: {
            center: [110.6728059381088, -6.582646352844619],
            zoom: 13
        },
        tooltip: {
            pointFormat: '{point.name}'
        },
        legend: {
            enabled: true,
            title: {
                text: 'Mapping Perumda Jepara'
            },
            align: 'left',
            symbolWidth: 20,
            symbolHeight: 20,
            itemStyle: {
                textOutline: '1 1 1px rgba(255,255,255)'
            },
            backgroundColor: 'rgba(255,255,255,0.8)',
            float: true,
            borderColor: '#e6e6e6',
            borderWidth: 1,
            borderRadius: 2,
            itemMarginBottom: 5
        },
        plotOptions: {
            mappoint: {
                dataLabels: {
                    enabled: false
                }
            }
        },
        series: [
            {
                type: 'tiledwebmap',
                name: 'Basemap Tiles',
                provider: {
                type: 'OpenStreetMap'
                },
                showInLegend: false
            },
            {
                type: 'mappoint',
                name: 'Perumda Store',
                marker: {
                    symbol: `url(${ red_location })`,
                    width: 24,
                    height: 24
                },
                data: [
                    {
                        name: 'Indah Barokah',
                        lon :110.6613508727572,
                        lat :-6.592277866337224
                    }
                ]
            },
            {
                type: 'mappoint',
                name: 'Perumda Partner',
                marker: {
                    symbol: `url(${ green_location })`,
                    width: 24,
                    height: 24
                },
                data: [
                    {
                        name: 'PT. Sejahtera',
                        lon : 110.67567405735502,
                        lat :-6.587213465042063
                    }
                ]
            }
        ]
    }

    return (
        <div style={{width: '100%'}}>
            <HighchartsReact
                constructorType={'mapChart'}
                highcharts={Highcharts}
                options={options}
            />
        </div>
    )
}

export default Maps
