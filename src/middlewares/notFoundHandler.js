export const notFoundHandler = async (req, res, next) => {
    res.status(400).json({
        message: "Route not found"
    });
};
