// Share Analytics Service
import { apiClient } from '../lib/api';

export interface ShareEvent {
  postId: string;
  platform: string;
  timestamp: Date;
  userId?: string;
}

export class ShareAnalyticsService {
  // Track share events
  static async trackShare(postId: string, platform: string): Promise<void> {
    try {
      await apiClient.post('/community/posts/share-analytics', {
        postId,
        platform,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      // Silent fail for analytics
      console.log('Share analytics tracking failed:', error);
    }
  }

  // Get share statistics for a post
  static async getShareStats(postId: string): Promise<{
    total: number;
    byPlatform: Record<string, number>;
    recent: ShareEvent[];
  } | null> {
    try {
      const response = await apiClient.get(`/community/posts/${postId}/share-stats`);
      const result = response as any;
      return result.data?.data || null;
    } catch (error) {
      console.error('Failed to get share stats:', error);
      return null;
    }
  }
}

// Share utilities
export const shareUtils = {
  // Generate dynamic share text based on post content
  generateShareText: (post: any) => {
    const hashtags = ['#coding', '#learning', '#community', '#tech'];
    if (post.tags && post.tags.length > 0) {
      post.tags.slice(0, 3).forEach((tag: string) => {
        hashtags.push(`#${tag.replace(/\s+/g, '')}`);
      });
    }
    
    const text = `${post.title}\n\nJoin the discussion on CodingJojo Community! 🚀\n\n${hashtags.join(' ')}`;
    return text;
  },

  // Get optimized share URLs for different platforms
  getShareUrls: (post: any, baseUrl: string) => {
    const postUrl = `${baseUrl}/community/posts/${post._id}`;
    const shareTitle = post.title;
    const shareText = shareUtils.generateShareText(post);
    const imageUrl = post.image ? `${baseUrl}${post.image}` : `${baseUrl}/api/og-image?title=${encodeURIComponent(post.title)}`;

    return {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}&quote=${encodeURIComponent(shareTitle)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(postUrl)}&text=${encodeURIComponent(shareText)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}&title=${encodeURIComponent(shareTitle)}&summary=${encodeURIComponent(post.excerpt || post.content.substring(0, 150))}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(`${shareTitle}\n\n${postUrl}`)}`,
      telegram: `https://t.me/share/url?url=${encodeURIComponent(postUrl)}&text=${encodeURIComponent(shareTitle)}`,
      reddit: `https://reddit.com/submit?url=${encodeURIComponent(postUrl)}&title=${encodeURIComponent(shareTitle)}`,
      pinterest: `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(postUrl)}&media=${encodeURIComponent(imageUrl)}&description=${encodeURIComponent(shareTitle)}`,
      email: `mailto:?subject=${encodeURIComponent(`Check out: ${shareTitle}`)}&body=${encodeURIComponent(`I thought you might be interested in this post from CodingJojo:\n\n${shareTitle}\n\n${post.excerpt || post.content.substring(0, 150)}...\n\nRead more: ${postUrl}`)}`,
    };
  },

  // Copy to clipboard with fallback
  copyToClipboard: async (text: string): Promise<boolean> => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        return true;
      } else {
        // Fallback for older browsers or non-secure contexts
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        const result = document.execCommand('copy');
        document.body.removeChild(textArea);
        return result;
      }
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
      return false;
    }
  },

  // Generate QR code URL
  generateQRCode: (url: string): string => {
    return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(url)}`;
  },

  // Check if device supports native sharing
  supportsNativeShare: (): boolean => {
    return !!(navigator.share);
  },

  // Native share with fallback
  nativeShare: async (data: { title: string; text: string; url: string }): Promise<boolean> => {
    try {
      if (navigator.share) {
        // Check if the specific data can be shared (if canShare is available)
        if (navigator.canShare && !navigator.canShare(data)) {
          return false;
        }
        await navigator.share(data);
        return true;
      }
      return false;
    } catch (err) {
      console.error('Native share failed:', err);
      return false;
    }
  }
};
