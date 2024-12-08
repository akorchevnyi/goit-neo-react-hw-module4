import css from './ImageCard.module.css';

export function ImageCard({thumb, description}) {
    return (
        <div>
            <img className={css.image} src={thumb} alt={description}/>
        </div>
    );
};
