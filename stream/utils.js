/**
 * Get the duration of video, via its raw blob
 * @param {Blob} blob
 * @returns {Promise<number>}
 */
const getDuration = (blob) => {
	return new Promise((res) => {
		const tempVidElem = document.createElement('video');
		tempVidElem.onloadedmetadata = () => {
			res(tempVidElem.duration);
			URL.revokeObjectURL(tempVidElem.src);
		};
		tempVidElem.src = URL.createObjectURL(blob);
	});
};

/**
 * Adds (and returns once ready) a SourceBuffer to a MediaSource
 * @param {MediaSource} mediaSource
 * @param {string} mimeStr Example: `video/webm; codecs="vp9,opus"`
 * @param {'sequence' | 'segments'} [mode]
 * @returns {Promise<SourceBuffer>}
 */
const addSourceBufferWhenOpen = (mediaSource, mimeStr, mode = 'segments') => {
	return new Promise((res, rej) => {
		const getSourceBuffer = () => {
			try {
				const sourceBuffer = mediaSource.addSourceBuffer(mimeStr);
				sourceBuffer.mode = mode;
				res(sourceBuffer);
			} catch (e) {
				rej(e);
			}
		};
		if (mediaSource.readyState === 'open') {
			getSourceBuffer();
		} else {
			mediaSource.addEventListener('sourceopen', getSourceBuffer);
		}
	});
};
