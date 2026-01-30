const Inquiry = require('../models/Inquiry');

// @desc    Create new inquiry
// @route   POST /api/inquiries
// @access  Public
const createInquiry = async (req, res) => {
    try {
        const { name, email, phone, message, product } = req.body;

        const inquiry = await Inquiry.create({
            name,
            email,
            phone,
            message,
            product,
        });

        res.status(201).json(inquiry);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Get all inquiries
// @route   GET /api/inquiries
// @access  Private/Admin
const getInquiries = async (req, res) => {
    try {
        const inquiries = await Inquiry.find({}).populate('product', 'name');
        res.json(inquiries);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update inquiry status
// @route   PUT /api/inquiries/:id
// @access  Private/Admin
const updateInquiryStatus = async (req, res) => {
    try {
        const inquiry = await Inquiry.findById(req.params.id);

        if (inquiry) {
            inquiry.status = req.body.status || inquiry.status;
            const updatedInquiry = await inquiry.save();
            res.json(updatedInquiry);
        } else {
            res.status(404).json({ message: 'Inquiry not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    createInquiry,
    getInquiries,
    updateInquiryStatus,
};
