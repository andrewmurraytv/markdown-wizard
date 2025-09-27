-- Rename ip_address column to visitor_id for clarity and security
ALTER TABLE public.user_visits RENAME COLUMN ip_address TO visitor_id;

-- Update RLS policies to use the new column name
DROP POLICY IF EXISTS "Anonymous can insert visits" ON public.user_visits;
DROP POLICY IF EXISTS "Users can insert their own visits" ON public.user_visits;
DROP POLICY IF EXISTS "Users can view their own visits" ON public.user_visits;

-- Recreate policies with new column name
CREATE POLICY "Anonymous can insert visits" 
ON public.user_visits 
FOR INSERT 
WITH CHECK (user_id IS NULL);

CREATE POLICY "Users can insert their own visits" 
ON public.user_visits 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own visits" 
ON public.user_visits 
FOR SELECT 
USING (auth.uid() = user_id);