import React from "react";


export const Spinner:React.FC = () => {
    return (
        <div className="lds-container">
            <div className="lds-default">
                <div></div><div></div><div></div>
                <div></div><div></div><div></div>
                <div></div><div></div><div></div>
                <div></div><div></div><div></div>
            </div>
        </div>
    )
}