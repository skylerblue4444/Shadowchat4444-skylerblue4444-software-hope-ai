/**
 * useHopeAI Hook
 * Manages Hope AI voice commands, parsing, and execution
 */
import { useState, useCallback } from "react";
import { trpc } from "@/lib/trpc";
import { useLocation } from "wouter";

export function useHopeAI() {
  const [, setLocation] = useLocation();
  const [isListening, setIsListening] = useState(false);
  const [lastCommand, setLastCommand] = useState("");
  const [response, setResponse] = useState("");

  const parseVoice = trpc.hopeAiVoiceNav.parseVoice.useMutation();
  const executeCommand = trpc.hopeAiVoiceNav.executeCommand.useMutation();
  const catalog = trpc.hopeAiVoiceNav.actionCatalog.useQuery();

  const processCommand = useCallback(
    async (transcript: string) => {
      setLastCommand(transcript);
      try {
        const parsed = await parseVoice.mutateAsync({ transcript });
        setResponse((parsed as any).spokenResponse);
        
        if (!(parsed as any).requiresConfirmation) {
          await executeCommand.mutateAsync({
            intent: (parsed as any).intent,
            payload: (parsed as any).payload,
            confirmed: false,
            displayCards: (parsed as any).displayCards ?? [],
          });
          
          if ((parsed as any).payload?.path) {
            setTimeout(() => setLocation((parsed as any).payload.path), 300);
          }
        }
      } catch (err) {
        setResponse(`Error: ${err instanceof Error ? err.message : "Unknown error"}`);
      }
    },
    [parseVoice, executeCommand, setLocation]
  );

  return {
    isListening,
    setIsListening,
    lastCommand,
    response,
    processCommand,
    catalog: catalog.data ?? [],
    isBusy: parseVoice.isPending || executeCommand.isPending,
  };
}

export function useHopeAIActionCatalog() {
  const query = trpc.hopeAiVoiceNav.actionCatalog.useQuery(undefined, {
    staleTime: 1000 * 60 * 30,
  });
  return { actions: query.data ?? [], loading: query.isLoading };
}
