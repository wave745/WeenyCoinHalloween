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
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        setHauntedImage(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const applyHauntedEffect = () => {
    if (!selectedImage || !canvasRef.current) return;

    setIsProcessing(true);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onerror = () => {
      setIsProcessing(false);
      toast({
        title: "Image Processing Failed",
        description: "Unable to process the image. Please try another one.",
        variant: "destructive",
      });
    };

    img.onload = () => {
      // Downscale large images to prevent memory issues
      const maxDimension = 1920;
      let width = img.width;
      let height = img.height;

      if (width > maxDimension || height > maxDimension) {
        if (width > height) {
          height = (height / width) * maxDimension;
          width = maxDimension;
        } else {
          width = (width / height) * maxDimension;
          height = maxDimension;
        }
      }

      canvas.width = width;
      canvas.height = height;

      if (!ctx) return;

      // Draw original image (scaled if necessary)
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      // Get image data for manipulation
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      // Apply effects
      for (let i = 0; i < data.length; i += 4) {
        // Grayscale with slight green tint (ghostly)
        const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
        data[i] = avg * 0.9; // Red
        data[i + 1] = avg * 1.1; // Green (ghostly tint)
        data[i + 2] = avg * 0.8; // Blue
      }

      ctx.putImageData(imageData, 0, 0);

      // RGB Shift (glitch effect)
      const shiftAmount = 5;
      const rgbData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const shifted = ctx.getImageData(shiftAmount, 0, canvas.width - shiftAmount, canvas.height);
      
      for (let i = 0; i < shifted.data.length; i += 4) {
        rgbData.data[i] = shifted.data[i]; // Red channel shifted
      }
      
      ctx.putImageData(rgbData, 0, 0);

      // Add vignette (darkened edges)
      const gradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, canvas.width / 1.5
      );
      gradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0.7)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Add ghostly fog overlay
      ctx.fillStyle = 'rgba(200, 255, 200, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Random glitch lines
      ctx.strokeStyle = 'rgba(0, 255, 100, 0.3)';
      ctx.lineWidth = 2;
      for (let i = 0; i < 5; i++) {
        const y = Math.random() * canvas.height;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      const haunted = canvas.toDataURL('image/png');
      setHauntedImage(haunted);
      setHauntingMessage(hauntingMessages[Math.floor(Math.random() * hauntingMessages.length)]);
      setIsProcessing(false);
    };

    img.src = selectedImage;
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

            <canvas ref={canvasRef} className="hidden" />
          </div>
        </div>
      </div>
    </section>
  );
}
