/* eslint-disable react/no-this-in-sfc */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef } from 'react';

import { createPortal } from 'react-dom';

function createOverlayElement() {
    const el = document.createElement('div');
    el.style.position = 'absolute';
    el.style.display = 'inline-block';
    return el;
}

export type Props = {
    map: google.maps.Map;
    position: { lat: number; lng: number };
    children?: JSX.Element;
};

const Marker = ({ map, position, children }: Props): JSX.Element | null => {
    const overlay = useRef<google.maps.OverlayView | null>(null);
    const el = useRef<Element | null>(null);

    useEffect(() => {
        return () => {
            if (overlay.current) overlay.current.setMap(null);
        };
    }, []);

    class OverlayView extends google.maps.OverlayView {
        position: google.maps.LatLng | null = null;
        content: any = null;

        constructor(props: any) {
            super();
            props.position && (this.position = props.position);
            props.content && (this.content = props.content);
        }

        onAdd = () => {
            if (this.content) this.getPanes()?.floatPane.appendChild(this.content);
        };

        onRemove = () => {
            if (this.content?.parentElement) {
                this.content.parentElement.removeChild(this.content);
            }
        };

        draw = () => {
            if (this.position) {
                const divPosition = this.getProjection().fromLatLngToDivPixel(this.position);
                this.content.style.left = divPosition?.x + 'px';
                this.content.style.top = divPosition?.y + 'px';
            }
        };
    }

    if (map) {
        el.current = el.current || createOverlayElement();
        overlay.current =
            overlay.current ||
            new OverlayView({
                position: new google.maps.LatLng(position.lat, position.lng),
                content: el.current,
            });
        overlay.current.setMap(map);
        return createPortal(children, el.current);
    }

    return null;
};

export default Marker;