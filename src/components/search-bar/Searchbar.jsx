import { Field, Form, Formik } from "formik";
import css from "./Searchbar.module.css";
import toast, { Toaster } from "react-hot-toast";
import { schema } from "../../validation/validation.js";
import { useEffect, useRef } from "react";


export function Searchbar({ onSubmit, setImagesInRow }) {
    const galleryRef = useRef();

    useEffect(() => {
        if (!galleryRef.current) return;

        const galleryWidth = galleryRef.current.offsetWidth;
        const imagesInRow = Math.floor((galleryWidth + 5) / 205);
        setImagesInRow(imagesInRow * 5);
    }, [setImagesInRow]);


    const handleSubmit = async (values) => {
        try {
            await schema.validate(values, { abortEarly: false });
            onSubmit(values.query);
        } catch (err) {
            if (err.inner?.length > 0) toast.error(err.inner[0].message, { position: "top-right" });
        }
    };

    return (
        <header className={css.header}>
            <div className={css.container} ref={galleryRef}>
                <Formik initialValues={{ query: "" }} onSubmit={handleSubmit}>
                    <Form className={css.form}>
                        <Field className={css.input} type="text" name="query" placeholder="Search"/>
                        <button className={css.searchBtn} type="submit">🔎</button>
                    </Form>
                </Formik>
                <Toaster/>
            </div>
        </header>
    );
}
