import React from 'react'
import {  Camera, Aperture, ShutterSpeed, Iso, Lens, FocalLength } from "../../../pages/blog/svgs";
const CameraInfo = ({ photo }) => (
    <div style={{
        position: 'absolute',
        top: 10,
        left: 10,
        color: 'rgb(255, 255, 255)',
        background: 'rgb(36,36,36)',
        margin: 10,
        opacity: 0.6,
        borderRadius: 10,
        zIndex:1,
    }}>
        <div
            style={{ display: "flex", width: 200, padding: 5 }}
        >
            <Camera />
            <p style={{ marginLeft: 10 }}>
                Camera <span>{!!photo.camera && !photo.camera.includes('undefined') ? photo.camera : ''}</span>
            </p>
        </div>
        <div
            style={{ display: "flex", width: 200, padding: 5 }}
        >
            <Lens />
            <p style={{ marginLeft: 10 }}>
                Lens <span>{ !!photo.lens && !photo.lens.includes('undefined') && photo.lens.includes('mm') && !photo.lens.includes(',') && !photo.camera.toLowerCase().includes('gopro') && !photo.lens.includes('000') ? (photo.lens || '').substring(0, 18) : ''}</span>
            </p>
        </div>
        <div
            style={{ display: "flex", width: 200, padding: 5 }}
        >
            <FocalLength />
            <p style={{ marginLeft: 10 }}>
                Focal Length <span>{!!photo.focal_length && !photo.focal_length.includes('NaN') ? photo.focal_length : ''}</span>
            </p>
        </div>
        <div
            style={{ display: "flex", width: 200, padding: 5 }}
        >
            <Aperture />
            <p style={{ marginLeft: 10 }}>
                Aperture <span>{!!photo.aperture && !photo.aperture.includes('NaN') && !photo.aperture.includes('f0') ? photo.aperture : ''}</span>
            </p>
        </div>
        <div
            style={{ display: "flex", width: 200, padding: 5 }}
        >
            <ShutterSpeed />
            <p style={{ marginLeft: 10 }}>
                Shutter <span>{!!photo.shutter_speed && !photo.shutter_speed.includes('undefined') ? photo.shutter_speed : ''}</span>
            </p>
        </div>
        <div
            style={{ display: "flex", width: 200, padding: 5 }}
        >
            <Iso />
            <p style={{ marginLeft: 10 }}>
                Iso <span>{!!photo.iso && !photo.iso.includes('undefined') ? photo.iso : ''}</span>
            </p>
        </div>
    </div>
)

export default CameraInfo;