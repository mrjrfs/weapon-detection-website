# Weapon Detection Website

## Overview

This project is a web application that allows users to detect weapons (pistols and knives) in images and videos. It uses a Next.js frontend and a separate Python backend for the actual detection processing.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [Running the Application](#running-the-application)
- [Usage Guide](#usage-guide)
- [Project Structure](#project-structure)
- [Troubleshooting](#troubleshooting)

## Prerequisites

Before you begin, ensure you have the following installed on your system:

*   **Node.js:** Version 18.x or later is recommended. You can download it from [https://nodejs.org/](https://nodejs.org/).
*   **pnpm:** This project uses `pnpm` as the package manager. If you don't have it, you can install it after installing Node.js by running:
    ```bash
    npm install -g pnpm
    ```
*   **Git:** For cloning the repository. You can download it from [https://git-scm.com/](https://git-scm.com/).
*   **Python:** Version 3.8 or later is recommended for the backend. You can download it from [https://www.python.org/](https://www.python.org/).
*   **pip:** Python's package installer, usually comes with Python.

## Backend Setup

This Next.js application requires a separate Python backend for weapon detection. The backend is responsible for processing images/videos and identifying weapons.

**Repository:** [https://github.com/mrjrfs/weapon-detection-python](https://github.com/mrjrfs/weapon-detection-python)

Follow these steps to set up the backend:

1.  **Clone the Backend Repository:**
    ```bash
    git clone https://github.com/mrjrfs/weapon-detection-python.git
    cd weapon-detection-python
    ```

2.  **Create a Virtual Environment (Recommended):**
    It's good practice to use a virtual environment to manage Python project dependencies.
    ```bash
    python -m venv venv
    ```
    Activate the virtual environment:
    *   On macOS and Linux:
        ```bash
        source venv/bin/activate
        ```
    *   On Windows:
        ```bash
        .\venv\Scripts\activate
        ```

3.  **Install Dependencies:**
    The Python backend has its own set of dependencies listed in `requirements.txt`.
    ```bash
    pip install -r requirements.txt
    ```
    **Important Note from Backend README:** The `requirements.txt` file in the Python backend repository might have encoding issues (extra null characters). If you encounter errors during `pip install`, you may need to manually edit the `requirements.txt` file to remove these null characters before installation. Each line should be a standard package specifier (e.g., `package_name==version`).

4.  **Pre-trained Model:**
    The backend application expects a pre-trained model weights file at `runs/detect/model/weights/last.pt` (relative to the Python project's root).
    *   Ensure this file is present.
    *   If you don't have this file, you'll need to train a model first by following the instructions in the [Training a Custom Model](https://github.com/mrjrfs/weapon-detection-python#training-a-custom-model) section of the Python backend's README. For basic usage of the frontend, having the `last.pt` file is crucial.

5.  **Dataset Configuration (`data.yaml`):**
    The `data.yaml` file in the Python backend project contains paths for training and validation datasets. For simply running the backend API for inference with a pre-trained model, modifications to this file might not be strictly necessary, as long as the pre-trained model (`last.pt`) is correctly in place.

**Running the Backend Server:**

Once the setup is complete and the pre-trained model is in place, start the Flask server from the root directory of the `weapon-detection-python` project:
```bash
python app.py
```
The backend server will typically start on `http://127.0.0.1:5000` (or `http://0.0.0.0:5000`). This is the address the frontend application will try to connect to.

Make sure the backend server is running before you start and use the frontend application.

## Frontend Setup

1.  **Clone this Repository:**

    If you haven't already, clone this frontend application repository. If you are viewing this `README.md` within the project, you've likely already done this. Otherwise, use the appropriate Git URL for this project.
    ```bash
    # Example: git clone https://github.com/your-username/your-frontend-repo.git
    # cd your-frontend-repo-name
    ```

2.  **Install Dependencies:**

    Navigate to the project's root directory (if you're not already there) and install the necessary Node.js packages using `pnpm`:
    ```bash
    pnpm install
    ```
    This command reads the `package.json` file and installs all the required dependencies listed in `pnpm-lock.yaml`.

## Running the Application

To run the application, you need to have both the backend and frontend servers running.

1.  **Start the Backend Server:**
    *   Ensure you have completed the [Backend Setup](#backend-setup) steps.
    *   Navigate to the root directory of your Python backend project.
    *   Run the Flask server (typically):
        ```bash
        python app.py
        ```
    *   The backend should now be running, usually at `http://127.0.0.1:5000`.

2.  **Start the Frontend Development Server:**
    *   Ensure you have completed the [Frontend Setup](#frontend-setup) steps.
    *   Navigate to the root directory of this Next.js frontend project.
    *   Start the development server:
        ```bash
        pnpm dev
        ```
    *   The application will typically be accessible at `http://localhost:3000` in your web browser.

Once both servers are running, you can open `http://localhost:3000` to use the weapon detection website.

## Usage Guide

Once the application is running, you can access it in your web browser (typically at `http://localhost:3000`). The main interface allows you to detect weapons using different input methods:

1.  **Navigation Tabs:**
    *   At the top of the detection interface, you will find tabs to switch between input modes:
        *   **Foto (Photo):** For uploading and analyzing static image files.
        *   **Video:** For uploading and analyzing video files.
        *   **Live:** For using your computer's camera to detect weapons in a live video feed. (This tab was present in the code but not fully functional in the `handleDetection` mock. The backend has a `/detect/live/frame` endpoint which suggests it's intended.)

2.  **Foto (Photo) Mode:**
    *   Click on the "Foto" tab.
    *   You can either drag and drop an image file (e.g., `.jpg`, `.png`) onto the designated area or click "Choose File" to browse and select an image.
    *   A preview of the selected image will be shown.
    *   Click the "Deteksi" (Detect) button to send the image to the backend for analysis.

3.  **Video Mode:**
    *   Click on the "Video" tab.
    *   Drag and drop a video file (e.g., `.mp4`, `.avi`) or click "Choose Video" to select one.
    *   Information about the selected video file (name, size) will be displayed.
    *   Click the "Deteksi" (Detect) button to upload and process the video.

4.  **Live Mode (Camera):**
    *   Click on the "Live" tab.
    *   Click "Start Camera" to activate your webcam. You might need to grant browser permissions.
    *   A live feed from your camera will appear.
    *   When you are ready, click "Deteksi" (Detect). The current frame from the camera will likely be captured and sent for analysis. (The frontend's `handleDetection` function currently doesn't fully implement the live detection call to the Python backend's `/detect/live/frame` endpoint; it mock-processes a captured image if `isCameraActive`.)
    *   Click "Stop Camera" to deactivate the webcam.

5.  **Detection Results:**
    *   After clicking "Deteksi", the system will process the input. This might take a few moments.
    *   **Detected Objects:** If any weapons (pistols or knives, based on the backend's capabilities) are detected, they will be listed, showing the type and count.
    *   **Processed Media:** An image or video with bounding boxes drawn around the detected objects will be displayed in the results area.
        *   For photos and live captures, this will be a static image.
        *   For videos, this will be a video player showing the processed video.

**Important Notes:**

*   Ensure the Python backend server is running and accessible at `http://127.0.0.1:5000` for the detection to work.
*   **Live Mode Backend Integration:** The "Live" mode's current implementation in `app/page.tsx` primarily uses a mock process for images captured from the camera. For full functionality, the `handleDetection` function would need to be updated to send the captured camera frames to the Python backend's `/detect/live/frame` endpoint. This is a potential area for future improvement.

## Project Structure

This is a standard Next.js project. Key directories include:

*   `app/`: Contains the core application routes, pages, and API handlers.
    *   `app/page.tsx`: The main page component for the detection interface.
    *   `app/api/`: Contains API route handlers (though the primary detection logic relies on the external Python backend).
*   `components/`: Contains reusable React components, including UI elements from `shadcn/ui`.
*   `public/`: Stores static assets like images.
*   `lib/`: May contain utility functions or library code.

## Troubleshooting

*   **Detection Fails / No Results:**
    *   Ensure the Python backend server is running.
    *   Verify it's accessible at `http://127.0.0.1:5000` (or the configured address if different). Check the backend server's console for any errors.
    *   Check your browser's developer console (usually F12) for network errors when you click "Deteksi". This can indicate if the frontend is unable to reach the backend.
*   **`pnpm install` fails:**
    *   Ensure you have Node.js and pnpm installed correctly (see [Prerequisites](#prerequisites)).
    *   Try deleting `node_modules` and `pnpm-lock.yaml` and running `pnpm install` again.
*   **Python backend `pip install -r requirements.txt` fails:**
    *   Remember the note in the [Backend Setup](#backend-setup) about potential null characters in `requirements.txt` in the Python project. You might need to manually clean that file.
