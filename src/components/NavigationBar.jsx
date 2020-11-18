import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class NavigationBar extends Component {
    render() {
        return (

            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <Link to ="/" className="navbar-brand">Home</Link>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item active">
                            <Link to="/signin" className="nav-link">Sign In</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}
