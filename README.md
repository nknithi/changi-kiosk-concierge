# ChangiAI - Passenger Concierge Kiosk

This is an AI-powered passenger concierge kiosk prototype for Changi Airport, built for the **Hipster Private Limited** assessment. 

It handles passenger FAQs and simulates a video-call transfer to a live human agent using Hipster's **Voncierge** platform concept.

---

## How to Run the App (Quick Start)

### 1. Setup the Backend
1. Open a terminal in the `backend` folder:
   ```
   cd backend
   ```
2. Install the packages:
   ```
   npm install
   ```
3. Create a `.env` file inside the `backend` folder and add your Gemini API Key:
   ```
   GEMINI_API_KEY=your_actual_api_key_here
   PORT=5000
   ```
4. Start the backend:
   ```
   npm run dev
   ```

### 2. Setup the Frontend
1. Open a **second** terminal window in the `frontend` folder:
   ```
   cd frontend
   ```
2. Install the packages:
   ```
   npm install
   ```
3. Start the frontend:
   ```
   npm start
   ```
4. The app will open automatically at `http://localhost:3000`.

---

## How it Works (Technical Details)

*   **Frontend**: Built with React 19 and Material UI. It uses a custom Burgundy and Gold theme to match Changi Airport's branding.
*   **Backend**: Node.js/Express server typed with TypeScript. It communicates with the Google Gemini API.
*   **AI Model**: Uses `gemini-flash-lite-latest` for low-latency, real-time responses.
*   **Human Escalation**: If you ask to speak to a human or mention an emergency (e.g. *"I lost my passport"*), the AI will prompt you to click a button, which launches a mock live video-call feed that simulates Hipster's **Voncierge** support system.
