import http from './index'

export default {
    //登录请求
    login({ username, password }) {
        return http.post('/login', {
            username,
            password
        })
    },
    //获取用户列表请求
    getUsers({ pagenum, pagesize, query }) {
        if (query) {
            return http.get(`/users?pagenum=${pagenum}&pagesize=${pagesize}&query=${query}`)
        } else {
            return http.get(`/users?pagenum=${pagenum}&pagesize=${pagesize}`)
        }
    },
    //左侧导航栏
    getLeftTab() {
        return http.get(`menus`)
    },
    //添加用户请求
    addUsers({ username, password, email, mobile }) {
        return http.post('/users', {
            username,
            password,
            email,
            mobile
        })
    },
    //修改用户状态
    modifyUsers({ uId, type }) {
        return http.put(`users/${uId}/state/${type}`)
    },
    //编辑角色
    edit({ id }) {
        return http.put(`users/${id}`)
    },
    //删除用户
    del({ id }) {
        return http.delete(`users/${id}`)
    },
    //分配用户角色
    distribution({ id }) {
        return http.put(`users/${id}/role`)
    },
    //角色列表
    roleList() {
        return http.get('roles')
    },
    //添加角色
    addRoles({ roleName, roleDesc }) {
        if (roleDesc) {
            return http.post('roles', {
                roleName,
                roleDesc
            })
        } else {
            return http.post('roles', {
                roleName
            })
        }
    },
    //删除角色
    delRoles({ id }) {
        return http.delete(`roles/${id}`)
    },
    //编辑提交角色
    editRoles({ id, roleName, roleDesc }) {
        if (roleDesc) {
            return http.put(`roles/${id}?id=${id}&roleName=${roleName}&roleDesc=${roleDesc}`)
        } else {
            return http.put(`roles/${id}?id=${id}&roleName=${roleName}`)
        }
    },
    //权限列表
    rightList(type) {
        return http.get(`rights/${type}`)
    },

    //--------------------------------------------------------------------------------------------------
    //商品列表
    getGoodsList({ query, pagenum, pagesize }) {
        if (query) {
            return http.get(`goods?query=${query}&pagenum=${pagenum}&pagesize=${pagesize}`)
        } else {
            return http.get(`goods?pagenum=${pagenum}&pagesize=${pagesize}`)
        }
    },
    //--------------------------------------------------------------------------------------------------
    //根据 ID 查询商品
    queryGoods({ id }) {
        return http.get(`goods/${id}`)
    },
    //--------------------------------------------------------------------------------------------------
    //删除商品-------------------------------------------------------------------------------------------
    delGoods({ id }) {
        return http.delete(`goods/${id}`)
    },
    //--------------------------------------------------------------------------------------------------
    //商品分类
    goodsList({ type, pagenum, pagesize }) {
        if (pagenum && pagesize) {
            return http.get(`categories?type=${type}&pagenum=${pagenum}&pagesize=${pagesize}`)
        } else {
            return http.get(`categories?type=${type}`)
        }
    },
    //--------------------------------------------------------------------------------------------------
    //数据统计
    getStatistics() {
        return http.get('reports/type/1')
    },
    //--------------------------------------------------------------------------------------------------
    //订单数据列表
    getOrder({ query, pagenum, pagesize, user_id, pay_status, is_send, order_fapiao_title, order_fapiao_company, order_fapiao_content, consignee_addr }) {
        return http.get(`orders?query=${query}&pagenum=${pagenum}&pagesize=${pagesize}&user_id=${user_id}&pay_status=${pay_status}&is_send=${is_send}&order_fapiao_title=${order_fapiao_title}&order_fapiao_company=${order_fapiao_company}&order_fapiao_content=${order_fapiao_content}&consignee_addr=${consignee_addr}`)
    },
    //--------------------------------------------------------------------------------------------------
    //分配用户角色
    putUserRoles({ id, rid }) {
        return http.put(`users/${id}/role?id=${id}&rid=${rid}`)
    },

    //--------------------------------------------------------------------------------------------------
    //删除商品分类
    deleGdoods({ id }) {
        return http.delete(`categories/${id}`)
    },
    //--------------------------------------------------------------------------------------------------
    //编辑提交分类
    editCommit({ id, cat_name }) {
        return http.put(`categories/${id}`, { cat_name })
    },
    //--------------------------------------------------------------------------------------------------
    //角色授權
    rolePower({ roleId, rids }) {
        return http.post(`roles/${roleId}/rights`, { rids })
    },
    //------------------------------------------------------------------------------------------------------
    //删除角色指定权限
    deleteRight({ roleId, rightId }) {
        return http.delete(`roles/${roleId}/rights/${rightId}`)
    }
}