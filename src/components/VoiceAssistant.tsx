import { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Volume2, X, AlertCircle, CheckCircle, HelpCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { usePermissions } from './PermissionManager';
import { SecurityNotice } from './SecurityNotice';
import { PermissionDebug } from './PermissionDebug';
import { Screen } from '../App';

interface VoiceAssistantProps {
  onNavigate: (screen: Screen) => void;
}

export function VoiceAssistant({ onNavigate }: VoiceAssistantProps) {
  const { permissions, requestMicrophone, isHTTPS, checkSupport } = usePermissions();
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');
  const [showPanel, setShowPanel] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showSecurityNotice, setShowSecurityNotice] = useState(false);
  const [recognition, setRecognition] = useState<any>(null);
  const [justMounted, setJustMounted] = useState(true);

  const panelRef = useRef<HTMLDivElement>(null);

  const support = checkSupport();
  const permissionStatus = permissions.microphone;

  useEffect(() => {
    return () => {
      if (recognition) {
        recognition.stop();
      }
    };
  }, [recognition]);

  useEffect(() => {
    console.log('VoiceAssistant mounted');
    const timer = setTimeout(() => {
      setJustMounted(false);

    }, 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {

  }, [showPanel]);

  useEffect(() => {

  }, [isListening]);

  const startListening = async () => {
    console.log('Attempting to start voice recognition...');

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!support.microphone) {
      console.log('Voice recognition not supported');
      setErrorMessage('Voice recognition is not supported on this device. Please use the navigation buttons below.');
      setShowPanel(true);
      return;
    }

    if (!isHTTPS) {
      console.log('HTTPS required for voice recognition');
      setErrorMessage('Voice features require a secure connection (HTTPS). Please use the navigation buttons below.');
      setShowPanel(true);
      return;
    }

    setShowPanel(true);
    setErrorMessage('');

    if (permissionStatus !== 'granted') {
      console.log('Requesting microphone permission...');
      setErrorMessage('Requesting microphone permission. Please allow access when prompted.');

      const hasPermission = await requestMicrophone();
      if (!hasPermission) {
        console.log('Permission request failed, status:', permissionStatus);

        if (permissionStatus === 'denied') {
          setErrorMessage('Microphone access was denied. You can still use the quick action buttons below to navigate.');
          setShowSecurityNotice(true);
        } else if (permissionStatus === 'unavailable') {
          setErrorMessage('Microphone is not available on this device. Please use the navigation buttons below.');
        } else {
          setErrorMessage('Unable to access microphone. Please use the navigation buttons below.');
        }
        return;
      }
    }

    try {
      console.log('Starting speech recognition...');
      const newRecognition = new SpeechRecognition();
      newRecognition.continuous = false;
      newRecognition.interimResults = true;
      newRecognition.lang = 'en-IN';

      newRecognition.onstart = () => {
        console.log('Speech recognition started');
        setIsListening(true);
        setTranscript('');
        setResponse('');
        setErrorMessage('');
      };

      newRecognition.onresult = (event: any) => {
        const current = event.resultIndex;
        const transcriptText = event.results[current][0].transcript;
        console.log('Speech detected:', transcriptText);
        setTranscript(transcriptText);
      };

      newRecognition.onend = () => {
        console.log('Speech recognition ended');
        setIsListening(false);
        setRecognition(null);
        if (transcript && transcript.trim()) {
          processVoiceCommand(transcript);
        } else {
          setErrorMessage('No speech detected. Try speaking again or use the buttons below.');
        }
      };

      newRecognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        setRecognition(null);

        switch (event.error) {
          case 'not-allowed':
            setErrorMessage('Microphone access was denied. You can still use the quick action buttons below.');
            break;
          case 'no-speech':
            setErrorMessage('No speech detected. Please speak clearly or use the buttons below.');
            break;
          case 'audio-capture':
            setErrorMessage('Microphone error. Please check your device or use the buttons below.');
            break;
          case 'network':
            setErrorMessage('Network error. Please check your connection or use the buttons below.');
            break;
          case 'service-not-allowed':
            setErrorMessage('Speech service not available. Please use the navigation buttons below.');
            break;
          default:
            setErrorMessage(`Voice recognition error (${event.error}). Please use the navigation buttons below.`);
        }
      };

      setRecognition(newRecognition);
      newRecognition.start();
    } catch (error: any) {
      console.error('Failed to start speech recognition:', error);
      setErrorMessage('Voice recognition is not available. Please use the navigation buttons below.');
      setIsListening(false);
      setRecognition(null);
    }
  };

  const processVoiceCommand = (command: string) => {
    const lowerCommand = command.toLowerCase();
    let responseText = '';
    let action: Screen | null = null;

    if (lowerCommand.includes('disease') || lowerCommand.includes('bimari') || lowerCommand.includes('diagnose')) {
      responseText = 'Opening crop diagnosis. Please take a photo of your crop.';
      action = 'diagnosis';
    } else if (lowerCommand.includes('price') || lowerCommand.includes('market') || lowerCommand.includes('mandi') || lowerCommand.includes('bhav')) {
      responseText = 'Showing latest market prices for your crops.';
      action = 'market';
    } else if (lowerCommand.includes('quality') || lowerCommand.includes('grade') || lowerCommand.includes('gunvatta')) {
      responseText = 'Opening quality grading. Upload images of your harvest.';
      action = 'grading';
    } else if (lowerCommand.includes('remedy') || lowerCommand.includes('treatment') || lowerCommand.includes('ilaj') || lowerCommand.includes('davai')) {
      responseText = 'Opening remedies and treatment options.';
      action = 'remedies';
    } else if (lowerCommand.includes('history') || lowerCommand.includes('report')) {
      responseText = 'Showing your analysis history and reports.';
      action = 'history';
    } else if (lowerCommand.includes('home') || lowerCommand.includes('ghar')) {
      responseText = 'Going to home screen.';
      action = 'home';
    } else {
      responseText = 'I can help you with crop diagnosis, market prices, quality grading, remedies, or viewing reports. What would you like to do?';
    }

    setResponse(responseText);

    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(responseText);
      utterance.lang = 'en-IN';
      utterance.rate = 0.8;
      window.speechSynthesis.speak(utterance);
    }

    if (action) {
      setTimeout(() => {
        onNavigate(action);
        setShowPanel(false);
      }, 2000);
    }
  };

  const stopListening = () => {
    if (recognition) {
      recognition.stop();
    }
    setIsListening(false);
    setRecognition(null);
  };

  const openDeviceSettings = () => {
    setShowSecurityNotice(true);
  };

  const getPermissionIcon = () => {
    switch (permissionStatus) {
      case 'granted':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'denied':
        return <AlertCircle className="w-4 h-4 text-red-600" />;
      case 'requesting':
        return <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />;
      default:
        return <Mic className="w-4 h-4" />;
    }
  };

  console.log('VoiceAssistant rendering, support:', support, 'isHTTPS:', isHTTPS, 'permissions:', permissionStatus);

  return (
    <>
      {}
      {showPanel && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-2">
          <Card ref={panelRef} className="w-full max-w-xs sm:max-w-sm md:max-w-md max-h-[70vh] overflow-y-auto">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Volume2 className="w-5 h-5" />
                  Voice Assistant
                </CardTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowPanel(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 max-h-[70vh] overflow-y-auto">
              {}
              {(errorMessage || !support.microphone || !isHTTPS || permissionStatus === 'denied') && (
                <PermissionDebug />
              )}

              {}
              {!support.microphone && (
                <Alert className="py-2">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription className="text-xs">
                    Voice recognition not supported. Use buttons below.
                  </AlertDescription>
                </Alert>
              )}

              {!isHTTPS && (
                <Alert variant="destructive" className="py-2">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription className="text-xs">
                    Voice requires HTTPS. Use buttons below.
                  </AlertDescription>
                </Alert>
              )}

              {errorMessage && (
                <Alert variant="destructive" className="py-2">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription className="text-xs">{errorMessage}</AlertDescription>
                </Alert>
              )}

              {support.microphone && isHTTPS && (
                <>
                  <div className="text-center">
                    <div className={`w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-2 ${
                      isListening ? 'bg-red-500 animate-pulse' :
                      permissionStatus === 'granted' ? 'bg-primary' :
                      permissionStatus === 'denied' ? 'bg-destructive' : 'bg-muted'
                    }`}>
                      {isListening ? (
                        <MicOff className="w-6 h-6 md:w-8 md:h-8 text-white" />
                      ) : (
                        <Mic className="w-6 h-6 md:w-8 md:h-8 text-white" />
                      )}
                    </div>
                    <div className="flex items-center justify-center gap-1 mb-2">
                      {getPermissionIcon()}
                      <Badge variant={
                        isListening ? 'destructive' :
                        permissionStatus === 'granted' ? 'default' :
                        permissionStatus === 'denied' ? 'destructive' : 'secondary'
                      } className="text-xs">
                        {isListening ? 'Listening...' :
                         permissionStatus === 'granted' ? 'Ready' :
                         permissionStatus === 'denied' ? 'Denied' :
                         permissionStatus === 'requesting' ? 'Requesting...' :
                         'Tap to Enable'}
                      </Badge>
                    </div>
                  </div>

                  {transcript && (
                    <div className="bg-muted p-2 rounded-lg">
                      <p className="text-xs"><strong>You said:</strong> "{transcript}"</p>
                    </div>
                  )}

                  {response && (
                    <div className="bg-primary/10 p-2 rounded-lg">
                      <p className="text-xs"><strong>AI:</strong> {response}</p>
                    </div>
                  )}

                  {permissionStatus === 'granted' && !transcript && !response && (
                    <div className="text-xs text-muted-foreground text-center px-2">
                      <p>Try: "Check crop disease", "Show prices"</p>
                    </div>
                  )}

                  {isListening ? (
                    <Button
                      variant="destructive"
                      size="sm"
                      className="w-full android-ripple"
                      onClick={stopListening}
                    >
                      <MicOff className="w-4 h-4 mr-2" />
                      Stop
                    </Button>
                  ) : permissionStatus === 'denied' || permissionStatus === 'unavailable' ? (
                    <div className="space-y-1">
                      {permissionStatus === 'denied' && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full android-ripple"
                          onClick={() => requestMicrophone()}
                        >
                          <Mic className="w-4 h-4 mr-2" />
                          Try Again
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full android-ripple text-xs"
                        onClick={openDeviceSettings}
                      >
                        <HelpCircle className="w-4 h-4 mr-2" />
                        Enable Help
                      </Button>
                    </div>
                  ) : (
                    <Button
                      size="sm"
                      className="w-full android-ripple"
                      onClick={startListening}
                      disabled={permissionStatus === 'requesting'}
                    >
                      <Mic className="w-4 h-4 mr-2" />
                      {permissionStatus === 'requesting' ? 'Requesting...' : 'Start Voice'}
                    </Button>
                  )}
                </>
              )}

              {}
              <div className="border-t pt-3">
                <p className="text-xs text-muted-foreground text-center mb-2">
                  {!support.microphone || !isHTTPS || permissionStatus === 'denied' || permissionStatus === 'unavailable'
                    ? 'Quick navigation:'
                    : 'Or navigate:'}
                </p>
                <div className="grid grid-cols-2 gap-1.5">
                  <Button
                    variant="outline"
                    size="sm"
                    className="android-ripple touch-target text-xs h-8"
                    onClick={() => {
                      onNavigate('diagnosis' as Screen);
                      setShowPanel(false);
                    }}
                  >
                    Diagnose
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="android-ripple touch-target text-xs h-8"
                    onClick={() => {
                      onNavigate('market' as Screen);
                      setShowPanel(false);
                    }}
                  >
                    Prices
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="android-ripple touch-target text-xs h-8"
                    onClick={() => {
                      onNavigate('grading' as Screen);
                      setShowPanel(false);
                    }}
                  >
                    Quality
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="android-ripple touch-target text-xs h-8"
                    onClick={() => {
                      onNavigate('remedies' as Screen);
                      setShowPanel(false);
                    }}
                  >
                    Remedies
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="android-ripple touch-target text-xs h-8"
                    onClick={() => {
                      onNavigate('history' as Screen);
                      setShowPanel(false);
                    }}
                  >
                    History
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="android-ripple touch-target text-xs h-8"
                    onClick={() => {
                      onNavigate('home' as Screen);
                      setShowPanel(false);
                    }}
                  >
                    Home
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {}
      <div className={`
        fixed z-50 bottom-24 right-4 md:bottom-6 md:right-6 lg:bottom-8 lg:right-8 voice-assistant-button
        transition-all duration-500 ease-out
        ${justMounted ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}
      `}>
        <Button
          size="icon"
          className={`
            relative w-14 h-14 rounded-full shadow-xl android-ripple voice-assistant-button
            transition-all duration-200 hover:scale-105 active:scale-95
            ${isListening ? 'bg-red-500 hover:bg-red-600 animate-pulse' :
              !support.microphone || !isHTTPS ? 'bg-gray-500 hover:bg-gray-600' :
              permissionStatus === 'denied' || permissionStatus === 'unavailable' ? 'bg-orange-500 hover:bg-orange-600' :
              'bg-primary hover:bg-primary/90'
            }
            ${justMounted ? 'animate-bounce' : ''}
          `}
          onClick={isListening ? stopListening : () => setShowPanel(true)}
          title={
            isListening ? 'Stop Voice Recognition' :
            !support.microphone ? 'Voice Recognition Not Supported - Tap for Navigation' :
            !isHTTPS ? 'HTTPS Required for Voice Features - Tap for Navigation' :
            permissionStatus === 'denied' ? 'Microphone Permission Denied - Tap for Navigation' :
            permissionStatus === 'unavailable' ? 'Microphone Not Available - Tap for Navigation' :
            'Voice Assistant - Tap to Activate'
          }
        >
          {isListening ? (
            <MicOff className="w-6 h-6 text-white" />
          ) : !support.microphone || !isHTTPS ? (
            <Volume2 className="w-6 h-6 text-white" />
          ) : permissionStatus === 'denied' || permissionStatus === 'unavailable' ? (
            <AlertCircle className="w-6 h-6 text-white" />
          ) : (
            <Mic className="w-6 h-6 text-white" />
          )}

          {}
          {!isListening && (
            <div className={`
              absolute -top-1 -left-1 w-4 h-4 rounded-full border-2 border-white
              ${support.microphone && isHTTPS && permissionStatus === 'granted' ? 'bg-green-500' :
                permissionStatus === 'denied' || permissionStatus === 'unavailable' ? 'bg-red-500' :
                'bg-yellow-500'
              }
            `} />
          )}
        </Button>

      </div>

      {}
      {showSecurityNotice && (
        <SecurityNotice
          type="microphone"
          onClose={() => setShowSecurityNotice(false)}
          isHTTPS={isHTTPS}
        />
      )}
    </>
  );
}
