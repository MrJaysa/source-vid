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

	// Get video clips as buffers
	// const clipsToAppend = await Promise.all(
	// 	vidClips.map(async (vidUrl) => {
	// 		const blob = await (await fetch(vidUrl)).blob();
	// 		const duration = await getDuration(blob);
	// 		const buff = await blob.arrayBuffer();
	// 		return {
	// 			url: vidUrl,
	// 			duration,
	// 			buff
	// 		};
	// 	})
	// );
    mimeCodec = 'video/webm; codecs="vp9,opus"'
    if ('MediaSource' in window && MediaSource.isTypeSupported(mimeCodec)) {
        var mediaSource = new MediaSource;
        video.src = URL.createObjectURL(mediaSource);
        mediaSource.addEventListener('sourceopen', sourceOpen);
    } else {
        console.error('Unsupported MIME type or codec: ', mimeCodec);
    }

    const content = (vidUrl) => {
        const blob = await (await fetch(vidUrl)).blob();
        const duration = await getDuration(blob);
        const buff = await blob.arrayBuffer();
        return {
            url: vidUrl,
            duration,
            buff
        }; 
    }



  function sourceOpen (_) {
    var mediaSource = this;
    var sourceBuffer = mediaSource.addSourceBuffer(mimeCodec);
    fetchAB(assetURL, function (buf) {
      sourceBuffer.addEventListener('updateend', function (_) {
        mediaSource.endOfStream();
      });
      sourceBuffer.appendBuffer(buf);
    });
  };

})();
