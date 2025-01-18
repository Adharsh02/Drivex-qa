import React, { useState } from 'react';
import { FileUpload } from './components/FileUpload';
import { Chat } from './components/Chat';
import { Brain, FileSpreadsheet, Table, HelpCircle } from 'lucide-react';
import { Message, DocumentData } from './types';
import { getAIResponse } from './utils/openai';
import { DataPreview } from './components/DataPreview';

function App() {
  const [document, setDocument] = useState<DocumentData | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'preview'>('chat');
  const [showTips, setShowTips] = useState(true);

  const handleFileProcess = (content: string, fileInfo: DocumentData) => {
    setDocument({ ...fileInfo, content });
    setMessages([{
      role: 'system',
      content: `You are an AI assistant analyzing an Excel document. Here's the content in JSON format: ${content}`
    }]);
  };

  const handleSendMessage = async (message: string) => {
    if (!document) return;

    const userMessage: Message = { role: 'user', content: message };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const aiResponse = await getAIResponse([...messages, userMessage]);
      setMessages(prev => [...prev, { role: 'assistant', content: aiResponse || 'Sorry, I could not process your request.' }]);
    } catch (error: any) {
      console.error('Chat error:', error);
      
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: error.message || 'An unexpected error occurred. Please try again later.'
      }]);

      // If it's a quota error, we might want to disable further requests
      if (error.message.includes('quota')) {
        setIsLoading(false);
        return;
      }
    } finally {
      setIsLoading(false);
    }
  };

  const suggestedQuestions = [
    "What is the total number of records?",
    "Can you summarize the data?",
    "What are the column names?",
    "Show me the highest value in the dataset"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Brain className="w-8 h-8 text-blue-500" />
              <h1 className="text-2xl font-bold text-gray-900">Smart Document Q&A</h1>
            </div>
            {document && (
              <button
                onClick={() => setShowTips(!showTips)}
                className="flex items-center space-x-2 text-sm text-blue-600 hover:text-blue-800"
              >
                <HelpCircle className="w-4 h-4" />
                <span>Tips</span>
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {!document ? (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
              <h2 className="text-xl font-semibold mb-4">Welcome to Smart Document Q&A</h2>
              <p className="text-gray-600 mb-4">
                Upload your Excel file and ask questions about your data. Our AI will help you analyze and understand your document.
              </p>
              <ul className="list-disc list-inside text-gray-600 mb-6">
                <li>Supports Excel files up to 30MB</li>
                <li>Get instant answers about your data</li>
                <li>View and analyze your data in different ways</li>
              </ul>
            </div>
            <FileUpload onFileProcess={handleFileProcess} />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1 space-y-4">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex items-center space-x-2 mb-4">
                  <FileSpreadsheet className="w-5 h-5 text-blue-500" />
                  <h2 className="text-lg font-semibold">Document Info</h2>
                </div>
                <div className="space-y-2 text-sm">
                  <p><span className="font-medium">Name:</span> {document.name}</p>
                  <p><span className="font-medium">Size:</span> {(document.size / 1024).toFixed(2)} KB</p>
                  <p><span className="font-medium">Type:</span> {document.type}</p>
                </div>
              </div>

              {showTips && (
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h3 className="font-semibold mb-3">Suggested Questions</h3>
                  <div className="space-y-2">
                    {suggestedQuestions.map((question, index) => (
                      <button
                        key={index}
                        onClick={() => handleSendMessage(question)}
                        className="w-full text-left p-2 text-sm text-gray-700 hover:bg-blue-50 rounded transition-colors"
                      >
                        {question}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <div className="lg:col-span-3 bg-white rounded-lg shadow-sm h-[600px]">
              <div className="border-b">
                <div className="flex">
                  <button
                    onClick={() => setActiveTab('chat')}
                    className={`px-4 py-2 font-medium ${
                      activeTab === 'chat'
                        ? 'text-blue-600 border-b-2 border-blue-600'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Chat
                  </button>
                  <button
                    onClick={() => setActiveTab('preview')}
                    className={`px-4 py-2 font-medium flex items-center space-x-2 ${
                      activeTab === 'preview'
                        ? 'text-blue-600 border-b-2 border-blue-600'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <Table className="w-4 h-4" />
                    <span>Data Preview</span>
                  </button>
                </div>
              </div>
              
              {activeTab === 'chat' ? (
                <Chat 
                  messages={messages.filter(m => m.role !== 'system')}
                  onSendMessage={handleSendMessage}
                  isLoading={isLoading}
                />
              ) : (
                <DataPreview data={document.content} />
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;