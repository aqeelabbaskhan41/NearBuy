const Product = require('../Models/Products');

const updateProduct = async (req, res) => {
    const { id } = req.params; // Correctly destructure id from req.params
    try {
        const product = await Product.findByIdAndUpdate(id, req.body, {
            new: true, // Return the updated document
            runValidators: true // Ensure schema validations are applied
        });

        if (!product) { // Check if product is null (not found)
            return res.status(404).json({ message: 'Product not found' });
        }

        return res.status(200).json({
            message: 'Product updated successfully',
            product
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
    }
};

module.exports = updateProduct;