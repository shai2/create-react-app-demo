import React, { Component } from 'react'
export default function asyncImportComponent (loadComponent) {
  return class AsyncComponent extends Component {
    state = {
      Component: null
    }

    componentWillMount () {
      if (this.hasLoadComponent()) {
        return false
      }
    
      loadComponent()
        .then(module => module.default)
        .then(Component => {
          this.setState({
            Component: Component
          })
        })
    }

    // 计算属性
    hasLoadComponent () {
      return this.state.component === null
    }
    
    render () {
      const { Component } = this.state
      return Component ? <Component {...this.props} /> : null
    }
  }
}
