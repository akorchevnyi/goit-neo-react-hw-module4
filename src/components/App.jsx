import "./App.css";
import { Searchbar } from "./search-bar/Searchbar.jsx";
import { useEffect, useState } from "react";
import { ImageGallery } from "./image-gallery/ImageGallery.jsx";
import fetchImages from "../api/unsplashApi.js";
import toast from "react-hot-toast";
import { MagnifyingGlass } from "react-loader-spinner";
import { LoadMoreBtn } from "./load-more-btn/LoadMoreBtn.jsx";
import ImageModal from "./image-modal/ImageModal.jsx";

export default function App() {
    const [query, setQuery] = useState("");
    const [images, setImages] = useState([]);
    const [isBtnVisible, setIsBtnVisible] = useState(false);
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [imageUrl, setImageUrl] = useState("");


    const handleQuery = (query) => {
        setPage(1);
        setError("");
        setQuery(query);
        setImages([]);
        setIsBtnVisible(false);
    };

    const closeModal = () => setImageUrl("");

    const handleLoadMore = () => setPage((prev) => prev + 1);

    const handleImageClick = url => {
        if (!url) return;
        setImageUrl(url);
    };

    useEffect(() => {
        if (!query) return;

        (async () => {
            try {
                setIsLoading(true);
                setError("");

                const { images, total } = await fetchImages(query, page, perPage);
                if (images.length === 0) toast.error("No images found", { position: "top-right" });

                setIsBtnVisible(total > images.length + perPage);
                if (images.length > 0) setImages((prev) => [...prev, ...images]);

                if (page > 1) window.scrollBy({ top: 350, behavior: "smooth" });
            } catch (error) {
                console.error(error);
                toast.error("Something went wrong. Please try to reload the page", { position: "top-right" });
                setError("Something went wrong. Please try to reload the page");
            } finally {
                setIsLoading(false);
            }
        })();
    }, [query, page, perPage]);


    return (
        <div id="app">
            <Searchbar onSubmit={handleQuery} setImagesInRow={setPerPage}/>
            {images.length > 0 && <ImageGallery images={images} onClick={handleImageClick}/>}
            {isBtnVisible && <LoadMoreBtn onClick={handleLoadMore}>Load more</LoadMoreBtn>}
            {isLoading && <MagnifyingGlass/>}
            {error && <h3>{error}</h3>}
            <ImageModal closeModal={closeModal} imageUrl={imageUrl}/>
        </div>
    );
}
