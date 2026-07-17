# Canva Slide-Deck Presentation Draft

This draft provides the exact content (titles, bullet points), design ideas, and a presentation script for your **Canva / PowerPoint Slide Deck**. Keep the presentation to 8–10 slides maximum (as requested).

---

## Slide 1: Title Slide (The Hook)
*   **Slide Design**: Dark charcoal background, Changi Burgundy accents, large Champagne Gold text.
*   **Slide Text**:
    *   **Main Title**: ChangiAI Digital Concierge
    *   **Subtitle**: Revolutionizing Passenger Self-Service with Voncierge Smart Automation
    *   **Presented By**: [Your Name], Technical Project Intern Candidate
*   **Presenter Script**:
    > *"Good day, team. Today I am excited to present ChangiAI, a smart kiosk concierge prototype that addresses the airport's challenge of handling high passenger volumes at physical counters. The solution leverages Gemini AI and modular automation to help passengers navigate the airport seamlessly."*

---

## Slide 2: Problem Statement (Task 2)
*   **Slide Design**: Simple, clean layout. Split screen showing "Passenger Challenges" vs "Airport Operations Challenges".
*   **Slide Text**:
    *   **Problem Statement**: Physical customer service counters face high friction during peak travel hours, leading to passenger frustration and high staffing costs.
    *   **Key Friction Points**:
        *   Repetitive wayfinding queries ("Where is the MRT?").
        *   Sudden traffic spikes during flight delays.
        *   Emergency escalations taking up staff time on basic issues.
*   **Presenter Script**:
    > *"First, let's look at the problem. Airports face massive operational bottlenecks. Up to 80% of passenger queries at service desks are repetitive—asking for directions, pharmacy locations, or flight times. This leaves staff overwhelmed and unable to prioritize high-value passenger needs, especially during peak hours or emergencies."*

---

## Slide 3: Task 1: Discovery Questions (Part 1)
*   **Slide Design**: A clean, 3-column table or list.
*   **Slide Text**:
    *   **Question 1**: *"What are the most common languages spoken by passengers at these terminals?"*
        *   *Why it matters*: Determines our localization budget and whether the AI model needs multi-language translation.
    *   **Question 2**: *"How do passengers currently access maps and directions?"*
        *   *Why it matters*: Helps us understand whether to integrate static map images, dynamic QR-code wayfinding, or interactive kiosk maps.
    *   **Question 3**: *"What backend systems house flight details?"*
        *   *Why it matters*: We need to know if we are connecting to a legacy SOAP API, a modern REST API, or a localized static schedule.
*   **Presenter Script**:
    > *"To design the perfect solution, we must start with discovery. I formulated three critical questions for the airport stakeholders. We need to identify language requirements for multilingual support, the existing wayfinding format, and the API structures of the flight database to plan a seamless technical integration."*

---

## Slide 4: Proposed Solution: ChangiAI Kiosk (Task 2)
*   **Slide Design**: Side-by-side split. On the left, key features; on the right, a mockup description of the glassmorphic dual-pane dashboard we built.
*   **Slide Text**:
    *   **The Concept**: An interactive digital kiosk combining ambient airport widgets with a smart conversational AI.
    *   **Key Features**:
        *   **Dynamic Dashboard**: Live clock, weather, and real-time flight departures.
        *   **Zero-Typing Quick Action Chips**: Common questions ("Find Taxi", "MRT") clickable for instant response.
        *   **Omnichannel Live Video Escalation**: Connects directly to a human agent via **Voncierge** video telephony for critical queries.
*   **Presenter Script**:
    > *"Our proposed solution is the ChangiAI Kiosk. Unlike a boring, floating chatbot, this is a dedicated, dual-pane passenger kiosk. It pairs ambient information—like a live flight departures board—with a low-latency AI concierge. And most importantly, it features an integrated video link to human operators for complex issues."*

---

