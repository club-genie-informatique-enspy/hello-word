
// components/ShareButton.tsx
// Composant optionnel que vous pourriez utiliser dans PhotoDetailModal
interface ShareButtonProps {
  photoId: string;
  title: string;
  description: string;
}

const ShareButton: React.FC<ShareButtonProps> = ({ photoId, title, description }) => {
  const handleShare = async () => {
    // Construire l'URL de partage
    const shareUrl = `${window.location.origin}/meilleur-cliche/photo/${photoId}`;
    
    // Utiliser l'API Web Share si disponible
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: description,
          url: shareUrl,
        });
      } catch (error) {
        console.error('Erreur lors du partage:', error);
      }
    } else {
      // Fallback : copier l'URL dans le presse-papier
      try {
        await navigator.clipboard.writeText(shareUrl);
        alert('Lien copié dans le presse-papier !');
      } catch (error) {
        console.error('Erreur lors de la copie du lien:', error);
        // Dernier recours : sélection manuelle
        prompt('Copiez ce lien pour partager la photo:', shareUrl);
      }
    }
  };

  return (
    <button 
      onClick={handleShare}
      className="flex items-center space-x-1 focus:outline-none"
      aria-label="Partager"
    >
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" 
        />
      </svg>
      <span className="text-sm">Partager</span>
    </button>
  );
};

export default ShareButton;