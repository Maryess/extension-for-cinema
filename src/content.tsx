import "styles/global.css";

const ALLOWED_URL = "http://localhost:4201";
if (!window.location.href.startsWith(ALLOWED_URL)) {
  console.log(`Расширение работает только на ${ALLOWED_URL}`);
} else {
  const containerId = "app";
  let container = document.getElementById(containerId);

  function waitForVideoElement(callback: (video: HTMLVideoElement) => void) {
    const check = () => {
      const video = document.querySelector("video");
      if (video) {
        callback(video);
      } else {
        setTimeout(check, 500);
      }
    };
    check();
  }

  waitForVideoElement(() => {
    console.log("Видео найдено!");
  });

  if (container) {
    container.remove();
  } else {
    container = document.createElement("div");
    container.className = "cinema-extension-wrapper";
    container.id = containerId;
    document.body.appendChild(container);

    import("react").then((React) => {
      import("react-dom/client").then((ReactDOM) => {
        import("./popup/app/App").then(({ default: App }) => {
          const root = ReactDOM.createRoot(container!);
          root.render(React.createElement(App));
        });
      });
    });
  }
}
