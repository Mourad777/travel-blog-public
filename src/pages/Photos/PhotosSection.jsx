import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router";
import Paginate from "../../components/Paginate/Paginate";
import { ScrollTrigger } from 'gsap/all'
import Loader from "../../components/Loader/Loader";
import { primaryColor } from "../utility";
import { BlogContext } from "../..";
import AnimatedDivider from "../../components/AnimatedDivider/AnimatedDivider";

export default ({
    reference,
    photos,
    winSize,
    scrollWidth,
    height,
    isLargeMobileLandscape,
    isPhotosLoading,
    setSelectedPhotosPage: setSelectedPage,
    selectedPhotosPage: selectedPage,
    scrollSection,
}) => {
    const [data, setData] = useState([]);
    const perPage = winSize > 1 && height < 640 ? 3 : 9;
    const [pageCount, setPageCount] = useState(0);
    // const [selectedPage, setSelectedPage] = useState(0);
    const [gridWidth, setGridWidth] = useState(0);
    const history = useHistory();

    useEffect(() => {
        ScrollTrigger.create({
            trigger: reference.current,
            start: "top top",
            scrub: 0.5,
            snap: true,
            pin: false,

        });
    }, [reference])

    const getData = async () => {
        setPageCount(Math.ceil((photos || []).length / perPage))
        const slice = photos.slice((selectedPage + 1) * perPage - perPage, (selectedPage + 1) * perPage);
        setData(slice)
    }

    useEffect(() => {
        getData()
    }, [selectedPage, photos, height, winSize]);

    const handlePageClick = (e) => {
        setSelectedPage(e.selected);
    };

    const gridContainerReference = useRef(null);
    useEffect(() => {
        setGridWidth(gridContainerReference.current.scrollWidth);
    }, [scrollWidth, photos]);
    const aspectRatio = scrollWidth / height;
    let titleStyle = { fontFamily: 'Mulish, sans-serif', fontSize: '4em', color: '#fff', textAlign: 'center', marginBottom: 0 }
    if (isLargeMobileLandscape || aspectRatio > 1.9) {
        titleStyle = { ...titleStyle, position: 'absolute', transform: 'translateY(-50%) rotate(-90deg)', top: '50%', left: '-60px' }
    }
    return (
        <BlogContext.Consumer>
            {({ setLastViewedSection }) => (
                <div style={{ height: '100vh', zIndex: 1, background: primaryColor, width: '100%', overflow: 'hidden', position: 'relative', minHeight: 360, }} ref={reference}>
                    {isPhotosLoading && <div style={{ position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%)' }}><Loader /></div>}

                    <p style={titleStyle}>Photos</p>

                    <div
                        style={{
                            overflow: "hidden",
                            maxWidth: 650,
                            margin: "auto",
                            width: winSize === 1 ? '100%' : '70%',
                            left: '50%',
                            top: '55%',
                            transform: 'translate(-50%,-50%)',
                            position: 'absolute'

                        }}
                    >

                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(3, minmax(100px, 293px))',
                            justifyContent: 'center',
                            gridGap: 3,

                        }}
                            ref={gridContainerReference}
                        >
                            {data.map((p, i) => (
                                <div
                                    key={`photo-grid-item[${i + 1}]`}
                                    onClick={() => {
                                        history.push(`/photo/${p.id}`);
                                        setLastViewedSection('photos');
                                    }}
                                    style={{
                                        position: 'relative',
                                        display: 'block',
                                        height: !!gridWidth ? (gridWidth - 6) / 3 : '',
                                        cursor: 'pointer'

                                    }}>
                                    <figure style={{ margin: 0, height: '100%' }}>
                                        <img loading="lazy"
                                            srcSet={`${p.src} 100w`}
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                verticalAlign: 'top',
                                                objectFit: 'cover'
                                            }} src={p.src} alt="" />
                                    </figure>
                                </div>
                            ))}
                        </div>
                    </div>
                    {!isPhotosLoading && <div style={{ display: 'flex' }}>
                        <Paginate totalPages={pageCount} page={selectedPage} handlePageClick={handlePageClick} />
                    </div>}
                    <AnimatedDivider imgPath={"/assets/images/earth-png-white.png"} isAnimating={scrollSection === 4} />
                </div >)}
        </BlogContext.Consumer>
    );
};
