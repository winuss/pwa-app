// var payload = event.data.json();
// const title = payload.title;
// const options = {
//   body: payload.body,
//   icon: 'images/fav.ico',
//   badge: 'images/badge.png',
//   vibrate: [200, 100, 200, 100, 200, 100, 400],
//   data : payload.params
// };

self.addEventListener("push", async (event) => {
  if (event.data) {
    let { title, body, icon, tag } = JSON.parse(
      event.data && event.data.text()
    );

    event.waitUntil(
      self.registration.showNotification(title || "", {
        body,
        tag,
        icon: "/icons/icon-192.png",
      })
    );
  }
});

// var data = event.notification.data;
// event.notification.close();
// event.waitUntil( clients.openWindow( data.url ) );

self.addEventListener("notificationclick", function (event) {
  self.clients.openWindow("https://capa.ai");
});
