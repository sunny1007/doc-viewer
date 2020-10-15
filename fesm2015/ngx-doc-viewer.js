import { __awaiter } from 'tslib';
import { EventEmitter, Component, NgZone, Output, Input, ViewChildren, NgModule } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { take } from 'rxjs/operators';
import { timer } from 'rxjs';
import { CommonModule } from '@angular/common';

class NgxDocViewerComponent {
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
        this.googleCheckInterval = 1000;
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
                                .pipe(take(Math.round(this.googleCheckInterval === 0 ? 0 : 5000 / this.googleCheckInterval)))
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

class NgxDocViewerModule {
}
NgxDocViewerModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                declarations: [NgxDocViewerComponent],
                exports: [NgxDocViewerComponent]
            },] }
];

/**
 * Generated bundle index. Do not edit.
 */

export { NgxDocViewerComponent, NgxDocViewerModule };
//# sourceMappingURL=ngx-doc-viewer.js.map
