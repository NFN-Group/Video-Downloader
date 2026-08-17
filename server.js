const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

/* =========================
   HOME / HEALTH CHECK
========================= */

app.get("/", (req, res) => {
    res.json({
        status: "online",
        service: "NFN Video Downloader API"
    });
});

/* =========================
   RESOLVE VIDEO
========================= */

app.post("/api/resolve", async (req, res) => {

    try {

        const { url } = req.body;

        if (!url) {
            return res.status(400).json({
                error: "Video URL is required."
            });
        }

        /*
         * This endpoint is ready for the actual
         * video resolver to be connected.
         *
         * It currently returns basic information
         * so we can test the Render backend first.
         */

        return res.json({
            success: true,
            title: "NFN Video",
            thumbnail: null,
            url: url
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            error: "Unable to process video."
        });

    }

});


/* =========================
   DOWNLOAD
========================= */

app.post("/api/download", async (req, res) => {

    try {

        const {
            url,
            format,
            quality
        } = req.body;

        if (!url) {
            return res.status(400).json({
                error: "Video URL is required."
            });
        }

        /*
         * The actual downloader/resolver needs to be
         * connected here.
         *
         * We are deliberately testing the Render
         * backend before connecting that part.
         */

        return res.status(501).json({
            error: "Download engine is not connected yet.",
            url: url,
            format: format || "MP4",
            quality: quality || "1080"
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            error: "Download request failed."
        });

    }

});


/* =========================
   START SERVER
========================= */

app.listen(PORT, () => {

    console.log(
        `NFN Downloader API running on port ${PORT}`
    );

});
