'use client';

import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { X, Zap, AlertTriangle, CheckCircle2, Brain, Cpu, Database, Shield, Sparkles } from 'lucide-react';

interface SymptomState {
  name: string;
  age: number | '';
  symptoms: string;
}

interface LoaderStep {
  id: number;
  title: string;
  description: string;
  duration: number;
  icon: React.ReactNode;
}

export default function SymptomChecker() {
  const [formData, setFormData] = useState<SymptomState>({
    name: '',
    age: '',
    symptoms: '',
  });
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  const loaderSteps: LoaderStep[] = [
    {
      id: 1,
      title: "Analyzing Symptoms",
      description: "Processing your symptom description and identifying key patterns",
      duration: 3000,
      icon: <Brain className="w-6 h-6" />
    },
    {
      id: 2,
      title: "Medical Database Search",
      description: "Cross-referencing with medical databases and clinical guidelines",
      duration: 4000,
      icon: <Database className="w-6 h-6" />
    },
    {
      id: 3,
      title: "AI Processing",
      description: "Generating personalized analysis using advanced AI models",
      duration: 4000,
      icon: <Cpu className="w-6 h-6" />
    },
    {
      id: 4,
      title: "Quality Check",
      description: "Verifying analysis accuracy and adding safety recommendations",
      duration: 2000,
      icon: <Shield className="w-6 h-6" />
    }
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'age' ? (value === '' ? '' : Math.max(0, parseInt(value) || 0)) : value,
    }));
  };

  const simulateLoaderSteps = async () => {
    setCurrentStep(0);
    setProgress(0);
    
    for (let i = 0; i < loaderSteps.length; i++) {
      setCurrentStep(i);
      
      // Calculate progress percentage
      const stepProgress = (i / loaderSteps.length) * 100;
      setProgress(stepProgress);
      
      // Animate progress bar for this step
      const stepDuration = loaderSteps[i].duration;
      const increment = (100 / loaderSteps.length) / (stepDuration / 100);
      
      const interval = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev + increment;
          return newProgress >= stepProgress + (100 / loaderSteps.length) 
            ? stepProgress + (100 / loaderSteps.length) 
            : newProgress;
        });
      }, 100);
      
      await new Promise(resolve => setTimeout(resolve, stepDuration));
      clearInterval(interval);
    }
    
    setProgress(100);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setCurrentStep(0);
    setProgress(0);

    if (!formData.name.trim() || !formData.age || !formData.symptoms.trim()) {
      setError('Please fill out all required fields.');
      setLoading(false);
      return;
    }

    const ageValue = Number(formData.age);
    if (ageValue < 0 || ageValue > 120) {
      setError('Please enter a valid age between 0 and 120.');
      setLoading(false);
      return;
    }

    try {
      // Start the loader animation
      simulateLoaderSteps();

      const response = await fetch('/api/check-symptoms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          age: ageValue,
          symptoms: formData.symptoms.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.error) {
        setError(data.error);
        setLoading(false);
      } else {
        setResult(data.result);
        // Wait for loader to complete (if it hasn't already)
        if (progress < 100) {
          // If API response is faster than loader, complete the loader quickly
          setCurrentStep(loaderSteps.length - 1);
          setProgress(100);
          await new Promise(resolve => setTimeout(resolve, 500));
        }
        setLoading(false);
        setShowResults(true);
      }
    } catch (err) {
      console.error('Fetch error:', err);
      setError(
        err instanceof Error 
          ? `Unable to analyze symptoms: ${err.message}`
          : 'A network error occurred. Please check your connection and try again.'
      );
      setLoading(false);
    }
  };

  const clearForm = () => {
    setFormData({ name: '', age: '', symptoms: '' });
    setResult(null);
    setError(null);
    setShowResults(false);
    setCurrentStep(0);
    setProgress(0);
  };

  const closeResults = () => {
    setShowResults(false);
  };

  const isFormValid = formData.name.trim() && formData.age !== '' && formData.symptoms.trim();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex flex-col items-center p-4 sm:p-8">
      {/* Header */}
      <header className="w-full max-w-4xl py-8 text-center">
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
            <Zap className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tight">
            AI Symptom Checker
          </h1>
        </div>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto mt-2">
          An <strong className="text-gray-900">educational tool</strong> for preliminary symptom analysis.{' '}
          <strong className="text-red-600">This is NOT a substitute for professional medical consultation.</strong>
        </p>
      </header>

      {/* Main Content */}
      <div className="w-full max-w-4xl">
        <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-10 border border-gray-200">
          <div className="mb-8">
            <h2 className="text-3xl font-black text-gray-900">Patient & Symptom Details</h2>
            <p className="text-gray-600 mt-2">Provide the required details to begin the analysis.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Name Input */}
              <div className="space-y-2 md:col-span-2">
                <label htmlFor="name" className="block text-sm font-semibold text-gray-800">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  className="w-full px-4 py-3 bg-white text-gray-900 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 disabled:bg-gray-100 disabled:text-gray-500 placeholder-gray-400"
                  placeholder="e.g., Alex J. Taylor"
                />
              </div>

              {/* Age Input */}
              <div className="space-y-2">
                <label htmlFor="age" className="block text-sm font-semibold text-gray-800">
                  Age *
                </label>
                <input
                  type="number"
                  name="age"
                  id="age"
                  value={formData.age}
                  onChange={handleChange}
                  required
                  min="0"
                  max="120"
                  disabled={loading}
                  className="w-full px-4 py-3 bg-white text-gray-900 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 disabled:bg-gray-100 disabled:text-gray-500 placeholder-gray-400 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  placeholder="25"
                />
              </div>
            </div>

            {/* Symptoms Textarea */}
            <div className="space-y-2">
              <label htmlFor="symptoms" className="block text-sm font-semibold text-gray-800">
                Symptoms Description *
              </label>
              <textarea
                name="symptoms"
                id="symptoms"
                rows={6}
                value={formData.symptoms}
                onChange={handleChange}
                required
                disabled={loading}
                placeholder="Describe your symptoms clearly. Include details like duration, severity, timing, and any factors that affect them. E.g., 'Fever of 101°F for 2 days, persistent dry cough, body aches, no sore throat. Symptoms worsen in the evening.'"
                className="w-full px-4 py-3 bg-white text-gray-900 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 resize-y min-h-[150px] disabled:bg-gray-100 disabled:text-gray-500 placeholder-gray-400"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                type="submit"
                disabled={loading || !isFormValid}
                className="flex-1 flex items-center justify-center gap-2 py-4 px-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold rounded-xl shadow-lg transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-blue-200 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-5 h-5" />
                    Start Analysis
                  </>
                )}
              </button>
              
              <button
                type="button"
                onClick={clearForm}
                disabled={loading}
                className="sm:w-32 px-6 py-4 bg-white border border-gray-300 hover:border-gray-400 disabled:border-gray-200 text-gray-700 hover:text-gray-900 disabled:text-gray-400 font-medium rounded-xl transition-all duration-200 disabled:bg-gray-100 hover:shadow-md disabled:cursor-not-allowed"
              >
                Clear
              </button>
            </div>
          </form>

          {/* Error Message */}
          {error && (
            <div className="mt-8 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3 shadow-md">
              <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-red-800">Analysis Failed</h3>
                <p className="text-red-700 mt-1 text-sm">{error}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Loading Popup */}
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full border border-gray-200">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white rounded-t-3xl">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-black">Analyzing Your Symptoms</h2>
                  <p className="text-blue-100 text-sm">This usually takes about 13 seconds</p>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="px-6 pt-6">
              <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex justify-between text-sm text-gray-600 mb-6">
                <span>Starting...</span>
                <span>{Math.round(progress)}%</span>
                <span>Complete</span>
              </div>
            </div>

            {/* Steps */}
            <div className="px-6 pb-6 space-y-4">
              {loaderSteps.map((step, index) => (
                <div
                  key={step.id}
                  className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-300 ${
                    index < currentStep
                      ? 'bg-green-50 border-green-200'
                      : index === currentStep
                      ? 'bg-blue-50 border-blue-300 shadow-sm'
                      : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <div
                    className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                      index < currentStep
                        ? 'bg-green-500 text-white'
                        : index === currentStep
                        ? 'bg-blue-500 text-white animate-pulse'
                        : 'bg-gray-300 text-gray-500'
                    }`}
                  >
                    {index < currentStep ? (
                      <CheckCircle2 className="w-6 h-6" />
                    ) : (
                      step.icon
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-semibold transition-colors ${
                      index <= currentStep ? 'text-gray-900' : 'text-gray-500'
                    }`}>
                      {step.title}
                    </h3>
                    <p className={`text-sm transition-colors ${
                      index <= currentStep ? 'text-gray-600' : 'text-gray-400'
                    }`}>
                      {step.description}
                    </p>
                  </div>
                  <div className="text-right">
                    {index < currentStep && (
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                    )}
                    {index === currentStep && (
                      <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Estimated Time */}
            <div className="px-6 pb-6 text-center">
              <p className="text-sm text-gray-500">
                Estimated time remaining: {Math.max(0, Math.round((100 - progress) * 0.13))} seconds
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Results Popup */}
      {showResults && result && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden border border-gray-200">
            {/* Popup Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black">Analysis Complete</h2>
                    <p className="text-blue-100 text-sm">Educational analysis for {formData.name}, {formData.age}</p>
                  </div>
                </div>
                <button
                  onClick={closeResults}
                  className="p-2 hover:bg-white/20 rounded-xl transition-colors duration-200"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Popup Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              {/* Medical Disclaimer */}
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl mb-6 shadow-inner">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div className="text-blue-800 text-sm font-medium">
                    <strong>Important:</strong> This is for informational and educational purposes only. Always consult a qualified healthcare professional for medical advice.
                  </div>
                </div>
              </div>

              {/* Analysis Results */}
              <div className="prose prose-lg max-w-none">
                <ReactMarkdown
                  components={{
                    h1: ({node, ...props}) => <h1 className="text-2xl font-black text-gray-900 mt-6 mb-4 border-b pb-2 border-gray-200" {...props} />,
                    h2: ({node, ...props}) => <h2 className="text-xl font-bold text-gray-800 mt-5 mb-3" {...props} />,
                    h3: ({node, ...props}) => <h3 className="text-lg font-semibold text-gray-700 mt-4 mb-2" {...props} />,
                    p: ({node, ...props}) => <p className="text-gray-700 leading-relaxed mb-4" {...props} />,
                    ul: ({node, ...props}) => <ul className="list-disc list-outside space-y-2 text-gray-700 mb-6 ml-5" {...props} />,
                    ol: ({node, ...props}) => <ol className="list-decimal list-outside space-y-2 text-gray-700 mb-6 ml-5" {...props} />,
                    li: ({node, ...props}) => <li className="pl-1 text-gray-700" {...props} />,
                    strong: ({node, ...props}) => <strong className="font-bold text-gray-900" {...props} />,
                    a: ({node, ...props}) => <a className="text-blue-600 hover:text-blue-800 underline font-medium" target="_blank" rel="noopener noreferrer" {...props} />,
                    blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-600 my-4" {...props} />,
                  }}
                >
                  {result}
                </ReactMarkdown>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-6 mt-6 border-t border-gray-200">
                <button
                  onClick={clearForm}
                  className="flex-1 py-3 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]"
                >
                  Start New Analysis
                </button>
                <button
                  onClick={closeResults}
                  className="px-6 py-3 bg-white border border-gray-300 text-gray-700 font-medium rounded-xl hover:border-gray-400 hover:shadow-md transition-all duration-200"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer Disclaimer */}
      <footer className="w-full max-w-4xl mt-16 text-center">
        <div className="p-6 bg-yellow-50 rounded-2xl shadow-lg border border-yellow-200">
          <div className="flex items-center justify-center gap-2 text-yellow-800 mb-2">
            <AlertTriangle className="w-5 h-5" />
            <strong className="font-black text-lg">OFFICIAL MEDICAL DISCLAIMER</strong>
          </div>
          <p className="text-sm text-gray-700 leading-relaxed">
            This tool is intended for educational purposes only. It is not designed to provide a diagnosis or substitute for professional medical advice, examination, diagnosis, or treatment. 
            <strong className="text-red-600"> If you have a medical emergency, immediately call your emergency service number.</strong> Always seek the advice of your doctor or other qualified health professional with any questions you may have regarding a medical condition.
          </p>
        </div>
      </footer>
    </div>
  );
}