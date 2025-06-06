import React from "react";
import { Row, Col, Button, Typography, Card, Switch } from "antd";
import {
  MessageFilled,
  GoogleOutlined,
  FacebookFilled,
} from "@ant-design/icons";
import firebase, { auth } from "../../firebase/config";
import { addDocument, generateKeywords } from "../../firebase/services";

const { Title, Text } = Typography;

const fbProvider = new firebase.auth.FacebookAuthProvider();
const googleProvider = new firebase.auth.GoogleAuthProvider();

export default function Login() {
  const [dark, setDark] = React.useState(
    window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
  );

  React.useEffect(() => {
    const listener = (e) => setDark(e.matches);
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", listener);
    return () =>
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .removeEventListener("change", listener);
  }, []);

  const handleLogin = async (provider) => {
    const { additionalUserInfo, user } = await auth.signInWithPopup(provider);

    if (additionalUserInfo?.isNewUser) {
      addDocument("users", {
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        uid: user.uid,
        providerId: additionalUserInfo.providerId,
        keywords: generateKeywords(user.displayName?.toLowerCase()),
      });
    }
  };

  const bgGradient = dark
    ? "linear-gradient(135deg, #232526 0%, #414345 100%)"
    : "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)";

  return (
    <div
      style={{
        minHeight: "100vh",
        background: bgGradient,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "background 0.5s",
      }}
    >
      <Row justify="center" style={{ width: "100%" }}>
        <Col xs={22} sm={16} md={12} lg={8} xl={6}>
          <Card
            style={{
              borderRadius: 24,
              boxShadow: dark
                ? "0 4px 32px rgba(0,0,0,0.5)"
                : "0 4px 32px rgba(0,0,0,0.12)",
              padding: 36,
              background: dark
                ? "rgba(34, 40, 49, 0.98)"
                : "rgba(255,255,255,0.98)",
              border: "none",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div style={{ textAlign: "center", marginBottom: 24 }}>
              <MessageFilled
                style={{
                  fontSize: 48,
                  color: dark ? "#40a9ff" : "#1890ff",
                  marginBottom: 8,
                  filter: dark ? "drop-shadow(0 0 8px #40a9ff88)" : "none",
                }}
              />
              <Title
                level={3}
                style={{
                  color: dark ? "#fff" : "#222",
                  marginBottom: 0,
                  fontWeight: 700,
                  letterSpacing: 1,
                }}
              >
                Web Chat Room
              </Title>
              <Text
                style={{
                  color: dark ? "#aaa" : "#555",
                  fontSize: 16,
                  display: "block",
                  marginBottom: 8,
                }}
              >
                Kết nối, trò chuyện, chia sẻ cùng bạn bè!
              </Text>
            </div>
            <Button
              type="primary"
              icon={<GoogleOutlined />}
              style={{
                width: "100%",
                marginBottom: 18,
                height: 48,
                fontSize: 16,
                borderRadius: 10,
                background: "linear-gradient(90deg, #4285F4 60%, #34A853 100%)",
                border: "none",
                fontWeight: 600,
                boxShadow: "0 2px 8px #4285f455",
                transition: "background 0.3s",
              }}
              onClick={() => handleLogin(googleProvider)}
            >
              Đăng nhập bằng Google
            </Button>
            <Button
              type="primary"
              icon={<FacebookFilled />}
              style={{
                width: "100%",
                height: 48,
                fontSize: 16,
                borderRadius: 10,
                background: "linear-gradient(90deg, #1877f3 60%, #42a5f5 100%)",
                border: "none",
                fontWeight: 600,
                boxShadow: "0 2px 8px #1877f355",
                transition: "background 0.3s",
              }}
              onClick={() => handleLogin(fbProvider)}
            >
              Đăng nhập bằng Facebook
            </Button>
            <div style={{ marginTop: 32, textAlign: "center" }}>
              <Switch
                checked={dark}
                onChange={setDark}
                checkedChildren="🌙"
                unCheckedChildren="☀️"
                style={{ background: dark ? "#222" : "#eee" }}
              />
              <span style={{ marginLeft: 8, color: dark ? "#aaa" : "#555" }}>
                {dark ? "Chế độ tối" : "Chế độ sáng"}
              </span>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
