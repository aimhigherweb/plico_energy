const resizeImage = (image, dimensions = [500, 0]) => {
	const imageService = `https://img2.storyblok.com/`,
		storyblokUrl = `https://a.storyblok.com`,
		imagePath = image.replace(storyblokUrl, ``);

	let newImage = `${imageService}${Math.round(dimensions[0])}x${Math.round(dimensions[1])}${imagePath}`;

	if (RegExp(/\.svg$/).test(image)) {
		newImage = image;
	}

	return newImage;
};

module.exports = resizeImage;
