import { __awaiter } from 'tslib';
import { EventEmitter, Component, NgZone, Output, Input, ViewChildren, NgModule } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { take } from 'rxjs/operators';
import { timer } from 'rxjs';
import { CommonModule } from '@angular/common';

import * as ɵngcc0 from '@angular/core';
import * as ɵngcc1 from '@angular/platform-browser';
import * as ɵngcc2 from '@angular/common';

const _c0 = ["iframe"];
function NgxDocViewerComponent_ng_container_0_div_1_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelement(0, "div", 3);
} if (rf & 2) {
    const ctx_r2 = ɵngcc0.ɵɵnextContext(2);
    ɵngcc0.ɵɵproperty("innerHtml", ctx_r2.docHtml, ɵngcc0.ɵɵsanitizeHtml);
} }
function NgxDocViewerComponent_ng_container_0_object_2_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementStart(0, "object", 4);
    ɵngcc0.ɵɵelementStart(1, "p");
    ɵngcc0.ɵɵtext(2, "Your browser does not support PDFs. ");
    ɵngcc0.ɵɵelementStart(3, "a", 5);
    ɵngcc0.ɵɵtext(4, "Download the PDF");
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵtext(5, ".");
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r3 = ɵngcc0.ɵɵnextContext(2);
    ɵngcc0.ɵɵproperty("data", ctx_r3.fullUrl, ɵngcc0.ɵɵsanitizeResourceUrl);
    ɵngcc0.ɵɵadvance(3);
    ɵngcc0.ɵɵproperty("href", ctx_r3.fullUrl, ɵngcc0.ɵɵsanitizeUrl);
} }
function NgxDocViewerComponent_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementContainerStart(0);
    ɵngcc0.ɵɵtemplate(1, NgxDocViewerComponent_ng_container_0_div_1_Template, 1, 1, "div", 1);
    ɵngcc0.ɵɵtemplate(2, NgxDocViewerComponent_ng_container_0_object_2_Template, 6, 2, "object", 2);
    ɵngcc0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r0 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngIf", ctx_r0.configuredViewer !== "pdf");
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngIf", ctx_r0.fullUrl && ctx_r0.configuredViewer === "pdf");
} }
function NgxDocViewerComponent_ng_container_1_iframe_1_Template(rf, ctx) { if (rf & 1) {
    const _r8 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "iframe", 8, 9);
    ɵngcc0.ɵɵlistener("load", function NgxDocViewerComponent_ng_container_1_iframe_1_Template_iframe_load_0_listener() { ɵngcc0.ɵɵrestoreView(_r8); const ctx_r7 = ɵngcc0.ɵɵnextContext(2); return ctx_r7.iframeLoaded(); });
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r4 = ɵngcc0.ɵɵnextContext(2);
    ɵngcc0.ɵɵproperty("src", ctx_r4.fullUrl, ɵngcc0.ɵɵsanitizeResourceUrl);
} }
function NgxDocViewerComponent_ng_container_1_div_2_iframe_2_Template(rf, ctx) { if (rf & 1) {
    const _r12 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "iframe", 8, 9);
    ɵngcc0.ɵɵlistener("load", function NgxDocViewerComponent_ng_container_1_div_2_iframe_2_Template_iframe_load_0_listener() { ɵngcc0.ɵɵrestoreView(_r12); const ctx_r11 = ɵngcc0.ɵɵnextContext(3); return ctx_r11.iframeLoaded(); });
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r9 = ɵngcc0.ɵɵnextContext(3);
    ɵngcc0.ɵɵproperty("src", ctx_r9.fullUrl, ɵngcc0.ɵɵsanitizeResourceUrl);
} }
function NgxDocViewerComponent_ng_container_1_div_2_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementStart(0, "div", 10);
    ɵngcc0.ɵɵelement(1, "div");
    ɵngcc0.ɵɵtemplate(2, NgxDocViewerComponent_ng_container_1_div_2_iframe_2_Template, 2, 1, "iframe", 6);
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r5 = ɵngcc0.ɵɵnextContext(2);
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵstyleProp("background-color", ctx_r5.disableContent === "popout-hide" ? "#fff" : "transparent");
    ɵngcc0.ɵɵclassProp("overlay-full", ctx_r5.disableContent === "all")("overlay-popout-google", ctx_r5.configuredViewer === "google" && (ctx_r5.disableContent === "popout" || ctx_r5.disableContent === "popout-hide"))("overlay-popout-office", ctx_r5.configuredViewer === "office" && (ctx_r5.disableContent === "popout" || ctx_r5.disableContent === "popout-hide"));
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngIf", ctx_r5.fullUrl);
} }
function NgxDocViewerComponent_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementContainerStart(0);
    ɵngcc0.ɵɵtemplate(1, NgxDocViewerComponent_ng_container_1_iframe_1_Template, 2, 1, "iframe", 6);
    ɵngcc0.ɵɵtemplate(2, NgxDocViewerComponent_ng_container_1_div_2_Template, 3, 9, "div", 7);
    ɵngcc0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r1 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngIf", ctx_r1.fullUrl && ctx_r1.disableContent === "none");
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngIf", ctx_r1.disableContent !== "none");
} }
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
NgxDocViewerComponent.ɵfac = function NgxDocViewerComponent_Factory(t) { return new (t || NgxDocViewerComponent)(ɵngcc0.ɵɵdirectiveInject(ɵngcc1.DomSanitizer), ɵngcc0.ɵɵdirectiveInject(ɵngcc0.NgZone)); };
NgxDocViewerComponent.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: NgxDocViewerComponent, selectors: [["ngx-doc-viewer"]], viewQuery: function NgxDocViewerComponent_Query(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵviewQuery(_c0, true);
    } if (rf & 2) {
        var _t;
        ɵngcc0.ɵɵqueryRefresh(_t = ɵngcc0.ɵɵloadQuery()) && (ctx.iframes = _t);
    } }, inputs: { url: "url", queryParams: "queryParams", viewerUrl: "viewerUrl", googleCheckInterval: "googleCheckInterval", disableContent: "disableContent", googleCheckContentLoaded: "googleCheckContentLoaded", viewer: "viewer" }, outputs: { loaded: "loaded" }, features: [ɵngcc0.ɵɵNgOnChangesFeature], decls: 2, vars: 2, consts: [[4, "ngIf"], [3, "innerHtml", 4, "ngIf"], ["type", "application/pdf", "width", "100%", "height", "100%", 3, "data", 4, "ngIf"], [3, "innerHtml"], ["type", "application/pdf", "width", "100%", "height", "100%", 3, "data"], [3, "href"], ["id", "iframe", "frameBorder", "0", 3, "src", "load", 4, "ngIf"], ["class", "container", 4, "ngIf"], ["id", "iframe", "frameBorder", "0", 3, "src", "load"], ["iframe", ""], [1, "container"]], template: function NgxDocViewerComponent_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵtemplate(0, NgxDocViewerComponent_ng_container_0_Template, 3, 2, "ng-container", 0);
        ɵngcc0.ɵɵtemplate(1, NgxDocViewerComponent_ng_container_1_Template, 3, 2, "ng-container", 0);
    } if (rf & 2) {
        ɵngcc0.ɵɵproperty("ngIf", !ctx.externalViewer);
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵproperty("ngIf", ctx.externalViewer);
    } }, directives: [ɵngcc2.NgIf], styles: ["[_nghost-%COMP%] {\n        display: block;\n    }\n    .container[_ngcontent-%COMP%] {\n        width: 100%;\n        height: 100%;\n        position: relative;\n    }\n    .overlay-popout-google[_ngcontent-%COMP%] {\n        width: 55px;\n        height: 55px;\n        right: 0px;\n        top: 9.5px;\n        position: absolute;\n        z-index: 1000;\n    }\n    .overlay-popout-office[_ngcontent-%COMP%] {\n        width: 115px;\n        height: 25px;\n        right: 0;\n        bottom: 0;\n        position: absolute;\n        z-index: 1000;\n    }\n    .overlay-full[_ngcontent-%COMP%] {\n        width: 100%;\n        height: 100%;\n        right: 0;\n        top: 0;\n        position: absolute;\n        z-index: 1000;\n    }\n    iframe[_ngcontent-%COMP%] {\n        width: 100%;\n        height: 100%;\n    }"] });
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
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(NgxDocViewerComponent, [{
        type: Component,
        args: [{
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
            }]
    }], function () { return [{ type: ɵngcc1.DomSanitizer }, { type: ɵngcc0.NgZone }]; }, { loaded: [{
            type: Output
        }], url: [{
            type: Input
        }], queryParams: [{
            type: Input
        }], viewerUrl: [{
            type: Input
        }], googleCheckInterval: [{
            type: Input
        }], disableContent: [{
            type: Input
        }], googleCheckContentLoaded: [{
            type: Input
        }], viewer: [{
            type: Input
        }], iframes: [{
            type: ViewChildren,
            args: ['iframe']
        }] }); })();

class NgxDocViewerModule {
}
NgxDocViewerModule.ɵmod = ɵngcc0.ɵɵdefineNgModule({ type: NgxDocViewerModule });
NgxDocViewerModule.ɵinj = ɵngcc0.ɵɵdefineInjector({ factory: function NgxDocViewerModule_Factory(t) { return new (t || NgxDocViewerModule)(); }, imports: [[CommonModule]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵngcc0.ɵɵsetNgModuleScope(NgxDocViewerModule, { declarations: function () { return [NgxDocViewerComponent]; }, imports: function () { return [CommonModule]; }, exports: function () { return [NgxDocViewerComponent]; } }); })();
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(NgxDocViewerModule, [{
        type: NgModule,
        args: [{
                imports: [CommonModule],
                declarations: [NgxDocViewerComponent],
                exports: [NgxDocViewerComponent]
            }]
    }], null, null); })();

/**
 * Generated bundle index. Do not edit.
 */

export { NgxDocViewerComponent, NgxDocViewerModule };

//# sourceMappingURL=ngx-doc-viewer.js.map