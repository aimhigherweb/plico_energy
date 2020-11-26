const generateSlug = (string) => string.toLowerCase().replace(/\ /g, `-`).replace(/(\?|#|%|!|\$)/, ``);

export default generateSlug;
