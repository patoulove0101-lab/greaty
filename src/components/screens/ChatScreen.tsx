import React, { useState } from 'react';
import { Send, Sparkles, ArrowRight } from 'lucide-react';
import { ChatMessage, Product, ScreenId } from '../../types';

interface ChatScreenProps {
  messages: ChatMessage[];
  onSendMessage: (text: string) => void;
  onSelectProduct: (product: Product) => void;
  onNavigate: (screen: ScreenId) => void;
}

export const ChatScreen: React.FC<ChatScreenProps> = ({
  messages,
  onSendMessage,
  onSelectProduct,
}) => {
  const [inputText, setInputText] = useState('');

  const quickPrompts = [
    'Are custom glazes available?',
    'What is the international delivery timeframe?',
    'How do I care for untreated stoneware?',
    'Can I request gift packaging?',
  ];

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    onSendMessage(inputText.trim());
    setInputText('');
  };

  const handlePromptClick = (prompt: string) => {
    onSendMessage(prompt);
  };

  return (
    <div className="flex-1 flex flex-col text-stone-900 dark:text-stone-100">
      {/* Concierge Header */}
      <div className="px-5 py-3 border-b border-stone-200 dark:border-stone-800 bg-stone-50/80 dark:bg-stone-950/80 backdrop-blur-md flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-stone-800 text-stone-100 flex items-center justify-center font-serif text-sm">
            K
          </div>
          <div>
            <h3 className="text-xs font-semibold leading-tight">Atelier Concierge</h3>
            <p className="text-[11px] text-stone-500">Kyoto & Milan Craft Desk</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span>Active</span>
        </div>
      </div>

      {/* Messages Thread */}
      <div className="flex-1 p-4 space-y-3 overflow-y-auto">
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs leading-relaxed ${
                  isUser
                    ? 'bg-stone-900 text-stone-100 dark:bg-stone-100 dark:text-stone-900 rounded-br-none'
                    : 'bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200 border border-stone-200 dark:border-stone-800 rounded-bl-none shadow-sm'
                }`}
              >
                {msg.text}

                {/* If there's an attached product suggestion */}
                {msg.suggestedProduct && (
                  <div
                    onClick={() => onSelectProduct(msg.suggestedProduct!)}
                    className="mt-3 pt-2.5 border-t border-stone-200 dark:border-stone-800 flex items-center gap-2.5 cursor-pointer hover:opacity-80 transition"
                  >
                    <img
                      src={msg.suggestedProduct.image}
                      alt={msg.suggestedProduct.name}
                      className="w-10 h-10 rounded-lg object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-[11px] font-semibold truncate">
                        {msg.suggestedProduct.name}
                      </div>
                      <div className="text-[10px] text-stone-500 tabular-nums">
                        ${msg.suggestedProduct.price}.00
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-stone-400" />
                  </div>
                )}
              </div>
              <span className="text-[10px] text-stone-400 mt-1 px-1">{msg.timestamp}</span>
            </div>
          );
        })}
      </div>

      {/* Quick Prompts Bar */}
      <div className="px-4 py-2 bg-stone-100/50 dark:bg-stone-900/50 border-t border-stone-200/60 dark:border-stone-800 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
        <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0" />
        {quickPrompts.map((qp, idx) => (
          <button
            key={idx}
            onClick={() => handlePromptClick(qp)}
            className="text-[11px] whitespace-nowrap px-2.5 py-1 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-full text-stone-600 dark:text-stone-300 hover:text-stone-900 transition"
          >
            {qp}
          </button>
        ))}
      </div>

      {/* Message Input Bar */}
      <form
        onSubmit={handleSend}
        className="p-3 bg-white dark:bg-stone-950 border-t border-stone-200 dark:border-stone-800 flex items-center gap-2"
      >
        <input
          type="text"
          placeholder="Type an atelier question..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="flex-1 px-3.5 py-2 bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl text-xs placeholder:text-stone-400 focus:outline-none focus:ring-1 focus:ring-stone-600"
        />
        <button
          type="submit"
          disabled={!inputText.trim()}
          className="w-9 h-9 rounded-xl bg-stone-900 text-stone-100 dark:bg-stone-100 dark:text-stone-900 flex items-center justify-center hover:bg-stone-800 transition disabled:opacity-30 shrink-0"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
