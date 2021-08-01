import React from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { useHistory } from 'react-router-dom';
import geo from "./geo.json"
const geoUrl =
    "https://raw.githubusercontent.com/zcreat";

const WorldMap = ({ winSize, height, reference, postsFromDB = [], photos, videos, isLargeMobileLandscape, scrollWidth }) => {
    const history = useHistory();
    const handleClick = (geo) => () => {
        const highlightedCountries = [...postsFromDB.map(p => p.country), ...photos.map(p => p.country), ...videos.map(p => p.country)];
        if (highlightedCountries.includes(geo.ISO_A2)) {
            history.push(`/destination/${geo.ISO_A2}`)
        }
    }
    const aspectRatio = scrollWidth / height;
    let titleStyle = { fontFamily: 'Mulish, sans-serif', fontSize: '4em', color: '#daad86', textAlign: 'center', marginBottom: 0 }
    if (isLargeMobileLandscape || aspectRatio > 1.9) {
        titleStyle = { ...titleStyle, position: 'absolute', fontSize: '4em', transform: 'translateY(-50%) rotate(-90deg)', top: '50%', left: '-130px' }
    }
    const defaultStyle = {
        left: '50%',
        top: '50%',
        transform: 'translate(-50%,-50%)',
        position: 'absolute',
        width: '100%'
    }


    return (
        <div style={{ paddingTop: isLargeMobileLandscape ? 0 : 30, background: '#ece7e2', height: '100vh', width: '100%', zIndex: 1, overflow: 'hidden', position: 'relative' }} ref={reference}>
            <p style={titleStyle}>Destinations</p>
            <ComposableMap
                style={

                    winSize !== 1
                        ? { ...defaultStyle, width: "70%", display: "block", margin: "auto" }
                        : defaultStyle
                }
            >
                <Geographies geography={geo}>
                    {({ geographies }) =>
                        geographies.map(geo => {

                            const isHighlighted = postsFromDB.findIndex(p => p.country === geo.properties.ISO_A2) > -1 ||
                                videos.findIndex(p => p.country === geo.properties.ISO_A2) > -1 ||
                                photos.findIndex(p => p.country === geo.properties.ISO_A2) > -1;

                            return (
                                <Geography

                                    key={geo.rsmKey}
                                    geography={geo}
                                    // fill={isHighlighted ? "rgb(155, 111, 72)" : "rgb(218, 173, 134)"}
                                    fill={
                                        isHighlighted
                                            ? "#840404"
                                            : "rgb(218, 173, 134)"
                                    }
                                    cursor={isHighlighted ? 'pointer' : 'default'}
                                    onClick={handleClick(geo.properties)}
                                // stroke="#840404"
                                />
                            );
                        })
                    }
                </Geographies>
            </ComposableMap>
        </div>
    );
};

export default WorldMap;
