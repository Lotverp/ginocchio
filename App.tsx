
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { ProjectFile, ChatMessage } from './types';
import { architectService } from './services/geminiService';
import { GithubIcon, FolderIcon, FileIcon, SendIcon, LoadingIcon } from './components/Icons';

const App: React.FC = () => {
  const [files, setFiles] = useState<ProjectFile[]>([]);
  const [activeFileId, setActiveFileId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isInitializing, setIsInitializing] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  
  const chatEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = e.target.files;
    if (!uploadedFiles) return;

    const newFiles: ProjectFile[] = [];
    // Fixed: Explicitly typed the file parameter to resolve 'unknown' type errors and property access issues.
    const promises = Array.from(uploadedFiles).map((file: any) => {
      return new Promise<void>((resolve) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          const content = event.target?.result as string;
          const extension = file.name.split('.').pop() || 'text';
          newFiles.push({
            id: Math.random().toString(36).substr(2, 9),
            name: file.name,
            path: file.webkitRelativePath || file.name,
            content,
            language: extension
          });
          resolve();
        };
        reader.readAsText(file);
      });
    });

    Promise.all(promises).then(() => {
      setFiles(prev => [...prev, ...newFiles]);
      if (!activeFileId && newFiles.length > 0) {
        setActiveFileId(newFiles[0].id);
      }
    });
  };

  const handleStartProject = async () => {
    if (files.length === 0) return;
    setIsInitializing(true);
    try {
      await architectService.startSession(files);
      setHasStarted(true);
      setMessages([{
        role: 'model',
        text: "I've analyzed your project. I can see the structure and contents of the files you shared. What would you like to modify or build today?",
        timestamp: Date.now()
      }]);
    } catch (err) {
      console.error(err);
      alert("Failed to initialize Gemini. Ensure your API key is valid.");
    } finally {
      setIsInitializing(false);
    }
  };

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isTyping || !hasStarted) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage, timestamp: Date.now() }]);
    setIsTyping(true);

    try {
      let fullResponse = "";
      const messageObj: ChatMessage = { role: 'model', text: '', timestamp: Date.now() };
      setMessages(prev => [...prev, messageObj]);

      const stream = architectService.sendMessageStream(userMessage);
      for await (const chunk of stream) {
        fullResponse += chunk;
        setMessages(prev => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1].text = fullResponse;
          return newMessages;
        });
      }
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'model', text: "Sorry, I encountered an error processing that.", timestamp: Date.now() }]);
    } finally {
      setIsTyping(false);
    }
  };

  const activeFile = files.find(f => f.id === activeFileId);

  if (!hasStarted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 p-6">
        <div className="max-w-2xl w-full space-y-8 bg-slate-900 border border-slate-800 p-10 rounded-2xl shadow-2xl">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-4">
              <GithubIcon className="w-10 h-10 text-indigo-400" />
            </div>
            <h1 className="text-4xl font-bold text-white tracking-tight">Gemini Code Architect</h1>
            <p className="text-slate-400 text-lg">
              Share your <span className="text-indigo-400 font-semibold">lovable.dev</span> or GitHub source code. 
              Gemini will act as your senior partner to refactor, debug, and expand your vision.
            </p>
          </div>

          <div className="grid gap-6">
            <div className="relative group">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                multiple
                className="hidden"
                // @ts-ignore
                webkitdirectory=""
                directory=""
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full flex items-center justify-center gap-3 px-6 py-12 border-2 border-dashed border-slate-700 hover:border-indigo-500 rounded-xl bg-slate-800/50 transition-all group-hover:bg-slate-800"
              >
                <FolderIcon className="w-8 h-8 text-slate-500 group-hover:text-indigo-400" />
                <div className="text-left">
                  <div className="text-slate-200 font-medium">Select Project Folder</div>
                  <div className="text-slate-500 text-sm">Upload your source files to provide context</div>
                </div>
              </button>
            </div>

            {files.length > 0 && (
              <div className="bg-slate-950 rounded-lg p-4 max-h-48 overflow-y-auto border border-slate-800">
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Imported Files ({files.length})</div>
                <div className="space-y-1">
                  {files.slice(0, 50).map(f => (
                    <div key={f.id} className="text-sm text-slate-300 flex items-center gap-2">
                      <FileIcon className="w-3 h-3 text-slate-500" />
                      <span className="truncate">{f.path}</span>
                    </div>
                  ))}
                  {files.length > 50 && <div className="text-xs text-slate-500 italic">...and {files.length - 50} more files</div>}
                </div>
              </div>
            )}

            <button
              onClick={handleStartProject}
              disabled={files.length === 0 || isInitializing}
              className={`w-full py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-3 ${
                files.length > 0 
                ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/20' 
                : 'bg-slate-800 text-slate-500 cursor-not-allowed'
              }`}
            >
              {isInitializing ? (
                <>
                  <LoadingIcon className="w-6 h-6" />
                  Analyzing Repository...
                </>
              ) : (
                "Initialize Architecture Session"
              )}
            </button>
          </div>
          
          <p className="text-center text-slate-600 text-xs">
            No data is stored. Your project files are sent as context to Gemini 3 Pro.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-slate-950 text-slate-200 overflow-hidden">
      {/* Sidebar: File Explorer */}
      <aside className="w-72 border-r border-slate-800 flex flex-col bg-slate-900/50">
        <div className="p-4 border-b border-slate-800 flex items-center gap-3">
          <div className="p-2 bg-indigo-500/10 rounded-lg">
            <GithubIcon className="w-5 h-5 text-indigo-400" />
          </div>
          <h2 className="font-bold text-slate-100 truncate">Explorer</h2>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {files.map(file => (
            <button
              key={file.id}
              onClick={() => setActiveFileId(file.id)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm flex items-center gap-3 transition-colors ${
                activeFileId === file.id 
                ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' 
                : 'text-slate-400 hover:bg-slate-800'
              }`}
            >
              <FileIcon className="w-4 h-4" />
              <span className="truncate">{file.name}</span>
            </button>
          ))}
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative min-w-0">
        <header className="h-14 border-b border-slate-800 flex items-center px-6 bg-slate-900/30 backdrop-blur-md sticky top-0 z-10">
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <span>Project</span>
            <span>/</span>
            <span className="text-slate-100 font-medium">{activeFile?.path || "No file selected"}</span>
          </div>
        </header>

        <div className="flex-1 overflow-auto p-6 flex flex-col lg:flex-row gap-6">
          {/* Code Viewer */}
          <section className="flex-1 min-h-[500px] bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl flex flex-col">
            <div className="px-4 py-2 bg-slate-800/50 border-b border-slate-800 flex items-center justify-between">
              <span className="text-xs font-mono text-slate-500 uppercase tracking-widest">{activeFile?.language || 'plain'}</span>
            </div>
            <pre className="flex-1 p-6 overflow-auto code-font text-sm leading-relaxed text-slate-300">
              <code>{activeFile?.content || "// Select a file to view its content"}</code>
            </pre>
          </section>

          {/* AI Assistant Chat */}
          <section className="w-full lg:w-[450px] flex flex-col bg-slate-900 border border-slate-800 rounded-xl shadow-2xl overflow-hidden">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-800/30">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <h3 className="font-semibold text-sm">Gemini Architect</h3>
              </div>
              <span className="text-[10px] text-slate-500 uppercase tracking-tighter">Gemini-3-Pro</span>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] rounded-2xl p-4 text-sm ${
                    msg.role === 'user' 
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/20' 
                    : 'bg-slate-800 text-slate-300 border border-slate-700'
                  }`}>
                    <div className="whitespace-pre-wrap leading-relaxed">
                      {msg.text}
                      {msg.role === 'model' && msg.text === '' && (
                        <div className="flex gap-1 py-1">
                          <div className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce"></div>
                          <div className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce delay-100"></div>
                          <div className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce delay-200"></div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>

            <form onSubmit={handleSendMessage} className="p-4 border-t border-slate-800 bg-slate-900/80">
              <div className="relative group">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  placeholder="Ask for changes or analysis..."
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 resize-none h-24 transition-all"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  className="absolute bottom-3 right-3 p-2 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-700 rounded-lg text-white transition-all shadow-lg"
                >
                  {isTyping ? <LoadingIcon className="w-4 h-4" /> : <SendIcon className="w-4 h-4" />}
                </button>
              </div>
              <div className="mt-2 text-[10px] text-slate-500 text-center">
                Press Enter to send. Shift + Enter for new line.
              </div>
            </form>
          </section>
        </div>
      </main>
    </div>
  );
};

export default App;
