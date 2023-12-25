import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

const Verified = (props) => {

    const user_data = localStorage.getItem('user_data');
    const { username } = useParams();
    
    const [verified, setVerified] = useState(false);

    const verifiedData = () => {
        if (user_data || user_data !== null) {
            if (JSON.parse(user_data)['username'] === username) {
                setVerified(true);
            } else {
                return window.location.href = '/'
            }
        } else {
            return window.location.href = '/'
        }
    }

    useEffect(() => {
        verifiedData();
    }, [verified])

    return (
        <React.Fragment>
            { verified ? props.children : '' }
        </React.Fragment>
    )
}

export default Verified
