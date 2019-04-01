// 这里是鉴权相关的service
import $ from '@/utils/http'

/**
 * 
 * @param {*} params 
 * @description 例子
 */
export const getUserInfo = (params) => {
	return $.get('/ss/ss')
}