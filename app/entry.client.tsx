import { RemixBrowser } from "@remix-run/react";
import { startTransition, StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";

startTransition(() => {
  const children = (
    <StrictMode>
      <RemixBrowser />
    </StrictMode>
  );

  hydrateRoot(document, children);
});
