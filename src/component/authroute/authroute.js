import React from 'react'
import axios from 'axios'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {loadData} from '../../redux/user.redux'
@withRouter
@connect(
    null,{loadData}
)
class AuthRoute extends React.Component{
    componentDidMount(){
        // 是否登录
        // 现在的url地址 login不需要跳转
        // 用户type 身份是boss还是牛人
        // 用户是否完善信息(头像 简介)
        const publicList = ['/login','/register']
        const pathname = this.props.location.pathname
        if(publicList.indexOf(pathname)>-1){
            return null
        }
        axios.get('/user/info').then(res=>{
            if(res.status==200){
                if(res.data.code==0){
                    console.log(res)
                    this.props.loadData(res.data.data)
                }else{
                    this.props.history.push('/login')
                }
            }
        })
    }
    render(){
        return null
    }
}
export default AuthRoute