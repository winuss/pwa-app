export const saveSubscription = async (subscription: PushSubscription) => {
  const ORIGIN = window.location.origin;
  const BACKEND_URL = `${ORIGIN}/api/subscription`;

  const response = await fetch(BACKEND_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(subscription),
    cache: "no-store",
  });
  return response.json();
};
