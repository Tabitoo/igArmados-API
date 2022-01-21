const generate = (req) => {
    let { page } = req.query;
    page = page || 1;

    const baseUrl = `${req.protocol}://${req.get("host")}${req.baseUrl}`;

    return {
        page,
        baseUrl
    }
}

module.exports = { generate }
