import React, { Fragment } from 'react';
import "../../assets/css/progress.css"
import loaderImg from "../../assets/images/Infinity-1s-200px.svg"
import {useSelector} from 'react-redux'

const FullScreenLoader = () => {
    const loader = useSelector((state)=> state.progress.loader)
    return (
        <Fragment>
            <div className={loader+" ProcessingDiv"}>
            <div className="center-screen">
                <img className="loader" src={loaderImg} />
            </div>
        </div>
        </Fragment>
    );
};
export default FullScreenLoader;

