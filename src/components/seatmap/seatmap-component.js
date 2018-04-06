import React, { Component } from 'react'
import SVGComponent from './svg/svg-component'
import { utils, listeners } from './seatmap-functions'
import Popover from 'react-svg-popover'

const styles = {
  tooltip: {
    container: {
      width: 300,
      height: 450,
      arrowDirection: Popover.direction.left,
      position: `absolute`
    }
  }
}

class SeatMap extends Component {
  constructor (props) {
    super(props)

    this.state = {
      data: {},
      selectedSection: null,
      adjustedContainerStyle: null,
    }
  }

  componentWillMount () {
    const component = this
    const {eventId} = this.props
    utils.fetchSeatmapData(eventId)
      .then(data => {
        component.setState({data})
      })
  }

  onMouseEnter = (component, e) => {
    console.log('Mouse Enter');
    console.log(e.target.getBoundingClientRect());
    console.log(window.innerWidth +'---' + window.innerHeight);
    console.log(e.target.getBoundingClientRect().x + e.target.getBoundingClientRect().width);
    console.log((e.target.getBoundingClientRect().y + e.target.getBoundingClientRect().height)/2);
    if(!listeners.isMobile()) {
      const selectedSectionId = component && component.props && component.props.id ? component.props.id : null
      const lastSetSectionId = this.state.lastSetSectionId
      const selectionChanged = !(selectedSectionId && (selectedSectionId != lastSetSectionId))
      const firstTimeSelection = selectedSectionId && !lastSetSectionId
      let positionY = 0;
      if((e.target.getBoundingClientRect().y + e.target.getBoundingClientRect().height)/2 < 300) {
        positionY = 10
      } else {
        positionY = 150
      }
      let positionX = 0;
      if ((e.target.getBoundingClientRect().x + e.target.getBoundingClientRect().width + 300) > window.innerWidth ) {
        positionX = e.target.getBoundingClientRect().x + e.target.getBoundingClientRect().width - 320 - e.target.getBoundingClientRect().width
        styles.tooltip.container.arrowDirection = Popover.direction.right
      } else {
        positionX = e.target.getBoundingClientRect().x + e.target.getBoundingClientRect().width
        styles.tooltip.container.arrowDirection = Popover.direction.left
      }

      if( firstTimeSelection || !selectionChanged) {
        this.setState({
          selectedSection: this.state.data[selectedSectionId],
          adjustedContainerStyle: Object.assign({}, styles.tooltip.container, {
            left: `${positionX}px`,
            top: `${positionY}px`
          }),
          lastSetSectionId: selectedSectionId
        })
      }
    }
  }

  onMouseLeave = () => {
    console.log('Mouse Leave');
    if(!listeners.isMobile()) {
      this.setState({
        selectedSection: null,
        adjustedContainerStyle: null,
        lastSetSectionId: null
      })
    }
  }

  onClick = (component, e) => {
    console.log('Mouse Click');
    const selectedSectionId = component && component.props && component.props.id ? component.props.id : null
    if(listeners.isMobile()) {
      this.setState({
        selectedSection: this.state.data[selectedSectionId]
      })
    }
  }

  closeSidebar = () => {
    this.setState({
      selectedSection: null
    })
  }

  render () {
    const {data, selectedSection, adjustedContainerStyle} = this.state
    return (
      <div className="seatmap__container">
        <SVGComponent seatmapData={data}
          selectedSection={selectedSection}
          onMouseClick={this.onClick}
          onMouseLeave={this.onMouseLeave}
          onMouseEnter={this.onMouseEnter}
          closeSidebar={this.closeSidebar}
          adjustedContainerStyle={adjustedContainerStyle}/>
      </div>
    )
  }
}

SeatMap.propTypes = {

}

export default SeatMap
