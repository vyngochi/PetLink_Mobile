import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import { ActivityIndicator, View } from "react-native";
import { WebView, type WebViewMessageEvent } from "react-native-webview";
import { Colors } from "@/constants/theme";
import type { LatLng } from "../services/routing.service";

const LEAFLET_CSS = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
const LEAFLET_JS = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
const TILE_URL = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const FALLBACK_CENTER: LatLng = { lat: 10.7769, lng: 106.7009 };

export interface MapMarker extends LatLng {
  id: string;
  title: string;
}

export interface LeafletMapHandle {
  recenter: () => void;
}

interface LeafletMapProps {
  markers: MapMarker[];
  user?: LatLng;
  route?: LatLng[];
  isRouteFallback?: boolean;
  follow?: boolean;
  interactive?: boolean;
  onUserPan?: () => void;
  className?: string;
}

const buildHtml = (interactive: boolean) => `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <link rel="stylesheet" href="${LEAFLET_CSS}" />
    <script src="${LEAFLET_JS}"></script>
    <style>
      html, body, #map { height: 100%; width: 100%; margin: 0; padding: 0; background: #e5e7eb; }
      .pin { width: 18px; height: 18px; border-radius: 9px; border: 3px solid #ffffff; box-shadow: 0 1px 4px rgba(0,0,0,0.35); }
      .pin-destination { background: ${Colors.light.tint}; }
      .pin-user { background: #2563eb; }
      .leaflet-control-attribution { font-size: 9px; }
    </style>
  </head>
  <body>
    <div id="map"></div>
    <script>
      var TINT = '${Colors.light.tint}';
      var interactive = ${interactive ? "true" : "false"};

      var map = L.map('map', {
        zoomControl: false,
        dragging: interactive,
        touchZoom: interactive,
        doubleClickZoom: interactive,
        scrollWheelZoom: false,
        boxZoom: false,
        keyboard: false,
        tap: interactive
      }).setView([${FALLBACK_CENTER.lat}, ${FALLBACK_CENTER.lng}], 12);

      L.tileLayer('${TILE_URL}', { maxZoom: 19, attribution: '&copy; OpenStreetMap' }).addTo(map);

      map.on('dragstart', function () { post({ type: 'pan' }); });

      var markerLayers = {};
      var userMarker = null;
      var routeLine = null;
      var hasFitted = false;
      var hasFittedUser = false;
      var hasRoute = false;

      function post(payload) {
        if (window.ReactNativeWebView) {
          window.ReactNativeWebView.postMessage(JSON.stringify(payload));
        }
      }

      function makeIcon(variant) {
        return L.divIcon({
          html: '<div class="pin ' + variant + '"></div>',
          className: '',
          iconSize: [18, 18],
          iconAnchor: [9, 9]
        });
      }

      function activeLayers() {
        return Object.keys(markerLayers).map(function (id) {
          return markerLayers[id];
        });
      }

      function fitAll() {
        var layers = activeLayers();
        if (userMarker) { layers.push(userMarker); }
        if (!layers.length) { return; }

        if (layers.length === 1) {
          map.setView(layers[0].getLatLng(), 15);
        } else {
          map.fitBounds(L.featureGroup(layers).getBounds(), { padding: [48, 48], maxZoom: 16 });
        }
        hasFitted = true;
      }

      window.setMarkers = function (list) {
        var seen = {};

        list.forEach(function (item) {
          seen[item.id] = true;
          var existing = markerLayers[item.id];

          if (existing) {
            existing.setLatLng([item.lat, item.lng]);
            return;
          }

          var marker = L.marker([item.lat, item.lng], {
            icon: makeIcon('pin-destination'),
            title: item.title
          }).addTo(map);

          markerLayers[item.id] = marker;
        });

        Object.keys(markerLayers).forEach(function (id) {
          if (seen[id]) { return; }
          map.removeLayer(markerLayers[id]);
          delete markerLayers[id];
        });

        if (!hasFitted) { fitAll(); }
      };

      window.setUser = function (user, follow) {
        if (!user) { return; }
        var point = [user.lat, user.lng];

        if (userMarker) {
          userMarker.setLatLng(point);
        } else {
          userMarker = L.marker(point, { icon: makeIcon('pin-user') }).addTo(map);
        }

        if (follow) {
          map.panTo(point, { animate: true });
          return;
        }

        if (!hasRoute && !hasFittedUser) {
          hasFittedUser = true;
          fitAll();
        }
      };

      window.setRoute = function (points, dashed) {
        if (!points || points.length < 2) {
          if (routeLine) { map.removeLayer(routeLine); routeLine = null; }
          hasRoute = false;
          return;
        }

        var latlngs = points.map(function (point) { return [point.lat, point.lng]; });
        var style = dashed
          ? { color: TINT, weight: 4, opacity: 0.6, dashArray: '6 8' }
          : { color: TINT, weight: 5, opacity: 0.85, dashArray: null };

        if (routeLine) {
          routeLine.setLatLngs(latlngs);
          routeLine.setStyle(style);
        } else {
          routeLine = L.polyline(latlngs, style).addTo(map);
        }

        if (!hasRoute) {
          map.fitBounds(routeLine.getBounds(), { padding: [48, 48] });
          hasFitted = true;
        }
        hasRoute = true;
      };

      window.recenter = function () {
        if (userMarker) {
          map.setView(userMarker.getLatLng(), 16, { animate: true });
          return;
        }
        fitAll();
      };

      post({ type: 'ready' });
    </script>
  </body>
</html>`;

