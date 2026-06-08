# TDC Matchmaker Dashboard & Algo MVP

A premium, internal-use dashboard and algorithm built for the The Date Crew (TDC) team to manage customers, track their matchmaking journeys, examine detailed profiles, analyze candidate compatibility using a custom matching engine, and draft personalized, AI-generated introduction letters.

---

## 📝 Assignment Write-up

### 🚀 Tech Choices
The application is built using a modern, high-performance web stack:
- **Frontend & Routing**: **Next.js 14 (App Router)** with **TypeScript** and **React**. Next.js was selected for its robust framework architecture, file-based routing, and built-in API routes, which allow for a unified full-stack codebase.
- **Styling & Animations**: **Tailwind CSS** paired with **Framer Motion**. It uses an elegant matrimonial-inspired color palette (burgundy, gold, cream, charcoal, and rose) and clean glassmorphism card layouts. Framer Motion provides smooth page-entry animations and micro-interactions for a premium feel.
- **Icons**: **Lucide React** for clean, modern interface iconography.
- **AI Integration**: **Google Gemini 2.5 Flash Lite** (via the `@google/generative-ai` SDK) was chosen to generate personalized match introduction emails. It is highly optimized, fast, and cost-effective.
- **Data Persistence**: A mock database of 210 profiles (105 male, 105 female) generated with realistic Indian matrimonial characteristics. We leverage **localStorage** to save notes, update status tags (Active, Pending, Matched, Paused), and store configurations dynamically, eliminating the need for a complex backend setup for this MVP.

### 🧮 Matching Logic (Gender-Specific)
The matchmaking algorithm scores candidates of the opposite gender, filters out matches below a threshold score of 40 points, and returns the top 10 highest-ranked matches:
- **For Male Customers**: The criteria are aligned with traditional demographics:
  - **Age**: Candidate is younger than the customer (+20 pts)
  - **Height**: Candidate is shorter than the customer (+10 pts)
  - **Income**: Candidate earns less than the customer (+15 pts)
  - **Kids Preference**: Compatible views on children (+20 pts)
  - **Matrimonial Filters**: Same religion (+15 pts), same mother tongue (+10 pts), and aligned family values (Traditional/Liberal/Moderate within 1 tier distance) (+10 pts).
- **For Female Customers**: The criteria focus on professional standing, values, and lifestyle compatibility:
  - **Profession**: Candidates working in a compatible industry tier (Tech, Medicine, Finance, Law, Government) (+20 pts)
  - **Family Values**: Exact match on family values (Traditional, Moderate, Liberal) (+20 pts)
  - **Relocation**: Aligned relocation preferences (+15 pts)
  - **Kids Preference**: Compatible views on children (+20 pts)
  - **Socioeconomics**: Same religion (+10 pts), candidate income is equal to or greater than the customer's income (+10 pts), and matching diet preferences (+5 pts).

### 🤖 AI Usage
We integrated the **Gemini 2.5 Flash Lite** model to help matchmakers compose introduction letters. 
- When a matchmaker selects "Generate Intro", the app sends both the client and candidate profiles to the backend API (`/api/generate-intro`).
- The LLM drafts a concise, warm, 3-sentence introduction email that highlights two specific compatibility points (e.g., career alignment, shared values, or relocation preferences) naturally, avoiding robotic or generic greetings.
- **Graceful Fallback**: If no `GEMINI_API_KEY` is present in the environment variables, the system automatically falls back to a high-quality client-side template, allowing the application to function perfectly without configuration.

### 📌 Assumptions Made
1. **User Authentication**: A single login screen is implemented for simplicity, assuming the matchmaker uses credentials:
   - **Email**: `matchmaker@tdc.com`
   - **Password**: `password123`
2. **Indian Matrimonials Attributes**: Matrimonial profiles in India require distinct parameters. We populated the database with fields such as *Religion*, *Caste*, *Mother Tongue*, *Manglik status*, *Diet*, *Family Values*, *Annual Family Income*, and *Parents' Occupations*.
3. **Data Scope**: To ensure a realistic matchmaking pool, we updated the generator script to supply 105 mock profiles of *each* gender. This guarantees that any client has a pool of at least 100 opposite-gender candidates to query.

---

## 🛠️ How to Run Locally

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Create a file named `.env.local` in the root directory (or edit the existing one) and add your Gemini API Key:
```env
GEMINI_API_KEY=your_actual_gemini_api_key_here
```
*(If left empty or set to `your_key_here`, the application will fall back to a high-quality local text template instead of throwing errors).*

### 3. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to interact with the MVP.

---

## 🔑 How to Get a Gemini API Key

1. Go to the [Google AI Studio Console](https://aistudio.google.com/).
2. Sign in with your Google account.
3. Click on the **"Get API key"** button in the left sidebar.
4. Click **"Create API key"** and choose to associate it with a new or existing Google Cloud project.
5. Copy the generated key and paste it into your `.env.local` file as `GEMINI_API_KEY`.

---

## 📤 How to Upload to Your GitHub

Follow these steps to upload this codebase to your own GitHub profile:

### Step 1: Initialize Git and Commit
In your terminal, run:
```bash
git init
git add .
git commit -m "feat: complete TDC Matchmaker Dashboard & Algo MVP"
```

### Step 2: Create a New Repository on GitHub
1. Log in to [GitHub](https://github.com/).
2. Click **"New"** (or the **"+"** icon in the top right, then **New repository**).
3. Set your repository name (e.g. `tdc-matchmaker-dashboard`) and description.
4. Leave "Add a README", "Add .gitignore", and "Choose a license" **unselected** (since we have already created these locally).
5. Click **"Create repository"**.

### Step 3: Add Remote and Push
Copy and run the commands from your new GitHub repository page:
```bash
# Rename the default branch to main
git branch -M main

# Link your local repository to your remote GitHub repository
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/YOUR_REPO_NAME.git

# Push your code to the remote repository
git push -u origin main
```
