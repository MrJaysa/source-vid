/**
 * @file In comparison with the segments mode, sequence is much easier, since the browser will handle the offsets automatically based on the decoded content. However, you are not really *supposed* to use this with separate files, and Chromium will likely deprecate support at some point (throws warning right now: `Warning: using MSE 'sequence' AppendMode for a SourceBuffer with multiple tracks may cause loss of track synchronization. In some cases, buffered range gaps and playback stalls can occur. It is recommended to instead use 'segments' mode for a multitrack SourceBuffer.`)
 */

 (async () => {
	const videoElement = document.querySelector('video');
	const vidClips = [
		'https://raw.githubusercontent.com/chromium/chromium/b4b3566f27d2814fbba1b115639eb7801dd691cf/media/test/data/bear-vp9-opus.webm',
		'../Vid_Processor/2.webm',
		'../Vid_Processor/3.webm',
		'../Vid_Processor/4.webm',
		'../Vid_Processor/1.webm',
	];
	// Shuffle clips. If you reload the page, you will get a random order of videos!
	// shuffleArr(vidClips);

	// Get video clips as buffers
	const clipsToAppend = await Promise.all(
		vidClips.map(async (vidUrl) => {
			const blob = await (await fetch(vidUrl)).blob();
			const duration = await getDuration(blob);
			const buff = await blob.arrayBuffer();
			return {
				url: vidUrl,
				duration,
				buff
			};
		})
	);

	// Normal setup, with MediaSource, Object URL, and prepped SourceBuffer
	const mediaSource = new MediaSource();
	videoElement.src = URL.createObjectURL(mediaSource);

	const sourceBuffer = await addSourceBufferWhenOpen(mediaSource, 'video/webm; codecs="vp9,opus"');

	let clipIndex = 0;
	sourceBuffer.onupdateend = () => {
		if (clipIndex < vidClips.length - 1) {
			sourceBuffer.timestampOffset += clipsToAppend[clipIndex].duration;
			clipIndex++;
			sourceBuffer.appendBuffer(clipsToAppend[clipIndex].buff);
		} else {
			mediaSource.endOfStream();
		}
	};

	// This will kick off event listener chain above
	sourceBuffer.appendBuffer(clipsToAppend[clipIndex].buff);
})();

// hrishikesh@flexiple.com and ayesha@flexiple.com
// https://3.flexiple.com/freelancer_reference_form?email=joelaudu4@gmail.com