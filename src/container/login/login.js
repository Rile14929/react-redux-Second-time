import React from 'react'
import { List, InputItem, WhiteSpace,WingBlank ,Button} from 'antd-mobile';
import { BrowserRouter, Route, Redirect,Switch } from 'react-router-dom'
import Logo from '../../component/logo/logo'
import {connect} from 'react-redux'
import {login} from '../../redux/user.redux'

@connect(
    state=>state.user,
    {login}
)
class Login extends React.Component{
    constructor(props){
        super(props)
        this.state={
            user:'',
            pwd:'',
        }
        this.register = this.register.bind(this)
        this.handleChange=this.handleChange.bind(this)
        this.handleLogin=this.handleLogin.bind(this)
    }
    handleChange(key,val){
        this.setState({
            [key]:val
        })
    }
    handleLogin(){
        this.props.login(this.state)
    }
    register(){
        console.log(this.props)
        this.props.history.push('./register')
    }

    render(){
        return (
            <div>
                <Logo></Logo>
                {(this.props.redirectTo&&this.props.redirectTo!='/login')?<Redirect to={this.props.redirectTo} />:null}
                <List>
                {this.props.msg?<p className="error-msg">{this.props.msg}</p>:null}
                    <InputItem
                        onChange={(v)=>{this.handleChange('user',v)}}
                    >用户</InputItem>
                    <WhiteSpace />
                    <InputItem
                        onChange={(v)=>{this.handleChange('pwd',v)}}
                        type="password"
                    >密码</InputItem>
                </List>
                <WingBlank>
                    <Button type="primary" onClick={this.handleLogin}>登录</Button>
                    <WhiteSpace />
                    <Button onClick={this.register} type="primary">注册</Button>
                </WingBlank>
            </div>
            
        )
    }
}



export default Login