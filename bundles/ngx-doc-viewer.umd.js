(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/platform-browser'), require('rxjs/operators'), require('rxjs'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('ngx-doc-viewer', ['exports', '@angular/core', '@angular/platform-browser', 'rxjs/operators', 'rxjs', '@angular/common'], factory) :
    (global = global || self, factory(global['ngx-doc-viewer'] = {}, global.ng.core, global.ng.platformBrowser, global.rxjs.operators, global.rxjs, global.ng.common));
}(this, (function (exports, core, platformBrowser, operators, rxjs, common) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (b.hasOwnProperty(p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    var __assign = function () {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    function __rest(s, e) {
        var t = {};
        for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
                t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }
    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }
    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); };
    }
    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
            return Reflect.metadata(metadataKey, metadataValue);
    }
    function __awaiter(thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try {
                step(generator.next(value));
            }
            catch (e) {
                reject(e);
            } }
            function rejected(value) { try {
                step(generator["throw"](value));
            }
            catch (e) {
                reject(e);
            } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }
    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function () { if (t[0] & 1)
                throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f)
                throw new TypeError("Generator is already executing.");
            while (_)
                try {
                    if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                        return t;
                    if (y = 0, t)
                        op = [op[0] & 2, t.value];
                    switch (op[0]) {
                        case 0:
                        case 1:
                            t = op;
                            break;
                        case 4:
                            _.label++;
                            return { value: op[1], done: false };
                        case 5:
                            _.label++;
                            y = op[1];
                            op = [0];
                            continue;
                        case 7:
                            op = _.ops.pop();
                            _.trys.pop();
                            continue;
                        default:
                            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                                _ = 0;
                                continue;
                            }
                            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                _.label = op[1];
                                break;
                            }
                            if (op[0] === 6 && _.label < t[1]) {
                                _.label = t[1];
                                t = op;
                                break;
                            }
                            if (t && _.label < t[2]) {
                                _.label = t[2];
                                _.ops.push(op);
                                break;
                            }
                            if (t[2])
                                _.ops.pop();
                            _.trys.pop();
                            continue;
                    }
                    op = body.call(thisArg, _);
                }
                catch (e) {
                    op = [6, e];
                    y = 0;
                }
                finally {
                    f = t = 0;
                }
            if (op[0] & 5)
                throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
        }
    }
    function __exportStar(m, exports) {
        for (var p in m)
            if (!exports.hasOwnProperty(p))
                exports[p] = m[p];
    }
    function __values(o) {
        var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
        if (m)
            return m.call(o);
        return {
            next: function () {
                if (o && i >= o.length)
                    o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
    }
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }
    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++)
            s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    }
    ;
    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }
    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n])
            i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try {
            step(g[n](v));
        }
        catch (e) {
            settle(q[0][3], e);
        } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length)
            resume(q[0][0], q[0][1]); }
    }
    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }
    function __asyncValues(o) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function (v) { resolve({ value: v, done: d }); }, reject); }
    }
    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) {
            Object.defineProperty(cooked, "raw", { value: raw });
        }
        else {
            cooked.raw = raw;
        }
        return cooked;
    }
    ;
    function __importStar(mod) {
        if (mod && mod.__esModule)
            return mod;
        var result = {};
        if (mod != null)
            for (var k in mod)
                if (Object.hasOwnProperty.call(mod, k))
                    result[k] = mod[k];
        result.default = mod;
        return result;
    }
    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }

    var NgxDocViewerComponent = /** @class */ (function () {
        function NgxDocViewerComponent(domSanitizer, ngZone) {
            this.domSanitizer = domSanitizer;
            this.ngZone = ngZone;
            this.fullUrl = null;
            this.externalViewer = false;
            this.docHtml = '';
            this.configuredViewer = 'google';
            this.checkIFrameSubscription = null;
            this.loaded = new core.EventEmitter();
            this.url = '';
            this.queryParams = '';
            this.viewerUrl = '';
            this.googleCheckInterval = 3000;
            this.disableContent = 'none';
            this.googleCheckContentLoaded = true;
        }
        NgxDocViewerComponent.prototype.ngOnDestroy = function () {
            if (this.checkIFrameSubscription) {
                this.checkIFrameSubscription.unsubscribe();
            }
        };
        NgxDocViewerComponent.prototype.ngOnChanges = function (changes) {
            return __awaiter(this, void 0, void 0, function () {
                var u, url, start, _c;
                var _this = this;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            if (changes && changes.viewer && (changes.viewer.isFirstChange || changes.viewer.currentValue !== changes.viewer.previousValue)) {
                                if (this.viewer !== 'google' && this.viewer !== 'office' &&
                                    this.viewer !== 'mammoth' && this.viewer !== 'pdf' && this.viewer !== 'url') {
                                    console.error("Unsupported viewer: '" + this.viewer + "'. Supported viewers: google, office, mammoth and pdf");
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
                            if (!((changes.url && changes.url.currentValue !== changes.url.previousValue) ||
                                changes.viewer && changes.viewer.currentValue !== changes.viewer.previousValue ||
                                changes.viewerUrl && changes.viewerUrl.currentValue !== changes.viewerUrl.previousValue)) return [3 /*break*/, 4];
                            if (!changes.viewerUrl) {
                                this.viewerUrl = null;
                            }
                            switch (this.configuredViewer) {
                                case 'google':
                                    this.viewerUrl = "https://docs.google.com/gview?url=%URL%&embedded=true";
                                    break;
                                case 'office': {
                                    this.viewerUrl = "https://view.officeapps.live.com/op/embed.aspx?src=%URL%";
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
                            if (!!this.url) return [3 /*break*/, 1];
                            this.fullUrl = null;
                            return [3 /*break*/, 4];
                        case 1:
                            if (!(this.configuredViewer === 'office' || this.configuredViewer === 'google'
                                || this.configuredViewer === 'pdf' || this.configuredViewer === 'url')) return [3 /*break*/, 2];
                            u = this.url.indexOf('/') ? encodeURIComponent(this.url) : this.url;
                            url = this.viewerUrl ? this.viewerUrl.replace('%URL%', u) : this.url;
                            if (!!this.queryParams && this.configuredViewer !== 'pdf') {
                                start = this.queryParams.startsWith('&') ? '' : '&';
                                url = "" + url + start + this.queryParams;
                            }
                            this.fullUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(url);
                            // see:
                            // https://stackoverflow.com/questions/40414039/google-docs-viewer-returning-204-responses-no-longer-working-alternatives
                            // hack to reload iframe if it's not loaded.
                            // would maybe be better to use view.officeapps.live.com but seems not to work with sas token.
                            if (this.configuredViewer === 'google' && this.googleCheckContentLoaded) {
                                this.ngZone.runOutsideAngular(function () {
                                    // if it's not loaded after the googleIntervalCheck, then open load again.
                                    _this.checkIFrameSubscription = rxjs.timer(100, _this.googleCheckInterval)
                                        .pipe(operators.take(Math.round(_this.googleCheckInterval === 0 ? 0 : 20000 / _this.googleCheckInterval)))
                                        .subscribe(function () {
                                        var _a, _b;
                                        var iframe = (_b = (_a = _this.iframes) === null || _a === void 0 ? void 0 : _a.first) === null || _b === void 0 ? void 0 : _b.nativeElement;
                                        _this.reloadIFrame(iframe);
                                    });
                                });
                            }
                            return [3 /*break*/, 4];
                        case 2:
                            if (!(this.configuredViewer === 'mammoth')) return [3 /*break*/, 4];
                            if (!mammoth) {
                                console.error('Please install mammoth and make sure mammoth.browser.min.js is loaded.');
                            }
                            _c = this;
                            return [4 /*yield*/, this.getDocxToHtml(this.url)];
                        case 3:
                            _c.docHtml = _d.sent();
                            _d.label = 4;
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        NgxDocViewerComponent.prototype.iframeLoaded = function () {
            this.loaded.emit(null);
            if (this.checkIFrameSubscription) {
                this.checkIFrameSubscription.unsubscribe();
            }
        };
        NgxDocViewerComponent.prototype.reloadIFrame = function (iframe) {
            if (iframe) {
                console.log('reloading..');
                iframe.src = iframe.src;
            }
        };
        NgxDocViewerComponent.prototype.getDocxToHtml = function (url) {
            return __awaiter(this, void 0, void 0, function () {
                var arrayBuffer, resultObject;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4 /*yield*/, this.fileToArray(url)];
                        case 1:
                            arrayBuffer = _c.sent();
                            return [4 /*yield*/, mammoth.convertToHtml({ arrayBuffer: arrayBuffer })];
                        case 2:
                            resultObject = _c.sent();
                            return [2 /*return*/, resultObject.value];
                    }
                });
            });
        };
        NgxDocViewerComponent.prototype.fileToArray = function (url) {
            return new Promise(function (resolve, reject) {
                try {
                    var request_1 = new XMLHttpRequest();
                    request_1.open('GET', url, true);
                    request_1.responseType = 'blob';
                    request_1.onload = function () {
                        var reader = new FileReader();
                        reader.readAsArrayBuffer(request_1.response);
                        reader.onloadend = function (e) {
                            resolve(reader.result);
                        };
                    };
                    request_1.send();
                }
                catch (_a) {
                    reject("error while retrieving file " + url + ".");
                }
            });
        };
        return NgxDocViewerComponent;
    }());
    NgxDocViewerComponent.decorators = [
        { type: core.Component, args: [{
                    // tslint:disable-next-line: component-selector
                    selector: 'ngx-doc-viewer',
                    template: "<ng-container *ngIf=\"!externalViewer\">\r\n    <div *ngIf=\"configuredViewer !== 'pdf'\" [innerHtml]=\"docHtml\"></div>\r\n    <object *ngIf=\"fullUrl && configuredViewer === 'pdf'\" [data]=\"fullUrl\"\r\n        type=\"application/pdf\" width=\"100%\" height=\"100%\">\r\n        <p>Your browser does not support PDFs.\r\n            <a [href]=\"fullUrl\">Download the PDF</a>.</p>\r\n    </object>\r\n</ng-container>\r\n<ng-container *ngIf=\"externalViewer\">\r\n    <iframe (load)=\"iframeLoaded()\" *ngIf=\"fullUrl && disableContent === 'none'\" #iframe id=\"iframe\" frameBorder=\"0\" [src]=\"fullUrl\"></iframe>\r\n    <div class=\"container\" *ngIf=\"disableContent !== 'none'\">\r\n        <div [class.overlay-full]=\"disableContent === 'all'\"\r\n            [class.overlay-popout-google]=\"configuredViewer ==='google' && (disableContent === 'popout' || disableContent === 'popout-hide')\"\r\n            [class.overlay-popout-office]=\"configuredViewer ==='office' && (disableContent === 'popout' || disableContent === 'popout-hide')\"\r\n            [style.background-color]=\"disableContent === 'popout-hide' ? '#fff': 'transparent'\">\r\n        </div>\r\n        <iframe (load)=\"iframeLoaded()\" *ngIf=\"fullUrl\" #iframe id=\"iframe\" frameBorder=\"0\" [src]=\"fullUrl\"></iframe>\r\n    </div>\r\n</ng-container>",
                    styles: [":host {\n        display: block;\n    }\n    .container {\n        width: 100%;\n        height: 100%;\n        position: relative;\n    }\n    .overlay-popout-google {\n        width: 55px;\n        height: 58px;\n        right: 0px;\n        top: 9.5px;\n        position: absolute;\n        z-index: 1000;\n    }\n    .overlay-popout-office {\n        width: 115px;\n        height: 25px;\n        right: 0;\n        bottom: 0;\n        position: absolute;\n        z-index: 1000;\n    }\n    .overlay-full {\n        width: 100%;\n        height: 100%;\n        right: 0;\n        top: 0;\n        position: absolute;\n        z-index: 1000;\n    }\n    iframe {\n        width: 100%;\n        height: 100%;\n    }\n    "]
                },] }
    ];
    NgxDocViewerComponent.ctorParameters = function () { return [
        { type: platformBrowser.DomSanitizer },
        { type: core.NgZone }
    ]; };
    NgxDocViewerComponent.propDecorators = {
        loaded: [{ type: core.Output }],
        url: [{ type: core.Input }],
        queryParams: [{ type: core.Input }],
        viewerUrl: [{ type: core.Input }],
        googleCheckInterval: [{ type: core.Input }],
        disableContent: [{ type: core.Input }],
        googleCheckContentLoaded: [{ type: core.Input }],
        viewer: [{ type: core.Input }],
        iframes: [{ type: core.ViewChildren, args: ['iframe',] }]
    };

    var NgxDocViewerModule = /** @class */ (function () {
        function NgxDocViewerModule() {
        }
        return NgxDocViewerModule;
    }());
    NgxDocViewerModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [common.CommonModule],
                    declarations: [NgxDocViewerComponent],
                    exports: [NgxDocViewerComponent]
                },] }
    ];

    /**
     * Generated bundle index. Do not edit.
     */

    exports.NgxDocViewerComponent = NgxDocViewerComponent;
    exports.NgxDocViewerModule = NgxDocViewerModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ngx-doc-viewer.umd.js.map
