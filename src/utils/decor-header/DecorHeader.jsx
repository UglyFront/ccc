import React from 'react';
import decorHeaderIcon from "../../assets/images/decor-for-headers.svg"
import "./decor-header.scss"

const DecorHeader = (props) => {
    return (
        <div className="decor-header-box">

            <img src={decorHeaderIcon} alt="" />

            <h2 className='decor-header'>
                {props.text}
            </h2>

            <img src={decorHeaderIcon} alt="" />

        </div>
    );
};

export default DecorHeader;