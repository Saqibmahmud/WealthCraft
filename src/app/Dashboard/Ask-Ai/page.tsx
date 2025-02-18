'use client'
import { useGemini } from '../../../../lib/Context';
import { IoIosSend } from "react-icons/io";
import { RiRobot2Line } from "react-icons/ri";
import { FaUser } from "react-icons/fa";
import { BiMessageDetail } from "react-icons/bi";
import { FaLightbulb } from "react-icons/fa";
import { FaCode } from "react-icons/fa";
import { FaCompass } from "react-icons/fa";
import AsideDashboard from '../../../../Components/Aside_Dashbar/page';
import { useUser } from '@clerk/nextjs';
import { RiStockLine } from "react-icons/ri";
import { TbTax } from "react-icons/tb";

export default function Main() {
  const {
    onSend,
    showResult,
    input,
    setInput,
    recentPrompt,
    resultData,
    loading,
  } = useGemini();

  const {user}=useUser() ;

  const suggestionCards = [
    {
      text: 'Suggest best Stocks to invest',
      icon: <RiStockLine  className="w-6 h-6 text-black" />,
      gradient: 'from-blue-50 to-blue-100',
    },
    {
      text: 'Generate ideas for my new business',
      icon: <FaLightbulb className="w-6 h-6 text-yellow-500" />,
      gradient: 'from-yellow-50 to-yellow-100',
    },
    {
      text: 'Suggest some inestment tips',
      icon: <BiMessageDetail className="w-6 h-6 text-green-500" />,
      gradient: 'from-green-50 to-green-100',
    },
    {
      text: 'What is the tax rate of bangladesh',
      icon: <TbTax  className="w-6 h-6 text-purple-500" />,
      gradient: 'from-purple-50 to-purple-100',
    },
  ];

  // const handleKeyPress = (e:any) => {
  //   if (e.key === 'Enter' && !e.shiftKey) {
  //     e.preventDefault();
  //     onSend(input);
  //   }
  // };

  return (
<div className='flex bg-black'>
  <AsideDashboard/>


    <div className="max-w-full w-10/12 bg-gray-800">
    <h1 className='text-gray-400 font-bold text-3xl  text-center mt-4'>AI powered by Gemini</h1>
   
      <nav className="bg-white shadow-sm fixed top-0 left-0 right-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <RiRobot2Line className="w-8 h-8 text-blue-500" />
              <span className="text-xl font-semibold bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent">
                Gemini
              </span>
            </div>
          </div>
        </div>
      </nav>

      
      <main className="max-w-4xl mx-auto px-4 pt-20 pb-32">
        {!showResult ? (
          <>
            <div className="text-center my-12">
              <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-zinc-700 to-blue-700 bg-clip-text text-transparent">
                Hello, {user?.username}
              </h1>
              <p className="text-gray-600 text-xl">How can I help you today?</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
              {suggestionCards.map((card, index) => (
                <div
                  key={index}
                  className={`p-6 rounded-xl bg-gradient-to-br ${card.gradient} border border-white shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer`}
                  onClick={() => {
                    setInput(card.text);
                    onSend(card.text);
                  }}
                >
                  <div className="flex items-center justify-between">
                    <p className="text-gray-700  font-semibold">{card.text}</p>
                    {card.icon}
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="space-y-6">
           
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                <FaUser className="w-4 h-4 text-blue-500" />
              </div>
              <div className="flex-1 bg-slate-400 rounded-2xl p-4 shadow-sm">
                <p className="text-gray-700">{recentPrompt}</p>
              </div>
            </div>

         
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                <RiRobot2Line className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1 bg-slate-300 rounded-2xl p-4 shadow-sm">
                {loading ? (
                  <div className="flex space-x-2 justify-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-100" />
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-200" />
                  </div>
                ) : (
                  <div className="prose prose-blue max-w-none" dangerouslySetInnerHTML={{ __html: resultData }} />
                )}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Input Area */}
      <div className="fixed bottom-0 ml-6 left-24 right-0 bg-gradient-to-t from-gray-50 to-transparent pt-6">
        <div className="max-w-4xl mx-auto px-4 pb-6">
          <div className="bg-slate-200 rounded-xl shadow-lg border border-gray-200 ml-9 ">
            <div className="flex items-center p-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
             
                placeholder="Ask me anything..."
                className="flex-1 px-4 py-2 text-gray-700 placeholder-gray-400 bg-transparent focus:outline-none text-lg font-semibold"
              />
              <button
                onClick={() => onSend(input)}
                disabled={!input.trim() || loading}
                className={`p-2 rounded-lg ${
                  input.trim() && !loading
                    ? 'text-blue-500 hover:bg-blue-50'
                    : 'text-gray-400'
                } transition-colors duration-200`}
              >
                <IoIosSend className="w-6 h-6" />
              </button>
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-2 text-center">
            Gemini can provide inaccurate answers. Please verify sensitive information before sharing. -saqib
          </p>
        </div>
      </div>
    </div>
    </div>
  );
}