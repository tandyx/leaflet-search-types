import * as L from "leaflet";

declare module "leaflet" {
  namespace Control {
    class Search extends Control {
      constructor(options?: SearchConstuctorOptions);
      /**
       * event listener
       * @param layer
       */
      on(
        type: string | "search:collapsed" | "search:expanded" | "search:cancel",
        fn: (e: SearchEvent) => any,
        context?: any
      ): this;

      /**
       * event listener
       * @param type "search:locationfound"
       * @param fn  callback function
       * @param context
       */
      on(
        type: "search:locationfound",
        fn: (e: SearchEventFound) => any,
        context?: any
      ): this;
      /**
       * set layer search at runtime
       * @param layer layer search
       */
      setLayer(layer: LayerGroup): void;
      /**
       * show alert message
       * @param message message to show
       */
      showAlert(message: string): void;
      /**
       * search text by external code
       * @param text text to search
       */
      searchText(text: string): void;
    }

    /**
     * leaflet search options
     */
    interface SearchConstuctorOptions {
      /**
       * url for search by ajax request, ex: `"search.php?q={s}"`. Can be function to returns string for dynamic parameter setting
       * @default ""
       */
      url?: string;
      /**
       * layer where search markers (is a `L.LayerGroup`)
       * @default null
       */
      layer?: LayerGroup;
      /**
       * function to fill `_recordsCache`, passed searching text by first param and callback in second
       * @param text searching text
       * @param callback
       * @default null
       */
      sourceData?: (text: string, callback: (...args: any[]) => any) => any;
      /**
       * jsonp param name for search by jsonp service, ex: `"callback"`
       * @default null
       */
      jsonpParam?: string;
      /**
       * field for remapping location, using array: `['latname','lonname']` for select double fields(ex. `['lat','lon']` ) support dotted format: `'prop.subprop.title'`
       * @default 'loc'
       */
      propertyLoc?: string[] | string;
      /**
       * property in `marker.options `(or `feature.properties` for vector layer) trough filter elements in layer,
       * @default 'title'
       */
      propertyName?: string;
      /**
       * callback for reformat all data from source to indexed data object
       * @default null
       */
      formatData?: (...args: any[]) => any;
      /**
       * callback for filtering data from text searched, params: `textSearch`, `allRecords`
       * @default null
       */
      filterData?: (textSearch: string, allRecords: any) => any;
      /**
       * callback run on location found, params: latlng, title, map
       * @default null
       */
      moveToLocation?: (...args: any[]) => any;
      /**
       * function to return row tip html node(or html string), receive text tooltip in first param
       * @default null
       */
      buildTip?: (...args: any[]) => HTMLElement | any;
      /**
       * container id to insert Search Control
       * @default ""
       */
      container?: string;
      /**
       * default zoom level for move to location
       * @default null
       */
      zoom?: number;
      /**
       * minimal text length for autocomplete
       * @default 1
       */
      minLength?: number;
      /**
       * search elements only by initial text
       * @default true
       */
      initial?: boolean;
      /**
       * search elements in case sensitive text
       * @default false
       */
      casesensitive?: boolean;
      /**
       * complete input with first suggested result and select this filled-in text.
       * @default true
       */
      autoType?: boolean;
      /**
       * delay while typing for show tooltip
       * @default 400
       */
      delayType?: number;
      /**
       * limit max results to show in tooltip. -1 for no limit, 0 for no results
       * @default -1
       */
      tooltipLimit?: number;
      /**
       * auto map `panTo` when click on tooltip
       * @default true
       */
      tipAutoSubmit?: boolean;
      /**
       * auto select first result con enter click
       * @default false
       */
      firstTipSubmit?: boolean;
      /**
       * autoresize on input change
       * @default true
       */
      autoResize?: boolean;
      /**
       * collapse search control at startup
       * @default true
       */
      collapsed?: true;
      /**
       * collapse search control after submit (on button or on tips if enabled `tipAutoSubmit`)
       * @default false
       */
      autoCollapse?: boolean;
      /**
       * delay for autoclosing alert and collapse after blur
       * @default 1200
       */
      autoCollapseTime?: number;
      /**
       * error message
       * @default 'Location not found'
       */
      textErr?: string;
      /**
       * title in cancel button
       * @default 'Cancel'
       */
      textCancel?: string;
      /**
       * placeholder value
       * @default 'Search'
       */
      textPlaceholder?: string;
      /**
       * remove circle and marker on search control collapsed
       * @default false
       */
      hideMarkerOnCollapse?: boolean;
      /**
       * position in the map
       * @default 'topleft'
       */
      position?: string;
      /**
       * custom L.Marker or false for hide
       * @default { icon: false, animate: true, circle: { radius: 10, weight: 3, color: '#e03', stroke: true, fill: false } }
       */
      marker?: SearchMarkerConstructorOptions;
    }

    /**
     * leaflet search marker options
     */
    interface SearchMarkerConstructorOptions {
      /**
       * custom L.Icon for maker location or false for hide
       * @default false
       */
      icon?: Icon | boolean;
      /**
       * animate a circle over location found
       * @default true
       */
      animate?: boolean;
      /**
       * draw a circle in location found
       * @default CircleMarker.options
       */
      circle?: Circle;
    }

    /**
     * kind of a base event
     */
    interface SearchEvent extends LeafletEvent {
      text: string;
      type: string;
    }

    interface SearchEventFound extends SearchEvent {
      /**
       * location
       */
      latlng: LatLng;
      /**
       * title
       */
      title: string;
      /**
       * layer of target
       */
      layer: Layer;
    }

    namespace control {
      function search(options?: SearchConstuctorOptions): Search;
    }
  }
}
