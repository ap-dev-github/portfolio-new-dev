

import { NextRequest, NextResponse } from 'next/server';


const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

export async function POST(req: NextRequest) {

  if (!OPENROUTER_API_KEY) {
    return new NextResponse(
      JSON.stringify({ error: 'OpenRouter API Key not configured.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    const { name, age, symptoms } = await req.json();

    if (!name || !age || !symptoms) {
      return new NextResponse(
        JSON.stringify({ error: 'Missing required fields: name, age, or symptoms.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const modelName = 'openai/gpt-oss-20b:free';
    
  
   const systemPrompt = `
# ROLE & CONTEXT
You are an AI Symptom Analysis Assistant designed to provide educational health information. You are NOT a medical doctor and cannot provide diagnoses.

# CORE PRINCIPLES
1. **Educational Purpose Only** - All information is for health literacy and education
2. **Symptom-Based Analysis** - Base analysis ONLY on the provided symptoms
3. **Evidence-Informed** - Reference common medical patterns while acknowledging limitations
4. **Safety First** - Always prioritize recommending professional medical consultation

# OUTPUT REQUIREMENTS
## MANDATORY STRUCTURE
Your response MUST follow this exact structure:

### 🔍 **Symptom Analysis Summary**
- Briefly restate the key symptoms provided
- Note any important contextual factors (age, symptom duration if mentioned)

### 📋 **Possible Conditions to Discuss with Your Doctor**
**Common Possibilities:**
[List 2-3 most common conditions with brief, factual explanations]

**Other Considerations:**
[List 1-2 less common but important conditions]

**Important Notes:**
- These are POSSIBLE conditions based on symptom patterns
- Many conditions share similar symptoms
- Only a healthcare professional can provide actual diagnosis

### 🎯 **Recommended Next Steps**

#### **Immediate Self-Care** (If Appropriate)
- [List 1-2 safe, general self-care tips]

#### **When to Seek Medical Attention**
- [Specific guidance based on symptom severity]
- [Red flags to watch for]

#### **Preparing for Your Doctor Visit**
- [Suggestions for what information to bring]
- [Questions to ask your healthcare provider]

### ⚠️ **Important Medical Disclaimer**
> **CRITICAL**: This analysis is for EDUCATIONAL PURPOSES ONLY and is NOT a substitute for professional medical advice, diagnosis, or treatment. Always consult with a qualified healthcare provider for any health concerns. If you are experiencing a medical emergency, call your local emergency services immediately.

# RESPONSE GUIDELINES
- Use **bold** for emphasis but avoid medical jargon
- Maintain neutral, factual tone without alarmism
- Include age-appropriate considerations when relevant
- Acknowledge limitations of symptom-only analysis
- NEVER suggest specific medications or treatments
- ALWAYS recommend professional medical consultation
`;

const userContent = `
## PATIENT INFORMATION
**Name:** ${name}
**Age:** ${age}
**Reported Symptoms:** ${symptoms}

## ADDITIONAL CONTEXT
**Analysis Request:** Please provide an educational symptom analysis following the specified structure.
**Note:** Focus on common patterns while emphasizing the need for professional evaluation.
`;
    const openRouterRes = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
 
        'HTTP-Referer': req.headers.get('Origin') || 'https://symptom-checker-app.com', 
        "X-Title": "Symptom Checker Backend API",
      },
      body: JSON.stringify({
        model: modelName,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userContent },
        ],
      
        temperature: 0.5, 
        max_tokens: 500, 
      }),
    });

    if (!openRouterRes.ok) {
      const errorData = await openRouterRes.json();
      console.error('OpenRouter API Error:', errorData);
      return new NextResponse(
        JSON.stringify({ 
            error: 'Failed to communicate with the LLM API.', 
            details: errorData 
        }),
        { status: openRouterRes.status, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const data = await openRouterRes.json();
    const llmOutput = data.choices[0].message.content;

    return NextResponse.json({ result: llmOutput });

  } catch (error) {
    console.error('Request processing error:', error);
    return new NextResponse(
      JSON.stringify({ error: 'An unexpected server error occurred.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}