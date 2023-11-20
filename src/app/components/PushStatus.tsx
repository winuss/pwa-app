"use client";
import { CONFIG } from "@/config";
import { resetServiceWorker } from "@/lib/utils";
import { useEffect, useState } from "react";
import { saveSubscription } from "../service/subscription";

export default function PushStatus() {
  const [isServiceWorker, setIsServiceWorker] = useState(false);
  const [isPushSupport, setIsPushSupport] = useState(false);
  const [subscriptionInfo, setSubscriptionInfo] = useState("");
  const [permission, setPermission] =
    useState<NotificationPermission>("default");

  const initRegisterServiceWorker = async () => {
    if (!("serviceWorker" in navigator)) {
      alert("serviceWorker 지원안함");
      return;
    }

    if (!("PushManager" in window)) {
      alert("PushManager 지원안함");
      return;
    }

    if (!("Notification" in window)) {
      alert("Notification 지원안함");
      return;
    }

    setPermission(window.Notification.permission);

    let registration = await navigator.serviceWorker.getRegistration();

    if (registration) {
      setIsServiceWorker(true);
      if ("pushManager" in registration) {
        const subscribed = await registration.pushManager.getSubscription();
        if (subscribed) {
          setSubscriptionInfo(JSON.stringify(subscribed, null, 2));
        }
        setIsPushSupport(true);
      }
    } else {
      //서비스워커 등록
      navigator.serviceWorker
        .register("./service-worker.js")
        .then(async (serviceWorkerRegistration) => {
          console.info("서비스워커 등록", serviceWorkerRegistration);
          setIsServiceWorker(true);

          if ("pushManager" in serviceWorkerRegistration) {
            const subscribed =
              await serviceWorkerRegistration.pushManager.getSubscription();
            setSubscriptionInfo(JSON.stringify(subscribed, null, 2));
            setIsPushSupport(true);
          }
        })
        .catch((error) => {
          console.error("서비스워커 등록 오류");
          console.error(error);
        });
    }
  };
  useEffect(() => {
    initRegisterServiceWorker();
  }, []);

  const subscribe = async () => {
    const receivedPermission = await window?.Notification.requestPermission();
    setPermission(receivedPermission);

    if (receivedPermission === "granted") {
      try {
        const registration = await navigator.serviceWorker.getRegistration();
        const subscribed = await registration?.pushManager.getSubscription();

        if (subscribed) {
          console.log("이미 구독중...");
          alert("subscribe - already subscribed");
          return;
        }
        //구독 요청
        const subscription = await registration?.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: CONFIG.PUBLIC_KEY,
        });

        setSubscriptionInfo(JSON.stringify(subscription, null, 2));

        //구독정보 서버에 전송
        if (subscription) {
          const result = await saveSubscription(subscription);
          alert(result.message);
        }
      } catch (err) {
        alert(err);
      }
    } else {
      alert(`fail: ${receivedPermission}`);
    }
  };

  const unsubscribe = async () => {
    const registration = await navigator.serviceWorker.getRegistration();
    const subscription = await registration?.pushManager.getSubscription();

    if (!subscription) {
      alert("unsubscribe - push subscription not exist");
      return;
    }

    try {
      const unsubscribed = await subscription.unsubscribe();
      // setPushSubscription(null);
      alert("구독 취소됨");
      setSubscriptionInfo("");

      //구독해제 (계정정보와 함께 구독정보 전달)
      //await deleteSubscription();
    } catch (error) {
      console.error("unsubscribe", { error });
    }
  };

  return (
    <>
      <section>
        <h2>상태</h2>
        <div className="item">
          서비스워커 등록: {isServiceWorker.toString()}
          <br />
          푸시 지원: {isPushSupport.toString()}
          <br />
          알림 권한: {permission}
        </div>
      </section>
      <section>
        <h2>구독</h2>
        {subscriptionInfo ? "구독중" : "알림을 받기 위해서 구독 해주세요.."}
        <div className="item">
          {subscriptionInfo.length ? (
            <button onClick={unsubscribe}>Unsubscribe</button>
          ) : (
            <button onClick={subscribe}>Subscribe</button>
          )}
          <span className="empty-h4" />
          <button onClick={resetServiceWorker}>SW Reset</button>
        </div>
        <div className="item">
          <pre id="subscription">{subscriptionInfo}</pre>
        </div>
        <div></div>
      </section>
    </>
  );
}
