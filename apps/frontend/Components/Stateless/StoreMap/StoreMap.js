'use client';
import mapboxgl from 'mapbox-gl';
import { createRef } from 'react';
import { Component } from 'react';
import { HiOutlineLocationMarker as MarkerIcon } from 'react-icons/hi';
import './StoreMap.scss';
import 'mapbox-gl/dist/mapbox-gl.css';

class StoreMap extends Component {
  mapContainer = createRef();
  map = null;
  bound = new mapboxgl.LngLatBounds();

  generateMarkers(locations) {
    const ArrOfLocations = locations.map((point) => point.coordinates);
    if (!ArrOfLocations.length) return;

    ArrOfLocations.map((location, i) => {
      new mapboxgl.Marker({ color: '#e09c7f' })
        .setLngLat(location)
        .addTo(this.map);
    });
    this.map.fitBounds(ArrOfLocations, {
      padding: { left: 100, right: 100, top: 50, bottom: 50 },
    });
  }

  componentDidMount() {
    mapboxgl.accessToken =
      'pk.eyJ1IjoidW1lcnNhbGVlbTUwIiwiYSI6ImNsNXIyZDl0YTBrNnQzaXA4ZGxiOGVncDQifQ.6k6bxnky1_Ta8G47SGVv0g';
    this.map = new mapboxgl.Map({
      container: this.mapContainer.current,
      style: 'mapbox://styles/umersaleem50/cl2nt3d4r006u15lbsjbt96dr',
    });

    this.props.locations && this.generateMarkers(this.props.locations);
  }
  render() {
    return (
      <div className="map">
        <div className="map-container" ref={this.mapContainer}></div>
      </div>
    );
  }
}

export default StoreMap;
