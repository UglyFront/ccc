import React from 'react';
import "./modal.scss"

const MyModal = ({ isActive, setActive, children }) => {
    return (
        <div className={isActive ? "my-modal active" : "" + "my-modal"} onClick={() => setActive(false)}>
            <div className="my-modal__content" onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default MyModal;