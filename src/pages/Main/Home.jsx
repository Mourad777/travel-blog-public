import React, { useEffect, useState } from "react";
import Navigation from "../../../components/blog/Navbar/Navbar";
import 'semantic-ui-css/semantic.min.css'
import "./Home.module.css";
import WorldMap from "../Countries/WorldMap";
import Loader from "./Loader";
import { gsap, ScrollTrigger, ScrollToPlugin } from 'gsap/all'
import { animate } from './gsapAnimations'
import PhotosSection from "../Photos/PhotosSection";
import VideosSection from "../Videos/VideosSection";
import { AppUrl, getMapPosition } from "../utility";
import {
    StyledMap,
    StyledMapOverlay,
    StyledHeroSection,
    StyledContactSection,
} from '../StyledComponents'
import MapPath from "./MapPath";
import ContactForm from "../Contact/ContactSection";
import { useRef } from "react";
import PostsSection from "../Posts/Posts";
import HeroSectionContent from "./HeroSectionContent";
import { Fragment } from "react";
import _ from "lodash";
import VideoIcon from '../../../../../public/assets/video-icon.jpg'
import { useHistory } from "react-router-dom";
// import notepad from '../../../../../public/assets/map-notepad-desk-md.jpg'
import notepad from '../../../../../public/assets/images/notepad.webp'
import { getCountryThumbnails, getPhotos, getPosts, getVideos } from "../../admin/util/api";
import ImgNextGen from "../../../components/blog/NextGenImg/NextGenImg";
import { useCallback } from "react";
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollToPlugin);
// gsap.ticker.fps(30)
// gsap.ticker.lagSmoothing(50,50)
// gsap.ticker.deltaRatio(30)
const Home = (({ scrollWidth, winSize, height }) => {

    const refSection1 = useRef(null)
    const refSection2 = useRef(null)
    const refSection3 = useRef(null)
    const refSection4 = useRef(null)
    const refSection5 = useRef(null)
    const refSection6 = useRef(null)
    const refSectionX = useRef(null)
    const heroPicMainRef = useRef(null);

    const [isAssetLoaded, setIsAssetLoaded] = useState(false);

    const [isheroSectionBackgroundPieceOneLoaded, setIsHeroSectionBackgroundPieceOneLoaded] = useState(false);
    const [isheroSectionBackgroundPieceTwoLoaded, setIsHeroSectionBackgroundPieceTwoLoaded] = useState(false);
    const [isheroSectionBackgroundPieceThreeLoaded, setIsHeroSectionBackgroundPieceThreeLoaded] = useState(false);

    const [isheroSectionBackgroundLoaded, setIsHeroSectionBackgroundLoaded] = useState(false);

    const [postsFromDB, setPostsFromDB] = useState([]);
    const [photos, setPhotos] = useState([]);
    const [videos, setVideos] = useState([]);
    const [scrollPosition, setScrollPostion] = useState(0);
    const [scrollSection, setScrollSection] = useState(0);
    const [isLoading, setIsLoading] = useState(0);
    const [countryThumbnails, setCountryThumbnails] = useState([])

    const handleScrollPosition = (value) => {
        setScrollPostion(value)
    }
    const history = useHistory()

    useEffect(() => {
        setScrollSection(0)
        if (window.scrollY > window.innerHeight / 4) {
            // do something 
            setScrollSection(winSize > 2 ? 2 : 1)
        }
        if (window.scrollY > window.innerHeight * 1 + window.innerHeight / 2) {
            // do something 
            setScrollSection(2)
        }
        if (window.scrollY > window.innerHeight * 2 + window.innerHeight / 2) {
            // do something 
            setScrollSection(3)
        }
        if (window.scrollY > window.innerHeight * 3 + window.innerHeight / 2) {
            // do something 
            setScrollSection(4)
        }
        if (window.scrollY > window.innerHeight * 4 + window.innerHeight / 2) {
            // do something 
            setScrollSection(5)
        }
        if (window.scrollY > window.innerHeight * 5 + window.innerHeight / 2) {
            // do something 
            setScrollSection(6)
        }

    }, [scrollPosition, scrollWidth, winSize])

    useEffect(() => {
        getInitialData()
    }, [])

    const getInitialData = async () => {
        await getPosts(setPostsFromDB, setIsLoading);
        await getPhotos(setPhotos, setIsLoading);
        await getVideos(setVideos, setIsLoading);
        await getCountryThumbnails(setCountryThumbnails, setIsLoading);
    }

    useEffect(() => {
        const triggers = ScrollTrigger.getAll();
        triggers.forEach(tr => {
            tr.kill()
        });
        if (isAssetLoaded) {
            const sections = [refSection2, refSection3, refSection4, refSection5, refSectionX].filter(i => i);
            sections.forEach((pan, i) => {
                if (!pan) return;

                ScrollTrigger.create({
                    trigger: pan.current,
                    start: "top top",
                    // end:() => "+=" + (panelsContainer.offsetHeight - innerHeight),
                    // endTrigger:panel,
                    scrub: 0.5,
                    snap: true,
                    // markers: true,
                    pin: false,
                });

            });

            /////////////////////////////////////////////////////////////////////////////////////////////////////////
            /////////////////////////////////////////////////////////////////////////////////////////////////////////

            // the animation to use
            const tlPath = gsap.timeline({ paused: true });
            const tlHeroPicOne = gsap.timeline({ paused: true });
            const tlHeroPicOneEnd = gsap.timeline({ paused: true });
            // const tlHeroPicTwo = gsap.timeline({ paused: true });
            // const tlHeroPicThree = gsap.timeline({ paused: true });

            tlPath.to("#myline", { strokeDashoffset: 2850 });
            tlHeroPicOne.to("#hero-pic-1", { scale: 1, rotate: '10deg', opacity: 1 });
            // tlHeroPicOneEnd.to("#hero-pic-1", { scale: 0, rotate: '0deg', opacity: 0, });
            // tlHeroPicTwo.to("#hero-pic-1", { opacity: 1 });
            // tlHeroPicOne.to("#hero-pic-1", { opacity: 1 });

            let requestId;
            // The start and end positions in terms of the page scroll
            // const startY = innerHeight / 10;
            const startY = 0;
            // const finishDistance = innerHeight / 5;
            const finishDistancePath = innerHeight * 2;
            const finishDistanceHeroPicOne = 200;
            // const finishDistanceHeroBackgroundPiece = innerHeight / 2;
            // Listen to the scroll event
            // _.throttle()
            document.addEventListener("scroll", _.throttle(function () {
                // Prevent the update from happening too often (throttle the scroll event)
                if (!requestId) {
                    requestId = requestAnimationFrame(update);
                }
            }, 200, {}));

            update();

            function update() {
                // Update our animation
                tlPath.progress((scrollY - startY) / finishDistancePath);
                // tlHeroPicOne.progress((scrollY - startY) / finishDistanceHeroPicOne);
                handleScrollPosition(scrollY)
                tlHeroPicOneEnd.progress((scrollY - startY) / finishDistanceHeroPicOne);


                // tlHeroBackgroundPieceOne.progress((scrollY - startY) / finishDistanceHeroBackgroundPiece);
                // tlHeroBackgroundPieceTwo.progress((scrollY - startY) / finishDistanceHeroBackgroundPiece);
                // Let the scroll event fire again
                requestId = null;
            }

            /////////////////////////////////////////////////////////////////////////////////////////////////////////
            /////////////////////////////////////////////////////////////////////////////////////////////////////////

            animate()
        }
    }, [refSection2, refSection3, refSection4, refSection5, refSectionX, isAssetLoaded])

    useEffect(() => {
       const assetsLoaded = [
            isheroSectionBackgroundLoaded,
            isheroSectionBackgroundPieceOneLoaded,
            isheroSectionBackgroundPieceTwoLoaded,
            isheroSectionBackgroundPieceThreeLoaded
        ]
        .filter(item=>item)
        .length;

        console.log('assets loaded: ',assetsLoaded)
        if(assetsLoaded === 4){
            setIsAssetLoaded(true)
        }
    }, [
        isheroSectionBackgroundLoaded,
        isheroSectionBackgroundPieceOneLoaded,
        isheroSectionBackgroundPieceTwoLoaded,
        isheroSectionBackgroundPieceThreeLoaded
    ]);

    const transformStyles1 = scrollPosition >= 100 && scrollPosition < 1000 ? {
        opacity: 1,
        scale: 1,
        transform: 'rotate(-15deg) scale(1)',
    } : {};


    const transformStyles2 = scrollPosition >= 200 && scrollPosition < 1000 ? {
        opacity: 1,
        scale: 1,
        transform: 'rotate(20deg) scale(1)',
    } : {};


    const transformStyles3 = scrollPosition >= 300 && scrollPosition < 1000 ? {
        opacity: 1,
        scale: 1,
        transform: 'rotate(-10deg) scale(1)',
    } : {};

    let isLargeMobileLandscape = false;
    if (winSize === 2 && height < 420) {
        isLargeMobileLandscape = true
    }

    const handleImageLoad = (image) => {
        if(image === 'welcome-background'){
            setIsHeroSectionBackgroundLoaded(true)
        }
        if(image === 'piece[1]'){
            setIsHeroSectionBackgroundPieceOneLoaded(true)
        }
        if(image === 'piece[2]'){
            setIsHeroSectionBackgroundPieceTwoLoaded(true)
        }
        if(image === 'piece[3]'){
            setIsHeroSectionBackgroundPieceThreeLoaded(true)
        }
        
    }

    return (
        <Fragment>
            <div id="main" style={{ overflow: 'hidden' }}>
                <Loader isAssetLoaded={isAssetLoaded} />
                {(winSize > 1 && !isLargeMobileLandscape) && (
                    <Navigation
                        scrollSection={scrollSection}
                        componentReferences={
                            {
                                welcome: refSection1,
                                posts: refSection2,
                                destinations: refSection3,
                                photos: refSection4,
                                videos: refSection5,
                                contact: refSection6
                            }
                        }
                    />
                )}

                {/* must use a lower resolution map for mobile devices */}
                <div id="map-pics-container" style={{ zIndex: 5, position: 'fixed', height: '100vh', width: '100%' }}>

                    {(photos[0] || {}).src && <div id="hero-pic-1" style={{
                        position: 'absolute',
                        top: isLargeMobileLandscape ? '20%' : '42%',
                        left: isLargeMobileLandscape ? '40%' : '32%',
                        transform: 'translateX(-50%) translateY(-50%)',
                        // top: winSize === 1 ? 270 : 300,
                        // left: winSize === 1 ? 15 : 100,
                        height: 100,
                        width: 100,
                        cursor: 'pointer',
                        border: '5px solid #e7c5a2',
                        zIndex: 4,
                        transition: '0.3s all ease-in',
                        opacity: 0,
                        scale: 0,
                        transform: 'rotate(0) scale(0)',
                        ...transformStyles1,

                    }}
                        onClick={() => history.push(`/photo/${(photos[0] || {}).id}`)}
                    >
                        <img style={{ objectFit: 'cover', width: '100%', height: '100%' }} src={(photos[0] || {}).src} />
                    </div>}
                    {(photos[1] || {}).src && <div id="hero-pic-2" style={{
                        position: 'absolute',
                        top: isLargeMobileLandscape ? '50%' : '62%',
                        left: isLargeMobileLandscape ? '20%' : winSize <= 2 ? '7%' : '35%',
                        height: 100,
                        width: 100,
                        cursor: 'pointer',
                        border: '5px solid #e7c5a2',
                        zIndex: 4,
                        transition: '0.3s all ease-in',
                        opacity: 0,
                        scale: 0,
                        transform: 'rotate(0) scale(0)',
                        ...transformStyles2,
                    }}
                        onClick={() => history.push(`/photo/${(photos[1] || {}).id}`)}

                    >
                        <img style={{ objectFit: 'cover', width: '100%', height: '100%' }} src={(photos[1] || {}).src} />
                    </div>}
                    {(photos[2] || {}).src && <div id="hero-pic-3" style={{
                        position: 'absolute',
                        top: '58%',
                        left: '50%',
                        height: 100,
                        width: 100,
                        cursor: 'pointer',
                        border: '5px solid #e7c5a2',
                        zIndex: 4,
                        transition: '0.3s all ease-in',
                        opacity: 0,
                        scale: 0,
                        transform: 'rotate(0) scale(0)',
                        ...transformStyles3,
                    }}
                        onClick={() => history.push(`/photo/${(photos[2] || {}).id}`)}
                    >
                        <img style={{ objectFit: 'cover', width: '100%', height: '100%' }} src={(photos[2] || {}).src} />
                    </div>}
                </div>

                <div id="container" style={{ position: "relative" }}>
                    <div id="map-container" style={{ position: 'fixed', height: '100%', width: '100%', top: getMapPosition(winSize, height).top, zIndex: -1 }}>
                        <div style={{ position: 'relative', height: '100vh' }}>
                            <StyledMap windowWidth={winSize} width={getMapPosition(winSize, height).width} lowRes src={notepad} />
                            {/* <ImgNextGen
                                styles={
                                    {
                                        width: `${getMapPosition(winSize, height).width}%`,
                                        height: 'auto',
                                        backgroundRepeat: 'no-repeat',
                                        zIndex: -3,
                                        position: 'absolute',
                                        left: '50%',
                                        top: '50%',
                                        transform: 'translateX(-50%) translateY(-50%)',
                                    }
                                }
                                srcWebp={notepad}
                                srcJrx={notepad}
                                srcJp2={notepad}
                                fallback={notepad}
                                alt="Map of north america"
                            /> */}
                            {/* path drawing on world map svg */}
                            <MapPath winSize={winSize} />

                        </div>
                    </div>

                    <StyledHeroSection ref={refSection1} id="hero-section">
                        <HeroSectionContent
                            height={height}
                            posts={postsFromDB}
                            photos={photos}
                            videos={videos}
                            countryThumbnails={countryThumbnails}
                            tags={[]}
                            categories={[]}
                            heroPicMainRef={heroPicMainRef}
                            winSize={winSize}
                            isAssetLoaded={isAssetLoaded}
                            refPosts={refSection2}
                            refVideos={refSection5}
                            isLargeMobileLandscape={isLargeMobileLandscape}
                            onImageLoad={handleImageLoad}
                        />
                    </StyledHeroSection>
                    {/* the spacer section is so that gsap will snap to latest post section if the top part of that section is in view port */}
                    <div id="spacer" style={{ overflow: 'hidden', width: '100%', height: '100vh', zIndex: -10 }} ref={refSectionX} />
                    <PostsSection scrollWidth={scrollWidth} height={height} isLargeMobileLandscape={isLargeMobileLandscape} reference={refSection2} postsFromDB={postsFromDB} winSize={winSize} />

                    <WorldMap reference={refSection3} isLargeMobileLandscape={isLargeMobileLandscape}  postsFromDB={postsFromDB} videos={videos} scrollWidth={scrollWidth} photos={photos} height={height} winSize={winSize} />
                    {/* <Country reference={refSectionDestination} postsFromDB={postsFromDB} /> */}

                    <PhotosSection photos={photos} isLargeMobileLandscape={isLargeMobileLandscape} reference={refSection4} winSize={winSize}  height={height} scrollWidth={scrollWidth} />
                    {/* <PhotosSectionDetail reference={refSectionPhotos}/> */}

                    <VideosSection videos={videos} isLargeMobileLandscape={isLargeMobileLandscape} height={height} reference={refSection5} scrollWidth={scrollWidth} winSize={winSize} />
                    {/* <VideosSectionDetail reference={refSectionVideos}/> */}

                    <StyledContactSection id="contact-section">
                        <ContactForm isLargeMobileLandscape={isLargeMobileLandscape} height={height} scrollWidth={scrollWidth} />
                    </StyledContactSection>
                </div>

                {/* floating rotating icons */}
                {/* {[
                { style: getCompassStyle(winSize), path: compass },
                { style: getPlaneStyle(winSize), path: airplane },
                { style: getFeetStyle(winSize), path: footPrints }
            ].map((icon, i) => (
                    <svg
                        className="rotating-icon"
                        style={icon.style}
                        viewBox="0 0 50 50"
                        key={`[icon]${i}`}
                    >
                        <g>
                            <path d={icon.path} id={`'${icon.path}'`} />
                        </g>
                    </svg>
            ))} */}

            </div>
        </Fragment>

    );
});

export default React.memo(Home);
