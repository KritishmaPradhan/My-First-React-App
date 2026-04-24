// import React, { useState } from 'react';
// import './AISakura.css';

// export default function AISakuraSimple() {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState('');

//   const handleSendMessage = () => {
//     if (!input.trim()) return;

//     const userMessage = {
//       id: Date.now(),
//       text: input,
//       sender: 'user',
//     };

//     setMessages((prev) => [...prev, userMessage]);

//     const botResponse = getBotResponse(input);
//     setMessages((prev) => [...prev, botResponse]);

//     setInput('');
//   };

//   const getBotResponse = (userInput) => {
//     let responseText = '';

//     if (userInput.toLowerCase().includes('hello!')) {
//       responseText = 'Hello! Get lost';
//     } else if (userInput.toLowerCase().includes('help')) {
//       responseText = 'NOOOOOoo, Idc';
//     } else if (userInput.toLowerCase().includes('describe')) {
//       responseText = 'Ask chatgpt claude not me';
//     }else if (userInput.toLowerCase().includes('bye')) {
//       responseText = 'chal pehli fursat mein nikall';
//     }else if (userInput.toLowerCase().includes('hi')) {
//       responseText = 'hi ! looser';
//     }else if (userInput.includes('answerMe')) {
//       responseText = 'answering you is not my job';
//     }else {
//       responseText = "I'm sorry, I don't understand that. Can you rephrase?";
//     }

//     return {
//       id: Date.now() + 1,
//       text: responseText,
//       sender: 'bot',
//     };
//   };

//   return (
//     <div className="aisakura-container">
//       <div className="aisakura-wrapper">
//         <div className="aisakura-header">
//           <h1>AISakura Chat</h1>
//           <p>Simple chatbot with predefined responses</p>
//         </div>

//         <div className="chat-box">
//           <div className="messages">
//             {messages.map((msg) => (
//               <div key={msg.id} className={`message message-${msg.sender}`}>
//                 <div className="message-avatar">
//                   {msg.sender === 'user' ? '👤' : '🤖'}
//                 </div>
//                 <div className="message-content">{msg.text}</div>
//               </div>
//             ))}
//             <div ref={(el) => el?.scrollIntoView({ behavior: 'smooth' })} />
//           </div>
//         </div>

//         <div className="input-form">
//           <input
//             type="text"
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             placeholder="Type your message..."
//             className="chat-input"
//           />
//           <button onClick={handleSendMessage} className="send-btn">
//             Send
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }