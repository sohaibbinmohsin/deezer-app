import React from 'react';

const Loading = () => {
    return(
        <div style={{display: 'flex', justifyContent: 'center'}}>
            <div className="spinner-grow text-primary" style={{width: '40px', height: '40px', margin: '3px'}} role="status"/>
            <div className="spinner-grow text-primary" style={{width: '40px', height: '40px', margin: '3px'}} role="status"/>
            <div className="spinner-grow text-primary" style={{width: '40px', height: '40px', margin: '3px'}} role="status"/>
        </div>
    )
}

export default Loading