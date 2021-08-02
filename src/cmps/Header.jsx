import React from 'react'
import { NavLink } from 'react-router-dom'

export function Header() {
    return (
             <header>
                <div className="app-header container nav-container flex space-between align-center">
                    <nav>
                        <ul className="flex clean-list">
                            <li><NavLink className="fas logo" to="/" ></NavLink></li>
                            <li><NavLink  to="/card" >Try as guest</NavLink></li>
                        </ul>
                    </nav>
                </div>
            </header>
    )
}
