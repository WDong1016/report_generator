import React, { Component } from 'react'
import classnames from 'classnames'

export default class SigninForm extends Component {

    constructor(props) {
        super(props)

        this.state = {
            username: "",
            password: "",
            errors: {},
            isLoading: false
        }
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault();
        // console.log(this.state)
        this.setState({ errors: {}, isLoading: true })
        this.props.signinActions.userSigninRequest(this.state).then(
            () => { },
            ({ response }) => { this.setState({ errors: response.data, isLoading: false }) }
        )
    }

    render() {
        const { errors, isLoading } = this.state
        return (
            <form onSubmit={this.onSubmit}>
                <h1> 请先登录 </h1>
                <div className="form-group">
                    <label for="username1">用户名：</label>
                    <input type="text" name="username" className={classnames("form-control", { "is-invalid": errors.username })} id="username1" value={this.state.username} onChange={this.onChange} />
                    {errors.username && <span className="form-text text-muted">{errors.username}</span>}
                </div>
                <div className="form-group">
                    <label for="password1">密码：</label>
                    <input type="password" name="password" className={classnames("form-control", { "is-invalid": errors.password })} id="password1" value={this.state.password} onChange={this.onChange} />
                    {errors.password && <span className="form-text text-muted">{errors.password}</span>}
                </div>
                <button type="submit" disabled={isLoading} className="btn btn-primary">Submit</button>

            </form>
        )
    }
}