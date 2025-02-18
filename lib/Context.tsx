// import { createContext, ReactNode, useState } from "react";
// import run from "./Gemini";




// // Create the context with an appropriate type
// interface ContextValue {
//     Prevprompt: string[];
//     setPrevPrompt: React.Dispatch<React.SetStateAction<string[]>>;
//     onSend: (prompt: string) => Promise<void>;
//     loading: boolean;
//     setloading: React.Dispatch<React.SetStateAction<boolean>>;
//     showResult: boolean;
//     setShowResult: React.Dispatch<React.SetStateAction<boolean>>;
//     recentPrompt: string;
//     setrecentPrompt: React.Dispatch<React.SetStateAction<string>>;
//     input: string;
//     setinput: React.Dispatch<React.SetStateAction<string>>;
//     resultData: string;
//     setResultData: React.Dispatch<React.SetStateAction<string>>;
// }

// export const Context = createContext<ContextValue | null>(null);

// interface ContextProviderProps {
//   children: ReactNode;
// }

// const ContextProvider = ({ children }: ContextProviderProps) => {
//     const[input,setinput]=useState("") ;
//     const [recentPrompt,setrecentPrompt]=useState("");
//     const [Prevprompt, setPrevPrompt] = useState<string[]>([]);

//     const[showResult,setShowResult]=useState(false);
//     const[loading,setloading]=useState(false);
//     const[resultData,setResultData]=useState("");
    



    
    
//     const onSend = async()=>{
//       setPrevPrompt(prev=>[...prev,input]);
      
//         setResultData("");
//         setloading(true);
//         setShowResult(true);
//         setrecentPrompt(input);
//       const response= await  run(input);
//       setResultData(response);
//       setloading(false);
//       setinput("");


//     }


//   const contextValue: ContextValue = {
//     Prevprompt,
//     setPrevPrompt,
//     onSend,
//     resultData,
//     setResultData,
//     loading,
//     setloading,
//     showResult,
//     setShowResult,
//     recentPrompt,
//     setrecentPrompt,
//     input,
//     setinput

//   };

//   return (
//     <Context.Provider value={contextValue}>
//       {children}
//     </Context.Provider>
//   );
// };

// export default ContextProvider;









'use client';

import { createContext, useContext, ReactNode, useState } from 'react';
import run from './Gemini';

interface GeminiContextType {
  prevPrompts: string[];
  setPrevPrompts: React.Dispatch<React.SetStateAction<string[]>>;
  onSend: (prompt: string) => Promise<void>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  showResult: boolean;
  setShowResult: React.Dispatch<React.SetStateAction<boolean>>;
  recentPrompt: string;
  setRecentPrompt: React.Dispatch<React.SetStateAction<string>>;
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  resultData: string;
  setResultData: React.Dispatch<React.SetStateAction<string>>;
}

const GeminiContext = createContext<GeminiContextType | null>(null);

export const useGemini = () => {
  const context = useContext(GeminiContext);
  if (!context) {
    throw new Error('useGemini must be used within a GeminiProvider');
  }
  return context;
};

export function GeminiProvider({ children }: { children: ReactNode }) {
  const [input, setInput] = useState('');
  const [recentPrompt, setRecentPrompt] = useState('');
  const [prevPrompts, setPrevPrompts] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState('');

  const onSend = async (prompt: string) => {
    setPrevPrompts(prev => [...prev, prompt]);
    setResultData('');
    setLoading(true);
    setShowResult(true);
    setRecentPrompt(prompt);
    
    try {
      const response = await run(prompt); 
      setResultData(response);
    } catch (error) {
      console.error('Error:', error);
      setResultData('An error occurred while processing your request.');
    } finally {
      setLoading(false);
      setInput('');
    }
  };

  return (
    <GeminiContext.Provider
      value={{
        prevPrompts,
        setPrevPrompts,
        onSend,
        resultData,
        setResultData,
        loading,
        setLoading,
        showResult,
        setShowResult,
        recentPrompt,
        setRecentPrompt,
        input,
        setInput,
      }}
    >
      {children}
    </GeminiContext.Provider>
  );
}