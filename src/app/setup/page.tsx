'use client';
import { useState, useRef, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Edit2, Upload, ChevronLeft, Trash2, Loader2 } from 'lucide-react';
import Header from '@/components/Header';
import BackButton from '@/components/BackButton';

// --- 1. DATA TYPES & STRUCTURES ---

interface LearnerProfile {
  name: string;
  role: string;
  domain: string;
  techStack: string[];
}

type QuestionType = 'radio';

interface Question {
  id: string;
  type: QuestionType;
  text: string;
  options: string[];
}

const QUESTIONS_DATA: Record<'domain' | 'technical', Question[]> = {
  domain: [
    {
      id: 'd1',
      type: 'radio',
      text: 'Do you face significant regulatory compliance challenges in your current project?',
      options: ['Yes', 'No']
    },
    {
      id: 'd2',
      type: 'radio',
      text: 'Which specific sub-domain represents your primary focus area?',
      options: ['Retail Banking', 'Capital Markets', 'Wealth Management', 'Insurance']
    }
  ],
  technical: [
    {
      id: 't1',
      type: 'radio',
      text: 'Are there critical latency bottlenecks in your current architecture?',
      options: ['Yes', 'No']
    },
    {
      id: 't2',
      type: 'radio',
      text: 'Which deployment environment matches your target production setup?',
      options: ['AWS (EKS)', 'Azure (AKS)', 'Google Cloud (GKE)', 'On-Premise (OpenShift)']
    }
  ]
};

interface QA_Pair {
  id: string;
  question: string;
  answer: string;
  category: 'domain' | 'technical';
}

interface UserContextData {
  profile: LearnerProfile;
  submissionType: 'file_upload' | 'manual_qa';
  data: {
    fileContent?: string;
    qa_pairs?: QA_Pair[];
  };
  timestamp: string;
}

// --- 2. MAIN COMPONENT ---

export default function SetupPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#2b2b2b]" />}>
      <IntegratedSetup />
    </Suspense>
  );
}

