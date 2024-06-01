import React from 'react';
import AwesomeSlider from 'react-awesome-slider';
import withAutoplay from 'react-awesome-slider/dist/autoplay';
import 'react-awesome-slider/dist/styles.css';


const AutoplaySlider = withAutoplay(AwesomeSlider);

const Banner = () => {
    return (
        <AutoplaySlider
            infinite
            play={true}
            className=' h-[540px] '
        media={[
            {
                source: 'https://i.ibb.co/sFFcsGS/2150970188.jpg',
            },
            {
                source: 'https://i.ibb.co/ysN43j4/97242.jpg',
            },
            {
                source: 'https://i.ibb.co/ZY20Z1w/80620.jpg',
            },
            {
                source: 'https://i.ibb.co/D4Nmm2Z/2150706419.jpg',
            },
        ]}
        />
            
    );
};

export default Banner;