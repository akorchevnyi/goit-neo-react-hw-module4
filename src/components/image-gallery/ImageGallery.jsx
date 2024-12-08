import css from "./ImageGallery.module.css";
import { ImageCard } from "../image-card/ImageCard.jsx";

export function ImageGallery({ images, onClick }) {
    return (
        <ul className={css.gallery}>
            {images.map(({ id, alt_description, urls: { thumb, regular } }) => {

                return (
                    <li className={css.card} key={id} onClick={() => onClick(regular)}>
                        <ImageCard thumb={thumb} description={alt_description}/>
                    </li>
                );
            })
            }
        </ul>
    );
}
