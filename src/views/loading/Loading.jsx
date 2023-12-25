import React from 'react'

import ReactLoading from 'react-loading'

const Loading = () => {
    return (
        <div className="loading">
            <div className="spinner-loading">
                <ReactLoading type="spinningBubbles" color="#ffffff" />
            </div>
        </div>
    )
}

export default Loading
