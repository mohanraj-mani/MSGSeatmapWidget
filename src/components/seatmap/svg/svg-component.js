import React from 'react'
import svg from './seatmap.svg'
import Section from '../section/section'
import Stage from '../stage'
import Header from '../header'
import Popover from 'react-svg-popover'
import Sidebar from 'react-sidebar'
import { listeners } from '../seatmap-functions'

import {
  node as nodeType,
  func as funcType,
  bool as booleanType
} from 'prop-types'
require('./seatmap.css')

const img = {
  'width': '100%',
  'minHeight': '200px'
}

const SVGComponent = ({seatmapData, selectedSection, onMouseClick, onMouseEnter, onMouseLeave, closeSidebar, adjustedContainerStyle}) => {

  let sectionContent = null
  if(selectedSection) {
    const priceValue = (selectedSection.min === selectedSection.max) ? `$${selectedSection.min}` : `$${selectedSection.min} - $${selectedSection.max}`
    const sectionInnerContent = (
      <div className="section-inner-content">
        <img style={img} className="section-image" src={selectedSection.image_url} />
        <div className="section-row">
          <span className="section-area-name">
            {selectedSection.area_name}
          </span>
          <span className="section-pricing">
            {priceValue}
          </span>
        </div>
        <div className="section-seating">
          Seats {selectedSection.start_column} - {selectedSection.end_column}
        </div>
        <div className="section-best-for">
          <strong>Best for: </strong> {selectedSection.best_for}
        </div>
        <div className="section-note">
          <span className="note">Note: </span>{selectedSection.tooltip_note}
        </div>
      </div>
    )
    if(listeners.isMobile()) {

      const sidebarHeader = (
        <div className="sidebar-header" onClick={closeSidebar}>
          Back
        </div>
      )

      const sidebarStyle = {
        content: {
          width: '100%',
          background: 'white'
        }
      }
      sectionContent = (
        <Sidebar styles={sidebarStyle} open={true} sidebar={sidebarHeader}>
          <div className="sidebar-content">
            {sectionInnerContent}
          </div>
        </Sidebar>
      )
    } else {
      sectionContent = (
        <Popover style={adjustedContainerStyle}>
          <div className="tooltip-content">
            {sectionInnerContent}
          </div>
        </Popover>
      )
    }
  }

  return (
    <div className="seating-map-svg">
      <svg width="100%" height="600px" viewBox="0 0 939 574" version="1.1" xmlns="http://www.w3.org/2000/svg">
          <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            {
              seatmapData && Object.keys(seatmapData).map(config => {
                const section = seatmapData[config]
                return (
                  <Section {...section}
                    onMouseClick={onMouseClick}
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}/>
                )
              })
            }
            <Stage/>
            <Header/>
          </g>
      </svg>
      {sectionContent}
    </div>
  )
}

//onMouseLeave={onMouseLeave}
export default SVGComponent;
