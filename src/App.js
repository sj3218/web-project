import React, { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate
} from "react-router-dom";
import styled from "styled-components";

import MainPage from './component/page/MainPage';
import InputSamplePage from "./component/page/InputSamplePage";
import UserListPage from "./component/page/UserListPage";

const MainTitleText = styled.p`
  font-size: 24px;
  font-weight: bold;
  text-align:center;
`;

const SidebarContainer = styled.div`
  width: 240px;
  height: 100vh;
  background: #f5f5f5;
  position: fixed;
  top: 0;
  left: 0;
  padding: 20px;
  z-index: 2;
  transform: translateX(${props => (props.open ? '0' : '-100%')});
  transition: transform 0.3s ease;
`;

const Overlay = styled.div`
  display: ${props => (props.open ? 'block' : 'none')};
  position: fixed;
  top:0;
  left:0;
  width:100%;
  height:100%;
  background: rgba(0,0,0,0.3);
  z-index:1;
`;

const Content = styled.div`
  flex: 1;
  margin-left: 240px;
  padding: 20px;
`;

function AppLayout(){
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <MainTitleText>Website</MainTitleText>

      {/* 햄버거 버튼 */}
      <button onClick={() => setOpen(!open)}>☰</button>

      {/* 배경 클릭 시 닫기 */}
      <Overlay open={open} onClick={() => setOpen(false)} />

      {/* 사이드바 */}
      <SidebarContainer open={open}>
        <h3>메뉴</h3>
        <div onClick={() => { navigate('/'); setOpen(false); }}>홈</div>
        <div onClick={() => { navigate('/input-sample-page'); setOpen(false); }}>Input Sample</div>
        <div onClick={() => { navigate('/user-list-page'); setOpen(false); }}>User List Sample</div>
      </SidebarContainer>

      {/* 메인 콘텐츠 */}
      <Content>
        <Routes>
          <Route index element={<MainPage />} />
          <Route path="input-sample-page" element={<InputSamplePage />} />
          <Route path="user-list-page" element={<UserListPage />} />
        </Routes>
      </Content>
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
        <AppLayout/>
    </BrowserRouter>
  );
}

export default App;