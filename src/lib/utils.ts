export const copyToClipboard = (text: string) => {
  const tempInput = document.createElement("input");
  tempInput.value = text;
  document.body.appendChild(tempInput);
  tempInput.select();
  document.execCommand("copy");
  document.body.removeChild(tempInput);

  alert("ok!");
};

export const registerServiceWorker = async () => {
  return navigator.serviceWorker.register("/service-worker.js");
};

export const unregisterServiceWorkers = async () => {
  const registrations = await navigator.serviceWorker.getRegistrations();
  await Promise.all(registrations.map((r) => r.unregister()));
};

//재등록
export const resetServiceWorker = async () => {
  if (navigator.serviceWorker == undefined) {
    alert(`serviceWorker undefined`);
    return;
  }

  try {
    await unregisterServiceWorkers();
    await registerServiceWorker();
    alert("ok!");
  } catch (e) {
    alert(`error : ${e}`);
  }
};
