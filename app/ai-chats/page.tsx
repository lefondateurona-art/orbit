import { redirect } from "next/navigation";

// LEGACY route — replaced by the faithful prototype view at /messages-ia.
export default function AiChatsLegacy() {
  redirect("/messages-ia");
}
