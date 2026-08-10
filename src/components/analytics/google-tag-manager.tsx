import { GoogleTagManager as NextGoogleTagManager } from "@next/third-parties/google";
import { GTMPageView } from "./gtm-page-view";

export function GoogleTagManager() {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID || "GTM-XXXXXXX";

  if (!gtmId) {
    return null;
  }

  return (
    <>
      <NextGoogleTagManager gtmId={gtmId} />
      <GTMPageView />
    </>
  );
}
