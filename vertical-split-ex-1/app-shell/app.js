const routes = {
  '/': () => renderHome(),
  '/#about': async () => {
    await loadRemoteScript('http://localhost:3001/about.js');
    renderElement('mfe-about');
  },
  '/#content': async () => {
    await loadRemoteScript('http://localhost:3002/content.js');
    renderElement('mfe-content');
  }
};

function loadRemoteScript(url) {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${url}"]`)) {
      resolve();
      return;
    }
    const script = document.createElement('script');
    script.src = url;
    script.type = 'module';
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

function renderElement(tagName) {
  const app = document.getElementById('app');
  app.innerHTML = `<${tagName}></${tagName}>`;
}

function renderHome() {
  document.getElementById('app').innerHTML = `
    <div style="padding: 1em;">
      <h2>Welcome to the App Shell</h2>
      <p>Use the navigation above to load micro frontends.</p>
    </div>
  `;
}

function handleRoute() {
  const path = "/" + window.location.hash;
  const routeHandler = routes[path];
  if (routeHandler) {
    routeHandler();
  } else {
    document.getElementById('app').innerHTML = `<h2>404 - Not Found</h2>`;
  }
}

function navigate(event) {
  event.preventDefault();
  const href = event.target.getAttribute('href');
  history.pushState(null, '', href);
  handleRoute();
}

window.addEventListener('popstate', handleRoute);
document.querySelectorAll('[data-link]').forEach(link => {
  link.addEventListener('click', navigate);
});

// Initial load
handleRoute();
