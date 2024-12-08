import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { LngLat, Map, MapStyle, config } from '@maptiler/sdk';

import '@maptiler/sdk/dist/maptiler-sdk.css';



@Component({
  templateUrl: './zoom-range-page.component.html',
  styleUrl: './zoom-range-page.component.css'
})
export class ZoomRangePageComponent implements OnInit, AfterViewInit, OnDestroy {


  map: Map | undefined;

  @ViewChild('map')
  private mapContainer!: ElementRef<HTMLElement>;

  public zoom: number = 10;
  public currentlngLat: LngLat = new LngLat(139.753, 35.6844)

  ngOnInit(): void {
    config.apiKey = ''
  }

  ngAfterViewInit(): void {
    
    this.map = new Map({
      container: this.mapContainer.nativeElement,
      style: MapStyle.BASIC,
      center: this.currentlngLat,
      zoom: this.zoom,
      navigationControl: false
    });

    this.mapListeners()
  }
  
  ngOnDestroy(): void {
    this.map?.remove();
  }


  mapListeners(){
    if ( !this.map ) throw 'Mapa no inicializado';

    this.map.on('zoom', (env) =>{
      this.zoom = this.map!.getZoom();
    });

    this.map.on('zoomend', (env) =>{
      if ( this.map!.getZoom() < 18) return
      this.map!.zoomTo(18);
    });

    this.map.on('move', () => {
      this.currentlngLat = this.map!.getCenter()
      const { lng , lat } = this.currentlngLat
    });

  }

  zoomIn(){
    this.map?.zoomIn();
  }

  zoomOut(){
    this.map?.zoomOut();
  }

  zoomChanged( value:string ) {
    this.zoom = Number(value);
    this.map?.zoomTo( this.zoom )
  }

}

