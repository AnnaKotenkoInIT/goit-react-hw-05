import { useState, useEffect, useRef, Suspense } from 'react';
import { useParams, useLocation, NavLink, Outlet } from 'react-router-dom';
import { getMovieDetails } from '../../services/api';
import s from './MovieDetailsPage.module.css';
import Loader from '../../components/Loader/Loader';
import clsx from 'clsx';

const buildLinkClass = ({ isActive }) => clsx(s.link, isActive && s.active);

const defaultImg =
  'https://dummyimage.com/400x600/fcb8fc/000.jpg&text=No+poster+yet';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const location = useLocation();

  const backLink = useRef(location.state?.from || '/movies');

  useEffect(() => {
    setError(null);
    getMovieDetails(movieId)
      .then(setMovie)
      .catch(() => setError('Movie is not found!'));
  }, [movieId]);

  if (error) {
    return <p className={s.error}>{error}</p>;
  }

  if (!movie) return null;

  return (
    <div className={s.wrapp}>
      <NavLink to={backLink.current} className={clsx(s.link, s.backBtn)}>
        Go back
      </NavLink>

      <h2 className={s.title}>{movie.title}</h2>
      <div className={s.movieInf}>
        <div className={s.imgWrapp}>
          <img
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                : defaultImg
            }
            alt={movie.title || 'Movie poster'}
            width="250"
            className={s.img}
          />{' '}
        </div>
        <div className={s.textWrapp}>
          <p className={s.text}>
            Description:{' '}
            <span className={s.span}>{movie.overview || 'N/A'}</span>
          </p>
          <p className={s.text}>
            Rating:{' '}
            <span className={s.span}>{movie.vote_average || 'N/A'}</span>
          </p>
          <p className={s.text}>
            Year:{' '}
            <span className={s.span}>
              {movie.release_date ? movie.release_date.split('-')[0] : 'N/A'}
            </span>
          </p>
          <p className={s.text}>
            Duration:{' '}
            <span className={s.span}>{movie.runtime || 'N/A'} minutes</span>
          </p>
        </div>
      </div>

      <div className={s.addContainer}>
        <h3 className={s.addTitle}>Additional information</h3>

        <nav className={s.nav}>
          <NavLink to={`/movies/${movieId}/cast`} className={buildLinkClass}>
            Cast
          </NavLink>
          <NavLink to={`/movies/${movieId}/reviews`} className={buildLinkClass}>
            Reviews
          </NavLink>
        </nav>
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
};

export default MovieDetailsPage;
