import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import { Button } from '@/components/ui/button';
import { Upload, Download, Sparkles } from 'lucide-react';
import { useState, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';

const hauntingMessages = [
  "👁️ The pixels remember you.",
  "☠️ Your reflection has changed.",
  "⚡ The mirror is awake.",
  "💀 Haunting complete.",
  "🕸️ Do not refresh.",
  "👻 The spirits have claimed your image.",
  "🔮 Your digital soul is trapped.",
  "🌫️ The fog remembers your face.",
  "⚰️ Welcome to the haunted dimension.",
  "🔮 The curse is now permanent.",
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
  const [isJpgFile, setIsJpgFile] = useState(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      // Check if it's a JPG file
      const isJpg = file.type === 'image/jpeg' || file.name.toLowerCase().endsWith('.jpg') || file.name.toLowerCase().endsWith('.jpeg');
      setIsJpgFile(isJpg);
      
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
      console.log('Haunted image received:', data.image ? 'Yes' : 'No');
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
    setIsJpgFile(false);
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
                
                {/* File Format Recommendation */}
                <div className="mt-4 p-4 bg-gradient-to-r from-purple-900/30 to-indigo-900/30 border border-purple-500/40 rounded-lg backdrop-blur-sm">
                  <div className="flex items-center gap-2 text-purple-300 text-sm">
                    <span className="text-lg">🔮</span>
                    <span className="font-medium">Spirit's Guidance:</span>
                  </div>
                  <p className="text-purple-200 text-sm mt-1">
                    The spirits prefer <strong>PNG files</strong> for clearer visions. JPG files may appear distorted in the mirror.
                  </p>
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
                {/* JPG Warning */}
                {isJpgFile && (
                  <div className="p-4 bg-gradient-to-r from-orange-900/30 to-red-900/30 border border-orange-500/40 rounded-lg backdrop-blur-sm">
                    <div className="flex items-center gap-2 text-orange-300 text-sm">
                      <span className="text-lg">👻</span>
                      <span className="font-medium">Spirit's Warning:</span>
                    </div>
                    <p className="text-orange-200 text-sm mt-1">
                      The spirits sense a JPG file. The mirror may show distorted visions. Consider using PNG for clearer haunting.
                    </p>
                  </div>
                )}
                
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
                <div className="relative border-4 border-red-500 rounded-lg p-2 bg-gradient-to-br from-purple-900/20 to-green-900/20 shadow-2xl">
                  <img
                    src={hauntedImage}
                    alt="Your haunted reflection"
                    className="w-full rounded-lg haunted-glitch"
                    data-testid="img-haunted-reflection"
                  />
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg"></div>
                    <div className="absolute top-2 left-2 text-red-500 text-xs font-mono opacity-70">
                      [HAUNTED]
                    </div>
                    <div className="absolute bottom-2 right-2 text-cyan-400 text-xs font-mono opacity-70">
                      [CURSED]
                    </div>
                  </div>
                </div>
                
                {hauntingMessage && (
                  <div className="text-center p-6 bg-black/40 rounded-xl border border-primary/30" data-testid="text-haunting-message">
                    <p className="text-lg font-display text-primary italic haunted-text">"{hauntingMessage}"</p>
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
