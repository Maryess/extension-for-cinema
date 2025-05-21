import "styles/global.css";

const containerId = "app";
let container = document.getElementById(containerId);

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
