export default function createAbortController(): [ NodeJS.Timeout, AbortSignal ] {
  const controller = new AbortController();
  const timeout = setTimeout(() => {
    controller.abort();
  }, 8000);
  return [ timeout, controller.signal ];
}