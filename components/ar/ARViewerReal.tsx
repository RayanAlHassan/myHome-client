"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { X, RotateCcw, Info } from "lucide-react";

interface ModelViewerElement extends HTMLElement {
  canActivateAR?: boolean;
  resetTurntableRotation?: () => void;
}

export function ARViewer({
  productTitle,
  dimension,
  modelSrc,
  onClose,
}: {
  productTitle: string;
  dimension?: string;
  modelSrc: string;
  onClose: () => void;
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasARSupport, setHasARSupport] = useState(false);
  const modelViewerRef = useRef<ModelViewerElement | null>(null);

  useEffect(() => {
    // load model-viewer script
    const script = document.createElement("script");
    script.type = "module";
    script.src =
      "https://ajax.googleapis.com/ajax/libs/model-viewer/3.4.0/model-viewer.min.js";
    document.head.appendChild(script);

    script.onload = () => {
      setIsLoaded(true);
      if (modelViewerRef.current?.canActivateAR) setHasARSupport(true);
    };

    return () => {
      if (script.parentNode) script.parentNode.removeChild(script);
    };
  }, []);

  const resetCamera = () => {
    if (modelViewerRef.current?.resetTurntableRotation) {
      modelViewerRef.current.resetTurntableRotation();
    }
  };

  return (
    <div className="fixed inset-0 bg-background z-50 flex flex-col">
      {/* Header */}
      <div className="bg-card border-b border-border px-4 py-3 flex items-center justify-between">
        <div className="flex-1">
          <h2 className="font-semibold text-lg truncate">{productTitle}</h2>
          <p className="text-sm text-muted-foreground">{dimension || "Product"}</p>
        </div>

        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-5 w-5" />
        </Button>
      </div>

      {/* AR Info Banner */}
      {hasARSupport && (
        <div className="bg-primary/10 border-b border-primary/20 px-4 py-2">
          <div className="flex items-start gap-2 text-sm">
            <Info className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
            <p className="text-primary">
              <strong>AR Ready!</strong> Tap the AR button to place this product in
              your space using your phone&apos;s camera.
            </p>
          </div>
        </div>
      )}

      {/* Model Viewer */}
      <div className="flex-1 relative bg-muted/30">
        {isLoaded ? (
          // @ts-ignore
          <model-viewer
            ref={modelViewerRef}
            src={modelSrc}
            alt={productTitle}
            ar
            ar-modes="webxr scene-viewer quick-look"
            camera-controls
            touch-action="pan-y"
            auto-rotate
            shadow-intensity="1"
            environment-image="neutral"
            exposure="1"
            className="w-full h-full"
            style={{ width: "100%", height: "100%" }}
          >
            <button
              slot="ar-button"
              className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-primary/90 transition-colors flex items-center gap-2"
            >
              View in Your Space (AR)
            </button>

            <div
              slot="poster"
              className="w-full h-full flex items-center justify-center bg-muted"
            >
              <div className="text-center space-y-4">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                <p className="text-muted-foreground">Loading 3D model...</p>
              </div>
            </div>
          </model-viewer>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center space-y-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="text-muted-foreground">Loading AR viewer...</p>
            </div>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="bg-card border-t border-border px-4 py-4">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="flex gap-2 justify-center">
            <Button variant="outline" size="sm" onClick={resetCamera}>
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset View
            </Button>
          </div>

          {!hasARSupport && (
            <div className="bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-900 rounded-lg p-3">
              <p className="text-xs text-orange-800 dark:text-orange-200">
                <strong>Note:</strong> AR works best on mobile. Open this page on
                your phone to use AR (iOS/Android).
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ARViewer;