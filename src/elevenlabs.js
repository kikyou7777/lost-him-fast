import axios from "axios";

const ELEVEN_API_KEY = import.meta.env.VITE_ELEVEN_API_KEY;

// Returns a blob URL you can play with new Audio(url)
export async function generateSpeech(text) {
  const voiceId = "EXAVITQu4vr4xnSDxMaL"; // default voice
  const url = `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`;

  try {
    const res = await axios.post(
      url,
      { text, voice_settings: { stability: 0.5, similarity_boost: 0.75 } },
      {
        headers: {
          "Accept": "audio/mpeg",
          "Content-Type": "application/json",
          "xi-api-key": ELEVEN_API_KEY,
        },
        responseType: "arraybuffer",
      }
    );

    const audioBlob = new Blob([res.data], { type: "audio/mpeg" });
    return URL.createObjectURL(audioBlob);
  } catch (e) {
    console.error("ElevenLabs error:", e);
    return null;
  }
}
