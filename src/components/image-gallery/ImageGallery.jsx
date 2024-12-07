import css from "./ImageGallery.module.css";

export function ImageGallery({ images, onClick }) {
    return (
        <ul className={css.gallery}>
            {images.map(({ id, alt_description, urls }) => {

                return (
                    <li className={css.card} key={id} onClick={() => onClick(urls.regular)}>
                        <img className={css.image} src={urls.thumb} alt={alt_description}/>
                    </li>
                );
            })
            }
        </ul>
    );
}
