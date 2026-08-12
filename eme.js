document.addEventListener('DOMContentLoaded', () => {
  const copyHashtagBtn = document.getElementById('copy-hashtag-btn');

  if (copyHashtagBtn) {
    copyHashtagBtn.addEventListener('click', async () => {
      const hashtagTextElement = document.getElementById('hashtag-text');
      if (!hashtagTextElement) return;

      const textToCopy = hashtagTextElement.innerText;

      try {
        await navigator.clipboard.writeText(textToCopy);
        
        // Save original HTML content
        const originalHtml = copyHashtagBtn.innerHTML;

        // Visual Feedback State
        copyHashtagBtn.innerHTML = '<i class="fa-solid fa-check"></i> <span>Copied!</span>';
        copyHashtagBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
        copyHashtagBtn.style.color = '#ffffff';

        // Revert back after 2.2 seconds
        setTimeout(() => {
          copyHashtagBtn.innerHTML = originalHtml;
          copyHashtagBtn.style.background = '';
          copyHashtagBtn.style.color = '';
        }, 2200);

      } catch (err) {
        console.error('Failed to copy hashtags: ', err);
      }
    });
  }
});