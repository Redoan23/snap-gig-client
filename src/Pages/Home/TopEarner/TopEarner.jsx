import React from 'react';
import useAxiosPublic from '../../../Hooks/useAxiosPublic/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { EffectCoverflow, Navigation, Pagination } from 'swiper/modules';
import { RiCoinsLine } from 'react-icons/ri';
import useAllUserData from '../../../Hooks/useAllUserData/useAllUserData';
import useSubmittedData from '../../../Hooks/useSubmittedData/useSubmittedData';

const TopEarner = () => {
    const [allUserData] = useAllUserData()
    const [submittedData] = useSubmittedData()
    const axiosPublic = useAxiosPublic()
    const { data: topEarners = [] } = useQuery({
        queryKey: ['topEarners'],
        queryFn: async () => {
            const res = await axiosPublic.get('/topEarners')
            return res.data
        }
    })

    const { data = [] } = useQuery({
        queryKey: ['worksDone'],
        queryFn: async () => {
            axiosPublic.get()
        }
    })

    return (
        <div>
            <div className='mt-24'>

                <div><h3 className=' text-4xl font-semibold text-center'>Top Earners</h3></div>

                <div className=' pt-24'>
                    <Swiper
                        effect={'coverflow'}
                        grabCursor={true}
                        centeredSlides={true}
                        autoplay={true}
                        width={1100}
                        coverflowEffect={{
                            rotate: 5,
                            stretch: 0,
                            depth: 300,
                            modifier: 0.4,
                            slideShadows: true,
                        }}
                        pagination={true}
                        modules={[EffectCoverflow, Pagination, Navigation]}
                        breakpoints={{
                            640: {
                                slidesPerView: 2,
                            },
                            768: {
                                slidesPerView: 2,
                            },
                            1024: {
                                slidesPerView: 3,
                            },
                        }}

                        className="mySwiper swiper_container mx-auto"
                    >
                        {
                            topEarners.map(earner =>
                                <SwiperSlide key={earner._id} className=' overflow-hidden w-[400px] h-[600px]'>
                                    <div className="text-center w-full shadow-2xl rounded-lg p-[20px] bg-gray-100">
                                        <img className=' w-full h-full' src={earner.imgLink} />
                                        <h2 className=' font-semibold pt-5 text-xl'>{earner.name}</h2>
                                        <p className=' flex items-center justify-center text-3xl gap-1 py-1 font-bold text-orange-400'><RiCoinsLine color='orange' /> {earner.coin}</p>
                                        <p className=' font-semibold'>Works Done:</p>
                                        <p >{submittedData.map(title => title.taskTitle)}</p>
                                    </div>
                                </SwiperSlide>)
                        }

                    </Swiper>


                </div>
            </div>
        </div >
    );
};

export default TopEarner;