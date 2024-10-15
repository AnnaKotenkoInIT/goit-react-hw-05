import { Circles } from 'react-loader-spinner';
import s from './Loader.module.css';

const Loader = () => (
  <div className={s.load}>
    <Circles
      height="80"
      width="80"
      color="#6e246e"
      ariaLabel="circles-loading"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
    />
  </div>
);

export default Loader;
