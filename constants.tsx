
import React from 'react';

export const PIBBLE_NAME = "Pibble";
export const PIBBLE_TICKER = "$pibble";
export const PIBBLE_CA = "Eppcp4FhG6wmaRno3omWWvKsZHbzucVLR316SdXopump";
export const PIBBLE_LOGO_URL = "https://pbs.twimg.com/media/G7vOAi4XoAAjnBL?format=jpg&name=small";
export const X_LINK = "https://x.com/pibblefancto";
export const DEXSCREENER_LINK = `https://dexscreener.com/solana/${PIBBLE_CA}`;
export const PUMPFUN_LINK = `https://pump.fun/coin/${PIBBLE_CA}`;

export const ABOUT_TEXT = `Pibble is an internet slang term for a French bulldog puppy, often pictured lying on its back with its belly up. The term "pibble" was originally used to mean "Pitbull" in the Doggo-Speak trend from the late 2010s. In 2023, the Handleheld Pupper / Geeble photo and its exploitable series went viral online, showing a baby French bulldog held in someone's hand. The image, and others like it, were later called "Pibble" in image macro and viral video memes on Instagram and TikTok.`;

export const CTO_MESSAGE = "Pibble is currently led by an experienced Community Take Over (CTO) team dedicated to pushing the project to its full potential.";

export const XIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6 fill-current" }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
  </svg>
);
