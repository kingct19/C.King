let stage;
function notify(status) {
  if (parent !== window) parent.postMessage({ type: "coffee-scene", status }, location.origin);
}
try {
  const [{ createDiorama }, { buildCoffeeShop }] = await Promise.all([
    import("./runtime.js"),
    import("./scene.js"),
  ]);
  const host = document.querySelector("#stage");
  stage = createDiorama(host, {
    label:
      "A coffee shop. A customer walks up to the counter while the barista pours a cup. Steam rises and a cat sits on the counter.",
    pixelSize: 1,
    levels: 12,
    dither: 0.8,
    transparent: true,
    onError: () => notify("error"),
  });
  const params = new URLSearchParams(location.search);
  const settings = buildCoffeeShop({
    name: params.get("username") || "",
    once: params.get("alert") === "1",
  });
  if (params.get("alert") === "1") {
    const finish = settings.onComplete;
    settings.onComplete = () => {
      finish?.();
      notify("complete");
    };
  }
  stage.setWorld(settings.world, settings);
  const visibilityChanged = (event) => {
    if (
      event.source !== parent ||
      event.origin !== location.origin ||
      event.data?.type !== "coffee-visibility" ||
      typeof event.data.visible !== "boolean"
    ) {
      return;
    }
    stage.setVisible(event.data.visible);
  };
  window.addEventListener("message", visibilityChanged);
  host.querySelector("canvas").addEventListener("webglcontextrestored", () => notify("ready"));
  notify("ready");
  window.addEventListener(
    "pagehide",
    () => {
      window.removeEventListener("message", visibilityChanged);
      stage.dispose();
    },
    { once: true },
  );
  window.addEventListener("pageshow", (event) => {
    if (event.persisted) location.reload();
  });
} catch (error) {
  console.error("The coffee shop scene could not load.", error);
  stage?.dispose();
  notify("error");
}
export { stage };
