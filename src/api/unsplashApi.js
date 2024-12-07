import axios from "axios";

axios.defaults.baseURL = "https://api.unsplash.com";

export default async function fetchImages(query, page, perPage = 20) {
    const params = {
        query,
        page,
        per_page   : perPage,
        client_id  : "LvPx7HNimnBqeyeLR6PLDKLIM_CgNVbb6Is3nfgkK-g",
        orientation: "landscape"
    };

    const { data } = await axios.get("/search/photos", { params });
    return { images: data.results, total: data.total };
}
