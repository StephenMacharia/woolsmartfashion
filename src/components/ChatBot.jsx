import React, { useState } from 'react';
import { FaComments, FaTimes } from 'react-icons/fa';

// Chatbot response pairs (improved regex patterns)
const pairs = [
    { pattern: /\b(hi|hello|hey)[\s\S]*$/i, responses: [
        "Hello! Welcome to WoolSmart Fashion. How can I assist you today?",
        "Hi there! Looking for something specific in fashion today?",
        "Hey! I'm Lana from WoolSmart. What can I help you with?"
    ]},
    { pattern: /how\s*are\s*you[\s\S]*$/i, responses: [
        "I'm doing great, thanks for asking! How can I help you with your shopping?",
        "I'm fantastic! Excited to help you find something fashionable.",
        "I’m well, and ready to help you shop smarter at WoolSmart!"
    ]},
    { pattern: /what\s*(products?|items?)\s*(do\s*you\s*have)?[\s\S]*$/i, responses: [
        "We offer dresses, shirts, shoes, handbags, and accessories. What are you looking for?",
        "Everything from elegant dresses to trendy sneakers. Would you like to explore a category?"
    ]},
    { pattern: /do\s*you\s*have\s*(shirts?|shoes?|dresses?|bags?|accessories?)?[\s\S]*$/i, responses: [
        "Yes, we have many options in that category. Would you like a recommendation?",
        "Absolutely! You can check that section on our site or tell me your size and preference!"
    ]},
    { pattern: /what\s*(material|fabric)\s*is\s*(this|it|[\w\s]+)?[\s\S]*$/i, responses: [
        "Our items are made from high-quality fabrics like cotton, silk, denim, and blends. Want help checking a specific product?",
        "Each product has material info in its description—need help finding it?"
    ]},
    { pattern: /what\s*sizes\s*are\s*available[\s\S]*$/i, responses: [
        "Sizes range from S to XXL for most items. Do you want me to show you size guides?",
        "We offer standard and plus sizes. Let me know the item for exact sizing."
    ]},
    { pattern: /how\s*much\s*is\s*[\s\S]*$/i, responses: [
        "All prices are listed next to the products. Would you like help checking one?",
        "Prices vary—can you share the name or category of the item you're asking about?"
    ]},
    { pattern: /how\s*do\s*i\s*pay[\s\S]*$/i, responses: [
        "You can pay with M-Pesa. Need help with checkout?",
        "Multiple options! Do you want help placing an order?"
    ]},
    { pattern: /do\s*you\s*accept\s*m[-\s]?pesa[\s\S]*$/i, responses: [
        "Yes, M-Pesa is fully supported. Want help completing a payment?"
    ]},
    { pattern: /how\s*long\s*(is|does)?\s*(delivery|shipping)[\s\S]*$/i, responses: [
        "2–5 business days in Kenya, longer for neighboring regions. Need express delivery?",
        "Standard shipping takes 2–5 days. Want tracking details?"
    ]},
    { pattern: /do\s*you\s*deliver[\s\S]*$/i, responses: [
        "Yes, we deliver across Kenya and East Africa! Can I get your location for more details?"
    ]},
    { pattern: /how\s*do\s*i\s*return[\s\S]*$/i, responses: [
        "You have 7 days to return. Just make sure the item is unused and in original packaging.",
        "Easy! Just contact support within 7 days and we’ll guide you through the return."
    ]},
    { pattern: /can\s*i\s*exchange[\s\S]*$/i, responses: [
        "Absolutely, within 7 days of delivery. What item would you like to exchange?",
        "Yes, exchanges are allowed. Do you have the receipt or order number?"
    ]},
    { pattern: /how\s*can\s*i\s*track\s*my\s*order[\s\S]*$/i, responses: [
        "We send a tracking link via email or SMS once your order ships.",
        "Track it using the link we send after dispatch. Need help finding it?"
    ]},
    { pattern: /are\s*there\s*(any\s*)?(discounts|offers|sales)[\s\S]*$/i, responses: [
        "Yes! Great deals are available on our homepage and social media.",
        "Definitely! Would you like to browse current deals?"
    ]},
    { pattern: /what\s*are\s*your\s*working\s*hours[\s\S]*$/i, responses: [
        "We’re online 24/7. Support is available 8 AM – 8 PM, Mon to Sat.",
        "Shopping is open always, but chat support runs till 8 PM. Need urgent help?"
    ]},
    { pattern: /where\s*is\s*your\s*store\s*located[\s\S]*$/i, responses: [
        "We’re online-first, based in Nakuru. Would you prefer to shop in person?"
    ]},
    { pattern: /how\s*can\s*i\s*contact\s*(you|support)[\s\S]*$/i, responses: [
        "Reach us at support@woolsmart.co.ke or +254 726333992. Want me to email support for you?"
    ]},
    { pattern: /(what\s*are\s*your|do\s*you\s*have)\s*social\s*media\s*(handles|accounts)?[\s\S]*$/i, responses: [
        "Yes! We’re @woolsmartfashion on Instagram, Facebook, and Twitter."
    ]},
    { pattern: /i\s*need\s*help[\s\S]*$/i, responses: [
        "Of course! Please let me know what you need help with.",
        "I'm here to assist! Are you looking for a product, order info, or something else?"
    ]},
    { pattern: /\b(i\s*love|nice|awesome|cool|great|beautiful|amazing)\s*(store|products|website|items)[\s\S]*$/i, responses: [
        "Thanks a lot! Your feedback means the world to us 😊",
        "Aww, thank you! We’re glad you love it 💕"
    ]},
    { pattern: /\b(bye|goodbye|see\s*you|later)[\s\S]*$/i, responses: [
        "Goodbye! Hope to see you again soon.",
        "Thanks for visiting WoolSmart. Stay stylish!"
    ]},
    { pattern: /[\s\S]*/, responses: [
        "Sorry, I'm not sure about that. Could you rephrase or be more specific?",
        "Hmm, I didn’t catch that. Could you try asking another way?"
    ]}
];

const ChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { sender: 'bot', text: 'Hello! How can we assist you today?' },
    ]);
    const [input, setInput] = useState('');

    const toggleChat = () => {
        setIsOpen(!isOpen);
    };

    const handleSend = () => {
        if (input.trim() === '') return;

        const cleanedInput = input.toLowerCase().replace(/\s+/g, ' ').trim();
        setMessages([...messages, { sender: 'user', text: input }]);
        setInput('');

        setTimeout(() => {
            const botResponse = getBotResponse(cleanedInput);
            setMessages((prev) => [...prev, { sender: 'bot', text: botResponse }]);
        }, 600);
    };

    const getBotResponse = (cleanedInput) => {
        for (const pair of pairs) {
            if (pair.pattern.test(cleanedInput)) {
                const responses = pair.responses;
                return responses[Math.floor(Math.random() * responses.length)];
            }
        }
        return "Sorry, I'm not sure about that. Could you rephrase?";
    };

    return (
        <div>
            {/* Chat Icon */}
            <div className="chat-icon" onClick={toggleChat}>
                {isOpen ? <FaTimes size={24} /> : <FaComments size={24} />}
            </div>

            {/* Chat Window */}
            {isOpen && (
                <div className="chat-window">
                    <div className="chat-header">WoolSmart Assistant</div>
                    <div className="chat-body">
                        {messages.map((msg, index) => (
                            <div key={index} className={`chat-message ${msg.sender}`}>
                                {msg.text}
                            </div>
                        ))}
                    </div>
                    <div className="chat-input">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                            placeholder="Type your message..."
                        />
                        <button onClick={handleSend}>Send</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChatBot;
