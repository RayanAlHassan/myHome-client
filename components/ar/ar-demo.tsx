"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Camera,
  X,
  RotateCw,
  Maximize2,
  Palette,
  RefreshCw,
} from "lucide-react";

export function ARDemo() {
  const [isActive, setIsActive] = useState(false);
  const [hasARSupport, setHasARSupport] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if ((navigator as any)?.xr) {
      (navigator as any).xr
        .isSessionSupported("immersive-ar")
        .then(setHasARSupport)
        .catch(() => setHasARSupport(false));
    }
  }, []);

  const startARCamera = async () => {
    try {
      setCameraError(null);
      setIsLoading(true);

      console.log("Starting camera access...");

      const constraints = {
        video: {
          width: { min: 640, ideal: 1280, max: 1920 },
          height: { min: 480, ideal: 720, max: 1080 },
          frameRate: { ideal: 30 },
        },
      };

      const mediaStream = await navigator.mediaDevices.getUserMedia(
        constraints
      );
      console.log("Camera access granted!");

      setStream(mediaStream);

      if (videoRef.current) {
        const video = videoRef.current;
        video.srcObject = mediaStream;

        await new Promise((resolve, reject) => {
          video.onloadedmetadata = () => resolve(true);
          video.onerror = reject;

          setTimeout(() => resolve(true), 1000);
        });

        await video.play();
        console.log("Video is playing!");

        setIsLoading(false);
        setIsActive(true);
      }
    } catch (error: any) {
      console.error("Camera error:", error);

      let errorMessage = "Could not access camera";

      if (error.name === "NotAllowedError") {
        errorMessage =
          "Camera permission was denied. Please allow camera access and try again.";
      } else if (error.name === "NotFoundError") {
        errorMessage = "No camera found on this device.";
      } else if (error.name === "NotSupportedError") {
        errorMessage = "Camera not supported in this browser.";
      } else if (error.name === "NotReadableError") {
        errorMessage = "Camera is already in use by another application.";
      }

      setCameraError(errorMessage);
      setIsLoading(false);
      setIsActive(true);
    }
  };

  const stopARCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsActive(false);
    setCameraError(null);
    setIsLoading(false);
  };

  const retryCamera = () => {
    stopARCamera();

    setTimeout(() => {
      startARCamera();
    }, 300);
  };

  const testSimpleCamera = async () => {
    try {
      setCameraError(null);
      setIsLoading(true);

      console.log("Testing simple camera access...");
      const testStream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      console.log("Simple camera test successful!");

      testStream.getTracks().forEach((track) => track.stop());

      await startARCamera();
    } catch (error) {
      console.error("Simple camera test failed:", error);
      setCameraError("Camera is not accessible on this device/browser.");
      setIsLoading(false);
      setIsActive(true);
    }
  };

  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [stream]);

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
              Try AR Assistant
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Experience augmented reality in your space
            </p>
          </div>

          <div className="bg-card rounded-2xl border border-border overflow-hidden">
            {!isActive ? (
              <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 flex flex-col items-center justify-center gap-4 p-4">
                <Button
                  size="lg"
                  onClick={startARCamera}
                  disabled={isLoading}
                  className="min-w-[200px]"
                >
                  {isLoading ? (
                    <>
                      <RefreshCw className="mr-2 h-5 w-5 animate-spin" />
                      Accessing Camera...
                    </>
                  ) : (
                    <>
                      <Camera className="mr-2 h-5 w-5" />
                      Start AR Experience
                    </>
                  )}
                </Button>

                <div className="text-center space-y-2">
                  <p className="text-sm text-muted-foreground">
                    You'll be asked to allow camera access
                  </p>
                  <Button
                    variant="link"
                    size="sm"
                    onClick={testSimpleCamera}
                    className="text-xs h-auto p-0"
                  >
                    Having issues? Click here to test camera
                  </Button>
                </div>
              </div>
            ) : (
              <div className="relative">
                <div className="aspect-video relative bg-black">
                  {cameraError ? (
                    // Demo mode
                    <div className="w-full h-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                      <div className="text-center p-6 space-y-4 max-w-sm">
                        <Camera className="h-16 w-16 mx-auto text-primary" />
                        <div>
                          <p className="text-lg font-semibold mb-2">
                            Demo Mode
                          </p>
                          <p className="text-sm text-muted-foreground mb-4">
                            {cameraError}
                          </p>
                        </div>
                        <div className="space-y-2">
                          <Button
                            onClick={retryCamera}
                            size="sm"
                            className="w-full"
                          >
                            <RefreshCw className="mr-2 h-4 w-4" />
                            Try Camera Again
                          </Button>
                          <Button
                            onClick={stopARCamera}
                            variant="outline"
                            size="sm"
                            className="w-full"
                          >
                            Continue in Demo Mode
                          </Button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="relative w-full h-full">
                      <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        muted
                        className="w-full h-full object-cover"
                        style={{
                          transform: "scaleX(-1)",
                          background: "#000",
                        }}
                      />

                      {isLoading && (
                        <div className="absolute inset-0 bg-black/80 flex items-center justify-center">
                          <div className="text-center text-white">
                            <RefreshCw className="animate-spin h-8 w-8 mx-auto mb-2" />
                            <p>Starting camera...</p>
                          </div>
                        </div>
                      )}

                      {/* Status indicator */}
                      <div className="absolute top-3 left-3 flex items-center gap-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-xs text-white bg-black/50 px-2 py-1 rounded">
                          Live
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Controls */}
                {!cameraError && (
                  <>
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                      <Button
                        size="icon"
                        variant="secondary"
                        className="bg-white/20 backdrop-blur hover:bg-white/30 border-0"
                      >
                        <RotateCw className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="secondary"
                        className="bg-white/20 backdrop-blur hover:bg-white/30 border-0"
                      >
                        <Maximize2 className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="secondary"
                        className="bg-white/20 backdrop-blur hover:bg-white/30 border-0"
                      >
                        <Palette className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Close Button */}
                    <Button
                      size="icon"
                      variant="secondary"
                      className="absolute top-4 right-4 bg-white/20 backdrop-blur hover:bg-white/30 border-0"
                      onClick={stopARCamera}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Help section */}
          <div className="mt-8 text-center space-y-4">
            <div className="bg-muted/50 rounded-lg p-6 space-y-3">
              <h3 className="font-semibold text-sm">
                Troubleshooting Camera Access
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-muted-foreground text-left">
                <div className="space-y-1">
                  <p className="font-medium">Browser Permissions</p>
                  <p>• Allow camera when prompted</p>
                  <p>• Check address bar for camera icon</p>
                  <p>• Refresh page if no prompt appears</p>
                </div>
                <div className="space-y-1">
                  <p className="font-medium">Device Settings</p>
                  <p>• Ensure camera is not in use</p>
                  <p>• Check system camera permissions</p>
                  <p>• Try different browser</p>
                </div>
              </div>
            </div>

            {cameraError && (
              <div className="text-sm text-orange-600">
                <p>
                  Need help? Try refreshing the page or using a different
                  browser.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
