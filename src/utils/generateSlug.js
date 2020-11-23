const generateSlug = (string) => string.toLowerCase().replace(/\ /g, `-`);

export default generateSlug;
