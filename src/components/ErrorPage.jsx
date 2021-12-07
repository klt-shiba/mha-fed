import React from 'react'
import { Redirect } from 'react-router'

export const ErrorPage = () => {
    return (
        <div>
            <Redirect to="/"></Redirect>
        </div>
    )
}

export default ErrorPage
