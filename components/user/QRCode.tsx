'use client';

import { useEffect, useRef, useState } from 'react';
import { Download, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import QRCodeStyling from 'qr-code-styling';

interface QRCodeProps {
  value: string;
  size?: number;
  title?: string;
  showDownload?: boolean;
  onScan?: (data: string) => void;
}

export function QRCode({ 
  value, 
  size = 200, 
  title, 
  showDownload = true,
  onScan 
}: QRCodeProps) {
  const [copied, setCopied] = useState(false);
  const qrRef = useRef<HTMLDivElement>(null);
  const qrCodeRef = useRef<any>(null);

  useEffect(() => {
    if (!qrRef.current) return;

    // Initialize QR code
    qrCodeRef.current = new QRCodeStyling({
      width: size,
      height: size,
      type: 'canvas',
      data: value,
      image: '/wastereturn-logo.png', // Add your logo
      dotsOptions: {
        color: '#1976D2',
        type: 'rounded'
      },
      backgroundOptions: {
        color: '#ffffff',
      },
      imageOptions: {
        crossOrigin: 'anonymous',
        margin: 5
      },
      cornersSquareOptions: {
        type: 'extra-rounded',
        color: '#0D47A1'
      },
      cornersDotOptions: {
        type: 'dot',
        color: '#1976D2'
      },
      qrOptions: {
        typeNumber: 0,
        mode: 'Byte',
        errorCorrectionLevel: 'Q'
      }
    });

    qrCodeRef.current.append(qrRef.current);

    return () => {
      if (qrRef.current) {
        qrRef.current.innerHTML = '';
      }
    };
  }, [value, size]);

  const downloadQR = () => {
    if (!qrCodeRef.current) return;
    
    qrCodeRef.current.download({
      name: `qrcode-${Date.now()}`,
      extension: 'png'
    });
  };

  const copyToClipboard = async () => {
    if (!qrCodeRef.current) return;
    
    try {
      // Get canvas data URL
      const canvas = qrRef.current?.querySelector('canvas');
      if (!canvas) return;
      
      const dataUrl = canvas.toDataURL('image/png');
      const blob = await (await fetch(dataUrl)).blob();
      
      await navigator.clipboard.write([
        new ClipboardItem({
          [blob.type]: blob
        })
      ]);
      
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        {title && (
          <h3 className="text-lg font-semibold text-center mb-4">{title}</h3>
        )}
        
        {/* QR Code Container */}
        <div className="flex justify-center">
          <div 
            ref={qrRef} 
            className="bg-white p-4 rounded-lg shadow-sm"
            style={{ width: size + 20, height: size + 20 }}
          />
        </div>

        {/* Value Display */}
        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <p className="text-xs text-gray-500 mb-1">Scan or copy:</p>
          <p className="text-sm font-mono break-all">{value}</p>
        </div>

        {/* Action Buttons */}
        {showDownload && (
          <div className="flex gap-2 mt-4">
            <Button onClick={downloadQR} variant="outline" size="sm" className="flex-1 gap-2">
              <Download className="w-4 h-4" />
              Download
            </Button>
            <Button 
              onClick={copyToClipboard} 
              variant="outline" 
              size="sm" 
              className="flex-1 gap-2"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-green-500" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  Copy
                </>
              )}
            </Button>
          </div>
        )}

        {/* Scan Simulation (for development) */}
        {onScan && (
          <div className="mt-4">
            <Button 
              onClick={() => onScan(value)} 
              variant="primary" 
              size="sm" 
              fullWidth
            >
              Simulate Scan
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}