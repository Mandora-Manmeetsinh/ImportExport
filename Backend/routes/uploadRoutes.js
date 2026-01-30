const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware');
const { protect } = require('../middleware/authMiddleware');

router.post('/image', protect, upload.single('image'), (req, res) => {
    res.send({
        url: req.file.path,
        public_id: req.file.filename,
    });
});

router.post('/video', protect, upload.single('video'), (req, res) => {
    res.send({
        url: req.file.path,
        public_id: req.file.filename,
    });
});

router.post('/multiple', protect, upload.array('images', 5), (req, res) => {
    const files = req.files.map((file) => ({
        url: file.path,
        public_id: file.filename,
    }));
    res.send(files);
});

module.exports = router;
