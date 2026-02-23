'use client';

import { useState, useRef, useEffect } from 'react';
import { Camera, CameraOff, Scan, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import jsQR from 'jsqr';

interface QRScannerProps {
  onScan: (data: string) => void;
  onClose?: () => void;
}

export function QRScanner({ onScan, onClose }: QRScannerProps) {
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scannedData, setScannedData] = useState<string | null>(null);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const scanIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  const startCamera = async () => {
    setError(null);
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
      });
      
      streamRef.current = stream;
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
        setHasPermission(true);
        setIsScanning(true);
        startScanning();
      }
    } catch (err) {
      console.error('Camera error:', err);
      setHasPermission(false);
      setError('Could not access camera. Please check permissions.');
    }
  };

  const stopCamera = () => {
    if (scanIntervalRef.current) {
      clearInterval(scanIntervalRef.current);
      scanIntervalRef.current = null;
    }
    
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    
    setIsScanning(false);
  };

  const startScanning = () => {
    if (!videoRef.current || !canvasRef.current) return;

    scanIntervalRef.current = setInterval(() => {
      scanQRCode();
    }, 500); // Scan every 500ms
  };

  const scanQRCode = () => {
    if (!videoRef.current || !canvasRef.current || !isScanning) return;
    
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    
    if (!context) return;
    
    if (video.readyState === video.HAVE_ENOUGH_DATA) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      const code = jsQR(imageData.data, canvas.width, canvas.height);
      
      if (code) {
        setScannedData(code.data);
        stopCamera();
        onScan(code.data);
      }
    }
  };

  const resetScanner = () => {
    setScannedData(null);
    setError(null);
    startCamera();
  };

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Scan className="w-5 h-5 text-[#1976D2]" />
            QR Code Scanner
          </h3>
          {onClose && (
            <Button variant="ghost" size="sm" onClick={onClose} className="p-2">
              <X className="w-5 h-5" />
            </Button>
          )}
        </div>

        {!isScanning && !scannedData && (
          <div className="text-center py-8">
            {hasPermission === false ? (
              <div className="space-y-4">
                <div className="bg-red-50 text-red-600 p-4 rounded-lg">
                  <CameraOff className="w-8 h-8 mx-auto mb-2" />
                  <p className="font-medium">Camera access denied</p>
                  <p className="text-sm mt-1">Please enable camera access in your browser settings</p>
                </div>
                {onClose && (
                  <Button onClick={onClose} variant="outline">
                    Close
                  </Button>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <Camera className="w-12 h-12 mx-auto mb-3 text-[#1976D2]" />
                  <p className="text-gray-600 mb-2">Ready to scan a QR code?</p>
                  <p className="text-sm text-gray-500">Position the QR code within the frame to scan</p>
                </div>
                <Button onClick={startCamera} variant="primary" size="lg" className="gap-2">
                  <Camera className="w-5 h-5" />
                  Start Camera
                </Button>
              </div>
            )}
          </div>
        )}

        {isScanning && (
          <div className="relative">
            <video
              ref={videoRef}
              className="w-full rounded-lg"
              style={{ maxHeight: '400px', objectFit: 'cover' }}
              autoPlay
              playsInline
              muted
            />
            
            {/* Scanning Overlay */}
            <div className="absolute inset-0 border-2 border-[#1976D2] rounded-lg opacity-50 pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 border-2 border-white rounded-lg shadow-lg" />
            
            {/* Scanning Line Animation */}
            <div className="absolute left-0 right-0 h-1 bg-[#1976D2] animate-scan" />
            
            {/* Controls */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center">
              <Button onClick={stopCamera} variant="secondary" className="bg-white/90 backdrop-blur">
                Stop Scanning
              </Button>
            </div>
          </div>
        )}

        {scannedData && (
          <div className="space-y-4">
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="success">✓ Scanned</Badge>
              </div>
              <p className="text-sm font-mono break-all bg-white p-3 rounded border">
                {scannedData}
              </p>
            </div>
            
            <div className="flex gap-2">
              <Button onClick={resetScanner} variant="outline" className="flex-1">
                Scan Again
              </Button>
              <Button onClick={onClose} variant="primary" className="flex-1">
                Done
              </Button>
            </div>
          </div>
        )}

        <canvas ref={canvasRef} className="hidden" />
      </CardContent>
    </Card>
  );
}