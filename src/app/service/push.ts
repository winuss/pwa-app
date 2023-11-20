export const sendPushNotification = async (
  pushSubscription: PushSubscription | null = null,
  payload: { title: string; body: string; link: string }
) => {
  const ORIGIN = window.location.origin;
  const BACKEND_URL = `${ORIGIN}/api/push${pushSubscription ? "" : "/all"}`;

  const response = await fetch(BACKEND_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ pushSubscription, payload }),
    cache: "no-store",
  });

  const data = await response.json();

  alert(`${data.message} (${response.ok})`);
};

export const initFileData = async () => {
  const ORIGIN = window.location.origin;
  const BACKEND_URL = `${ORIGIN}/api/db/init`;

  const response = await fetch(BACKEND_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  const data = await response.json();

  return response.ok;
};

export const getSubscription = async () => {
  const ORIGIN = window.location.origin;
  const BACKEND_URL = `${ORIGIN}/api/db`;

  const response = await fetch(BACKEND_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  const data = await response.json();

  return data;
};
