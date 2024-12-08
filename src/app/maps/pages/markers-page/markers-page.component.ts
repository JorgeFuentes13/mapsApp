import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { LngLat, Map, MapStyle,Marker ,config } from '@maptiler/sdk';

import '@maptiler/sdk/dist/maptiler-sdk.css';

 interface MarkerAndColor {
  color : string;
  marker : Marker
 }

 interface PlainMarker{
  color: string;
  lngLat: number[];
 }


@Component({
  templateUrl: './markers-page.component.html',
  styleUrl: './markers-page.component.css'
})
export class MarkersPageComponent implements OnInit, AfterViewInit, OnDestroy{

  map: Map | undefined;

  @ViewChild('map')
  private mapContainer!: ElementRef<HTMLElement>;

  public markers: MarkerAndColor[] = [];

  public zoom: number = 13;
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
      navigationControl: false,
      geolocateControl : false
    });

    // new Marker({color: "#FF0000"})
    // .setLngLat([139.7525,35.6846])
    // .addTo(this.map);

    this.readFromLocalStorage()
    this.mapListeners()
  }
  
  ngOnDestroy(): void {
    this.map?.remove();
  }

  mapListeners(){
    if ( !this.map ) throw 'Mapa no inicializado';

    this.map.on('click', (env) =>{
      const lngLat = env.lngLat
      this.createMarkerClick(lngLat)
    });
  }

  createMarker( ):void{
    if ( !this.map ) return;
    const color ='#xxxxxx'.replace(/x/g, y=>(Math.random()*16|0).toString(16));
    const lngLat = this.map.getCenter()
    this.addMarker(lngLat, color )
  }

  createMarkerClick( lngLat: LngLat ):void{
    if ( !this.map ) return;
    const color ='#xxxxxx'.replace(/x/g, y=>(Math.random()*16|0).toString(16));
    this.addMarker(lngLat, color )
  }


  addMarker( lngLat: LngLat, color: string = 'blue' ):void{
    if ( !this.map ) return;
    const marker = new Marker({
      color: color,
      draggable: true
    })
    .setLngLat(lngLat)
    .addTo(this.map)

    this.markers.push({ color,marker });
    this.saveToLocalStorage();

    marker.on('dragend',() => this.saveToLocalStorage())
  }

  deleteMarker( index : number ): void{
    this.markers[index].marker.remove();
    this.markers.splice( index, 1 );
    this.saveToLocalStorage();
  }

  flyTo( marker: Marker ): void{
    
    this.map?.flyTo({
      zoom: 14,
      center: marker.getLngLat()
    });
  }

  saveToLocalStorage(){
    const plainMarkers: PlainMarker[] = this.markers.map(  ({ color, marker  }) =>{

      return {
        color,
        lngLat: marker.getLngLat().toArray()
      }
    });
    localStorage.setItem('plainMarkers',JSON.stringify( plainMarkers ));
  }

  readFromLocalStorage(){
    const plainMarkersString = localStorage.getItem('plainMarkers') ?? '[]';
    const plainMarkers: PlainMarker[] = JSON.parse( plainMarkersString );

    plainMarkers.forEach( ({ color, lngLat}) => {
      const [ lng, lat ] = lngLat;
      const coords = new LngLat( lng, lat );

      this.addMarker( coords,color );
    })
  }

} 
