import React from 'react';
import { BiDollar } from 'react-icons/bi';
import { RiCoinsLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';

const PurchaseCoin = () => {


    const handlePurchase = () => {

    }

    return (
        <div className=' flex flex-wrap gap-10 p-5'>
            <Link to={`/payment/${1}`}>
                <div className="card  w-96 h-60 rounded-none bg-base-100 shadow-xl border py-4">
                    <figure className=' flex items-center'> <span className=' text-5xl font-semibold'>10</span> <RiCoinsLine size={60} color=' #E5C100' /></figure>
                    <div className="card-body items-center text-center">
                        <h2 className="card-title">Exchange</h2>
                        <p className=' flex items-center text-2xl'> <BiDollar className=' text-[#6d9ec9]' /><span className=' font-semibold'>1</span></p>
                    </div>
                </div>
            </Link>
            <Link to={`/payment/${10}`} >
                <div className="card  w-96 h-60 rounded-none bg-base-100 shadow-xl border py-4">
                    <figure><span className=' text-5xl font-semibold'>100</span> < RiCoinsLine size={60} color=' #E5C100' /></figure>
                    <div className="card-body items-center text-center">
                        <h2 className="card-title">Exchange</h2>
                        <p className=' flex items-center  text-2xl'> <BiDollar className=' text-[#6d9ec9]' /><span className=' font-semibold'>9</span> </p>
                    </div>
                </div>
            </Link>
            <Link  to={`/payment/${100}`}>
                <div className="card  w-96 h-60 rounded-none bg-base-100 shadow-xl border py-4">
                    <figure><span className=' text-5xl font-semibold'>500</span> <RiCoinsLine size={60} color=' #E5C100' /></figure>
                    <div className="card-body items-center text-center">
                        <h2 className="card-title">Exchange</h2>
                        <p className=' flex items-center  text-2xl'>  <BiDollar className=' text-[#6d9ec9]' /><span className=' font-semibold'>19</span> </p>
                    </div>
                </div>
            </Link>

            <Link  to={`/payment/${500}`}>
                <div className="card  w-96 h-60 rounded-none bg-base-100 shadow-xl border py-4">
                    <figure> <span className=' text-5xl font-semibold'>1000</span> <RiCoinsLine size={60} color=' #E5C100' /></figure>
                    <div className="card-body items-center text-center">
                        <h2 className="card-title">Exchange</h2>
                        <p className=' flex items-center  text-2xl'> <BiDollar className=' text-[#6d9ec9]' /> <span className=' font-semibold'>39</span> </p>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default PurchaseCoin;