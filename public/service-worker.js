function log(...args) {
  console.log("service-worker:", ...args);
}

self.addEventListener("install", (event) => {
  log("install", { event });
  // 제어중인 서비스 워커가 존재해도 대기 상태를 건너뛴다.
  event.waitUntil(self.skipWaiting());
});

self.addEventListener("activate", (event) => {
  log("activate", { event });
  // 활성화 즉시 클라이언트를 제어한다.(새로고침 불필요)
  self.clients.claim();
});

//푸시
self.addEventListener("push", async (event) => {
  log("push", { event });

  if (event.data) {
    const payload = JSON.parse(event.data.text());
    const { title, body, icon, link } = payload;

    event.waitUntil(
      self.registration.showNotification(title || "", {
        body,
        data: { link },
        icon: icon ?? "/icons/icon-192.png",
      })
    );
  }
});

//푸시 클릭
self.addEventListener("notificationclick", (event) => {
  log("click", { event });
  event.notification.close();
  const openLink = event.notification.data.link;

  event.waitUntil(
    clients
      .matchAll({
        type: "window",
      })
      .then(function (clientList) {
        log("clientList", { clientList });
        for (var i = 0; i < clientList.length; i++) {
          var client = clientList[i];
          if (client.url == openLink && "focus" in client)
            return client.focus();
        }
        if (clients.openWindow) return clients.openWindow(openLink);
      })
  );

  // self.clients.openWindow(event.notification.data.link);
});