## Slide 5: System Architecture & Workflow
*   **Slide Design**: Flowchart diagram layout (visualizing the request flow).
*   **Slide Text**:
    *   **Frontend**: React 19 + Material UI (Glassmorphic Theme, responsive layouts).
    *   **Backend**: Node.js + Express + TypeScript.
    *   **AI Engine**: Gemini 2.5 Flash Lite API (Context-restricted).
    *   **Human Escalation**: Voncierge REST Protocol.
    *   **Data Flow**:
        1. Passenger types query.
        2. Backend injects Changi Knowledge Base into System Prompt.
        3. Gemini generates answer.
        4. If emergency, Gemini appends `[ESCALATE_VONCIERGE]`.
        5. Frontend intercepts token and opens video modal.
*   **Presenter Script**:
    > *"Looking at the technical architecture: the React frontend communicates with a TypeScript-based Express server. The server securely interacts with Google's Gemini API, referencing our localized knowledge base. If the AI detects an emergency, it outputs a special flag, which the frontend reads to trigger a Voncierge video call modal."*

---

## Slide 6: The "Voncierge" Human Escalation
*   **Slide Design**: Use a high-contrast mockup layout describing the video call screen (showing user camera and ringing animation).
*   **Slide Text**:
    *   **Why Voncierge?**: Directly leverages Hipster's core product value.
    *   **UX Principles**:
        *   *No sudden takeovers*: The AI suggests a human transfer and shows an explicit "Start Video Call" button (gaining user consent).
        *   *Webcam integration*: Integrates with browser WebRTC to display user video picture-in-picture.
        *   *Seamless transition*: Keeps passengers calm during stressful emergencies (like a lost passport).
*   **Presenter Script**:
    > *"Let's talk about the human escalation. Instead of just showing a phone number, we mocked a live Voncierge session. When a passenger reports a lost passport or asks for a human, the bot shows a clear 'Start Video Call' button. Upon consent, the browser requests camera permissions and initiates a simulated video link with Agent Sarah, keeping the passenger reassured."*

---

## Slide 7: Expected Benefits
*   **Slide Design**: 3 columns matching the prompt (Passengers, Operations, Service Teams).
*   **Slide Text**:
    *   **For Passengers**: Instant support, no waiting in physical queues, and 24/7 access.
    *   **For Airport Operations**: Dramatically reduced pressure on physical information counters, lower operational overhead, and data-driven insights from common passenger queries.
    *   **For Customer Service Teams**: Agents only handle complex or high-priority issues, while repetitive questions are fully automated.
*   **Presenter Script**:
    > *"The benefits are clear. Passengers get instant, multi-language help. Airport operations see reduced queue lengths at physical counters. And customer service teams can focus their energy on high-value guest relations instead of telling passengers where the toilets are."*

---

## Slide 8: Key Technical Decisions & Modern Stack
*   **Slide Design**: Tech logos or neat code block snippets.
*   **Slide Text**:
    *   **React 19 & MUI Theme**: Created custom CSS tokens using Material UI's Theme Engine to perfectly adapt to Changi's corporate guidelines.
    *   **Gemini 2.5 Flash Lite**: Selected for its sub-second response times and excellent performance-to-cost ratio.
    *   **Clean TypeScript**: Typed request/response objects to ensure clean production compilation and prevent runtime bugs.
    *   **Zero Hardcoding**: Environmental variables (`.env`) ensure the project is immediately deployable on public clouds (Vercel/Render).
*   **Presenter Script**:
    > *"For our technical stack, we chose React 19 and the latest Material UI for maximum rendering efficiency and clean style overrides. We used the Gemini Flash Lite API to ensure sub-second response times, and fully typed the Express backend with TypeScript to align with enterprise software engineering standards."*

---

## Slide 9: Conclusion / Q&A
*   **Slide Design**: Minimal, elegant dark-mode slide.
*   **Slide Text**:
    *   **ChangiAI Concierge**: Ready for immediate deployment.
    *   **Next Steps**: Expand knowledge base, integrate dynamic MRT schedules, and link real-world Voncierge APIs.
    *   *Thank you! Open for Questions.*
*   **Presenter Script**:
    > *"In conclusion, ChangiAI is a modern, responsive prototype that demonstrates the power of combining AI automation with human empathy through the Voncierge video platform. Thank you for your time, and I am happy to take any questions."*
