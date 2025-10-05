import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import { Button } from '@/components/ui/button';
import { Upload, Download, Sparkles } from 'lucide-react';
import { useState, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';

const hauntingMessages = [
  "Possessed by the Spirit of a Dead Commit.",
  "You have 7 errors remaining...",
  "Your reflection is no longer synced.",
  "The code compiles... but at what cost?",
  "404: Soul Not Found",
  "Haunted by infinite loops forever...",
  "Your branches have merged with the darkness.",
  "Stack overflow in the afterlife.",
  "Debugging eternity, one ghost at a time.",
  "Your pull request was rejected by death itself.",
];

export function MirrorSection() {
  const { ref, isVisible } = useScrollAnimation();
  const { toast } = useToast();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [hauntedImage, setHauntedImage] = useState<string | null>(null);
  const [hauntingMessage, setHauntingMessage] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        setHauntedImage(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const applyHauntedEffect = async () => {
    if (!selectedFile) return;

    setIsProcessing(true);

    try {
      const formData = new FormData();
      formData.append('image', selectedFile);

      const response = await fetch('/api/hauntify', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to haunt image');
      }

      const data = await response.json();
      setHauntedImage(data.image);
      setHauntingMessage(hauntingMessages[Math.floor(Math.random() * hauntingMessages.length)]);
    } catch (error: any) {
      toast({
        title: "Haunting Failed",
        description: error.message || "The spirits are uncooperative. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadImage = () => {
    if (!hauntedImage) return;

    const link = document.createElement('a');
    link.download = 'haunted-reflection.png';
    link.href = hauntedImage;
    link.click();
  };

  const reset = () => {
    setSelectedImage(null);
    setHauntedImage(null);
    setHauntingMessage("");
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <section className="py-20 relative" ref={ref}>
      <div className="container mx-auto px-4">
        <div className={`text-center mb-12 scroll-fade-in ${isVisible ? 'visible' : ''}`}>
          <h2 className="text-5xl md:text-6xl font-display text-primary mb-4">Look into Weeny's Mirror</h2>
          <p className="text-xl text-muted-foreground">See what lurks beneath your pixels...</p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className={`bg-card border border-border rounded-2xl p-8 spooky-glow scroll-fade-in ${isVisible ? 'visible' : ''}`}>
            
            {!selectedImage && (
              <div className="text-center space-y-6">
                <div className="text-6xl mb-6 animate-pulse">🪞</div>
                <p className="text-lg text-muted-foreground mb-8">
                  Dare to reveal your haunted form?
                </p>
                <div className="flex justify-center">
                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    className="px-8 py-6 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold hover:scale-105 transition-transform flex items-center gap-2"
                    data-testid="button-upload-photo"
                  >
                    <Upload className="w-5 h-5" />
                    Upload Photo
                  </Button>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                  data-testid="input-file-upload"
                />
              </div>
            )}

            {selectedImage && !hauntedImage && (
              <div className="space-y-6">
                <div className="relative group">
                  <img
                    src={selectedImage}
                    alt="Your photo"
                    className="w-full rounded-lg border-2 border-primary"
                    data-testid="img-selected-photo"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                    <p className="text-white text-lg font-bold">Ready to be haunted?</p>
                  </div>
                </div>
                <div className="flex gap-4 justify-center">
                  <Button
                    onClick={applyHauntedEffect}
                    disabled={isProcessing}
                    className="px-8 py-6 rounded-xl halloween-gradient text-white font-bold hover:scale-105 transition-transform flex items-center gap-2"
                    data-testid="button-reveal-reflection"
                  >
                    <Sparkles className="w-5 h-5" />
                    {isProcessing ? 'Summoning spirits...' : 'Reveal My Reflection'}
                  </Button>
                  <Button
                    onClick={reset}
                    variant="outline"
                    className="px-8 py-6 rounded-xl"
                    data-testid="button-reset"
                  >
                    Try Another
                  </Button>
                </div>
              </div>
            )}

            {hauntedImage && (
              <div className="space-y-6 animate-in fade-in duration-500">
                <div className="relative border-4 border-primary rounded-lg p-2 bg-gradient-to-br from-purple-900/20 to-green-900/20">
                  <img
                    src={hauntedImage}
                    alt="Your haunted reflection"
                    className="w-full rounded-lg"
                    data-testid="img-haunted-reflection"
                  />
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg"></div>
                  </div>
                </div>
                
                {hauntingMessage && (
                  <div className="text-center p-6 bg-black/40 rounded-xl border border-primary/30" data-testid="text-haunting-message">
                    <p className="text-lg font-display text-primary italic">"{hauntingMessage}"</p>
                  </div>
                )}

                <div className="flex gap-4 justify-center">
                  <Button
                    onClick={downloadImage}
                    className="px-8 py-6 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold hover:scale-105 transition-transform flex items-center gap-2"
                    data-testid="button-download"
                  >
                    <Download className="w-5 h-5" />
                    Download Haunting
                  </Button>
                  <Button
                    onClick={reset}
                    variant="outline"
                    className="px-8 py-6 rounded-xl"
                    data-testid="button-try-another"
                  >
                    Try Another
                  </Button>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </section>
  );
}
