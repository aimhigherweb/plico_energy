const generateSlug = (string) => string.toLowerCase().replace(/\ /g, `-`).replace(/-{2,}/, `-`).replace(/(\?|#|%|!|\$|\&|\\|\/|\.|\+)/g, ``);

module.exports = generateSlug;
