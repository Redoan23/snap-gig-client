import React, { useEffect, useState } from 'react';

import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Pagination, Navigation, Autoplay } from 'swiper/modules';

const UserReview = () => {

    const [reviews, setReview] = useState([])
    console.log(reviews)


    useEffect(() => {
        fetch('./review.json')
            .then(res => res.json())
            .then(data => {
                setReview(data)
            })
    }, [])

    return (
        <div className=' mt-24'>
            <div className=' pb-24'>
                <h3 className=' text-4xl font-semibold text-center'>Our Satisfied User</h3>
            </div>
            <Swiper
                slidesPerView={1}
                spaceBetween={30}
                loop={true}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Pagination, Navigation, Autoplay]}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                centeredSlides={true}
                className="mySwiper h-[250px] p-10"
            >

                {
                    reviews.map((review, i) => <SwiperSlide key={i}>
                        <div className=' flex flex-col justify-center items-center gap-3'>
                            <div className=' w-20 h-20 rounded-lg'><img className=' w-full h-full rounded-full' src={review.photo} alt="" /></div>
                            <h3>{review.name}</h3>
                            <Rating style={{ maxWidth: 250 }} value={review.rating} readOnly />
                            <p>{review.quote}</p>
                        </div>
                    </SwiperSlide>)
                }

            </Swiper>
        </div>
    );
};

export default UserReview;