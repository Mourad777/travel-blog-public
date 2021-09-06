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
    setLastViewedSection,
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

    const heroWelcomePieceOne = useRef(null);
    const heroWelcomePieceTwo = useRef(null);
    const heroWelcomePieceThree = useRef(null);
    const heroWelcomePieceFour = useRef(null);
    const heroWelcomePieceFive = useRef(null);
    const heroWelcomePieceSix = useRef(null);
    const heroWelcomePieceSeven = useRef(null);

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

            animate(animations)
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

    useEffect(() => {
        // if (heroWelcomePieceOne.current) {
        if (initialDataPercentage === 100) {
            gsap.to(heroWelcomePieceOne.current, { strokeDashoffset: 0, duration: 0.9, delay: 0 });
            gsap.to(heroWelcomePieceTwo.current, { strokeDashoffset: 0, duration: 0.9, delay: 0.2 });
            gsap.to(heroWelcomePieceThree.current, { strokeDashoffset: 0, duration: 0.9, delay: 0.4 });
            gsap.to(heroWelcomePieceFour.current, { strokeDashoffset: 0, duration: 0.9, delay: 0.6 });
            gsap.to(heroWelcomePieceFive.current, { strokeDashoffset: 0, duration: 0.9, delay: 0.8 });
            gsap.to(heroWelcomePieceSix.current, { strokeDashoffset: 0, duration: 0.9, delay: 1 });
            gsap.to(heroWelcomePieceSeven.current, { strokeDashoffset: 0, duration: 0.9, delay: 1.2 });
            gsap.to(heroWelcomePieceSeven.current, { strokeDashoffset: 0, duration: 0.9, delay: 1.4 });

            gsap.to(heroWelcomePieceOne.current, { fill: 'rgba(255,255,255,1)', duration: 0.5, delay: 0 });
            gsap.to(heroWelcomePieceTwo.current, { fill: 'rgba(255,255,255,1)', duration: 0.5, delay: 0.2 });
            gsap.to(heroWelcomePieceThree.current, { fill: 'rgba(255,255,255,1)', duration: 0.5, delay: 0.4 });
            gsap.to(heroWelcomePieceFour.current, { fill: 'rgba(255,255,255,1)', duration: 0.5, delay: 0.6 });
            gsap.to(heroWelcomePieceFive.current, { fill: 'rgba(255,255,255,1)', duration: 0.5, delay: 0.8 });
            gsap.to(heroWelcomePieceSix.current, { fill: 'rgba(255,255,255,1)', duration: 0.5, delay: 1 });
            gsap.to(heroWelcomePieceSeven.current, { fill: 'rgba(255,255,255,1)', duration: 0.5, delay: 1.2 });
            gsap.to(heroWelcomePieceSeven.current, { fill: 'rgba(255,255,255,1)', duration: 0.5, delay: 1.4, });
            // }
            gsap.to(heroPrimaryTextRef.current, { stroke: 'rgba(255,255,255,1)', duration: 0.2, delay: 0.2 });

        }
    }, [initialDataPercentage])

    const handleScroll = (ref) => {
        gsap.to(window, { duration: 3, scrollTo: ref.current });
    }


    return (
        <div style={{
            height: '100vh',
            position: 'relative',
            // minHeight: 360,
            minHeight: 'calc(100vh - 56px)',
        }}>
            <Helmet>
                <link rel="preload" as="image" href={'/assets/images/welcome-background.webp'} type="image/webp" />
                <link rel="preload" as="image" href={'/assets/images/welcome-section-piece-1.webp'} type="image/webp" />
                <link rel="preload" as="image" href={'/assets/images/welcome-section-piece-2.webp'} type="image/webp" />
                <link rel="preload" as="image" href={'/assets/images/welcome-section-piece-3.webp'} type="image/webp" />
            </Helmet>
            <div style={{
                display: 'flex',
                margin: 'auto',
                transform: 'translateX(-50%)',
                left: '50%',
                top:10,
                position: 'absolute',
                zIndex: 10,
                justifyContent: 'space-evenly',
            }}>
                <span style={{
                    padding: 10,
                    fontFamily: 'Mulish',
                    color: '#fff',
                    borderRadius: '50px',
                    border: 'none',
                    margin: '0 10px',
                    zIndex: 10,
                    height: 50,
                    fontSize: winSize === 1 ? '0.8em' : '1.1em',
                    fontWeight: 'bold',
                    minWidth:190,
                    letterSpacing:4,
                    textAlign:'right',
                    alignItems:'center',
                    display:'inline-flex',
                    justifyContent:'flex-end'
                }}>H  I  T  C  H  I  N  G</span>
                <Search
                    photos={photos}
                    videos={videos}
                    posts={posts}
                    winSize={winSize}
                    countryThumbnails={countryThumbnails}
                    isPageLoaded={isPageLoaded}
                    setLastViewedSection={setLastViewedSection}
                />
                <span style={{
                    padding: 10,
                    fontFamily: 'Mulish',
                    color: '#fff',
                    borderRadius: '50px',
                    border: 'none',
                    margin: '0 10px',
                    zIndex: 10,
                    height: 50,
                    fontSize:winSize === 1 ? '0.8em' : '1.1em',
                    fontWeight: 'bold',
                    minWidth:190,
                    letterSpacing:4,
                    alignItems:'center',
                    display:'inline-flex',
                    justifyContent:'flex-start'
                }}>H  O  R  I  Z  O  N  S</span>
            </div>


            <img
                src='/assets/images/welcome-background.webp'
                // id="hero-pic-main"
                ref={heroPicMainRef}
                // className={isPageLoaded ? "" : "fade-in"}
                style={{
                    ...getHeroSectionPicStyle(winSize, height),
                    position: 'fixed'
                }} />
            {["One", "Two", "One"].map((piece, i) => {
                let image;
                if (i + 1 === 1) image =
                // '/assets/images/hero-section-pic-piece-1-black-and-white.png'
                '/assets/images/welcome-section-piece-1.webp';
                if (i + 1 === 2) image =
                // '/assets/images/hero-section-pic-piece-2-black-and-white.png';
                 '/assets/images/welcome-section-piece-2.webp';
                if (i + 1 === 3) image = 
                '/assets/images/welcome-section-piece-3.webp';
                // '/assets/images/hero-section-pic-piece-3-black-and-white.png';
                let ref;
                if (i === 0) ref = heroPicPieceOneRef;
                if (i === 1) ref = heroPicPieceTwoRef;
                if (i === 2) ref = heroPicPieceThreeRef;
                return (
                    <img
                        ref={ref}
                        src={image}
                        // className={`HeroPicPiece${piece}`}
                        key={`[Heropic]${i}`}
                        style={{ ...getHeroSectionPicPiecesStyle(winSize, height, i + 1) }
                        }
                    // className="fade-in"
                    />

                )
            })}

            <svg
                onLoad={() => setIsDomReady(true)}
                ref={heroPrimaryTextRef}
                style={{
                    ...getHeroSectionNameStyle(winSize, height), stroke: 'black',
                    opacity: (winSize === 1 && height < 480) || (isLargeMobileLandscape && height < 250) ? 0 : 1,
                    transition: 'opacity .1s ease-in',
                    zIndex: isInitialLoader ? 45 : -1,
                    pointerEvents: 'none',
                    strokeDashoffset: 180,
                    fill: 'transparent',
                }}
                // className={isPageLoaded ? "" : "draw1"}
                viewBox="0 0 120 50"
                id="heroTextMainPath"
            >
                <g>
                    <path ref={heroWelcomePieceOne} d={heroTextPieceOne} className={(isPageLoaded && isDomReady) ? "" : "draw1"} />
                    <path ref={heroWelcomePieceTwo} d={heroTextPieceTwo} className={(isPageLoaded && isDomReady) ? "" : "draw2"} />
                    <path ref={heroWelcomePieceThree} d={heroTextPieceThree} className={(isPageLoaded && isDomReady) ? "" : "draw3"} />
                    <path ref={heroWelcomePieceFour} d={heroTextPieceFour} className={(isPageLoaded && isDomReady) ? "" : "draw4"} />
                    <path ref={heroWelcomePieceFive} d={heroTextPieceFive} className={(isPageLoaded && isDomReady) ? "" : "draw5"} />
                    <path ref={heroWelcomePieceSix} d={heroTextPieceSix} className={(isPageLoaded && isDomReady) ? "" : "draw6"} />
                    <path ref={heroWelcomePieceSeven} d={heroTextPieceSeven} className={(isPageLoaded && isDomReady) ? "" : "draw7"} />
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
                    background: 'rgb(12,12,12,0.2)',
                    fontWeight:'bold',
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