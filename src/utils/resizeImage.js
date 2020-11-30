const resizeImage = (image, dimensions = [500, 0]) => {
	const imageService = `https://img2.storyblok.com/`,
		storyblokUrl = `https://a.storyblok.com`,
		imagePath = image.replace(storyblokUrl, ``);

	return `${imageService}${dimensions[0]}x${dimensions[1]}${imagePath}`;
};

module.exports = resizeImage;
