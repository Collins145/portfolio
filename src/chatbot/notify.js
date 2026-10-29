import React from "react";
import { profile } from "./knowledgeBase";

/**
 * Sends a lead notification to the owner.
 *
 * Strategy:
 *  1. Opens WhatsApp (wa.me) with a pre-filled lead message to the owner's
 *     number — one tap delivers it. This works without any backend.
 *  2. Also fires an optional webhook (e.g. a WhatsApp Business API provider
 *     such as CallMeBot, Twilio, or 360dialog) if configured, so the
 *     notification can arrive automatically when the owner is offline.
 *
 * To enable fully-automatic WhatsApp delivery, set a webhook URL below (or
 * via VITE_WHATSAPP_WEBHOOK env var) that accepts a POST { text } and forwards
 * it to your WhatsApp through your provider.
 */
const WEBHOOK_URL = import.meta.env?.VITE_WHATSAPP_WEBHOOK || "";

export async function notifyOwnerWhatsApp(text) {
  // Fire-and-forget webhook (automatic push) if configured.
  if (WEBHOOK_URL) {
    try {
      await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, to: profile.phone }),
      });
      return true;
    } catch (e) {
      console.warn("WhatsApp webhook notification failed:", e);
    }
  }
  return false;
}

export function openWhatsApp(text) {
  const url = `https://wa.me/${profile.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(text)}`;
  window.open(url, "_blank", "noopener,noreferrer");
}
