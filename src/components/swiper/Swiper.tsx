import { Swiper as SwiperLib, SwiperSlide } from 'swiper/react';
import { Autoplay, A11y } from 'swiper/modules';
import type { ComicsData } from '../../store/slices/library/library.types';
import 'swiper/scss';
import 'swiper/scss/effect-coverflow';
import 'swiper/scss/pagination';
import styles from './Swiper.module.scss';
import Card from '../card';

interface SwiperProps {
  data: ComicsData | undefined
}

const Swiper: React.FC<SwiperProps> = (props) => {
  const {data} = props;

  return (
    data?.results && <SwiperLib
      className={styles.swiper}
      wrapperClass={styles.swiperWrapper}
      direction='vertical'
      slidesPerView={'auto'}
      spaceBetween={30}
      roundLengths={true}
      speed={5000}
      autoHeight={true}
      loop={true}
      autoplay={{
        delay: 1,
        disableOnInteraction: true,
        pauseOnMouseEnter: true
      }}
      modules={[Autoplay, A11y]}
      onAutoplay={(e) => setTimeout(() => e.autoplay.resume(), 500)}
    >
      {data.results.map((item, index) => (
        <SwiperSlide className={styles.slide} key={`slide-${index}`}>
          <Card
            id={item.id!}
            image={`${item.thumbnail?.path}.${item.thumbnail?.extension}`}
            title={`${item.title}`}
          />
        </SwiperSlide>
      ))}
    </SwiperLib>
  );
};

export default Swiper;
