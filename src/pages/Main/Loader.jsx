import React, { useEffect, useState } from "react";
import './loader.css'
import Circle from 'react-circle'
export default ({ reference, isPageLoaded, isInitialDataLoaded, initialDataPercentage }) => {
    console.log('isPageLoaded', isPageLoaded)
    console.log('isInitialDataLoaded', isInitialDataLoaded)
    console.log('initialDataPercentage',initialDataPercentage)
    let percentageLoaded = 0;
    const [isDomReady, setIsDomReady] = useState(false);
    const handlePageLoad = () => {
        setIsDomReady(true)
    }
    useEffect(()=>{
        window.addEventListener('load',handlePageLoad)
    },[])
    if (isDomReady) percentageLoaded = 20;
    if (initialDataPercentage > 20) percentageLoaded = initialDataPercentage;
    if (initialDataPercentage === 100) percentageLoaded = 100;
    //page load is much faster that fetching data from api so when page is loaded progress would be 20%
    //then comes 4 sets of data from the api: posts, photos, and videos,
    //each set of data represents 20% of the progress bar
    return (
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
            className={isInitialDataLoaded ? isPageLoaded ? "" : "fade-out" : ""}
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
                style={{ top: "70%", margin: "auto", display: "block" }}
            >
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div
                style={{ top: "70%", margin: "auto", display: "block",width:200 }}
            >
                <Circle
                    progress={percentageLoaded}
                    animate={true} // Boolean: Animated/Static progress
                    responsive={true} // Boolean: Make SVG adapt to parent size
                    size={150} // Number: Defines the size of the circle.
                    lineWidth={5} // Number: Defines the thickness of the circle's stroke. 
                    progressColor="#daad86"  // String: Color of "progress" portion of circle.
                    bgColor="whitesmoke" // String: Color of "empty" portion of circle.
                    textColor="white" // String: Color of percentage text color.
                    textStyle={{
                        font: 'bold 5rem Mulish, Arial, sans-serif' // CSSProperties: Custom styling for percentage.
                    }}
                    percentSpacing={20} // Number: Adjust spacing of "%" symbol and number.
                    roundedStroke={true} // Boolean: Rounded/Flat line ends
                    showPercentage={true} // Boolean: Show/hide percentage.
                    showPercentageSymbol={true} // Boolean: Show/hide only the "%" symbol.
                />
            </div>
        </div>
    )
};
