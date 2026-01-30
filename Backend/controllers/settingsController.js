const Settings = require('../models/Settings');

// @desc    Get all settings
// @route   GET /api/settings
// @access  Public
const getSettings = async (req, res) => {
    try {
        let settings = await Settings.findOne();
        if (!settings) {
            settings = await Settings.create({});
        }
        res.json(settings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update settings
// @route   PUT /api/settings
// @access  Private/Admin
const updateSettings = async (req, res) => {
    try {
        let settings = await Settings.findOne();
        if (settings) {
            settings.whatsappNumber = req.body.whatsappNumber || settings.whatsappNumber;
            settings.companyAddress = req.body.companyAddress || settings.companyAddress;
            settings.companyEmail = req.body.companyEmail || settings.companyEmail;
            settings.companyPhone = req.body.companyPhone || settings.companyPhone;

            const updatedSettings = await settings.save();
            res.json(updatedSettings);
        } else {
            const newSettings = await Settings.create(req.body);
            res.status(201).json(newSettings);
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    getSettings,
    updateSettings,
};
