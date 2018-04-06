import React, { Component } from 'react'
require('./stage.css')

const Stage = () => (
  <g transform="translate(0.000000, -3.000000)" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <g transform="translate(0.000000, 180.000000)">
          <g className="stage">
              <path d="M79.2,66.1 L48.3,5.5 C47.2,3.3 44.5,0.9 42,0.9 L5,0.9 C2.5,0.9 0,3.5 0,6 L0,234 C0,236.5 1.5,238.9 4,238.9 L42,238.9 C44.5,238.9 47.1,236.7 48.2,234.4 L80,166.1 C81.1,163.8 82,159.5 82,157 L82,74 C82,71.5 80.4,68.4 79.2,66.1 L79.2,66.1 Z"></path>
          </g>
          <text className="stageText" fill="#000000" transform="translate(34.000300, 115.987800) rotate(-90.000000) translate(-34.000300, -115.987800) " fontFamily="Helvetica" fontSize="12" fontWeight="normal">
              <tspan x="14.0003" y="119.9878">STAGE</tspan>
          </text>
      </g>
  </g>
)

export default Stage
