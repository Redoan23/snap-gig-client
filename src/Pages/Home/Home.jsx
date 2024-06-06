import React from 'react';
import Banner from './Banner/Banner';
import KeyFeatures from './KeyFeatures/KeyFeatures';
import HowItWorks from './HowItWorks/HowItWorks';
import UserReview from './UserReview/UserReview';
import TopEarner from './TopEarner/TopEarner';

const Home = () => {
    return (
        <div>
            <div>
                <div>
                    <Banner></Banner>
                    <KeyFeatures></KeyFeatures>
                    <HowItWorks></HowItWorks>
                    <TopEarner></TopEarner>
                    <UserReview></UserReview>
                </div>
            </div>
        </div>
    );
};

export default Home;