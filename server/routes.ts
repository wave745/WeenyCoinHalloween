import type { Express, Request } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import multer from "multer";
import OpenAI from "openai";
import sharp from "sharp";
import { unlinkSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { join } from "path";

const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }
});

// the newest OpenAI model is "gpt-5" which was released August 7, 2025. do not change this unless explicitly requested by the user
const getOpenAI = () => {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OpenAI API key not configured. Please set OPENAI_API_KEY environment variable.");
  }
  return new OpenAI({ 
    apiKey: process.env.OPENAI_API_KEY 
  });
};

export async function registerRoutes(app: Express): Promise<Server> {
  // Haunted image effect using OpenAI Image Edit API
  app.post("/api/hauntify", upload.single("image"), async (req: Request & { file?: Express.Multer.File }, res) => {
    let tempFilePath: string | undefined;
    let inputPath: string | undefined;

    try {
      if (!req.file) {
        return res.status(400).json({ error: "No image file uploaded" });
      }
      
      console.log("Uploaded file info:", {
        originalname: req.file.originalname,
        mimetype: req.file.mimetype,
        size: req.file.size
      });
      
      // Validate supported image formats
      const supportedFormats = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/heic'];
      if (!supportedFormats.includes(req.file.mimetype)) {
        return res.status(400).json({ 
          error: "Unsupported file format. Please upload JPG, PNG, WebP, or HEIC images." 
        });
      }
      
      // 🔥 Always convert to PNG — even if the input is JPG, HEIC, or WebP
      // This fixes the MIME type issue and ensures RGBA format
      inputPath = join("/tmp", `input-${Date.now()}.${req.file.originalname.split('.').pop()}`);
      const pngPath = join("/tmp", `converted-${Date.now()}.png`);
      
      // Write the uploaded file to disk first
      writeFileSync(inputPath, req.file.buffer);
      
       // Convert to PNG with proper RGBA format (4 channels with alpha)
       // Use a simpler approach - just ensure alpha channel
       await sharp(inputPath)
         .resize(1024, 1024, { fit: "cover", position: "center" })
         .ensureAlpha() // Add alpha channel
         .png({ 
           quality: 100,
           compressionLevel: 0,
           adaptiveFiltering: false,
           force: true
         })
         .toFile(pngPath);
      
      // Debug: Check the converted image format
      const imageInfo = await sharp(pngPath).metadata();
      console.log("Converted image info:", {
        format: imageInfo.format,
        channels: imageInfo.channels,
        hasAlpha: imageInfo.hasAlpha
      });
      
      tempFilePath = pngPath;

      const openai = getOpenAI();
      console.log("Sending image to OpenAI API...");
      
      // Read the PNG file and create a proper File object with correct MIME type
      const imageBuffer = await sharp(pngPath).png().toBuffer();
      const imageFile = new File([imageBuffer], 'image.png', { type: 'image/png' });
      
      const response = await openai.images.edit({
        image: imageFile,
        prompt: "Turn this photo into a haunted digital portrait for Halloween. Add ghostly fog, glowing eyes, RGB glitch lines, static distortion, and a cursed cinematic tone. Make it dark, foggy, and eerie like a digital ghost.",
        n: 1,
        size: "1024x1024",
        response_format: "b64_json"
      });
      console.log("OpenAI API response received:", response.data ? "Success" : "Failed");

      const hauntedImage = response.data?.[0]?.b64_json;

      if (!hauntedImage) {
        return res.status(500).json({ error: "Failed to generate haunted image" });
      }

      res.json({ 
        image: `data:image/png;base64,${hauntedImage}`
      });
    } catch (error: any) {
      console.error("Error hauntifying image:", error);
      res.status(500).json({ 
        error: "Failed to haunt your image. The spirits are uncooperative.",
        details: error.message 
      });
    } finally {
      // Clean up temp files
      try {
        if (typeof tempFilePath !== 'undefined') {
          unlinkSync(tempFilePath);
        }
        if (typeof inputPath !== 'undefined') {
          unlinkSync(inputPath);
        }
      } catch {
        // Ignore cleanup errors
      }
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
