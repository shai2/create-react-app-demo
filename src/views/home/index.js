import React, { Component } from 'react'
import {
	Button
} from 'antd-mobile'
import api from '@/services'
import './home.less'

export default class Home extends Component {
	state = {}

	getUserInfo = async () => {
	  const res = api.auth.getUserInfo()
	}

	render () {
		return (
			<div className="app">
				<Button type="primary">sss</Button>
			</div>
		)
	}
}