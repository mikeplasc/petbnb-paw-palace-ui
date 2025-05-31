
import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { X, Send, MessageCircle, Minimize2 } from 'lucide-react';
import { Message, sendMessage } from '@/services/messageService';

interface ChatWidgetProps {
  isOpen: boolean;
  onClose: () => void;
  initialHostId?: string;
  initialHostName?: string;
  initialMessage?: string;
}

const ChatWidget = ({ 
  isOpen, 
  onClose, 
  initialHostId, 
  initialHostName, 
  initialMessage 
}: ChatWidgetProps) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialHostId && initialHostName && initialMessage) {
      const message = sendMessage(initialHostId, initialHostName, initialMessage);
      setMessages([message]);
    }
  }, [initialHostId, initialHostName, initialMessage]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !initialHostId || !initialHostName) return;

    setIsLoading(true);
    try {
      const message = sendMessage(initialHostId, initialHostName, newMessage);
      setMessages(prev => [...prev, message]);
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Card className={`w-80 shadow-lg transition-all duration-300 ${
        isMinimized ? 'h-14' : 'h-96'
      }`}>
        <CardHeader className="p-3 bg-primary text-primary-foreground cursor-pointer" 
                   onClick={() => setIsMinimized(!isMinimized)}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <MessageCircle className="w-5 h-5" />
              <CardTitle className="text-sm">
                {initialHostName ? `Chat con ${initialHostName}` : 'Chat de ayuda'}
              </CardTitle>
            </div>
            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsMinimized(!isMinimized);
                }}
                className="text-primary-foreground hover:bg-primary-600 p-1 h-auto"
              >
                <Minimize2 className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                }}
                className="text-primary-foreground hover:bg-primary-600 p-1 h-auto"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        {!isMinimized && (
          <CardContent className="p-0 flex flex-col h-80">
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-3 space-y-3">
              {messages.length === 0 ? (
                <div className="text-center text-gray-500 text-sm">
                  No hay mensajes aún. ¡Envía tu primer mensaje!
                </div>
              ) : (
                messages.map((message) => (
                  <div key={message.id} className="space-y-2">
                    {/* User message */}
                    <div className="flex justify-end">
                      <div className="bg-primary text-primary-foreground rounded-lg p-2 max-w-[80%] text-sm">
                        {message.message}
                      </div>
                    </div>
                    
                    {/* Host response */}
                    <div className="flex justify-start">
                      <div className="bg-gray-100 text-gray-900 rounded-lg p-2 max-w-[80%] text-sm">
                        <div className="flex items-center space-x-1 mb-1">
                          <Badge variant="secondary" className="text-xs">
                            {message.hostName}
                          </Badge>
                        </div>
                        {message.response}
                      </div>
                    </div>
                  </div>
                ))
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-3 border-t">
              <div className="flex space-x-2">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Escribe tu mensaje..."
                  disabled={isLoading}
                  className="flex-1 text-sm"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={isLoading || !newMessage.trim()}
                  size="sm"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
};

export default ChatWidget;
