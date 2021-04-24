const pushState = (href: string): void => {
  window.history.pushState({}, '', href);
  window.dispatchEvent(new Event('popstate'));
};

const defaultExport = {
  pushState,
};

export default defaultExport;
