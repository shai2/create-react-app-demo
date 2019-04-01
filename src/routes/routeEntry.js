import React, { Component } from 'react'

class RouteEntry extends Component {
  state = {
    isAccess: true
  }

  render () {
    return this.state.isAccess ? this.props.children : null
  }
}

export default RouteEntry
