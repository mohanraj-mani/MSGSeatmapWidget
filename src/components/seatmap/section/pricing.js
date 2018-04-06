import React, { Component } from 'react'

require('./pricing.css')

const Pricing = ({min, max}) => {
  const innerContent = min == max ? `$${min}` : `$${min} - $${max}`
  return (
    <text textAnchor="middle" >
        <tspan className="pricing" x="15" y="25.4">
            {(innerContent!=='$0') ? innerContent : null}
        </tspan>
    </text>
  )
}

export default Pricing
