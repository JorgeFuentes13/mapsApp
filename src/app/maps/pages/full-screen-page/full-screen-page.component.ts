import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';

import { Map, MapStyle, config } from '@maptiler/sdk';

import '@maptiler/sdk/dist/maptiler-sdk.css';


@Component({
  templateUrl: './full-screen-page.component.html',
  styleUrl: './full-screen-page.component.css'
})
export class FullScreenPageComponent implements OnInit, AfterViewInit, OnDestroy {

  map: Map | undefined;

  @ViewChild('map')
  private mapContainer!: ElementRef<HTMLElement>;

  ngOnInit(): void {
    config.apiKey = ''
  }
  ngAfterViewInit(): void {
    
    const initialState = { lng: 139.753, lat: 35.6844, zoom: 14 };

    this.map = new Map({
      container: this.mapContainer.nativeElement,
      style: MapStyle.BASIC,
      center: [initialState.lng, initialState.lat],
      zoom: initialState.zoom
    });

  }
  ngOnDestroy(): void {
    this.map?.remove();
  }

}
