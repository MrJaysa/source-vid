import ffmpeg

# nput = ffmpeg.input('file.mp4')
# output = ffmpeg.output(nput, '3.m3u8', format='hls', start_number=0, hls_time=3, hls_list_size=2)
# ffmpeg.run(output)

import subprocess
from os import getcwd

class Converter:
    def convert_mp4(self, files):
        try:
            for index, fil in enumerate(files):
                subprocess.run(f'ffmpeg -i {fil} -c:v libvpx-vp9 -b:v 1M -c:a libopus {index+1}.webm -y')
                print(f'\n\n file: {index+1} done')
            # subprocess.run(f'ffmpeg -i {ifile} -b:v 0  -crf 30  -pass 2  -an -f webm 44.webm')
            # subprocess.run(f'ffmpeg -i {ifile} -c:v libvpx -b:v 1M -c:a libvorbis 44.webm -y')
            # subprocess.run(f'ffmpeg -i {ifile} -c:v libvpx -b:v 2M -c:v libvpx  44.webm -y')
            # subprocess.run(f'ffmpeg -i {ifile} -c:v libvpx -b:v 1M -c:v vp8 44.webm -y')
        except Exception as err:
            print(err)

    def convert_module(self, files):
        try:
            for index, fil in enumerate(files):
                stream = ffmpeg.input(fil)
                stream = ffmpeg.output(stream, f'{index+1}.webm', vcodec='libvpx-vp9', acodec='libopus', video_bitrate='33k', audio_bitrate='33k')
                ffmpeg.run(stream)
        except Exception as err:
            print(err)

    def create_hls_oneliner(self):
        size = '240x320'
        subprocess.run(f'ffmpeg -i sample.mkv -c:a libopus -c:v libvpx-vp9 -s {size} -aspect 16:9 -f hls -hls_list_size 1000000 -hls_time 2 ./m3u8/sample.m3u8')

    def creat_dash_oneliner(self):
        size = '240x320'
        # subprocess.run(f'ffmpeg -re -i sample.mp4 -map 0 -map 0 -c:a libopus -c:v libvpx-vp9 -b:v:0 800k -b:v:1 800k -f dash -seg_duration 5 -use_template 1 -use_timeline 1 -init_seg_name "$RepresentationID$-init.m4s" -media_seg_name "content-$Number$.m4s" ./mpd/sample.mpd')
        # subprocess.run('ffmpeg -i sample.mp4 -map 0 -map 0 0 -c:a libopus -c:v libvpx-vp9 -b:v:0 1000 -bf 1 -keyint_min 5 -g 5 -sc_threshold 0  -use_timeline 1 -use_template 1 -window_size 5 -adaptation_sets "id=0,streams=v id=1,streams=a" -f dash -seg_duration 5 -use_template 1 -use_timeline 1 -init_seg_name "$RepresentationID$-init.m4s" -media_seg_name "$RepresentationID$-$Time$.m4s" ./mpd/sample.mpd')
        
        subprocess.run('ffmpeg -i sample.mp4 -map 0 -map 0 -c:a libopus -c:v libvpx-vp9 -b:v:0 800k -b:v:1 800k -bf 1 -keyint_min 120 -g 120 -sc_threshold 0 -b_strategy 0 -use_timeline 1 -use_template 1 -window_size 5 -adaptation_sets "id=0,streams=v id=1,streams=a" -f dash -seg_duration 5 -init_seg_name "$RepresentationID$-init.m4s" -media_seg_name "content-$Number$.m4s" ./mpd/sample.mpd')

    def create_dash(self):
        nput = ffmpeg.input('sample.mkv')
        output = ffmpeg.output(nput,'./mpd3/sample.mpd', format='dash', map=0, start_number=0, vcodec='libvpx-vp9', acodec='libopus', video_bitrate='100k', audio_bitrate='500', seg_duration=1, frag_duration=1, window_size=30, use_timeline=1, use_template=1, sc_threshold=0, b_strategy=0)
        ffmpeg.run(output)

ffs = Converter()
# ffs.creat_hls_oneliner()
# ffs.create_dash()
# files = [
#     f'{getcwd()}\\file.mkv'
# ]
# ffs.convert_module(files)
# ffs.convert_mp4(files)
          
# 961606@@hero_419 heroku jaysa