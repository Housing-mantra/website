import { NextResponse } from 'next/server';
import { getProjects, getDevelopers } from '@/lib/db-helpers';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'Messages are required' }, { status: 400 });
    }

    const userMessage = messages[messages.length - 1]?.content || '';

    // 1. Fetch live projects and developers database
    const projects = await getProjects();
    const developers = await getDevelopers();

    const projectsData = projects.map(p => ({
      title: p.title,
      location: p.location,
      price: p.price,
      status: p.status,
      type: p.type,
      units: p.units,
      possession: p.possession,
      rera: p.rera,
      description: p.description,
      slug: p.slug || p.id
    }));

    const developersData = developers.map(d => ({
      name: d.name,
      experience: d.experience,
      ongoingProjects: d.ongoingProjects,
      projectsDelivered: d.projectsDelivered
    }));

    // 2. Read API keys from Environment
    const geminiKey = process.env.GEMINI_API_KEY;
    const openAiKey = process.env.OPENAI_API_KEY;

    const systemPrompt = `You are "Mantra AI", the premium real estate AI Agent of Housing Mantra (housingmantra.in).
Your primary job is to help users find their dream property in Pune, PCMC, Moshi, Charholi, and nearby locations.
Here is the live listed database of projects on our website:
${JSON.stringify(projectsData, null, 2)}

And here is the live database of trusted developers:
${JSON.stringify(developersData, null, 2)}

Instructions:
- Suggest specific projects from the listed database above based on user budget, location, and requirements.
- Under all circumstances, be polite, professional, and act as a local property expert.
- Keep your answers concise, clean, and use bullet points or bold text where appropriate so it looks beautifully formatted on mobile screens.
- If a project from the database matches, display its details (Title, Price, Location, Status) and guide the user to check it out. You can tell them to view details on the site by going to "/projects/[slug]".
- Keep answers realistic and friendly. If no listing matches, suggest the closest one or tell them we have premium listings they can explore.
- Respond in a welcoming, helpful tone in English (or Hindi if the user asks in Hindi).`;

    // A. Connect to Google Gemini API if GEMINI_API_KEY is defined
    if (geminiKey) {
      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [
                {
                  role: 'user',
                  parts: [{ text: `${systemPrompt}\n\nUser conversation history:\n${messages.map((m: any) => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content}`).join('\n')}\n\nAssistant:` }]
                }
              ],
              generationConfig: {
                maxOutputTokens: 1000,
                temperature: 0.7,
              }
            })
          }
        );

        if (response.ok) {
          const data = await response.json();
          const replyText = data.candidates?.[0]?.content?.parts?.[0]?.text;
          if (replyText) {
            return NextResponse.json({ reply: replyText });
          }
        } else {
          console.error('Gemini API returned an error:', await response.text());
        }
      } catch (err) {
        console.error('Failed to communicate with Gemini API:', err);
      }
    }

    // B. Connect to OpenAI ChatGPT if OPENAI_API_KEY is defined
    if (openAiKey) {
      try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${openAiKey}`
          },
          body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages: [
              { role: 'system', content: systemPrompt },
              ...messages.map((m: any) => ({ role: m.role, content: m.content }))
            ],
            temperature: 0.7,
            max_tokens: 800
          })
        });

        if (response.ok) {
          const data = await response.json();
          const replyText = data.choices?.[0]?.message?.content;
          if (replyText) {
            return NextResponse.json({ reply: replyText });
          }
        }
      } catch (err) {
        console.error('Failed to communicate with OpenAI API:', err);
      }
    }

    // C. Smart Local Fallback matching engine (If no API keys are present)
    const query = userMessage.toLowerCase();
    let reply = '';

    // Match by Location
    const matchedProjects = projectsData.filter(p => 
      query.includes(p.location.toLowerCase()) || 
      query.includes(p.title.toLowerCase()) ||
      (p.description && p.description.toLowerCase().includes(query))
    );

    if (query.includes('hello') || query.includes('hi') || query.includes('hey')) {
      reply = `**Namaste! Welcome to Housing Mantra AI.** 🙏  
I'm here to help you find your dream home in Pune. You can ask me questions like:
- *"Show me projects in Moshi"*
- *"Flats in Charholi"*
- *"Under 50 Lakhs budget"*

Which location or budget are you planning for?`;
    } else if (matchedProjects.length > 0) {
      reply = `**Great news! I found ${matchedProjects.length} premium project(s) matching your request:**\n\n`;
      matchedProjects.forEach((p, idx) => {
        reply += `**${idx + 1}. ${p.title}**  
📍 Location: ${p.location}  
💰 Price: ₹ ${p.price}  
🏷️ Status: ${p.status} (${p.type})  
🔗 Link: [/projects/${p.slug}](/projects/${p.slug})  

*${p.description?.substring(0, 120) || 'Premium living configuration with world-class amenities.'}...*\n\n`;
      });
      reply += `Would you like me to connect you with our sales experts for a free site visit or brochure?`;
    } else if (query.includes('moshi') || query.includes('charholi') || query.includes('pune') || query.includes('pcmc')) {
      // General location fallback
      const loc = query.includes('moshi') ? 'Moshi' : query.includes('charholi') ? 'Charholi' : 'Pune';
      const sampleList = projectsData.filter(p => p.location.toLowerCase().includes(loc.toLowerCase()));
      
      if (sampleList.length > 0) {
        reply = `Here are the top-rated properties in **${loc}** listed on Housing Mantra:\n\n`;
        sampleList.forEach(p => {
          reply += `• **${p.title}** (₹ ${p.price}) - Located in ${p.location}. Status is *${p.status}*.\n`;
        });
        reply += `\nClick on their links or ask me details about any specific builder to know more!`;
      } else {
        reply = `We have premium residential listings in **${loc}** and across Pune. Please share your BHK preference or budget so I can filter out the best deals for you!`;
      }
    } else if (query.includes('budget') || query.includes('lakh') || query.includes('cr') || query.includes('price')) {
      reply = `Housing Mantra offers verified properties for every budget!  
• **Budget Homes:** ₹ 25 Lakhs - 45 Lakhs in Moshi / Alandi  
• **Premium Living:** ₹ 50 Lakhs - 90 Lakhs in Charholi / PCMC  
• **Luxury Spaces:** ₹ 1.2 Crore+ in prime locations  

Please tell me your preferred price range (e.g. *under 45 Lakhs*) so I can show you the exact live properties!`;
    } else {
      reply = `**I'm here to find the absolute best property match for you!** 🏡  
Housing Mantra has top residential apartments and commercial projects in Pune, PCMC, Moshi, and Charholi starting from just **₹ 30 Lakhs**.

Could you share your requirements?
1. **Preferred Location:** (Moshi, Charholi, PCMC, etc.)
2. **Budget:** (e.g. Under 50 Lakhs, Under 80 Lakhs)
3. **BHK Configuration:** (1 BHK, 2 BHK, 3 BHK)

*(Note: To connect me to live ChatGPT or Gemini, please configure the \`GEMINI_API_KEY\` in your \`.env\` file!)*`;
    }

    return NextResponse.json({ reply });
  } catch (err: any) {
    console.error('AI chat endpoint error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
