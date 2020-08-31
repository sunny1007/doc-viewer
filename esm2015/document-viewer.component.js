import { __awaiter } from "tslib";
import { Component, Input, NgZone, Output, ViewChildren } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { take } from 'rxjs/operators';
import { timer } from 'rxjs';
import { EventEmitter } from '@angular/core';
export class NgxDocViewerComponent {
    constructor(domSanitizer, ngZone) {
        this.domSanitizer = domSanitizer;
        this.ngZone = ngZone;
        this.fullUrl = null;
        this.externalViewer = false;
        this.docHtml = '';
        this.configuredViewer = 'google';
        this.checkIFrameSubscription = null;
        this.loaded = new EventEmitter();
        this.url = '';
        this.queryParams = '';
        this.viewerUrl = '';
        this.googleCheckInterval = 3000;
        this.disableContent = 'none';
        this.googleCheckContentLoaded = true;
    }
    ngOnDestroy() {
        if (this.checkIFrameSubscription) {
            this.checkIFrameSubscription.unsubscribe();
        }
    }
    ngOnChanges(changes) {
        return __awaiter(this, void 0, void 0, function* () {
            if (changes && changes.viewer && (changes.viewer.isFirstChange || changes.viewer.currentValue !== changes.viewer.previousValue)) {
                if (this.viewer !== 'google' && this.viewer !== 'office' &&
                    this.viewer !== 'mammoth' && this.viewer !== 'pdf' && this.viewer !== 'url') {
                    console.error(`Unsupported viewer: '${this.viewer}'. Supported viewers: google, office, mammoth and pdf`);
                }
                if (this.viewer === 'mammoth') {
                    if (mammoth === null) {
                        console.error('please install mammoth when using local viewer');
                    }
                }
                this.configuredViewer = this.viewer;
            }
            if (this.disableContent !== 'none' && this.viewer !== 'google') {
            }
            if ((changes.url && changes.url.currentValue !== changes.url.previousValue) ||
                changes.viewer && changes.viewer.currentValue !== changes.viewer.previousValue ||
                changes.viewerUrl && changes.viewerUrl.currentValue !== changes.viewerUrl.previousValue) {
                if (!changes.viewerUrl) {
                    this.viewerUrl = null;
                }
                switch (this.configuredViewer) {
                    case 'google':
                        this.viewerUrl = `https://docs.google.com/gview?url=%URL%&embedded=true`;
                        break;
                    case 'office': {
                        this.viewerUrl = `https://view.officeapps.live.com/op/embed.aspx?src=%URL%`;
                        break;
                    }
                    case 'pdf': {
                        this.viewerUrl = null;
                        break;
                    }
                }
                this.docHtml = '';
                this.externalViewer = this.configuredViewer === 'google' || this.configuredViewer === 'office' || this.configuredViewer === 'url';
                if (this.checkIFrameSubscription) {
                    this.checkIFrameSubscription.unsubscribe();
                }
                if (!this.url) {
                    this.fullUrl = null;
                }
                else if (this.configuredViewer === 'office' || this.configuredViewer === 'google'
                    || this.configuredViewer === 'pdf' || this.configuredViewer === 'url') {
                    const u = this.url.indexOf('/') ? encodeURIComponent(this.url) : this.url;
                    let url = this.viewerUrl ? this.viewerUrl.replace('%URL%', u) : this.url;
                    if (!!this.queryParams && this.configuredViewer !== 'pdf') {
                        const start = this.queryParams.startsWith('&') ? '' : '&';
                        url = `${url}${start}${this.queryParams}`;
                    }
                    this.fullUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(url);
                    // see:
                    // https://stackoverflow.com/questions/40414039/google-docs-viewer-returning-204-responses-no-longer-working-alternatives
                    // hack to reload iframe if it's not loaded.
                    // would maybe be better to use view.officeapps.live.com but seems not to work with sas token.
                    if (this.configuredViewer === 'google' && this.googleCheckContentLoaded) {
                        this.ngZone.runOutsideAngular(() => {
                            // if it's not loaded after the googleIntervalCheck, then open load again.
                            this.checkIFrameSubscription = timer(100, this.googleCheckInterval)
                                .pipe(take(Math.round(this.googleCheckInterval === 0 ? 0 : 20000 / this.googleCheckInterval)))
                                .subscribe(() => {
                                var _a, _b;
                                const iframe = (_b = (_a = this.iframes) === null || _a === void 0 ? void 0 : _a.first) === null || _b === void 0 ? void 0 : _b.nativeElement;
                                this.reloadIFrame(iframe);
                            });
                        });
                    }
                }
                else if (this.configuredViewer === 'mammoth') {
                    if (!mammoth) {
                        console.error('Please install mammoth and make sure mammoth.browser.min.js is loaded.');
                    }
                    this.docHtml = yield this.getDocxToHtml(this.url);
                }
            }
        });
    }
    iframeLoaded() {
        this.loaded.emit(null);
        if (this.checkIFrameSubscription) {
            this.checkIFrameSubscription.unsubscribe();
        }
    }
    reloadIFrame(iframe) {
        if (iframe) {
            console.log('reloading..');
            iframe.src = iframe.src;
        }
    }
    getDocxToHtml(url) {
        return __awaiter(this, void 0, void 0, function* () {
            const arrayBuffer = yield this.fileToArray(url);
            const resultObject = yield mammoth.convertToHtml({ arrayBuffer });
            return resultObject.value;
        });
    }
    fileToArray(url) {
        return new Promise((resolve, reject) => {
            try {
                const request = new XMLHttpRequest();
                request.open('GET', url, true);
                request.responseType = 'blob';
                request.onload = () => {
                    const reader = new FileReader();
                    reader.readAsArrayBuffer(request.response);
                    reader.onloadend = (e) => {
                        resolve(reader.result);
                    };
                };
                request.send();
            }
            catch (_a) {
                reject(`error while retrieving file ${url}.`);
            }
        });
    }
}
NgxDocViewerComponent.decorators = [
    { type: Component, args: [{
                // tslint:disable-next-line: component-selector
                selector: 'ngx-doc-viewer',
                template: "<ng-container *ngIf=\"!externalViewer\">\r\n    <div *ngIf=\"configuredViewer !== 'pdf'\" [innerHtml]=\"docHtml\"></div>\r\n    <object *ngIf=\"fullUrl && configuredViewer === 'pdf'\" [data]=\"fullUrl\"\r\n        type=\"application/pdf\" width=\"100%\" height=\"100%\">\r\n        <p>Your browser does not support PDFs.\r\n            <a [href]=\"fullUrl\">Download the PDF</a>.</p>\r\n    </object>\r\n</ng-container>\r\n<ng-container *ngIf=\"externalViewer\">\r\n    <iframe (load)=\"iframeLoaded()\" *ngIf=\"fullUrl && disableContent === 'none'\" #iframe id=\"iframe\" frameBorder=\"0\" [src]=\"fullUrl\"></iframe>\r\n    <div class=\"container\" *ngIf=\"disableContent !== 'none'\">\r\n        <div [class.overlay-full]=\"disableContent === 'all'\"\r\n            [class.overlay-popout-google]=\"configuredViewer ==='google' && (disableContent === 'popout' || disableContent === 'popout-hide')\"\r\n            [class.overlay-popout-office]=\"configuredViewer ==='office' && (disableContent === 'popout' || disableContent === 'popout-hide')\"\r\n            [style.background-color]=\"disableContent === 'popout-hide' ? '#fff': 'transparent'\">\r\n        </div>\r\n        <iframe (load)=\"iframeLoaded()\" *ngIf=\"fullUrl\" #iframe id=\"iframe\" frameBorder=\"0\" [src]=\"fullUrl\"></iframe>\r\n    </div>\r\n</ng-container>",
                styles: [`:host {
        display: block;
    }
    .container {
        width: 100%;
        height: 100%;
        position: relative;
    }
    .overlay-popout-google {
        width: 55px;
        height: 55px;
        right: 0px;
        top: 9.5px;
        position: absolute;
        z-index: 1000;
    }
    .overlay-popout-office {
        width: 115px;
        height: 25px;
        right: 0;
        bottom: 0;
        position: absolute;
        z-index: 1000;
    }
    .overlay-full {
        width: 100%;
        height: 100%;
        right: 0;
        top: 0;
        position: absolute;
        z-index: 1000;
    }
    iframe {
        width: 100%;
        height: 100%;
    }
    `]
            },] }
];
NgxDocViewerComponent.ctorParameters = () => [
    { type: DomSanitizer },
    { type: NgZone }
];
NgxDocViewerComponent.propDecorators = {
    loaded: [{ type: Output }],
    url: [{ type: Input }],
    queryParams: [{ type: Input }],
    viewerUrl: [{ type: Input }],
    googleCheckInterval: [{ type: Input }],
    disableContent: [{ type: Input }],
    googleCheckContentLoaded: [{ type: Input }],
    viewer: [{ type: Input }],
    iframes: [{ type: ViewChildren, args: ['iframe',] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9jdW1lbnQtdmlld2VyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL21vZHVsZXMvZG9jdW1lbnQtdmlld2VyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUF1QyxNQUFNLEVBQUUsWUFBWSxFQUF5QixNQUFNLGVBQWUsQ0FBQztBQUMzSSxPQUFPLEVBQUUsWUFBWSxFQUFtQixNQUFNLDJCQUEyQixDQUFDO0FBQzFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN0QyxPQUFPLEVBQTBCLEtBQUssRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNyRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBK0M3QyxNQUFNLE9BQU8scUJBQXFCO0lBTzlCLFlBQW9CLFlBQTBCLEVBQVUsTUFBYztRQUFsRCxpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUFVLFdBQU0sR0FBTixNQUFNLENBQVE7UUFOL0QsWUFBTyxHQUFvQixJQUFJLENBQUM7UUFDaEMsbUJBQWMsR0FBRyxLQUFLLENBQUM7UUFDdkIsWUFBTyxHQUFHLEVBQUUsQ0FBQztRQUNiLHFCQUFnQixHQUFlLFFBQVEsQ0FBQztRQUN2Qyw0QkFBdUIsR0FBaUIsSUFBSSxDQUFDO1FBRzNDLFdBQU0sR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUNoRCxRQUFHLEdBQUcsRUFBRSxDQUFDO1FBQ1QsZ0JBQVcsR0FBRyxFQUFFLENBQUM7UUFDakIsY0FBUyxHQUFHLEVBQUUsQ0FBQztRQUNmLHdCQUFtQixHQUFHLElBQUksQ0FBQztRQUMzQixtQkFBYyxHQUE4QyxNQUFNLENBQUM7UUFDbkUsNkJBQXdCLEdBQUcsSUFBSSxDQUFDO0lBUGlDLENBQUM7SUFVM0UsV0FBVztRQUNQLElBQUksSUFBSSxDQUFDLHVCQUF1QixFQUFFO1lBQzlCLElB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d0JBQ0wsS0FBSztrQ0FDTCxLQUFLOzZCQUNMLEtBQUs7dUNBQ0wsS0FBSztxQkFDTCxLQUFLO3NCQUNMLFlBQVksU0FBQyxRQUFRIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgTmdab25lLCBPbkRlc3Ryb3ksIE9uQ2hhbmdlcywgU2ltcGxlQ2hhbmdlcywgT3V0cHV0LCBWaWV3Q2hpbGRyZW4sIFF1ZXJ5TGlzdCwgRWxlbWVudFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBEb21TYW5pdGl6ZXIsIFNhZmVSZXNvdXJjZVVybCB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xyXG5pbXBvcnQgeyB0YWtlIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24sIGludGVydmFsLCB0aW1lciB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmRlY2xhcmUgdmFyIG1hbW1vdGg7XHJcblxyXG5leHBvcnQgdHlwZSB2aWV3ZXJUeXBlID0gJ2dvb2dsZScgfCAnb2ZmaWNlJyB8ICdtYW1tb3RoJyB8ICdwZGYnIHwgJ3VybCc7XHJcbkBDb21wb25lbnQoe1xyXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBjb21wb25lbnQtc2VsZWN0b3JcclxuICAgIHNlbGVjdG9yOiAnbmd4LWRvYy12aWV3ZXInLFxyXG4gICAgdGVtcGxhdGVVcmw6ICdkb2N1bWVudC12aWV3ZXIuY29tcG9uZW50Lmh0bWwnLFxyXG4gICAgc3R5bGVzOiBbYDpob3N0IHtcclxuICAgICAgICBkaXNwbGF5OiBibG9jaztcclxuICAgIH1cclxuICAgIC5jb250YWluZXIge1xyXG4gICAgICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgICAgIGhlaWdodDogMTAwJTtcclxuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgICB9XHJcbiAgICAub3ZlcmxheS1wb3BvdXQtZ29vZ2xlIHtcclxuICAgICAgICB3aWR0aDogNDBweDtcclxuICAgICAgICBoZWlnaHQ6IDQwcHg7XHJcbiAgICAgICAgcmlnaHQ6IDI2cHg7XHJcbiAgICAgICAgdG9wOiAxMS41cHg7XHJcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgICAgIHotaW5kZXg6IDEwMDA7XHJcbiAgICB9XHJcbiAgICAub3ZlcmxheS1wb3BvdXQtb2ZmaWNlIHtcclxuICAgICAgICB3aWR0aDogMTAwcHg7XHJcbiAgICAgICAgaGVpZ2h0OiAyMHB4O1xyXG4gICAgICAgIHJpZ2h0OiAwO1xyXG4gICAgICAgIGJvdHRvbTogMDtcclxuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICAgICAgei1pbmRleDogMTAwMDtcclxuICAgIH1cclxuICAgIC5vdmVybGF5LWZ1bGwge1xyXG4gICAgICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgICAgIGhlaWdodDogMTAwJTtcclxuICAgICAgICByaWdodDogMDtcclxuICAgICAgICB0b3A6IDA7XHJcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgICAgIHotaW5kZXg6IDEwMDA7XHJcbiAgICB9XHJcbiAgICBpZnJhbWUge1xyXG4gICAgICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgICAgIGhlaWdodDogMTAwJTtcclxuICAgIH1cclxuICAgIGBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOZ3hEb2NWaWV3ZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMsIE9uRGVzdHJveSB7XHJcbiAgICBwdWJsaWMgZnVsbFVybDogU2FmZVJlc291cmNlVXJsID0gbnVsbDtcclxuICAgIHB1YmxpYyBleHRlcm5hbFZpZXdlciA9IGZhbHNlO1xyXG4gICAgcHVibGljIGRvY0h0bWwgPSAnJztcclxuICAgIHB1YmxpYyBjb25maWd1cmVkVmlld2VyOiB2aWV3ZXJUeXBlID0gJ2dvb2dsZSc7XHJcbiAgICBwcml2YXRlIGNoZWNrSUZyYW1lU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb24gPSBudWxsO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZG9tU2FuaXRpemVyOiBEb21TYW5pdGl6ZXIsIHByaXZhdGUgbmdab25lOiBOZ1pvbmUpIHsgfVxyXG4gICAgQE91dHB1dCgpIGxvYWRlZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgICBASW5wdXQoKSB1cmwgPSAnJztcclxuICAgIEBJbnB1dCgpIHF1ZXJ5UGFyYW1zID0gJyc7XHJcbiAgICBASW5wdXQoKSB2aWV3ZXJVcmwgPSAnJztcclxuICAgIEBJbnB1dCgpIGdvb2dsZUNoZWNrSW50ZXJ2YWwgPSAzMDAwO1xyXG4gICAgQElucHV0KCkgZGlzYWJsZUNvbnRlbnQ6ICdub25lJyB8ICdhbGwnIHwgJ3BvcG91dCcgfCAncG9wb3V0LWhpZGUnID0gJ25vbmUnO1xyXG4gICAgQElucHV0KCkgZ29vZ2xlQ2hlY2tDb250ZW50TG9hZGVkID0gdHJ1ZTtcclxuICAgIEBJbnB1dCgpIHZpZXdlcjogdmlld2VyVHlwZTtcclxuICAgIEBWaWV3Q2hpbGRyZW4oJ2lmcmFtZScpIGlmcmFtZXM6IFF1ZXJ5TGlzdDxFbGVtZW50UmVmPjtcclxuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLmNoZWNrSUZyYW1lU3Vic2NyaXB0aW9uKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2hlY2tJRnJhbWVTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIGlmIChjaGFuZ2VzICYmIGNoYW5nZXMudmlld2VyICYmIChjaGFuZ2VzLnZpZXdlci5pc0ZpcnN0Q2hhbmdlIHx8IGNoYW5nZXMudmlld2VyLmN1cnJlbnRWYWx1ZSAhPT0gY2hhbmdlcy52aWV3ZXIucHJldmlvdXNWYWx1ZSkpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMudmlld2VyICE9PSAnZ29vZ2xlJyAmJiB0aGlzLnZpZXdlciAhPT0gJ29mZmljZScgJiZcclxuICAgICAgICAgICAgICAgIHRoaXMudmlld2VyICE9PSAnbWFtbW90aCcgJiYgdGhpcy52aWV3ZXIgIT09ICdwZGYnICYmIHRoaXMudmlld2VyICE9PSAndXJsJykge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihgVW5zdXBwb3J0ZWQgdmlld2VyOiAnJHt0aGlzLnZpZXdlcn0nLiBTdXBwb3J0ZWQgdmlld2VyczogZ29vZ2xlLCBvZmZpY2UsIG1hbW1vdGggYW5kIHBkZmApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnZpZXdlciA9PT0gJ21hbW1vdGgnKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAobWFtbW90aCA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ3BsZWFzZSBpbnN0YWxsIG1hbW1vdGggd2hlbiB1c2luZyBsb2NhbCB2aWV3ZXInKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmNvbmZpZ3VyZWRWaWV3ZXIgPSB0aGlzLnZpZXdlcjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuZGlzYWJsZUNvbnRlbnQgIT09ICdub25lJyAmJiB0aGlzLnZpZXdlciAhPT0gJ2dvb2dsZScpIHtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICgoY2hhbmdlcy51cmwgJiYgY2hhbmdlcy51cmwuY3VycmVudFZhbHVlICE9PSBjaGFuZ2VzLnVybC5wcmV2aW91c1ZhbHVlKSB8fFxyXG4gICAgICAgICAgICBjaGFuZ2VzLnZpZXdlciAmJiBjaGFuZ2VzLnZpZXdlci5jdXJyZW50VmFsdWUgIT09IGNoYW5nZXMudmlld2VyLnByZXZpb3VzVmFsdWUgfHxcclxuICAgICAgICAgICAgY2hhbmdlcy52aWV3ZXJVcmwgJiYgY2hhbmdlcy52aWV3ZXJVcmwuY3VycmVudFZhbHVlICE9PSBjaGFuZ2VzLnZpZXdlclVybC5wcmV2aW91c1ZhbHVlKSB7XHJcbiAgICAgICAgICAgIGlmICghY2hhbmdlcy52aWV3ZXJVcmwpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudmlld2VyVXJsID0gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzd2l0Y2ggKHRoaXMuY29uZmlndXJlZFZpZXdlcikge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnZ29vZ2xlJzpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnZpZXdlclVybCA9IGBodHRwczovL2RvY3MuZ29vZ2xlLmNvbS9ndmlldz91cmw9JVVSTCUmZW1iZWRkZWQ9dHJ1ZWA7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlICdvZmZpY2UnOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy52aWV3ZXJVcmwgPSBgaHR0cHM6Ly92aWV3Lm9mZmljZWFwcHMubGl2ZS5jb20vb3AvZW1iZWQuYXNweD9zcmM9JVVSTCVgO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY2FzZSAncGRmJzoge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmlld2VyVXJsID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmRvY0h0bWwgPSAnJztcclxuICAgICAgICAgICAgdGhpcy5leHRlcm5hbFZpZXdlciA9IHRoaXMuY29uZmlndXJlZFZpZXdlciA9PT0gJ2dvb2dsZScgfHwgdGhpcy5jb25maWd1cmVkVmlld2VyID09PSAnb2ZmaWNlJyB8fCB0aGlzLmNvbmZpZ3VyZWRWaWV3ZXIgPT09ICd1cmwnO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5jaGVja0lGcmFtZVN1YnNjcmlwdGlvbikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jaGVja0lGcmFtZVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghdGhpcy51cmwpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZnVsbFVybCA9IG51bGw7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5jb25maWd1cmVkVmlld2VyID09PSAnb2ZmaWNlJyB8fCB0aGlzLmNvbmZpZ3VyZWRWaWV3ZXIgPT09ICdnb29nbGUnXHJcbiAgICAgICAgICAgICAgICB8fCB0aGlzLmNvbmZpZ3VyZWRWaWV3ZXIgPT09ICdwZGYnIHx8IHRoaXMuY29uZmlndXJlZFZpZXdlciA9PT0gJ3VybCcpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHUgPSB0aGlzLnVybC5pbmRleE9mKCcvJykgPyBlbmNvZGVVUklDb21wb25lbnQodGhpcy51cmwpIDogdGhpcy51cmw7XHJcbiAgICAgICAgICAgICAgICBsZXQgdXJsID0gdGhpcy52aWV3ZXJVcmwgPyB0aGlzLnZpZXdlclVybC5yZXBsYWNlKCclVVJMJScsIHUpIDogdGhpcy51cmw7XHJcbiAgICAgICAgICAgICAgICBpZiAoISF0aGlzLnF1ZXJ5UGFyYW1zICYmIHRoaXMuY29uZmlndXJlZFZpZXdlciAhPT0gJ3BkZicpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBzdGFydCA9IHRoaXMucXVlcnlQYXJhbXMuc3RhcnRzV2l0aCgnJicpID8gJycgOiAnJic7XHJcbiAgICAgICAgICAgICAgICAgICAgdXJsID0gYCR7dXJsfSR7c3RhcnR9JHt0aGlzLnF1ZXJ5UGFyYW1zfWA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZ1bGxVcmwgPSB0aGlzLmRvbVNhbml0aXplci5ieXBhc3NTZWN1cml0eVRydXN0UmVzb3VyY2VVcmwodXJsKTtcclxuICAgICAgICAgICAgICAgIC8vIHNlZTpcclxuICAgICAgICAgICAgICAgIC8vIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzQwNDE0MDM5L2dvb2dsZS1kb2NzLXZpZXdlci1yZXR1cm5pbmctMjA0LXJlc3BvbnNlcy1uby1sb25nZXItd29ya2luZy1hbHRlcm5hdGl2ZXNcclxuICAgICAgICAgICAgICAgIC8vIGhhY2sgdG8gcmVsb2FkIGlmcmFtZSBpZiBpdCdzIG5vdCBsb2FkZWQuXHJcbiAgICAgICAgICAgICAgICAvLyB3b3VsZCBtYXliZSBiZSBiZXR0ZXIgdG8gdXNlIHZpZXcub2ZmaWNlYXBwcy5saXZlLmNvbSBidXQgc2VlbXMgbm90IHRvIHdvcmsgd2l0aCBzYXMgdG9rZW4uXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jb25maWd1cmVkVmlld2VyID09PSAnZ29vZ2xlJyAmJiB0aGlzLmdvb2dsZUNoZWNrQ29udGVudExvYWRlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gaWYgaXQncyBub3QgbG9hZGVkIGFmdGVyIHRoZSBnb29nbGVJbnRlcnZhbENoZWNrLCB0aGVuIG9wZW4gbG9hZCBhZ2Fpbi5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGVja0lGcmFtZVN1YnNjcmlwdGlvbiA9IHRpbWVyKDEwMCwgdGhpcy5nb29nbGVDaGVja0ludGVydmFsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnBpcGUoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFrZShNYXRoLnJvdW5kKHRoaXMuZ29vZ2xlQ2hlY2tJbnRlcnZhbCA9PT0gMCA/IDAgOiAyMDAwMCAvIHRoaXMuZ29vZ2xlQ2hlY2tJbnRlcnZhbCkpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaWZyYW1lID0gdGhpcy5pZnJhbWVzPy5maXJzdD8ubmF0aXZlRWxlbWVudDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbG9hZElGcmFtZShpZnJhbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5jb25maWd1cmVkVmlld2VyID09PSAnbWFtbW90aCcpIHtcclxuICAgICAgICAgICAgICAgIGlmICghbWFtbW90aCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ1BsZWFzZSBpbnN0YWxsIG1hbW1vdGggYW5kIG1ha2Ugc3VyZSBtYW1tb3RoLmJyb3dzZXIubWluLmpzIGlzIGxvYWRlZC4nKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuZG9jSHRtbCA9IGF3YWl0IHRoaXMuZ2V0RG9jeFRvSHRtbCh0aGlzLnVybCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWZyYW1lTG9hZGVkKCkge1xyXG4gICAgICAgIHRoaXMubG9hZGVkLmVtaXQobnVsbCk7XHJcbiAgICAgICAgaWYgKHRoaXMuY2hlY2tJRnJhbWVTdWJzY3JpcHRpb24pIHtcclxuICAgICAgICAgICAgdGhpcy5jaGVja0lGcmFtZVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZWxvYWRJRnJhbWUoaWZyYW1lOiBIVE1MSUZyYW1lRWxlbWVudCkge1xyXG4gICAgICAgIGlmIChpZnJhbWUpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ3JlbG9hZGluZy4uJyk7XHJcbiAgICAgICAgICAgIGlmcmFtZS5zcmMgPSBpZnJhbWUuc3JjO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGFzeW5jIGdldERvY3hUb0h0bWwodXJsOiBzdHJpbmcpIHtcclxuICAgICAgICBjb25zdCBhcnJheUJ1ZmZlciA9IGF3YWl0IHRoaXMuZmlsZVRvQXJyYXkodXJsKTtcclxuICAgICAgICBjb25zdCByZXN1bHRPYmplY3QgPSBhd2FpdCBtYW1tb3RoLmNvbnZlcnRUb0h0bWwoeyBhcnJheUJ1ZmZlciB9KTtcclxuICAgICAgICByZXR1cm4gcmVzdWx0T2JqZWN0LnZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZmlsZVRvQXJyYXkodXJsOiBzdHJpbmcpOiBQcm9taXNlPEFycmF5QnVmZmVyPiB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPEFycmF5QnVmZmVyPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICAgICAgICAgICAgICByZXF1ZXN0Lm9wZW4oJ0dFVCcsIHVybCwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICByZXF1ZXN0LnJlc3BvbnNlVHlwZSA9ICdibG9iJztcclxuICAgICAgICAgICAgICAgIHJlcXVlc3Qub25sb2FkID0gKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVhZGVyLnJlYWRBc0FycmF5QnVmZmVyKHJlcXVlc3QucmVzcG9uc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlYWRlci5vbmxvYWRlbmQgPSAoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlYWRlci5yZXN1bHQgYXMgQXJyYXlCdWZmZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgcmVxdWVzdC5zZW5kKCk7XHJcbiAgICAgICAgICAgIH0gY2F0Y2gge1xyXG4gICAgICAgICAgICAgICAgcmVqZWN0KGBlcnJvciB3aGlsZSByZXRyaWV2aW5nIGZpbGUgJHt1cmx9LmApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuIl19