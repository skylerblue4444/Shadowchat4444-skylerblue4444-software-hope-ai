export const moderateContent = async (text: string): Promise<boolean> => {
  console.log('%c🛡️ AI moderation running on post content', 'color:#a855f7');
  // Mock AI check
  return !text.toLowerCase().includes('spam');
};