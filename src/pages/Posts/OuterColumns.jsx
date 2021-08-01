import React from "react"

export default ({ isLeft,isLargeMobileLandscape }) => (
    <div
        style={{
            flexGrow: 3
            // border: "1px solid green"
        }}
    >
        <div className="row" style={{ height: 330 }}>
            <div
                className="col-1"
                style={{
                    background: "rgb(218, 173, 134)",
                    height: "100%",
                    padding: 0
                }}
            />
            <div
                className="col-8"
                style={{
                    // background: "rgb(218, 173, 134)",
                    padding: 0,
                    height: "100%"
                }}
            >
                <div
                    style={{
                        height: 100,
                        backgroundColor: "rgb(218, 173, 134)"
                    }}
                ></div>
                <div
                    style={{
                        height:isLeft ? 120 : 220 ,
                        backgroundColor: `rgb(218, 173, 134,${isLargeMobileLandscape ? 1 : 0.8})`
                    }}
                ></div>
                <div
                    style={{
                        height:isLeft ? 111 : 11,
                        backgroundColor: "rgb(218, 173, 134)"
                    }}
                ></div>
            </div>

            <div
                className="col-3"
                style={{
                    background: "rgb(218, 173, 134)",
                    height: "100%",
                    padding: 0
                }}
            />
        </div>
        <div className="row" style={{ 
            // height: 730 
            height: '100%'
            }}>
            <div
                className={isLeft ?"col-2" : "col-4"}
                style={{
                    background: "rgb(218, 173, 134)",
                    height: "100%",
                    padding: 0
                }}
            />
            <div
                className={isLeft ?"col-8" : "col-7"}
                style={{
                    // background: "rgb(218, 173, 134)",

                    height: "100%",
                    padding: 0
                }}
            >
                <div
                    style={{
                        height:isLeft ?  100 : 200,
                        backgroundColor: "rgb(218, 173, 134)"
                    }}
                ></div>
                <div
                    style={{
                        height:isLeft ? 200 : 100,
                        backgroundColor: `rgb(218, 173, 134,${isLargeMobileLandscape ? 1 : 0.8})`
                    }}
                ></div>
                <div
                    style={{
                        // height: 430,
                        height: '100%',
                        backgroundColor: "rgb(218, 173, 134)"
                    }}
                ></div>
            </div>

            <div
                className={isLeft ?"col-2" : "col-1"}
                style={{
                    background: "rgb(218, 173, 134)",
                    height: "100%",
                    padding: 0
                }}
            />
        </div>
    </div>
);
