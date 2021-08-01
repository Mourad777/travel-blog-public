import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router";
import Paginate from "../../../components/blog/Paginate/Paginate";

export default ({ reference, photos, winSize, scrollWidth, height, isLargeMobileLandscape }) => {

    const [data, setData] = useState([]);
    const perPage = winSize > 1 && height < 640 ? 3 : 9;
    const [pageCount, setPageCount] = useState(0);
    const [selectedPage, setSelectedPage] = useState(0);
    const [gridWidth, setGridWidth] = useState(0);
    const history = useHistory();

    const getData = async () => {
        const slice = photos.slice((selectedPage + 1) * perPage - perPage, (selectedPage + 1) * perPage);
        setData(slice)
        setPageCount(Math.ceil(photos.length / perPage))
    }

    useEffect(() => {
        getData()
    }, [selectedPage, photos]);

    useEffect(() => {
        setSelectedPage(0)
        getData();
    }, [winSize, height])

    const handlePageClick = (e) => {
        setSelectedPage(e.selected);
    };

    const gridContainerReference = useRef(null);
    useEffect(() => {
        setGridWidth(gridContainerReference.current.scrollWidth);
    }, [gridContainerReference, scrollWidth]);
    const aspectRatio = scrollWidth / height;
    let titleStyle = { fontFamily: 'Mulish, sans-serif', fontSize: '4em', color: '#fff', textAlign: 'center', marginBottom: 0 }
    if (isLargeMobileLandscape || aspectRatio > 1.9) {
        titleStyle = { ...titleStyle, position: 'absolute', transform: 'translateY(-50%) rotate(-90deg)', top: '50%', left: '-60px' }
    }
    return (
        <div style={{ height: '100vh', background: 'rgb(218, 173, 134)', width: '100%', overflow: 'hidden', position: 'relative' }} ref={reference}>

            <p style={titleStyle}>Photos</p>

            <div
                style={{
                    overflow: "hidden",
                    maxWidth: 650,
                    paddingTop: 55,
                    margin: "auto",
                    width: winSize === 1 ? '100%' : '70%',
                    left: '50%',
                    top: '50%',
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
                            onClick={() => history.push(`/photo/${p.id}`)}
                            style={{
                                position: 'relative',
                                display: 'block',
                                height: !!gridWidth ? (gridWidth - 6) / 3 : '',
                                cursor: 'pointer'

                            }}>
                            <figure style={{ margin: 0, height: '100%' }}>
                                <img style={{
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
            <div style={{ display: 'flex' }}>
                <Paginate totalPages={pageCount} page={selectedPage} handlePageClick={handlePageClick} />
            </div>
        </div >
    );
};
