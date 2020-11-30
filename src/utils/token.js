/* 
    设置token处理
*/
const KEY = 'myToken'

// 保存token
const setToken = token => {
    localStorage.setItem(KEY, token)
}

// 获取token
const getToken = () => {
    // 必须要 return
    return localStorage.getItem(KEY)
}

// 删除token
const removeToken = () => {
    localStorage.removeItem(KEY)
}

//设置按需导出: 需要什么,就导出什么
export {
    setToken,
    getToken,
    removeToken
}