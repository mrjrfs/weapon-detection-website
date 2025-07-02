import { type NextRequest, NextResponse } from "next/server"
import { createProcessedImage } from "@/app/api/detect/createProcessedImage"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { image, source } = body

    if (!image) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 })
    }

    // Simulate AI processing time
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Generate mock detection results
    const mockDetections = generateMockDetections()

    // Create processed image with detection boxes
    let processedImage = null

    if (source === "video") {
      // For video, we'll simulate extracting a frame and processing it
      processedImage = await processVideoFile(image)
    } else {
      // For images and live camera
      processedImage = await createProcessedImage(image)
    }

    return NextResponse.json({
      success: true,
      detections: mockDetections,
      processedImage: processedImage,
      source: source,
      timestamp: new Date().toISOString(),
      processingTime: source === "video" ? "3.2s" : "1.2s",
    })
  } catch (error) {
    console.error("Detection API error:", error)
    return NextResponse.json({ error: "Detection processing failed" }, { status: 500 })
  }
}

function generateMockDetections() {
  const weapons = ["Pistol", "Pisau", "Rifle"]
  const detections = []

  // Randomly generate 1-3 detections
  const numDetections = Math.floor(Math.random() * 3) + 1

  for (let i = 0; i < numDetections; i++) {
    const weapon = weapons[Math.floor(Math.random() * weapons.length)]
    const count = Math.floor(Math.random() * 2) + 1

    detections.push({
      type: weapon,
      count: count,
      detected: true,
      confidence: Math.floor(Math.random() * 20) + 80, // 80-99% confidence
    })
  }

  return detections
}

async function processVideoFile(videoBase64: string): Promise<string> {
  try {
    // In a real implementation, you would:
    // 1. Extract frames from the video using ffmpeg or similar
    // 2. Process each frame through your AI model
    // 3. Create a summary image or video with detection boxes

    // For demo purposes, we'll create a mock processed frame
    const mockProcessedFrame = createMockVideoFrame()

    return mockProcessedFrame
  } catch (error) {
    console.error("Error processing video:", error)
    // Return a placeholder if processing fails
    return createMockVideoFrame()
  }
}

function createMockVideoFrame(): string {
  // Replace with actual frame processing logic
  return "/placeholder.svg?height=300&width=400"
}
