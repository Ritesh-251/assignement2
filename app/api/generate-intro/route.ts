import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { customer, match } = await req.json();

  if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === "your_key_here") {
    return Response.json({
      intro: `Dear ${customer.firstName}, I wanted to introduce you to ${match.firstName} ${match.lastName}, a ${match.designation} at ${match.currentCompany} based in ${match.city}. What stands out is your shared alignment around ${match.matchedCriteria?.[0] ?? "core values"} and ${match.matchedCriteria?.[1] ?? "family expectations"}, which could make for a thoughtful first conversation. I believe this is a warm, promising match worth exploring at your comfort and pace.`
    });
  }

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const prompt = `
You are a warm, professional Indian matchmaker writing on behalf of TDC Matchmaking.
Write a short, personalized 3-sentence introduction email from the matchmaker to the client introducing them to a potential match.

Client: ${customer.firstName} ${customer.lastName}, ${customer.designation} at ${customer.currentCompany}, based in ${customer.city}, aged ${customer.age}.
Potential Match: ${match.firstName} ${match.lastName}, ${match.designation} at ${match.currentCompany}, based in ${match.city}.
Compatibility points: ${match.matchedCriteria.join(", ")}.

Keep the tone warm, hopeful, and culturally respectful. Do not use generic phrases like "I hope this email finds you well". Mention 2 specific compatibility points naturally in the intro.
  `;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });
    const result = await model.generateContent(prompt);
    const text = result.response.text();

    return Response.json({ intro: text });
  } catch {
    return Response.json(
      { intro: "We could not generate the intro right now. Please check the Gemini API key and try again." },
      { status: 500 }
    );
  }
}
