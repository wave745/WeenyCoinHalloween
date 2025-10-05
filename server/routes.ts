import type { Express, Request } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import multer from "multer";
import OpenAI from "openai";
import { writeFile, unlink } from "fs/promises";
import { join } from "path";
import { createReadStream } from "fs";

const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }
});

// the newest OpenAI model is "gpt-5" which was released August 7, 2025. do not change this unless explicitly requested by the user
const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY 
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Haunted image effect using OpenAI Image Edit API
  app.post("/api/hauntify", upload.single("image"), async (req: Request & { file?: Express.Multer.File }, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No image file uploaded" });
      }

      const tempFilePath = join("/tmp", `upload-${Date.now()}.png`);
      
      await writeFile(tempFilePath, req.file.buffer);

      const response = await openai.images.edit({
        image: createReadStream(tempFilePath),
        prompt: "apply a haunted Halloween effect: eerie fog, subtle RGB glitch lines, ghostly glowing eyes, cinematic lighting, and a dark cursed atmosphere. add faint distortion and film grain. aesthetic like a haunted digital mirror.",
        n: 1,
        size: "1024x1024",
        response_format: "b64_json"
      });

      await unlink(tempFilePath);

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
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
