import { z } from 'zod';

// Input validation schemas
export const conversionInputSchema = z.object({
  text: z.string().max(100000, 'Input text too large (max 100KB)'),
  direction: z.enum(['markdown-to-rich', 'rich-to-markdown']),
  removeCitations: z.boolean().optional(),
  plainFormatting: z.boolean().optional()
});

// Rate limiting for conversion operations
class RateLimiter {
  private requests: Map<string, number[]> = new Map();
  private readonly maxRequests = 50; // per minute
  private readonly windowMs = 60000; // 1 minute

  isAllowed(identifier: string = 'default'): boolean {
    const now = Date.now();
    const windowStart = now - this.windowMs;
    
    // Get existing requests for this identifier
    const userRequests = this.requests.get(identifier) || [];
    
    // Remove old requests outside the window
    const recentRequests = userRequests.filter(time => time > windowStart);
    
    // Check if under limit
    if (recentRequests.length >= this.maxRequests) {
      return false;
    }
    
    // Add current request
    recentRequests.push(now);
    this.requests.set(identifier, recentRequests);
    
    return true;
  }

  getRemainingRequests(identifier: string = 'default'): number {
    const now = Date.now();
    const windowStart = now - this.windowMs;
    const userRequests = this.requests.get(identifier) || [];
    const recentRequests = userRequests.filter(time => time > windowStart);
    
    return Math.max(0, this.maxRequests - recentRequests.length);
  }
}

export const conversionRateLimiter = new RateLimiter();

// Security logging for monitoring
export function logSecurityEvent(event: string, details: any = {}) {
  // In production, this would send to a monitoring service
  console.warn(`[SECURITY] ${event}:`, {
    timestamp: new Date().toISOString(),
    userAgent: navigator.userAgent,
    url: window.location.href,
    ...details
  });
}

// Validate conversion input
export function validateConversionInput(input: any): { 
  success: boolean; 
  data?: any; 
  error?: string; 
} {
  try {
    const validatedData = conversionInputSchema.parse(input);
    return { success: true, data: validatedData };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessage = error.issues.map(e => e.message).join(', ');
      logSecurityEvent('INVALID_INPUT', { error: errorMessage, input });
      return { success: false, error: errorMessage };
    }
    return { success: false, error: 'Validation failed' };
  }
}

// Check rate limit and log if exceeded
export function checkRateLimit(identifier?: string): boolean {
  const allowed = conversionRateLimiter.isAllowed(identifier);
  
  if (!allowed) {
    logSecurityEvent('RATE_LIMIT_EXCEEDED', { 
      identifier,
      remaining: conversionRateLimiter.getRemainingRequests(identifier)
    });
  }
  
  return allowed;
}