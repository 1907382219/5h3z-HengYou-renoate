import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

@Component({
    selector: 'app-video',
    templateUrl: './video.component.html',
    styleUrls: ['./video.component.scss'],
})
export class VideoComponent implements OnInit {

    @Input() public src: string;
    @Input() public loop = false;
    @Input() public autoplay = false;

    @Output() public ready: EventEmitter<void> = new EventEmitter();
    // eslint-disable-next-line @angular-eslint/no-output-native
    @Output() public error: EventEmitter<string> = new EventEmitter();

    @ViewChild('videoEle', { static: true })
    private videoEle: ElementRef;

    @ViewChild('progressBar', { static: true })
    private progressBar: ElementRef;

    public videoState = {
        play: false,
        touching: false,
        progress: 0,
        currentMinutes: '00',
        currentSeconds: '00',
        minutes: '00',
        seconds: '00'
    };

    private videoEvents = {
        el: null,
        durationchange: () => {
            this.ready.emit();
            const minutes = Math.floor(this.videoEvents.el.duration / 60);
            const seconds = Math.floor(this.videoEvents.el.duration % 60);
            this.videoState.minutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
            this.videoState.seconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
            // this.videoState.play = true;
            // this.videoEvents.el.click();
        },
        timeupdate: () => {
            const minutes = Math.floor(this.videoEvents.el.currentTime / 60);
            const seconds = Math.floor(this.videoEvents.el.currentTime % 60);
            this.videoState.currentMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
            this.videoState.currentSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
            this.videoState.progress = Math.ceil(this.videoEvents.el.currentTime / this.videoEvents.el.duration * 100);
        },
        ended: () => {
            this.videoState.play = false;
        },
        error: () => {
            this.error.emit('视频文件出现错误');
        }
    };

    private progressEvents = {
        el: null,
        touchstart: (event: TouchEvent) => {
            event.stopPropagation();
            this.videoState.progress = Math.ceil(event.touches[0].pageX / this.videoEvents.el.offsetWidth * 100);
            this.videoState.touching = true;
        },
        touchmove: (event: TouchEvent) => {
            event.stopPropagation();
            this.videoState.progress = Math.ceil(event.changedTouches[0].pageX / this.progressEvents.el.offsetWidth * 100);
        },
        touchend: (event: TouchEvent) => {
            event.stopPropagation();
            this.videoEvents.el.currentTime = this.videoState.progress / 100 * this.videoEvents.el.duration;
            this.changeVideoState(true);
            this.videoState.touching = false;
        }
    };

    constructor() {}

    ngOnInit() {
        this.progressEvents.el = this.progressBar.nativeElement as HTMLDivElement;
        for (const event in this.progressEvents) {
            if (this.progressEvents[event] instanceof Function) {
                this.progressEvents.el.addEventListener(event, this.progressEvents[event]);
            }
        }
        this.videoEvents.el = this.videoEle.nativeElement as HTMLVideoElement;
        this.videoEvents.el.loop = this.loop;
        for (const event in this.videoEvents) {
            if (this.videoEvents[event] instanceof Function) {
                this.videoEvents.el.addEventListener(event, this.videoEvents[event]);
            }
        }
    }

    changeVideoState(active?: boolean) {
        const video = this.videoEle.nativeElement as HTMLVideoElement;
        this.videoState.play = active !== undefined ? active : video.paused;
        if (this.videoState.play) {
            video.play();
        } else {
            video.pause();
        }
    }

    changeProgress(event) {
        event.stopPropagation();
        const video = this.videoEle.nativeElement as HTMLVideoElement;
        const progress = event.x / video.offsetWidth;
        this.videoState.progress = Math.ceil(event.x / video.offsetWidth * 100);
        video.currentTime = video.duration * progress;
        if (video.paused) {
            this.videoState.play = true;
            video.play();
        }
    }
}
