
import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from 'react-router-dom';

export const useVisitTracker = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isFirstVisit, setIsFirstVisit] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

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
          .eq('ip_address', visitorId);

        // Record this visit
        await supabase.from('user_visits').insert({
          user_id: user?.id || null,
          ip_address: visitorId,
          registered: !!user
        });

        // If this is not the first visit and user is not authenticated, redirect to auth page
        if (visits && visits.length > 0 && !user) {
          setIsFirstVisit(false);
          // We'll redirect to auth after a short delay to allow the UI to render
          setTimeout(() => navigate('/auth'), 1000);
        } else {
          setIsFirstVisit(visits?.length === 0);
        }
      } catch (error) {
        console.error('Error tracking visit:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAndRecordVisit();
  }, [user, navigate]);

  return { isFirstVisit, isLoading };
};
