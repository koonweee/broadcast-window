'use client';

import { parseLinkHeader } from '@web3-storage/parse-link-header';
import { useEffect, useRef, useState } from 'react';

interface PlayerProps {
  peerConnectionDisconnected: boolean;
  setPeerConnectionDisconnected: (value: boolean) => void;
}

function Player({ setPeerConnectionDisconnected }: PlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLayers, setVideoLayers] = useState<string[]>([]);
  const [mediaSrcObject, setMediaSrcObject] = useState<MediaStream | null>(null);
  const [layerEndpoint, setLayerEndpoint] = useState<string>('');

  const onLayerChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    fetch(layerEndpoint, {
      method: 'POST',
      body: JSON.stringify({ mediaId: '1', encodingId: event.target.value }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.srcObject = mediaSrcObject;
    }
  }, [mediaSrcObject]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const peerConnection = new RTCPeerConnection();

    peerConnection.ontrack = (event) => {
      setMediaSrcObject(event.streams[0]);
    };

    peerConnection.oniceconnectionstatechange = () => {
      if (peerConnection.iceConnectionState === 'connected' || peerConnection.iceConnectionState === 'completed') {
        setPeerConnectionDisconnected(false);
      } else if (peerConnection.iceConnectionState === 'disconnected' || peerConnection.iceConnectionState === 'failed') {
        setPeerConnectionDisconnected(true);
      }
    };

    peerConnection.addTransceiver('audio', { direction: 'recvonly' });
    peerConnection.addTransceiver('video', { direction: 'recvonly' });

    peerConnection.createOffer().then(offer => {
      offer.sdp = offer.sdp?.replace("useinbandfec=1", "useinbandfec=1;stereo=1") || '';
      peerConnection.setLocalDescription(offer);

      const apiPath = process.env.NEXT_PUBLIC_API_PATH;
      if (!apiPath) {
        console.error('API path not configured');
        return;
      }

      fetch(`${apiPath}/whep`, {
        method: 'POST',
        body: offer.sdp,
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_STREAM_KEY}`,
          'Content-Type': 'application/sdp'
        }
      }).then(r => {
        const linkHeader = r.headers.get('Link');
        if (!linkHeader) return;

        const parsedLinkHeader = parseLinkHeader(linkHeader);
        if (!parsedLinkHeader) return;

        const layerUrl = parsedLinkHeader['urn:ietf:params:whep:ext:core:layer']?.url;
        const eventsUrl = parsedLinkHeader['urn:ietf:params:whep:ext:core:server-sent-events']?.url;

        if (layerUrl) {
          setLayerEndpoint(`${window.location.protocol}//${layerUrl}`);
        }

        if (eventsUrl) {
          const evtSource = new EventSource(`${window.location.protocol}//${eventsUrl}`);
          evtSource.onerror = () => evtSource.close();

          evtSource.addEventListener("layers", event => {
            const parsed = JSON.parse(event.data);
            setVideoLayers(parsed['1'].layers.map((l: { encodingId: string }) => l.encodingId));
          });
        }

        return r.text();
      }).then(answer => {
        if (answer) {
          peerConnection.setRemoteDescription({
            sdp: answer,
            type: 'answer'
          });
        }
      });
    });

    return () => {
      peerConnection.close();
    };
  }, [setPeerConnectionDisconnected]);

  return (
    <>
      <video
        ref={videoRef}
        autoPlay
        muted
        controls
        playsInline
        className={`bg-black w-full max-h-[calc(100vh-4.5rem)] object-contain aspect-video`}
      />

      {videoLayers.length >= 2 && (
        <select
          defaultValue="disabled"
          onChange={onLayerChange}
          className="appearance-none border w-full py-2 px-3 leading-tight focus:outline-hidden focus:shadow-outline bg-gray-700 border-gray-700 text-white rounded-sm shadow-md placeholder-gray-200"
        >
          <option value="disabled" disabled>Choose Quality Level</option>
          {videoLayers.map(layer => (
            <option key={layer} value={layer}>{layer}</option>
          ))}
        </select>
      )}
    </>
  );
}

export default function PlayerPage() {
  const [peerConnectionDisconnected, setPeerConnectionDisconnected] = useState(false);

  return (
      <div className="flex items-center justify-center w-full">
        {peerConnectionDisconnected && (
          <div className="bg-red-500 text-white p-4 text-center">
            WebRTC has disconnected or failed to connect at all 😭
          </div>
        )}
          <Player
            peerConnectionDisconnected={peerConnectionDisconnected}
            setPeerConnectionDisconnected={setPeerConnectionDisconnected}
          />
      </div>
  );
}
