import css from './LoadMoreBtn.module.css';

export function LoadMoreBtn({ onClick }) {
    return <button className={css.button} onClick={onClick}>Load more</button>;
}
