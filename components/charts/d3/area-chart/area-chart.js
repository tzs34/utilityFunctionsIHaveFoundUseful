import React, {Children,Component} from 'react'
import propTypes from 'prop-types'
import {arc, pie, scaleOrdinal} from 'd3'
import AreaChartLegend from './area-chart-legend'
import AreaChartPath from './area-chart-path'
import AreaChartNumbers from './area-chart-numbers'

class AreaPieChart extends Component{

  static defaultProps = {
          width: 400,
          height: 200,
          innerRadius:20,
          color:[],
          range: ['#0D4F8B', '#33A1DE']
  }

    state = {width: 0}

    componentWillMount(){

      let{data, height, innerRadius, width} = this.props

      this.pie= pie()
              .value(function(d){return d.count})
              .sort(null);

      this.color = scaleOrdinal()
      .range(['#0D4F8B', '#33A1DE']);

      this.arc= arc()
        .outerRadius(function(d){ return d.data.percent + 10;})
        .innerRadius(innerRadius);

      this.setState({width});
    }

    render(){

      let legend;
      let {children, data, height, id}= this.props
      let {arc, color,  pie} = this
      let {width} = this.state

        return (
            <div>
              <svg id={id} width={width} height={height}>
              <AreaChartPath
                arc={arc}
                color={color}
                data={data}
                width={width}
                height={height}
                pie={pie}
                />
                <AreaChartNumbers
                  arc={arc}
                  color={color}
                  data={data}
                  pie={pie}
                  />
                {
                  Children.count(children) === 1 &&
                  <AreaChartLegend
                     arc={arc}
                     color={color}
                     data={data}
                     pie={pie}
                     />
                }
              </svg>
            </div>
        );
    }
}
export default AreaPieChart
