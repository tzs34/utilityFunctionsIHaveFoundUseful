import React, {Component} from 'react'

class Axis extends Component{

  renderAxis = (container) => {

          d3.select(container).call(this.props.axis);

  }

    render () {

        let translate = `translate(0,this.props.h)`

        return (
            <g className="axis" transform={this.props.axisType=='x'?translate:""} ref={this.renderAxis}>
            </g>
        );
    }

}
