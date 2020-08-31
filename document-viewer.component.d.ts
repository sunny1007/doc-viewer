import { NgZone, OnDestroy, OnChanges, SimpleChanges, QueryList, ElementRef } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { EventEmitter } from '@angular/core';
import * as ɵngcc0 from '@angular/core';
export declare type viewerType = 'google' | 'office' | 'mammoth' | 'pdf' | 'url';
export declare class NgxDocViewerComponent implements OnChanges, OnDestroy {
    private domSanitizer;
    private ngZone;
    fullUrl: SafeResourceUrl;
    externalViewer: boolean;
    docHtml: string;
    configuredViewer: viewerType;
    private checkIFrameSubscription;
    constructor(domSanitizer: DomSanitizer, ngZone: NgZone);
    loaded: EventEmitter<any>;
    url: string;
    queryParams: string;
    viewerUrl: string;
    googleCheckInterval: number;
    disableContent: 'none' | 'all' | 'popout' | 'popout-hide';
    googleCheckContentLoaded: boolean;
    viewer: viewerType;
    iframes: QueryList<ElementRef>;
    ngOnDestroy(): void;
    ngOnChanges(changes: SimpleChanges): Promise<void>;
    iframeLoaded(): void;
    reloadIFrame(iframe: HTMLIFrameElement): void;
    private getDocxToHtml;
    private fileToArray;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<NgxDocViewerComponent, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<NgxDocViewerComponent, "ngx-doc-viewer", never, { "url": "url"; "queryParams": "queryParams"; "viewerUrl": "viewerUrl"; "googleCheckInterval": "googleCheckInterval"; "disableContent": "disableContent"; "googleCheckContentLoaded": "googleCheckContentLoaded"; "viewer": "viewer"; }, { "loaded": "loaded"; }, never, never>;
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9jdW1lbnQtdmlld2VyLmNvbXBvbmVudC5kLnRzIiwic291cmNlcyI6WyJkb2N1bWVudC12aWV3ZXIuY29tcG9uZW50LmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBOztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nWm9uZSwgT25EZXN0cm95LCBPbkNoYW5nZXMsIFNpbXBsZUNoYW5nZXMsIFF1ZXJ5TGlzdCwgRWxlbWVudFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBEb21TYW5pdGl6ZXIsIFNhZmVSZXNvdXJjZVVybCB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xyXG5pbXBvcnQgeyBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuZXhwb3J0IGRlY2xhcmUgdHlwZSB2aWV3ZXJUeXBlID0gJ2dvb2dsZScgfCAnb2ZmaWNlJyB8ICdtYW1tb3RoJyB8ICdwZGYnIHwgJ3VybCc7XHJcbmV4cG9ydCBkZWNsYXJlIGNsYXNzIE5neERvY1ZpZXdlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgT25EZXN0cm95IHtcclxuICAgIHByaXZhdGUgZG9tU2FuaXRpemVyO1xyXG4gICAgcHJpdmF0ZSBuZ1pvbmU7XHJcbiAgICBmdWxsVXJsOiBTYWZlUmVzb3VyY2VVcmw7XHJcbiAgICBleHRlcm5hbFZpZXdlcjogYm9vbGVhbjtcclxuICAgIGRvY0h0bWw6IHN0cmluZztcclxuICAgIGNvbmZpZ3VyZWRWaWV3ZXI6IHZpZXdlclR5cGU7XHJcbiAgICBwcml2YXRlIGNoZWNrSUZyYW1lU3Vic2NyaXB0aW9uO1xyXG4gICAgY29uc3RydWN0b3IoZG9tU2FuaXRpemVyOiBEb21TYW5pdGl6ZXIsIG5nWm9uZTogTmdab25lKTtcclxuICAgIGxvYWRlZDogRXZlbnRFbWl0dGVyPGFueT47XHJcbiAgICB1cmw6IHN0cmluZztcclxuICAgIHF1ZXJ5UGFyYW1zOiBzdHJpbmc7XHJcbiAgICB2aWV3ZXJVcmw6IHN0cmluZztcclxuICAgIGdvb2dsZUNoZWNrSW50ZXJ2YWw6IG51bWJlcjtcclxuICAgIGRpc2FibGVDb250ZW50OiAnbm9uZScgfCAnYWxsJyB8ICdwb3BvdXQnIHwgJ3BvcG91dC1oaWRlJztcclxuICAgIGdvb2dsZUNoZWNrQ29udGVudExvYWRlZDogYm9vbGVhbjtcclxuICAgIHZpZXdlcjogdmlld2VyVHlwZTtcclxuICAgIGlmcmFtZXM6IFF1ZXJ5TGlzdDxFbGVtZW50UmVmPjtcclxuICAgIG5nT25EZXN0cm95KCk6IHZvaWQ7XHJcbiAgICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogUHJvbWlzZTx2b2lkPjtcclxuICAgIGlmcmFtZUxvYWRlZCgpOiB2b2lkO1xyXG4gICAgcmVsb2FkSUZyYW1lKGlmcmFtZTogSFRNTElGcmFtZUVsZW1lbnQpOiB2b2lkO1xyXG4gICAgcHJpdmF0ZSBnZXREb2N4VG9IdG1sO1xyXG4gICAgcHJpdmF0ZSBmaWxlVG9BcnJheTtcclxufVxyXG4iXX0=