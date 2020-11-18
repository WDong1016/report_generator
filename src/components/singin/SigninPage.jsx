import React, { Component } from 'react'
import SigninForm from './SigninForm'
import { connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import * as signinActions from '../../actions/signinActions'


class SigninPage extends Component {
    render() {
        return (
            <div className="row">
                <div className="col-md-3"></div>
                <div className="col-md-6">
                    <SigninForm signinActions={ this.props.signinActions }/>
                </div>
                <div className="col-md-3"></div>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        signinActions:bindActionCreators(signinActions,dispatch)
    }
}

export default connect(null,mapDispatchToProps)(SigninPage)