"use client";
import { useEffect, useState } from "react";
import {
  getSubscription,
  initFileData,
  sendPushNotification,
} from "../service/push";

export default function SendPush() {
  const [data, setData] = useState<PushSubscription[]>([]);

  //default
  const [title, setTitle] = useState("알림 타이틀!");
  const [body, setBody] = useState("안녕하세요. 웹푸시 내용 입니다.");
  const [link, setLink] = useState("https://capa.ai/customer-requests");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: PushSubscription[] = await getSubscription();

        setData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const initDB = async () => {
    const result = await initFileData();
    if (result) {
      const data: PushSubscription[] = await getSubscription();
      setData(data);
    }
  };

  return (
    <>
      <section>
        <h2>푸시 내용</h2>
        <div className="item">
          title
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          body
          <input
            type="text"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
          link
          <input
            type="text"
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
        </div>
      </section>
      <section>
        <h2>모두 보내기</h2>
        <button
          onClick={() => sendPushNotification(null, { title, body, link })}
        >
          Send ALL
        </button>
      </section>
      <section>
        <h2>구독자 리스트</h2>
        <button onClick={() => initDB()}>초기화</button>
        <span className="empty-v4" />
        <ul className="subslist">
          {data.map((data, index) => (
            <li key={index}>
              {JSON.stringify(data)}{" "}
              <button
                onClick={() =>
                  sendPushNotification(data, { title, body, link })
                }
              >
                Send
              </button>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
