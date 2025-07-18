"use client";

import type React from "react";

import { useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, Shield, Eye, Camera, Video, Play, Square } from "lucide-react";
import { set } from "date-fns";

export default function HomePage() {
	const [activeTab, setActiveTab] = useState("Foto");
	const [detectionResults, setDetectionResults] = useState<
		Array<{ type: string; count: number; detected: boolean }>
	>([]);
	const [isDetecting, setIsDetecting] = useState(false);
	const [detectedImage, setDetectedImage] = useState<string | null>(null);

	// File upload states
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [previewImage, setPreviewImage] = useState<string | null>(null);
	const [isDragOver, setIsDragOver] = useState(false);
	const fileInputRef = useRef<HTMLInputElement>(null);

	// Camera states
	const [isCameraActive, setIsCameraActive] = useState(false);
	const [stream, setStream] = useState<MediaStream | null>(null);
	const videoRef = useRef<HTMLVideoElement>(null);
	const canvasRef = useRef<HTMLCanvasElement>(null);

	const tabs = ["Foto", "Video"];

	// Camera functions
	const startCamera = useCallback(async () => {
		try {
			const mediaStream = await navigator.mediaDevices.getUserMedia({
				video: { width: 640, height: 480 },
			});
			setStream(mediaStream);
			setIsCameraActive(true);

			if (videoRef.current) {
				videoRef.current.srcObject = mediaStream;
			}
		} catch (error) {
			console.error("Error accessing camera:", error);
			alert("Unable to access camera. Please check permissions.");
		}
	}, []);

	const stopCamera = useCallback(() => {
		if (stream) {
			stream.getTracks().forEach((track) => track.stop());
			setStream(null);
		}
		setIsCameraActive(false);
		if (videoRef.current) {
			videoRef.current.srcObject = null;
		}
	}, [stream]);

	const captureImage = useCallback(() => {
		if (videoRef.current && canvasRef.current) {
			const canvas = canvasRef.current;
			const video = videoRef.current;
			const context = canvas.getContext("2d");

			if (context) {
				canvas.width = video.videoWidth;
				canvas.height = video.videoHeight;
				context.drawImage(video, 0, 0);

				return canvas.toDataURL("image/jpeg", 0.8);
			}
		}
		return null;
	}, []);

	// File upload functions
	const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			if (activeTab === "Foto" && file.type.startsWith("image/")) {
				setSelectedFile(file);
				const reader = new FileReader();
				reader.onload = (e) => {
					setPreviewImage(e.target?.result as string);
				};
				reader.readAsDataURL(file);
			} else if (activeTab === "Video" && file.type.startsWith("video/")) {
				setSelectedFile(file);
				setPreviewImage(null);
			}
		}
	};

	const handleDragOver = (event: React.DragEvent) => {
		event.preventDefault();
		setIsDragOver(true);
	};

	const handleDragLeave = (event: React.DragEvent) => {
		event.preventDefault();
		setIsDragOver(false);
	};

	const handleDrop = (event: React.DragEvent) => {
		event.preventDefault();
		setIsDragOver(false);

		const file = event.dataTransfer.files[0];
		if (file) {
			if (activeTab === "Foto" && file.type.startsWith("image/")) {
				setSelectedFile(file);
				const reader = new FileReader();
				reader.onload = (e) => {
					setPreviewImage(e.target?.result as string);
				};
				reader.readAsDataURL(file);
			} else if (activeTab === "Video" && file.type.startsWith("video/")) {
				setSelectedFile(file);
				setPreviewImage(null);
			}
		}
	};

	// Mock detection function
	const handleDetection = async () => {
		setIsDetecting(true);
		setDetectedImage(null);

		try {
			// Simulate processing time
			await new Promise((resolve) => setTimeout(resolve, 2000));

			const baseEndpoint = "http://127.0.0.1:5000";

			if (activeTab === "Foto") {
				try {
					const formData = new FormData();
					formData.append("image", selectedFile ?? new Blob());

					const response = await fetch(baseEndpoint + "/detect/image", {
						method: "POST",
						body: formData,
					});

					const result = await response.json();

					const filepath = baseEndpoint + "/image/" + result.unique_filename;
					const pistolDetectCount = result.guns_detected;
					const pisauDetectCount = result.knives_detected;

					setDetectedImage(filepath);

					const data = [
						{
							type: "Pistol",
							count: pistolDetectCount,
							detected: pistolDetectCount === 0 ? false : true,
						},
						{
							type: "Pisau",
							count: pisauDetectCount,
							detected: pisauDetectCount === 0 ? false : true,
						},
					];

					setDetectionResults(data);
				} catch (error) {
					console.error("Detection error:", error);
					alert("Detection failed. Please try again.");
				}
			} else if (activeTab === "Video") {
				try {
					const formData = new FormData();
					formData.append("video", selectedFile ?? new Blob());

					const response = await fetch(baseEndpoint + "/detect/video", {
						method: "POST",
						body: formData,
					});

					const result = await response.json();

					const filepath = baseEndpoint + "/video/" + result.unique_filename;
					const pistolDetectCount = result.guns_detected;
					const kniveDetectCount = result.knives_detected;

					setDetectedImage(filepath);

					const data = [
						{
							type: "Pistol",
							count: pistolDetectCount,
							detected: pistolDetectCount === 0 ? false : true,
						},
						{
							type: "Pisau",
							count: kniveDetectCount,
							detected: kniveDetectCount === 0 ? false : true,
						},
					];

					setDetectionResults(data);
				} catch (error) {
					console.error("Detection error:", error);
					alert("Detection failed. Please try again.");
				}
			}

			// Set a mock processed image
			if (activeTab === "Live" && isCameraActive) {
				const capturedImage = captureImage();
				if (capturedImage) {
					setDetectedImage(capturedImage);
				}
			}
		} catch (error) {
			console.error("Detection error:", error);
			alert("Detection failed. Please try again.");
		} finally {
			setIsDetecting(false);
		}
	};

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
										<h3 className="text-xl font-bold">
											SURVEILLANCE NECESSARY
										</h3>
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
								<h2 className="text-2xl font-bold text-slate-800">
									Weapon Detection
								</h2>
								<div className="flex bg-slate-100 rounded-lg p-1">
									{tabs.map((tab) => (
										<button
											key={tab}
											onClick={() => setActiveTab(tab)}
											className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
												activeTab === tab
													? "bg-slate-800 text-white shadow-sm"
													: "text-slate-600 hover:text-slate-800"
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
										<div className="space-y-4">
											<div
												className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
													isDragOver
														? "border-blue-400 bg-blue-50"
														: "border-slate-300 hover:border-slate-400 bg-slate-50"
												}`}
												onDragOver={handleDragOver}
												onDragLeave={handleDragLeave}
												onDrop={handleDrop}
											>
												{previewImage ? (
													<div className="space-y-4">
														<img
															src={previewImage || "/placeholder.svg"}
															alt="Selected image"
															className="max-w-full max-h-64 mx-auto rounded-lg shadow-md"
														/>
														<div className="flex gap-2 justify-center">
															<Button
																variant="outline"
																onClick={() => {
																	setSelectedFile(null);
																	setPreviewImage(null);
																}}
															>
																Remove
															</Button>
															<Button
																variant="outline"
																onClick={() => fileInputRef.current?.click()}
															>
																Change Image
															</Button>
														</div>
													</div>
												) : (
													<div>
														<Upload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
														<p className="text-slate-600 mb-2">
															Drag & Drop your image or Browse
														</p>
														<Button
															variant="outline"
															className="mt-4 bg-transparent"
															onClick={() => fileInputRef.current?.click()}
														>
															Choose File
														</Button>
													</div>
												)}
											</div>
											<input
												ref={fileInputRef}
												type="file"
												accept="image/*"
												onChange={handleFileSelect}
												className="hidden"
											/>
										</div>
									)}

									{activeTab === "Video" && (
										<div className="space-y-4">
											<div
												className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
													isDragOver
														? "border-blue-400 bg-blue-50"
														: "border-slate-300 hover:border-slate-400 bg-slate-50"
												}`}
												onDragOver={handleDragOver}
												onDragLeave={handleDragLeave}
												onDrop={handleDrop}
											>
												{selectedFile && activeTab === "Video" ? (
													<div className="space-y-4">
														<div className="flex items-center justify-center">
															<Video className="w-16 h-16 text-green-600" />
														</div>
														<p className="text-slate-800 font-medium">
															{selectedFile.name}
														</p>
														<p className="text-slate-600 text-sm">
															Size:{" "}
															{(selectedFile.size / (1024 * 1024)).toFixed(2)}{" "}
															MB
														</p>
														<div className="flex gap-2 justify-center">
															<Button
																variant="outline"
																onClick={() => {
																	setSelectedFile(null);
																	setPreviewImage(null);
																}}
															>
																Remove
															</Button>
															<Button
																variant="outline"
																onClick={() => fileInputRef.current?.click()}
															>
																Change Video
															</Button>
														</div>
													</div>
												) : (
													<div>
														<Video className="w-12 h-12 text-slate-400 mx-auto mb-4" />
														<p className="text-slate-600 mb-2">
															Upload video file for analysis
														</p>
														<Button
															variant="outline"
															className="mt-4 bg-transparent"
															onClick={() => fileInputRef.current?.click()}
														>
															Choose Video
														</Button>
													</div>
												)}
											</div>
											<input
												ref={fileInputRef}
												type="file"
												accept="video/*"
												onChange={handleFileSelect}
												className="hidden"
											/>
										</div>
									)}

									{activeTab === "Live" && (
										<div className="space-y-4">
											<div className="border-2 border-slate-300 rounded-lg overflow-hidden bg-black">
												{isCameraActive ? (
													<video
														ref={videoRef}
														autoPlay
														playsInline
														muted
														className="w-full h-64 object-cover"
													/>
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
													<Button
														onClick={startCamera}
														className="flex-1 bg-green-600 hover:bg-green-700"
													>
														<Play className="w-4 h-4 mr-2" />
														Start Camera
													</Button>
												) : (
													<Button
														onClick={stopCamera}
														variant="destructive"
														className="flex-1"
													>
														<Square className="w-4 h-4 mr-2" />
														Stop Camera
													</Button>
												)}
											</div>
										</div>
									)}

									<Button
										onClick={handleDetection}
										disabled={
											isDetecting ||
											(activeTab === "Live" && !isCameraActive) ||
											((activeTab === "Foto" || activeTab === "Video") &&
												!selectedFile)
										}
										className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-lg font-semibold"
									>
										{isDetecting ? "Detecting..." : "Deteksi"}
									</Button>
								</div>

								{/* Results Area */}
								<div className="space-y-4">
									{/* Detection Results */}
									{detectionResults.length > 0 ? (
										detectionResults.map((result, index) => {
											if (result.count === 0) return null;
											return (
												<Card
													key={index}
													className={`${
														result.detected
															? "bg-red-300 border-red-200"
															: "bg-gray-50"
													}`}
												>
													<CardContent className="p-4">
														<div className="flex items-center justify-between">
															<span className="font-medium text-slate-800">
																{result.count} {result.type} terdeteksi
															</span>
															<div
																className={`w-3 h-3 rounded-full ${
																	result.detected ? "bg-red-600" : "bg-gray-400"
																}`}
															/>
														</div>
													</CardContent>
												</Card>
											);
										})
									) : (
										<Card className="bg-gray-50">
											<CardContent className="p-4">
												<div className="text-center text-slate-600">
													<Shield className="w-12 h-12 mx-auto mb-2 text-slate-400" />
													<p>No detections yet</p>
													<p className="text-sm">
														Upload an image or start camera to begin detection
													</p>
												</div>
											</CardContent>
										</Card>
									)}

									{/* Processed Image Display */}
									{detectedImage && (
										<Card className="mt-6">
											<CardContent className="p-4">
												<h3 className="font-semibold text-slate-800 mb-3">
													Processed {activeTab === "Foto" ? "Image" : "Video"}
												</h3>
												<div className="border rounded-lg overflow-hidden">
													{activeTab === "Foto" || activeTab === "Live" ? ( 
														<img
															src={detectedImage} 
															alt="Processed detection result"
															className="w-full h-auto"
														/>
													) : activeTab === "Video" ? ( 
														<video
															src={detectedImage} 
															controls
															preload="metadata" 
															playsInline 
															muted
															autoPlay 
															className="w-full h-auto"
														/>
													) : (
														<img
															src="/placeholder.svg?height=300&width=400"
															alt="No media to display"
															className="w-full h-auto"
														/>
													)}
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
	);
}