function IntegratedSetup() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const mode = searchParams.get('mode');

  // State
  const [step, setStep] = useState(mode === 'continue' ? 0 : 1);
  const [activeTab, setActiveTab] = useState<'domain' | 'technical'>('domain');
  
  // Profile State
  const [learnerProfile, setLearnerProfile] = useState<LearnerProfile | null>(null);
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);

  // File State
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileContent, setFileContent] = useState<string | null>(null);
  
  // Q&A State
  const [answers, setAnswers] = useState<Record<string, string>>({});
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Derived Values
  const currentQuestions = QUESTIONS_DATA[activeTab];
  const totalQuestions = currentQuestions.length;
  const activeQuestion = currentQuestions[step - 1];

  const isYesNo = activeQuestion?.options.length === 2 && 
                  activeQuestion.options.includes('Yes') && 
                  activeQuestion.options.includes('No');

  // --- 3. MOCK API FETCH ---
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setIsLoadingProfile(true);
        await new Promise(resolve => setTimeout(resolve, 800));
        setLearnerProfile({
          name: 'Rajan V. Sahatrabudhe',
          role: 'Backend Developer',
          domain: 'BFS',
          techStack: ['Java', 'Spring', 'Kafka']
        });
      } catch (error) {
        console.error("Failed to fetch profile", error);
      } finally {
        setIsLoadingProfile(false);
      }
    };
    fetchProfile();
  }, []);

  // --- 4. HANDLERS ---
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== 'text/plain') {
        alert('Please upload a valid .txt file');
        return;
      }
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (event) => setFileContent(event.target?.result as string);
      reader.readAsText(file);
    }
  };

  const handleClearFile = () => {
    setFileName(null);
    setFileContent(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleAnswerChange = (val: string) => {
    if (!activeQuestion) return;
    setAnswers(prev => ({ ...prev, [activeQuestion.id]: val }));
  };

  // --- Scenario A: Continue with File (REDIRECT TO SESSION START) ---
  const handleContinueWithFile = () => {
    if (!fileContent || !learnerProfile) return;
    const payload: UserContextData = {
      profile: learnerProfile,
      submissionType: 'file_upload',
      data: { fileContent: fileContent },
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('techguru_context', JSON.stringify(payload));
    // REDIRECT DIRECTLY TO SESSION START
    router.push('/session/start');
  };

  // --- Scenario B: Save Manual Q&A (REDIRECT TO SESSION START) ---
  const handleSaveAnswers = () => {
    if (!learnerProfile) return;
    const formattedPairs: QA_Pair[] = [];
    (['domain', 'technical'] as const).forEach(cat => {
      QUESTIONS_DATA[cat].forEach(q => {
        if (answers[q.id]) {
          formattedPairs.push({
            id: q.id,
            question: q.text,
            answer: answers[q.id],
            category: cat
          });
        }
      });
    });
    const payload: UserContextData = {
      profile: learnerProfile,
      submissionType: 'manual_qa',
      data: { qa_pairs: formattedPairs },
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('techguru_context', JSON.stringify(payload));
    // REDIRECT DIRECTLY TO SESSION START
    router.push('/session/start');
  };

  const handleTabSwitch = (tab: 'domain' | 'technical') => {
    setActiveTab(tab);
    setStep(1);
  };

  const handleNext = () => {
    if (step < totalQuestions) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className="min-h-screen bg-[#2b2b2b] text-white flex flex-col font-source-sans">
      <Header />

      <div className="pt-24 px-8 pb-12 flex-grow flex flex-col">
        <BackButton />

        <main className="flex-grow w-full max-w-3xl mx-auto">
          <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">
            CONTEXT SETUP
          </div>

          {/* 1. DYNAMIC PROFILE SECTION */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Learner profile</h2>
            <div className="bg-[#3a3a3a] rounded-lg p-6 relative shadow-lg border border-white/5 min-h-[160px]">
              {isLoadingProfile ? (
                <div className="animate-pulse flex flex-col h-full justify-center">
                  <div className="h-6 bg-gray-600 rounded w-1/3 mb-4"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-600 rounded w-1/4"></div>
                    <div className="h-4 bg-gray-600 rounded w-1/4"></div>
                  </div>
                  <div className="absolute top-6 right-6">
                    <Loader2 className="animate-spin text-gray-400" size={18} />
                  </div>
                </div>
              ) : learnerProfile ? (
                <>
                  <button className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors cursor-pointer">
                    <Edit2 size={18} />
                  </button>
                  <h3 className="text-lg font-bold text-white mb-4">{learnerProfile.name}</h3>
                  <div className="grid grid-cols-[120px_1fr] gap-y-1 text-sm">
                    <div className="text-[#9ca3af]">Role:</div><div>{learnerProfile.role}</div>
                    <div className="text-[#9ca3af]">Domain:</div><div>{learnerProfile.domain}</div>
                    <div className="text-[#9ca3af]">Tech Stack:</div><div>{learnerProfile.techStack.join(', ')}</div>
                  </div>
                </>
              ) : (
                <div className="text-red-400">Failed to load profile.</div>
              )}
            </div>
          </section>

          {/* 2. UPLOAD SECTION */}
          {step === 0 && (
            <section className="animate-in fade-in duration-500">
              <h2 className="text-2xl font-semibold mb-4">Upload summary report</h2>
              <div className="bg-[#3a3a3a] rounded-md flex items-center justify-between p-1 pl-4 border border-white/5 mb-8">
                <span className="text-sm text-gray-400 truncate pr-4">{fileName || 'Browse (.txt only)'}</span>
                <input type="file" accept=".txt" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
                {fileName ? (
                  <button onClick={handleClearFile} className="bg-red-500/10 hover:bg-red-500/20 text-red-500 flex items-center justify-center w-10 h-10 rounded-md transition-all cursor-pointer" title="Remove file">
                    <Trash2 size={18} />
                  </button>
                ) : (
                  <button onClick={() => fileInputRef.current?.click()} className="bg-[#3b46ff] hover:bg-blue-600 text-white flex items-center gap-2 px-8 py-2 rounded-md text-sm font-medium transition-all cursor-pointer shadow-lg">
                    Upload <Upload size={16} />
                  </button>
                )}
              </div>
              <div className="flex justify-end">
                <button 
                  onClick={handleContinueWithFile}
                  disabled={!fileName || isLoadingProfile}
                  className={`px-8 py-3 rounded-full font-medium transition-all text-center text-sm ${fileName && !isLoadingProfile ? 'bg-[#3b46ff] text-white btn-glow cursor-pointer' : 'bg-[#1f1f1f] text-gray-600 cursor-not-allowed border border-white/5'}`}
                >
                  Continue Previous Session
                </button>
              </div>
            </section>
          )}

          {/* 3. QUESTIONS SECTION */}
          {step > 0 && activeQuestion && (
            <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-semibold text-white">Questions</h2>
                <div className="bg-[#1f1f1f] rounded-[4px] p-[2px] flex">
                  {(['domain', 'technical'] as const).map((tab) => (
                    <button 
                      key={tab}
                      onClick={() => handleTabSwitch(tab)}
                      className={`px-6 py-1.5 text-sm rounded-[4px] transition-all cursor-pointer capitalize ${activeTab === tab ? 'bg-[#3b46ff] text-white' : 'text-[#9ca3af] hover:text-white'}`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              <div className="border border-[#4a4a4a] rounded-lg p-8 md:p-12 min-h-[350px] flex flex-col relative bg-[#2b2b2b] shadow-xl">
                <div key={activeQuestion.id} className="animate-in fade-in duration-300">
                  <p className="text-lg text-gray-200 leading-relaxed font-light mb-10">
                    {activeQuestion.text}
                  </p>

                  {/* LOGIC TO RENDER BUTTONS VS LIST */}
                  {isYesNo ? (
                    /* IMAGE-MATCHING YES/NO BUTTONS */
                    <div className="flex flex-row gap-6 max-w-md">
                      {activeQuestion.options.map((option) => {
                        const isSelected = answers[activeQuestion.id] === option;
                        return (
                          <label 
                            key={option} 
                            className={`flex-1 flex items-center justify-center py-3 rounded-full cursor-pointer transition-all border-2
                              ${isSelected 
                                ? 'bg-[#3b46ff] border-[#3b46ff] text-white shadow-[0_0_15px_rgba(59,70,255,0.4)]' 
                                : 'bg-transparent border-gray-600 text-gray-300 hover:border-white hover:text-white'
                              }`}
                          >
                            <input 
                              type="radio" 
                              name={activeQuestion.id} 
                              value={option}
                              checked={isSelected}
                              onChange={(e) => handleAnswerChange(e.target.value)}
                              className="hidden"
                            />
                            <span className="font-medium text-sm tracking-wide">{option}</span>
                          </label>
                        );
                      })}
                    </div>
                  ) : (
                    /* VERTICAL LIST LAYOUT (Standard Radio) */
                    <div className="flex flex-col gap-6">
                      {activeQuestion.options.map((option, idx) => (
                        <label key={idx} className="flex items-start gap-4 cursor-pointer group">
                          <div className="relative flex items-center justify-center mt-1">
                            <input 
                              type="radio" 
                              name={activeQuestion.id} 
                              value={option}
                              checked={answers[activeQuestion.id] === option}
                              onChange={(e) => handleAnswerChange(e.target.value)}
                              className="peer appearance-none w-5 h-5 border-2 border-gray-500 rounded-full checked:border-white transition-all" 
                            />
                            <div className="absolute w-2.5 h-2.5 bg-white rounded-full opacity-0 peer-checked:opacity-100 transition-opacity"></div>
                          </div>
                          <span className="text-gray-400 group-hover:text-white transition-colors font-light text-sm pt-0.5">
                            {option}
                          </span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between mt-10">
                <button 
                  onClick={handleBack}
                  disabled={step === 1}
                  className={`flex items-center gap-2 font-medium transition-colors ${step === 1 ? 'text-gray-600 cursor-not-allowed' : 'text-white hover:text-gray-300 cursor-pointer'}`}
                >
                  <ChevronLeft size={20} /> Previous
                </button>
                <div className="text-white font-medium tracking-widest text-sm">{step} / {totalQuestions}</div>
                {step < totalQuestions ? (
                  <button onClick={handleNext} className="bg-[#3b46ff] hover:bg-blue-600 text-white font-medium px-10 py-2 rounded-full transition-all shadow-lg cursor-pointer">
                    Next
                  </button>
                ) : (
                  <button onClick={handleSaveAnswers} disabled={isLoadingProfile} className="bg-[#3b46ff] hover:bg-blue-600 text-white font-medium px-10 py-2 rounded-full transition-all btn-glow text-center cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
                    Save
                  </button>
                )}
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}