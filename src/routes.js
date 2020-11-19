import React from 'react'
import { Route } from 'react-router-dom'
import App from './components/App'
import SigninPage from './components/singin/SigninPage'
import UploadPage from './components/UploadPage'

export default (
        <div className="container">
            <Route exact path="/" component={ App }></Route>
            <Route exact path="/signin" component={ SigninPage }></Route>
            <Route exact path="/upload" component={ UploadPage }></Route>
        </div>
    )
