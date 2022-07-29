// const TokenKey = 'vue_admin_template_token'
const TokenKey = 'atguigu_admin_token'

export function getToken() {
  return localStorage.getItem(TokenKey)
}

// 将开发者传递的用户token字符串,保存到localStorage
// 持久化存储
// 存储位置是硬盘
// 大小5MB
// 读取速度慢
// 总结:不希望丢失的数据,不频繁使用的数据

export function setToken(token: string) {
  return localStorage.setItem(TokenKey, token)
}

export function removeToken() {
  return localStorage.removeItem(TokenKey)
}
