const generate = (req) => {
    let { page, categoria } = req.query;
    page = page || 1;
    categoria = categoria || null

    const baseUrl = `${req.protocol}://${req.get("host")}${req.baseUrl}`;

    return {
        page,
        baseUrl,
        categoria
    }
}

module.exports = { generate }
