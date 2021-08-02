export const mapsContainerAnimations = [
    {
        target: '#map-pics-container',
        trigger: '#main',
        start: 'top top',
        end: '40% bottom',
        properties: {
            zIndex: 0,
        }
    },
]


export const heroSectionAnimations = [
    {
        target: '.scroll-down-arrow',
        trigger: '#main',
        start: 'top top',
        end: 'center bottom',
        properties: {
            opacity: -30,
        }
    },
    {
        target: '.hero-button',
        trigger: '#main',
        start: 'top top',
        end: 'center bottom',
        properties: {
            opacity: -30,
        }
    },

    {
        target: '#hero-pic-main',
        trigger: '#main',
        start: 'top top',
        end: '30% bottom',
        properties: {
            duration: 3,
            opacity: -1,
        }
    },

    {
        target: '.HeroPicPieceTwo',
        trigger: '#main',
        start: 'top top',
        end: "center bottom",
        properties: {
            yPercent: -100,
            opacity: -5,
        }
    },
    {
        target: '.HeroPicPieceOne',
        trigger: '#main',
        start: 'top top',
        end: "center bottom",
        properties: {
            yPercent: 100,
            opacity: -5,
        }
    },
    {
        target: '#heroTextMainPath',
        trigger: '#container',
        start: 'top top',
        end: "center bottom",
        properties: {
            opacity: -30,
            // fill: 'rgba(255, 255, 255,0)',
        }
    },
    {
        target: '#heroTextSecondary',
        trigger: '#main',
        start: 'top top',
        end: "center bottom",
        properties: {
            opacity: -10,
            fill: 'rgba(0, 146, 228,0)',
        }
    },
]



// gsap.fromTo('#heroTextMainPath', { strokeDashoffset: 180, }, { strokeDashoffset: 0, duration: 1 });
// gsap.fromTo('#heroTextMainPath', { fill: 'rgba(255, 255, 255,0)' }, { fill: 'rgba(255,255,255,1)', duration: 1 })