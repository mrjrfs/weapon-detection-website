import { type NextRequest, NextResponse } from "next/server"

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
    const processedImage = await createProcessedImage(image)

    return NextResponse.json({
      success: true,
      detections: mockDetections,
      processedImage: processedImage,
      source: source,
      timestamp: new Date().toISOString(),
      processingTime: "1.2s",
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

async function createProcessedImage(originalImage: string): Promise<string> {
  // In a real implementation, this would:
  // 1. Use Sharp or Canvas to process the image
  // 2. Run the image through your AI model
  // 3. Draw bounding boxes around detected weapons
  // 4. Add confidence scores and labels

  // For demo purposes, we'll create a simple overlay indicator
  try {
    // Extract the base64 data
    const base64Data = originalImage.split(",")[1]
    const imageBuffer = Buffer.from(base64Data, "base64")

    // In production, you would use Sharp here:
    /*
    const sharp = require('sharp')
    const processedBuffer = await sharp(imageBuffer)
      .composite([
        // Add detection box overlays
        {
          input: createDetectionBoxSVG(),
          top: 50,
          left: 50
        }
      ])
      .jpeg({ quality: 90 })
      .toBuffer()
    
    return `data:image/jpeg;base64,${processedBuffer.toString('base64')}`
    */

    // For now, return the original image with a processing marker
    const timestamp = Date.now()
    return `${originalImage}#processed-${timestamp}`
  } catch (error) {
    console.error("Error processing image:", error)
    return originalImage
  }
}

// Helper function to create SVG overlay for detection boxes
function createDetectionBoxSVG(): string {
  return `
    <svg width="200" height="150" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="10" width="80" height="60" 
            fill="none" stroke="red" stroke-width="2"/>
      <text x="12" y="8" fill="red" font-size="12" font-family="Arial">
        Weapon 95%
      </text>
    </svg>
  `
}
