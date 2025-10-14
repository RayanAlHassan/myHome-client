"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { X, RotateCcw, Info } from "lucide-react";
import type { Product } from "@/lib/data";
import "@google/model-viewer"; // ✅ import model-viewer types

interface ARViewerProps {
  product: Product;
  onClose?: () => void;
}

export function ARViewer({ product, onClose }: ARViewerProps) {
  const [hasARSupport, setHasARSupport] = useState(false);
  const modelViewerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (modelViewerRef.current && (modelViewerRef.current as any).canActivateAR) {
      setHasARSupport(true);
    }
  }, []);

  const resetCamera = () => {
    (modelViewerRef.current as any)?.resetTurntableRotation?.();
  };

  const modelSrc =
    product.modelUrl || getDefaultModelForCategory(product.category);

  return (
    <div className="fixed inset-0 bg-background z-50 flex flex-col">
      {/* Header */}
      <div className="bg-card border-b border-border px-4 py-3 flex items-center justify-between">
        <div className="flex-1">
          <h2 className="font-semibold text-lg truncate">{product.name}</h2>
          <p className="text-sm text-muted-foreground">{product.category}</p>
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
        <model-viewer
          ref={modelViewerRef}
          src={modelSrc}
          alt={product.name}
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
          {/* AR Button */}
          <button
            slot="ar-button"
            className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-primary/90 transition-colors flex items-center gap-2"
          >
            View in Your Space (AR)
          </button>
        </model-viewer>
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
        </div>
      </div>
    </div>
  );
}

// Helper function
function getDefaultModelForCategory(category: string): string {
  const models: Record<string, string> = {
    "Aluminum & UPVC":
      "https://modelviewer.dev/shared-assets/models/glTF-Sample-Models/2.0/MetalRoughSpheres/glTF/MetalRoughSpheres.gltf",
    "Interior Doors":
      "https://modelviewer.dev/shared-assets/models/Astronaut.glb",
    "Home Solutions": "https://modelviewer.dev/shared-assets/models/Chair.glb",
  };
  return models[category] || "https://modelviewer.dev/shared-assets/models/Astronaut.glb";
}
