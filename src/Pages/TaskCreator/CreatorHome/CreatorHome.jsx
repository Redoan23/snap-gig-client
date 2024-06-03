import React from 'react';
import useUserData from '../../../Hooks/useUserData/useUserData';

const CreatorHome = () => {

    const [userData] = useUserData()

    return (
        <div>
            <div>
                {`Your Total Coins : ${userData.coin}`}
            </div>
        </div>
    );
};

export default CreatorHome;