export const LeafletMap = forwardRef<LeafletMapHandle, LeafletMapProps>(
  function LeafletMap(
    {
      markers,
      user,
      route,
      isRouteFallback = false,
      follow = false,
      interactive = true,
      onUserPan,
      className,
    },
    ref,
  ) {
    const webViewRef = useRef<WebView>(null);
    const [isReady, setIsReady] = useState(false);

    const html = useMemo(() => buildHtml(interactive), [interactive]);

    const run = useCallback((script: string) => {
      webViewRef.current?.injectJavaScript(`${script} true;`);
    }, []);

    const markersPayload = useMemo(() => JSON.stringify(markers), [markers]);
    const userPayload = useMemo(() => JSON.stringify(user ?? null), [user]);
    const routePayload = useMemo(() => JSON.stringify(route ?? []), [route]);

    useImperativeHandle(ref, () => ({
      recenter: () => run("window.recenter();"),
    }));

    useEffect(() => {
      if (!isReady) return;
      run(`window.setMarkers(${markersPayload});`);
    }, [isReady, markersPayload, run]);

    useEffect(() => {
      if (!isReady) return;
      run(`window.setUser(${userPayload}, ${follow});`);
    }, [isReady, userPayload, follow, run]);

    useEffect(() => {
      if (!isReady) return;
      run(`window.setRoute(${routePayload}, ${isRouteFallback});`);
    }, [isReady, routePayload, isRouteFallback, run]);

    const handleMessage = useCallback(
      (event: WebViewMessageEvent) => {
        try {
          const message = JSON.parse(event.nativeEvent.data);

          if (message.type === "ready") {
            setIsReady(true);
            return;
          }

          if (message.type === "pan") {
            onUserPan?.();
          }
        } catch {
          setIsReady(true);
        }
      },
      [onUserPan],
    );

    return (
      <View className={className}>
        <WebView
          ref={webViewRef}
          source={{ html }}
          originWhitelist={["*"]}
          javaScriptEnabled
          domStorageEnabled
          scrollEnabled={false}
          onMessage={handleMessage}
          androidLayerType="hardware"
          setSupportMultipleWindows={false}
          pointerEvents={interactive ? "auto" : "none"}
          style={{ flex: 1, backgroundColor: "transparent" }}
          renderLoading={() => (
            <View className="items-center justify-center flex-1 bg-muted">
              <ActivityIndicator color={Colors.light.tint} />
            </View>
          )}
          startInLoadingState
        />
      </View>
    );
  },
);
