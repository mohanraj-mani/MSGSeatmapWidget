import React, { Component } from 'react'

require('./metadata.css')

const MetaData = ({is_sold_out: isSoldOut, is_almost_gone: isAlmostGone}) => {
  const innerContent = isSoldOut
    ? 'Unavailable'
    : isAlmostGone
      ? 'Limited availability!'
      : null
  return (
    <text textAnchor="middle" >
        <tspan className="metadata" x="20" y="11">
          {innerContent}
        </tspan>
    </text>
  )
}

export default MetaData
