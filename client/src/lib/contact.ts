export interface ContactOptions {
  type?: "buy" | "sell" | "rent" | "valuation" | "general";
  propertyId?: number;
  propertyTitle?: string;
  agentName?: string;
  prefillMessage?: string;
}

export function openContactModal(options?: ContactOptions) {
  document.dispatchEvent(
    new CustomEvent("aviera:contact", { detail: options || {} })
  );
}
