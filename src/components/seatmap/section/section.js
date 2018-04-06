import React, { Component } from 'react'

import PATH_MAP from '../seat-mapping.js'
import Pricing from './pricing'
import MetaData from './metadata'

require('./section.css')

class Section extends Component{
    render() {
      const paths = PATH_MAP[this.props.id] || {
        transformContainer: null,
        d: null,
        transformText: null
      }
      const {
        is_sold_out,
        is_almost_gone,
        id
      } = this.props

      const CLASSNAME = (is_sold_out) ? 'sold-out' : ''
      return (
        <g onMouseOver={this.props.onMouseEnter.bind(null, this)}
           onMouseLeave={this.props.onMouseLeave.bind(null, this)}
           onClick={this.props.onMouseClick.bind(null, this)}
           transform={paths.tc} id={this.props.id} className={CLASSNAME}>
            <g className="section">
              <path d={paths.d} />
            </g>
            <g transform={paths.tt}>
              { (is_sold_out || is_almost_gone) ? <MetaData {...this.props}/> : null}
              <Pricing {...this.props}/>
            </g>
        </g>
      )
    }
}

export default Section
