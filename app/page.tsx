"use client"

import { useState, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Upload, Shield, Eye, Camera, Video, Play, Square } from "lucide-react"

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("Foto")
  const [detectionResults, setDetectionResults] = useState([
    { type: "Pistol", count: 1, detected: true },
    { type: "Pisau", count: 3, detected: true },
  ])
  const [isDetecting, setIsDetecting] = useState(false)
  const [detectedImage, setDetectedImage] = useState<string | null>(null)

  // Camera states
  const [isCameraActive, setIsCameraActive] = useState(false)
  const [stream, setStream] = useState<MediaStream | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const tabs = ["Foto", "Video", "Live"]

  // Camera functions
  const startCamera = useCallback(async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480 },
      })
      setStream(mediaStream)
      setIsCameraActive(true)

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream
      }
    } catch (error) {
      console.error("Error accessing camera:", error)
      alert("Unable to access camera. Please check permissions.")
    }
  }, [])

  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop())
      setStream(null)
    }
    setIsCameraActive(false)
    if (videoRef.current) {
      videoRef.current.srcObject = null
    }
  }, [stream])

  const captureImage = useCallback(() => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current
      const video = videoRef.current
      const context = canvas.getContext("2d")

      if (context) {
        canvas.width = video.videoWidth
        canvas.height = video.videoHeight
        context.drawImage(video, 0, 0)

        return canvas.toDataURL("image/jpeg", 0.8)
      }
    }
    return null
  }, [])

  // Detection function
  const handleDetection = async () => {
    setIsDetecting(true)
    setDetectedImage(null)

    try {
      let imageData = null

      if (activeTab === "Live" && isCameraActive) {
        imageData = captureImage()
      }

      if (imageData) {
        const response = await fetch("/api/detect", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            image: imageData,
            source: activeTab.toLowerCase(),
          }),
        })

        if (response.ok) {
          const result = await response.json()
          setDetectionResults(result.detections || [])
          if (result.processedImage) {
            setDetectedImage(result.processedImage)
          }
        } else {
          throw new Error("Detection failed")
        }
      } else {
        // Simulate detection for other tabs
        await new Promise((resolve) => setTimeout(resolve, 2000))
        setDetectionResults([
          { type: "Pistol", count: 1, detected: true },
          { type: "Pisau", count: 2, detected: true },
        ])
      }
    } catch (error) {
      console.error("Detection error:", error)
      alert("Detection failed. Please try again.")
    } finally {
      setIsDetecting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {/* Card 1 */}
            <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-white">
                <div className="flex items-center gap-4">
                  <Shield className="w-12 h-12" />
                  <div>
                    <h3 className="text-xl font-bold">NEED FOR MONITORING</h3>
                    <h4 className="text-lg">PUBLIC SPACES</h4>
                    <p className="text-sm opacity-90">TO PREVENT CRIME</p>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="flex items-center justify-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                      <Shield className="w-8 h-8 text-blue-600" />
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Card 2 */}
            <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 text-white">
                <div className="flex items-center gap-4">
                  <Eye className="w-12 h-12" />
                  <div>
                    <h3 className="text-xl font-bold">IMPORTANCE OF PUBLIC</h3>
                    <h4 className="text-lg">SPACE SURVEILLANCE</h4>
                    <p className="text-sm opacity-90">FOR CRIME PREVENTION</p>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="flex items-center justify-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                      <Eye className="w-8 h-8 text-green-600" />
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Card 3 */}
            <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 text-white">
                <div className="flex items-center gap-4">
                  <Camera className="w-12 h-12" />
                  <div>
                    <h3 className="text-xl font-bold">SURVEILLANCE NECESSARY</h3>
                    <h4 className="text-lg">IN PUBLIC AREAS</h4>
                    <p className="text-sm opacity-90">TO DETER CRIME</p>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <div className="bg-purple-50 rounded-lg p-4">
                  <div className="flex items-center justify-center">
                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
                      <Camera className="w-8 h-8 text-purple-600" />
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Detection Interface */}
          <Card className="shadow-2xl">
            <CardContent className="p-8">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-slate-800">Weapon Detection</h2>
                <div className="flex bg-slate-100 rounded-lg p-1">
                  {tabs.map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                        activeTab === tab ? "bg-slate-800 text-white shadow-sm" : "text-slate-600 hover:text-slate-800"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Input Area */}
                <div className="space-y-6">
                  {activeTab === "Foto" && (
                    <div className="border-2 border-dashed border-slate-300 rounded-lg p-12 text-center hover:border-slate-400 transition-colors bg-slate-50">
                      <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                      <p className="text-slate-600 mb-2">Drag & Drop your image or Browse</p>
                      <Button variant="outline" className="mt-4 bg-transparent">
                        Choose File
                      </Button>
                    </div>
                  )}

                  {activeTab === "Video" && (
                    <div className="border-2 border-dashed border-slate-300 rounded-lg p-12 text-center hover:border-slate-400 transition-colors bg-slate-50">
                      <Video className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                      <p className="text-slate-600 mb-2">Upload video file for analysis</p>
                      <Button variant="outline" className="mt-4 bg-transparent">
                        Choose Video
                      </Button>
                    </div>
                  )}

                  {activeTab === "Live" && (
                    <div className="space-y-4">
                      <div className="border-2 border-slate-300 rounded-lg overflow-hidden bg-black">
                        {isCameraActive ? (
                          <video ref={videoRef} autoPlay playsInline muted className="w-full h-64 object-cover" />
                        ) : (
                          <div className="w-full h-64 flex items-center justify-center text-slate-400">
                            <div className="text-center">
                              <Camera className="w-16 h-16 mx-auto mb-4" />
                              <p>Camera not active</p>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="flex gap-2">
                        {!isCameraActive ? (
                          <Button onClick={startCamera} className="flex-1 bg-green-600 hover:bg-green-700">
                            <Play className="w-4 h-4 mr-2" />
                            Start Camera
                          </Button>
                        ) : (
                          <Button onClick={stopCamera} variant="destructive" className="flex-1">
                            <Square className="w-4 h-4 mr-2" />
                            Stop Camera
                          </Button>
                        )}
                      </div>
                    </div>
                  )}

                  <Button
                    onClick={handleDetection}
                    disabled={isDetecting || (activeTab === "Live" && !isCameraActive)}
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-lg font-semibold"
                  >
                    {isDetecting ? "Detecting..." : "Deteksi"}
                  </Button>
                </div>

                {/* Results Area */}
                <div className="space-y-4">
                  {/* Detection Results */}
                  {detectionResults.map((result, index) => (
                    <Card key={index} className={`${result.detected ? "bg-red-50 border-red-200" : "bg-gray-50"}`}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-slate-800">
                            {result.count} {result.type} terdeteksi
                          </span>
                          <div className={`w-3 h-3 rounded-full ${result.detected ? "bg-red-500" : "bg-gray-400"}`} />
                        </div>
                      </CardContent>
                    </Card>
                  ))}

                  {/* Processed Image Display */}
                  {detectedImage && (
                    <Card className="mt-6">
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-slate-800 mb-3">Processed Image</h3>
                        <div className="border rounded-lg overflow-hidden">
                          <img
                            src={detectedImage || "/placeholder.svg"}
                            alt="Processed detection result"
                            className="w-full h-auto"
                          />
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>

              {/* Hidden canvas for image capture */}
              <canvas ref={canvasRef} style={{ display: "none" }} />
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
