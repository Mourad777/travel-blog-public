import React, { Fragment } from 'react'
import { BlogContext } from '../..';
import { dashedLineOne } from '../../pages/svgs';

const AnimatedDivider = ({ isAnimating, imgPath, isBlue }) => (
    <BlogContext.Consumer>
        {({ isPageLoaded, isLargeMobileLandscape }) => (
            <Fragment>
                {!isLargeMobileLandscape && (
                    <Fragment>
                        <svg
                            style={{
                                position: 'absolute',
                                bottom: 0,
                                left: '50%',
                                transform: 'translateX(-50%)',
                                width: 1000,
                            }}
                            viewBox="70 -20 300 50"
                        >
                            <defs>
                                <mask id="line-1-mask">
                                    <path
                                        style={{ stroke: "white", strokeWidth: 3 }}
                                        strokeDasharray={5}
                                        strokeLinecap="round"
                                        d={dashedLineOne}
                                    />
                                </mask>
                            </defs>
                            <g><path
                                style={{
                                    fill: 'transparent',
                                    strokeDasharray: 250,
                                    strokeDashoffset: isAnimating && isPageLoaded ? 0 : -250,
                                    transition: 'all 3s linear',
                                    stroke: isBlue ? "#16a9ff" : '#fff',
                                    strokeWidth: -1,
                                    strokeMiterlimit: 10,
                                }}
                                mask="url(#line-1-mask)" d={dashedLineOne} /></g>
                        </svg>
                        <img
                            style={{
                                position: 'absolute',
                                bottom: 0,
                                left: '50%',
                                transform: isAnimating && isPageLoaded ? 'translateX(-50%) rotate(700deg)' : 'translateX(-600%) rotate(0deg)',
                                transition: 'all 3s linear',
                                width: 80
                            }}
                            // className={isAnimating && isPageLoaded ? 'ball-appear' : 'ball-dissappear'}
                            src={imgPath} />
                        <svg
                            style={{
                                position: 'absolute',
                                bottom: 0,
                                right: '50%',
                                transform: 'translateX(50%)',
                                width: 1000,
                            }}
                            viewBox="-160 -20 300 50"
                        ><g>
                                <defs>
                                    <mask id="line-2-mask">
                                        <path
                                            style={{ stroke: "white", strokeWidth: 3 }}
                                            strokeDasharray={5}
                                            strokeLinecap="round"
                                            d={dashedLineOne}
                                        />
                                    </mask>
                                </defs>
                                <path
                                    mask="url(#line-2-mask)"
                                    d={dashedLineOne}
                                    style={
                                        {
                                            fill: 'transparent',
                                            strokeDasharray: 250,
                                            transition: 'all 3s linear',
                                            // transitionDelay: '3s',
                                            strokeDashoffset: isAnimating && isPageLoaded ? 0 : 250,
                                            stroke: isBlue ? "#16a9ff" : '#fff',
                                            strokeWidth: -1,
                                            strokeMiterlimit: 10,
                                        }
                                    } /></g>
                        </svg>
                    </Fragment>
                )}
            </Fragment>
        )}
    </ BlogContext.Consumer >
)

export default AnimatedDivider;