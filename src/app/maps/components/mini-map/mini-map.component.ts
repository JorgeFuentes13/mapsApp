import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { LngLat, Map, MapStyle, Marker, config } from '@maptiler/sdk';

import '@maptiler/sdk/dist/maptiler-sdk.css';


@Component({
  selector: 'map-mini-map',
  templateUrl: './mini-map.component.html',
  styleUrl: './mini-map.component.css'
})
export class MiniMapComponent implements OnInit,AfterViewInit , OnDestroy{

  @Input() lngLat?: [number, number];

  map: Map | undefined;

  public zoom: number = 14;

  @ViewChild('map')
  private mapContainer!: ElementRef<HTMLElement>;

  ngOnInit(): void {
    config.apiKey = 'GvKM1Y9mCWbV4lcZPD4e'
  }
  ngAfterViewInit(): void {
    
    this.map = new Map({
      container: this.mapContainer.nativeElement,
      style: MapStyle.BASIC,
      center: this.lngLat,
      zoom: this.zoom,
      navigationControl: false,
      geolocateControl : false,
      interactive: false,
    });

    new Marker({color: "#FF0000"})
    .setLngLat(this.lngLat!)
    .addTo(this.map);
  }

  ngOnDestroy(): void {
    this.map?.remove();
  }
}
