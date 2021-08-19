import React, { useEffect, useRef, useState } from 'react'
import ScrollDownArrow from '../../components/ScrollDownArrow/ScrollDownArrow';
import { heroTextPieceFive, heroTextPieceFour, heroTextPieceOne, heroTextPieceSeven, heroTextPieceSix, heroTextPieceThree, heroTextPieceTwo } from '../svgs';
import {
    getHeroSectionPicPiecesStyle,
    getHeroSectionPicStyle,
    getHeroSectionNameStyle,
    getHeroSectionTextStyle,
    getHeroSectionButtonOneStyle,
    getHeroSectionButtonTwoStyle,
    animate
} from "../utility";
import Search from './SearchResults';
import { gsap } from 'gsap/all';
import { heroSectionAnimations } from './gsapAnimations';
import { Helmet } from 'react-helmet';

const HeroSectionContent = ({
    winSize,
    photos,
    videos,
    posts,
    height,
    countryThumbnails,
    refPosts,
    refVideos,
    isLargeMobileLandscape,
    isInitialLoader,
    mainContainerRef,
    isPageLoaded,
    scrollSection,
    initialDataPercentage,
}) => {
    const heroPicMainRef = useRef(null);
    const heroPicPieceOneRef = useRef(null);
    const heroPicPieceTwoRef = useRef(null);
    const heroPicPieceThreeRef = useRef(null);
    const heroPrimaryTextRef = useRef(null);
    const heroSecondaryTextRef = useRef(null);
    const buttonOneRef = useRef(null);
    const buttonTwoRef = useRef(null);
    const scrollIconsWrapperRef = useRef(null);

    const [isDomReady, setIsDomReady] = useState(false);

    useEffect(() => {

        if (mainContainerRef &&
            heroPicMainRef &&
            heroPicPieceOneRef &&
            heroPicPieceTwoRef &&
            heroPicPieceThreeRef &&
            heroPrimaryTextRef &&
            heroSecondaryTextRef &&
            buttonOneRef &&
            buttonTwoRef &&
            scrollIconsWrapperRef) {

            const animations = heroSectionAnimations(
                {
                    mainContainerRef,
                    heroPicMainRef,
                    heroPicPieceOneRef,
                    heroPicPieceTwoRef,
                    heroPicPieceThreeRef,
                    // heroPrimaryTextRef:heroPrimaryTextRef,
                    heroPrimaryTextRef: initialDataPercentage === 100 ? heroPrimaryTextRef : null,
                    heroSecondaryTextRef,
                    buttonOneRef,
                    buttonTwoRef,
                    scrollIconsWrapperRef,
                }
            );

            console.log('animations', animations)

            animate(animations)
            // gsap.to(heroPicPieceOneRef.current, { opacity: 1, duration: 3, });
            // gsap.to(heroPicPieceTwoRef.current, { opacity: 1, duration: 3, });
            // gsap.to(heroPicPieceThreeRef.current, { opacity: 1, duration: 3, });
            // gsap.to(heroPrimaryTextRef.current, { strokeDashoffset: 0, duration: 5, });
            // gsap.to(heroPrimaryTextRef.current, { fill: 'rgba(255,255,255,1)', duration: 7 })
        }



    }, [mainContainerRef,
        heroPicMainRef,
        heroPicPieceOneRef,
        heroPicPieceTwoRef,
        heroPicPieceThreeRef,
        heroPrimaryTextRef,
        heroSecondaryTextRef,
        buttonOneRef,
        buttonTwoRef,
        scrollIconsWrapperRef,
        initialDataPercentage,
    ]);

    // useEffect(() => {
    //     document.addEventListener('DOMContentLoaded', function (event) {
    //         // console.log('DOMContentLoaded in constructor:', document.getElementById('app').textContent);
    //         setIsDomReady(true)
    //     });
    // }, [])

    const handleScroll = (ref) => {
        gsap.to(window, { duration: 3, scrollTo: ref.current });
    }


    return (
        <div style={{
            height: '100vh',
            position: 'relative',
            minHeight:360,
        }}>
            <Helmet>
                <link rel="preload" as="image" href={'/assets/images/welcome-background.webp'} type="image/webp" />
                <link rel="preload" as="image" href={'/assets/images/welcome-section-piece-1.webp'} type="image/webp" />
                <link rel="preload" as="image" href={'/assets/images/welcome-section-piece-2.webp'} type="image/webp" />
                <link rel="preload" as="image" href={'/assets/images/welcome-section-piece-3.webp'} type="image/webp" />
            </Helmet>

            <Search
                photos={photos}
                videos={videos}
                posts={posts}
                winSize={winSize}
                countryThumbnails={countryThumbnails}
                isPageLoaded={isPageLoaded}
            />

            <img
                src='/assets/images/welcome-background.webp'
                id="hero-pic-main"
                ref={heroPicMainRef}
                // className={isPageLoaded ? "" : "fade-in"}
                style={{
                    ...getHeroSectionPicStyle(winSize, height),
                    position: 'fixed'
                }} />
            {["One", "Two", "One"].map((piece, i) => {
                let image;
                if (i + 1 === 1) image = '/assets/images/welcome-section-piece-1.webp';
                if (i + 1 === 2) image = '/assets/images/welcome-section-piece-2.webp';
                if (i + 1 === 3) image = '/assets/images/welcome-section-piece-3.webp';
                let ref;
                if (i === 0) ref = heroPicPieceOneRef;
                if (i === 1) ref = heroPicPieceTwoRef;
                if (i === 2) ref = heroPicPieceThreeRef;
                return (
                    <img
                        ref={ref}
                        src={image}
                        className={`HeroPicPiece${piece}`}
                        key={`[Heropic]${i}`}
                        style={{ ...getHeroSectionPicPiecesStyle(winSize, height, i + 1) }
                        }
                    // className="fade-in"
                    />

                )
            })}

            <svg
                onLoad={()=>setIsDomReady(true)}
                ref={heroPrimaryTextRef}
                style={{
                    ...getHeroSectionNameStyle(winSize, height),
                    opacity: (winSize === 1 && height < 480) || (isLargeMobileLandscape && height < 250) ? 0 : 1,
                    transition: 'opacity .3s ease-in',
                    zIndex: isInitialLoader ? 45 : -1,
                    pointerEvents: 'none',
                    strokeDashoffset:180,
                    fill:'transparent',
                }}
                // className={isPageLoaded ? "" : "draw1"}
                viewBox="0 0 120 50"
                id="heroTextMainPath"
            >
                <g>
                    <path d={heroTextPieceOne} className={(isPageLoaded && isDomReady) ? "" : "draw1"} />
                    <path d={heroTextPieceTwo} className={(isPageLoaded && isDomReady) ? "" : "draw2"} />
                    <path d={heroTextPieceThree} className={(isPageLoaded && isDomReady) ? "" : "draw3"} />
                    <path d={heroTextPieceFour} className={(isPageLoaded && isDomReady) ? "" : "draw4"} />
                    <path d={heroTextPieceFive} className={(isPageLoaded && isDomReady) ? "" : "draw5"} />
                    <path d={heroTextPieceSix} className={(isPageLoaded && isDomReady) ? "" : "draw6"} />
                    <path d={heroTextPieceSeven} className={(isPageLoaded && isDomReady) ? "" : "draw7"} />
                </g>
            </svg>

            <div ref={heroSecondaryTextRef} style={{
                ...getHeroSectionTextStyle(winSize, height),
                opacity: (winSize === 1 && height < 430) || (isLargeMobileLandscape && height < 200) ? 0 : 1, transition: 'opacity 0.3s ease-in'
            }} >
                <p id="heroTextSecondary" style={{
                    fontFamily: 'Mulish,sans-serif',
                    borderRadius: 5,
                    padding: 10,
                    background: 'rgb(123,123,123,0.2)',
                }} >
                    I'm Mourad - Adventure travel photographer,
                    videographer, blogger, and digital nomad. Join me as
                    I share wild stories, beautiful images, and useful
                    travel tips with you from around the world!
                </p>
            </div>
            <button ref={buttonOneRef} onClick={() => handleScroll(refPosts)} style={{
                ...getHeroSectionButtonOneStyle(winSize, height),
                opacity: (winSize === 1 && height < 480) || (isLargeMobileLandscape && height < 250) ? 0 : 1, transition: 'opacity 0.3s ease-in'

                // background:'blue'

            }}>Read my Blog</button>
            <button ref={buttonTwoRef} onClick={() => handleScroll(refVideos)} style={{
                ...getHeroSectionButtonTwoStyle(winSize, height),
                opacity: (winSize === 1 && height < 480) || (isLargeMobileLandscape && height < 250) ? 0 : 1, transition: 'opacity 0.3s ease-in'


            }}>Watch my Videos</button>
            <div ref={scrollIconsWrapperRef}>
                <div className="scroll-down-arrow" style={{ position: 'absolute', bottom: 200, left: isLargeMobileLandscape ? '15%' : '50%', transform: `translateX(${isLargeMobileLandscape ? -15 : -50}%)`, height: 70 }}>
                    <ScrollDownArrow />
                </div>

                {isLargeMobileLandscape && <div className="scroll-down-arrow" style={{ position: 'absolute', bottom: 200, right: '15%', transform: 'translateX(15%)', height: 70 }}>
                    <ScrollDownArrow />
                </div>}
            </div>
        </div>
    )
}

export default HeroSectionContent;