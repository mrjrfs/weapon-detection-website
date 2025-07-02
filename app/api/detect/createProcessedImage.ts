export async function createProcessedImage(imageBase64: string): Promise<string> {
  // This function would normally process the image and add detection boxes
  // For demo purposes, we'll return the original image with a timestamp
  const timestamp = Date.now()

  // In a real implementation, you would:
  // 1. Decode the base64 image
  // 2. Use a library like Sharp or Canvas to draw detection boxes
  // 3. Return the processed image as base64

  // For now, we'll simulate processing by adding a query parameter
  if (imageBase64.includes("?")) {
    return `${imageBase64}&processed=${timestamp}`
  } else {
    return `${imageBase64}?processed=${timestamp}`
  }
}
