"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { X, RotateCcw, Info } from "lucide-react";
import type { Product } from "@/lib/data";

// Type for model-viewer element
interface ModelViewerElement extends HTMLElement {
  canActivateAR?: boolean;
  resetTurntableRotation?: () => void;
}

interface ARViewerProps {
  product: Product;
  onClose?: () => void;
}

export function ARViewer({ product, onClose }: ARViewerProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasARSupport, setHasARSupport] = useState(false);
  const modelViewerRef = useRef<ModelViewerElement | null>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.type = "module";
    script.src =
      "https://ajax.googleapis.com/ajax/libs/model-viewer/3.4.0/model-viewer.min.js";
    document.head.appendChild(script);

    script.onload = () => {
      setIsLoaded(true);
      if (modelViewerRef.current?.canActivateAR) {
        setHasARSupport(true);
      }
    };

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  const resetCamera = () => {
    if (modelViewerRef.current?.resetTurntableRotation) {
      modelViewerRef.current.resetTurntableRotation();
    }
  };

  // Get the 3D model URL or use a default
  const modelSrc = product.modelUrl || product.modelGlb || getDefaultModel();

  return (
    <div className="fixed inset-0 bg-background z-50 flex flex-col">
      {/* Header */}
      <div className="bg-card border-b border-border px-4 py-3 flex items-center justify-between">
        <div className="flex-1">
          <h2 className="font-semibold text-lg truncate">{product.title}</h2>
          <p className="text-sm text-muted-foreground">
            {product.dimension || "Product"}
          </p>
        </div>
        {onClose && (
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        )}
      </div>

      {/* AR Info Banner */}
      {hasARSupport && (
        <div className="bg-primary/10 border-b border-primary/20 px-4 py-2">
          <div className="flex items-start gap-2 text-sm">
            <Info className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
            <p className="text-primary">
              <strong>AR Ready!</strong> Tap the AR button to place this product
              in your space using your phone's camera.
            </p>
          </div>
        </div>
      )}

      {/* Model Viewer */}
      <div className="flex-1 relative bg-muted/30">
        {isLoaded ? (
          <model-viewer
            ref={modelViewerRef}
            src={modelSrc}
            alt={product.title}
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
            {/* AR Button (appears on supported devices) */}
            <button
              slot="ar-button"
              className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-primary/90 transition-colors flex items-center gap-2"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z"
                />
              </svg>
              View in Your Space (AR)
            </button>

            {/* Loading indicator */}
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
          {/* Control Buttons */}
          <div className="flex gap-2 justify-center">
            <Button variant="outline" size="sm" onClick={resetCamera}>
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset View
            </Button>
          </div>

          {/* Instructions */}
          <div className="bg-muted/50 rounded-lg p-4 space-y-3">
            <h3 className="font-semibold text-sm">How to use AR:</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-muted-foreground">
              <div className="space-y-1">
                <p className="font-medium text-foreground">On Mobile:</p>
                <p>• Tap "View in Your Space" button</p>
                <p>• Allow camera access when prompted</p>
                <p>• Point camera at floor or wall</p>
                <p>• Tap to place the product</p>
              </div>
              <div className="space-y-1">
                <p className="font-medium text-foreground">Desktop:</p>
                <p>• Use mouse to rotate the model</p>
                <p>• Scroll to zoom in/out</p>
                <p>• Drag to move around</p>
                <p>• For AR, open this page on mobile</p>
              </div>
            </div>
          </div>

          {/* Browser Compatibility Note */}
          {!hasARSupport && (
            <div className="bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-900 rounded-lg p-3">
              <p className="text-xs text-orange-800 dark:text-orange-200">
                <strong>Note:</strong> AR features work best on mobile devices.
                If you're on desktop, open this page on your smartphone to
                access full AR capabilities (iOS 12+ or Android 8+).
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Helper function to get default model
function getDefaultModel(): string {
  // Using free models from model-viewer demos
  return "https://modelviewer.dev/shared-assets/models/Astronaut.glb";
}
