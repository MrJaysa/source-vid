import ffmpeg 

class Converter:
    def create_hls_oneliner(self):
        nput = ffmpeg.input('sample.mp4')
        output = ffmpeg.output(
            nput, 'http://localhost:5500/sample.m3u8', 
            format='hls',
            hls_list_size=0,
            force_key_frames='expr:gte(t,n_forced*1)',
            hls_base_url = 'http://localhost:5500/'
        )
        ffmpeg.run(output)

    def create_dash(self):
        nput = ffmpeg.input('sample.mkv')
        output = ffmpeg.output(nput,'./mpd3/sample.mpd', format='dash', map=0, start_number=0, vcodec='libvpx-vp9', acodec='libopus', video_bitrate='100k', audio_bitrate='500', seg_duration=1, frag_duration=1, window_size=30, use_timeline=1, use_template=1, sc_threshold=0, b_strategy=0)
        ffmpeg.run(output)

ffs = Converter()
ffs.create_hls_oneliner()
# ffs.create_dash()
          