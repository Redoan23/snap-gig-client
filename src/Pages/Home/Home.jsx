import React from 'react';
import Banner from './Banner/Banner';
import KeyFeatures from './KeyFeatures/KeyFeatures';
import HowItWorks from './HowItWorks/HowItWorks';
import UserReview from './UserReview/UserReview';

const Home = () => {
    return (
        <div>
            <div>
                <div className=' bg-[url("")]'>
                        {/* <video src="https://imgur.com/a/tHjATyB" className=' w-full h-[600px]'>ddd</video> */}
                        <Banner></Banner>
                        <KeyFeatures></KeyFeatures>
                        <HowItWorks></HowItWorks>
                        <UserReview></UserReview>
                </div>
            </div>
        </div>
    );
};

export default Home;