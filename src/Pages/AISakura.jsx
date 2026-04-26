import { useState, useRef, useEffect } from 'react';
import './AISakura.css';

export default function AISakura() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [rateLimitWait, setRateLimitWait] = useState(0);
  const messagesEndRef = useRef(null);
  const [isApiReady, setIsApiReady] = useState(false);
  const model = useRef(null);
  const lastRequestTime = useRef(0);

  // Initialize Google Generative AI
  useEffect(() => {
    const initializeAI = async () => {
      try {
        const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
        if (!apiKey) {
          console.error('API key not found');
          setMessages([{
            id: 1,
            text: '⚠️ API key not configured. Add VITE_GOOGLE_API_KEY to .env.local\n\nGet free key: https://ai.google.dev/aistudio',
            sender: 'bot',
            timestamp: new Date().toLocaleTimeString()
          }]);
          return;
        }
        
        // // First, list available models
        // console.log('📋 Fetching available models for your API key...');
        // const listResponse = await fetch(
        //   `https://generativelanguage.googleapis.com/v1/models?key=${apiKey}`
        // );
        
        // if (!listResponse.ok) {
        //   throw new Error(`Failed to fetch models: ${listResponse.statusText}`);
        // }
        
        // const listData = await listResponse.json();
        // const availableModels = listData.models
        //   ? listData.models
        //       .filter(m => m.supportedGenerationMethods?.includes('generateContent'))
        //       .map(m => m.name.split('/')[1])
        //   : [];
        
        // console.log('✅ Available models:', availableModels);
        
        // if (availableModels.length === 0) {
        //   throw new Error('No models with generateContent support found for this API key');
        // }
        
        // // Try each available model
        // let selectedModel = null;
        // let lastError = null;
        
        // for (const modelName of availableModels) {
        //   try {
        //     console.log(`🔍 Testing model: ${modelName}...`);
        //     const testResponse = await fetch(
        //       `https://generativelanguage.googleapis.com/v1/models/${modelName}:generateContent?key=${apiKey}`,
        //       {
        //         method: 'POST',
        //         headers: { 'Content-Type': 'application/json' },
        //         body: JSON.stringify({
        //           contents: [{ parts: [{ text: 'test' }] }]
        //         })
        //       }
        //     );

        //     if (testResponse.ok) {
        //       console.log(`✅ Model ${modelName} works!`);
        //       selectedModel = modelName;
        //       break;
        //     } else {
        //       const error = await testResponse.json();
        //       lastError = error.error?.message || testResponse.statusText;
        //       console.warn(`❌ ${modelName} failed:`, lastError);
        //     }
        //   } catch (err) {
        //     lastError = err.message;
        //     console.warn(`❌ Error testing ${modelName}:`, err.message);
        //   }
        // }
        
        // if (!selectedModel) {
        //   throw new Error(
        //     `None of the available models work: ${availableModels.join(', ')}\n\n` +
        //     `Last error: ${lastError}`
        //   );
        // }
        
        // Store selected model in ref
        model.current = 'gemini-2.5-flash';
        setIsApiReady(true);
        
        setMessages([{
          id: 1,
          text: `👋 Hello! I'm AISakura. Using Gemini 2.5 Flash. Ask me anything!`,
          sender: 'bot',
          timestamp: new Date().toLocaleTimeString()
        }]);
      } catch (error) {
        console.error('Error initializing API:', error);
        
        let errorMsg = error.message;
        if (error.message.includes('401') || error.message.includes('UNAUTHENTICATED')) {
          errorMsg = 'Invalid API key.\n\nSteps:\n1. Go to https://ai.google.dev/aistudio\n2. Create a new API key\n3. Copy it to .env.local as VITE_GOOGLE_API_KEY';
        } else if (error.message.includes('RESOURCE_EXHAUSTED')) {
          errorMsg = 'API quota exceeded. Daily limit reached. Try again tomorrow or upgrade at: https://ai.google.dev/pricing';
        }
        
        setMessages([{
          id: 1,
          text: `❌ Error: ${errorMsg}`,
          sender: 'bot',
          timestamp: new Date().toLocaleTimeString()
        }]);
      }
    };
    
    initializeAI();
  }, []);

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Retry with exponential backoff
  const generateWithRetry = async (userInput, maxRetries = 3) => {
    const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
    const modelName = model.current;
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        // Use REST API directly with the selected model
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1/models/${modelName}:generateContent?key=${apiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ parts: [{ text: userInput }] }]
            })
          }
        );

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.error?.message || response.statusText);
        }

        const data = await response.json();
        return data.candidates[0]?.content?.parts[0]?.text || 'No response generated';
      } catch (error) {
        if (error.message.includes('429') && attempt < maxRetries) {
          const waitTime = Math.pow(2, attempt) * 5;
          console.log(`Rate limited. Retrying in ${waitTime}s (attempt ${attempt}/${maxRetries})`);
          
          const retryMessage = {
            id: Date.now(),
            text: `⏱️ Rate limited. Retrying in ${waitTime}s... (Attempt ${attempt}/${maxRetries})`,
            sender: 'bot',
            timestamp: new Date().toLocaleTimeString()
          };
          setMessages(prev => [...prev, retryMessage]);
          
          await new Promise(resolve => setTimeout(resolve, waitTime * 1000));
        } else {
          throw error;
        }
      }
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!input.trim() || !isApiReady || !model.current) {
      return;
    }

    // Rate limiting: 5 seconds between requests (free tier)
    const now = Date.now();
    const timeSinceLastRequest = now - lastRequestTime.current;
    const minimumDelay = 5000; // 5 seconds for free tier

    if (timeSinceLastRequest < minimumDelay) {
      const waitTime = Math.ceil((minimumDelay - timeSinceLastRequest) / 1000);
      setRateLimitWait(waitTime);
      
      const waitMessage = {
        id: Date.now(),
        text: `⏱️ Please wait ${waitTime}s before next message (rate limiting).`,
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString()
      };

      setMessages(prev => [...prev, waitMessage]);
      
      for (let i = waitTime; i > 0; i--) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setRateLimitWait(i - 1);
      }
      return;
    }

    lastRequestTime.current = now;

    // Add user message
    const userMessage = {
      id: Date.now(),
      text: input,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Generate response with retry logic
      const aiText = await generateWithRetry(input);

      const aiMessage = {
        id: Date.now() + 1,
        text: aiText,
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString()
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error generating response:', error);
      
      let errorText = '❌ Error: Failed to generate response.';
      
      if (error.message.includes('429')) {
        errorText = '⏱️ Rate limit exceeded. Free tier has strict limits:\n• Wait 5+ seconds between messages\n• Space out requests\n• Come back later\n\nTo increase limits, upgrade at: https://ai.google.dev/pricing';
      } else if (error.message.includes('401') || error.message.includes('UNAUTHENTICATED')) {
        errorText = '❌ Authentication failed. Check your API key in .env.local';
      } else if (error.message.includes('quota')) {
        errorText = '⚠️ Daily quota exceeded. Free tier has daily limits. Upgrade at: https://ai.google.dev/pricing';
      } else {
        errorText = '❌ Error: ' + (error.message || 'Failed to respond. Try again.');
      }
      
      const errorMessage = {
        id: Date.now() + 1,
        text: errorText,
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString()
      };

      setMessages(prev => [...prev, errorMessage]);
    } 
    finally {
      setIsLoading(false);
    }
  };

  // Clear chat
  const handleClearChat = () => {
    setMessages([{
      id: Date.now(),
      text: '👋 Chat cleared. Ask me anything!',
      sender: 'bot',
      timestamp: new Date().toLocaleTimeString()
    }]);
  };

  return (
    <div className="aisakura-container">
      <div className="aisakura-wrapper">
        <div className="aisakura-header">
          <h1>✨ AISakura AI Chat</h1>
          <p>Powered by Google Gemini 1.5 Flash (Free Tier)</p>
        </div>

        <div className="chat-box">
          <div className="messages">
            {messages.map((msg) => (
              <div key={msg.id} className={`message message-${msg.sender}`}>
                <div className="message-avatar">
                  {msg.sender === 'user' ? '👤' : '🤖'}
                </div>
                <div className="message-content">
                  <p className="message-text">{msg.text}</p>
                  <span className="message-time">{msg.timestamp}</span>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="message message-bot loading">
                <div className="message-avatar">🤖</div>
                <div className="message-content">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="input-form">
          <div className="input-wrapper">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask AISakura anything..."
              className="chat-input"
            />
            <button
              type="submit"
              disabled={!isApiReady || isLoading || !input.trim() || rateLimitWait > 0}
              className="send-btn"
              title={rateLimitWait > 0 ? `Wait ${rateLimitWait}s` : 'Send message'}
            >
              {isLoading ? '⏳' : rateLimitWait > 0 ? `⏱️${rateLimitWait}s` : 'Send'}
            </button>
            <button onClick={handleClearChat} className="clear-chat-btn">
                Clear Chat
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}