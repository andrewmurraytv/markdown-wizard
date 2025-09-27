
import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from 'react-router-dom';

export const useVisitTracker = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isFirstVisit, setIsFirstVisit] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [shouldPromptSignup, setShouldPromptSignup] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  // Track input box clicks
  const trackInputClick = () => {
    const newClickCount = clickCount + 1;
    setClickCount(newClickCount);
    
    // After 3 clicks, prompt signup if not logged in
    if (newClickCount >= 3 && !user) {
      setShouldPromptSignup(true);
      // We'll redirect to auth after a short delay
      setTimeout(() => {
        navigate('/auth?tab=signup');
      }, 2000);
    }
  };

  useEffect(() => {
    const checkAndRecordVisit = async () => {
      setIsLoading(true);
      
      try {
        // Get visitor ID from local storage or create new one
        let visitorId = localStorage.getItem('visitor_id');
        if (!visitorId) {
          visitorId = crypto.randomUUID();
          localStorage.setItem('visitor_id', visitorId);
        }

        // Check for previous visits
        const { data: visits } = await supabase
          .from('user_visits')
          .select('*')
          .eq('visitor_id', visitorId);

        // Record this visit
        await supabase
          .from('user_visits')
          .insert({
            user_id: user?.id || null,
            visitor_id: visitorId,
            registered: !!user
          });

        // Set first visit status
        setIsFirstVisit(visits?.length === 0);
        
      } catch (error) {
        console.error('Error tracking visit:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAndRecordVisit();
  }, [user]);

  return { isFirstVisit, isLoading, shouldPromptSignup, trackInputClick };
};
