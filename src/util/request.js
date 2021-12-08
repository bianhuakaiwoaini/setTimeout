import axios from 'axios'
// import store from '@/store'
// import { getToken } from '@/utils/auth'
import { addPending, removePending } from './pending'
import { Message, MessageBox, Notification } from 'antd'

axios.defaults.headers['Content-Type'] = 'application/json;charset=UTF-8'

// 创建axios实例
const service = axios.create({
	baseURL: process.env.VUE_APP_BASE_URL,
	timeout: 30000,
})

// 添加请求拦截器，在请求头中加token
service.interceptors.request.use(
	(config) => {
		removePending(config)
		addPending(config)
		if (config.headers['auth-token']) {
			return config
        }
		return config
	},
	(error) => {
		return Promise.reject(error)
	}
)

// 响应拦截器
service.interceptors.response.use(
	(response) => {
		removePending(response.config)
		var data
		if (response.data.constructor === Object) {
			data = response.data
		} else {
			data = JSON.parse(response.data)
		}
	},
	(error) => {
		if (axios.isCancel(error)) {
			if (error.message === '请求已发送，请勿频繁操作') {
				Message({
					type: 'error',
					duration: 3000,
					message: `${error.message}`,
				})
			}
		} else if (error.response.data.code === 403) {
			Message({
				type: 'error',
				duration: 3000,
				message: '请求参数异常，请重新输入！',
			})
		} else {
			Message({
				type: 'error',
				duration: 3000,
				message: `${error.response.data.msg}`,
			})
		}

		return Promise.reject(error)
	}
)

export default service
