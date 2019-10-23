/*
  Example useage
  <DoughNutChart
    id="bs_chart"
    data={[
        { name: 'Maintenance', count: 200},
        { name: 'New Development', count: 30 },
        { name: 'Support', count: 900},
        { name: 'ISLA', count: 80},
        { name: 'Others', count:100}

    ]}
    colors={['#53c79f','#e58c72','#7a6fca','#ca6f96','#64b0cc','#e5c072']}
    enable3d={true}
    innerRadiusRatio={3}
    label="name"
    point="count"
    shadowSize={10}>
  <legend radius={10}></legend>
  </DoughNutChart>
*/
import React, {Children,Component} from 'react'
import styled from 'styled-components'
import propTypes from 'prop-types'
import {pie, scaleOrdinal} from 'd3'
import DoughNutChartLegend from './doughnut-chart-legend'
import DoughNutChartPath from './doughnut-chart-path'

class DoughNutChart extends Component{

    static defaultProps = {
            width: 350,
            height: 150,
            padAngle:0,
            color:[],
            innerRadiusRatio:3.3
    }

    state = {width: 0}

    componentWillMount(){

      let{colors, padAngle, point, width} = this.props

        this.pie= pie()
            .value(function(d){return d[point]})
            .padAngle(padAngle)
            .sort(null);

        this.color = scaleOrdinal()
            .range(colors);

        this.setState({width});
    }

    render(){

      let legend;
      let {children, data, label, height, id, innerRadiusRatio}= this.props
      let {color, pie} = this
      let {width} = this.state

        return (
            <div>
                <svg id={id} width={width} height={height}>
                  <DoughNutChartPath
                      width={width}
                      height={height}
                      innerRadiusRatio={innerRadiusRatio}
                      pie={pie}
                      color={color}
                      data={data}
                      />
                      {
                        Children.count(children) === 1 &&
                          <DoughNutChartLegend
                            pie={pie}
                            color={color}
                            data={data}
                            width={width}
                            height={height}
                            label={label}
                            radius={children.props.radius}
                            />
                      }
                </svg>
            </div>
        );
    }
}
export default DoughNutChart
