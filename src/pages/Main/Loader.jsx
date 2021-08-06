import React from "react";

export default ({ reference,isPageLoaded }) => {
    console.log('isPageLoaded',isPageLoaded)
    return(
    <div
        ref={reference}
        style={{
            width: "100%",
            height: "100%",
            backgroundColor: "black",
            position: "fixed",
            opacity: isPageLoaded ? 0 : 1,
            zIndex: 30,
            transition: "all 1s ease-out",
            pointerEvents: 'none',
        
        }}
        className={isPageLoaded ? "" : "fade-out"}
    >

        {/* <p
            style={{
                color: "white",
                fontFamily: "Waiting for the sunrise, sans-serif",
                fontSize: "1.3em",
                display: "block",
                margin: "auto",
                position: "relative",
                top: "50%",
                width: 300
            }}
        >
            Leave nothing but footprints, take nothing but photos, kill nothing
            but time.
        </p> */}
        <div
            className="lds-ellipsis"
            style={{ top: "50%", margin: "auto", display: "block" }}
        >
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    </div>
)};
