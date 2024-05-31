import { PassThrough } from "node:stream";

import { createReadableStreamFromReadable, type EntryContext } from "@remix-run/node";
import { RemixServer } from "@remix-run/react";
import { renderToPipeableStream } from "react-dom/server";

const ABORT_DELAY = 5_000;

export default function handleRequest(request: Request, status: number, headers: Headers, context: EntryContext) {
  const promise = new Promise((resolve, reject) => {
    let shellRendered = false;

    const { pipe, abort } = renderToPipeableStream(
      <RemixServer abortDelay={ABORT_DELAY} context={context} url={request.url} />,
      {
        onShellReady() {
          shellRendered = true;

          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);

          headers.set("Content-Type", "text/html");

          resolve(
            new Response(stream, {
              headers,
              status,
            })
          );

          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          status = 500;

          if (shellRendered) {
            console.error(error);
          }
        },
      }
    );

    setTimeout(abort, ABORT_DELAY);
  });

  return promise;
}
