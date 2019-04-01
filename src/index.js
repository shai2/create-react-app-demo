import 'babel-polyfill'
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import fastclick from 'fastclick'
import eruda from 'eruda'
import routes from '@/routes'

// 移动端console
// eruda.init()

fastclick.attach(document.body) // 解决移动端300ms延迟

class App extends Component {
	render () {
		return (
			<div style={{ height: '100%' }}>
				{ routes }
			</div>
		)
	}
}

ReactDOM.render(<App />, document.getElementById('root'));
