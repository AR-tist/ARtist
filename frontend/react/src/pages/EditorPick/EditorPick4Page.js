import React, { useState } from "react";
import Header from "../../components/Header";
import Layout from "../../components/Layout";
import { useSelector } from "react-redux";

const EditorPick4Page = () => {
  const nickname = useSelector((state) => state.user.name);

  return (
    <>
      <Header user={nickname} />
      <Layout></Layout>
      <h1 style={{ marginLeft: "350px" }}>추억의 국내 겨울 노래</h1>
    </>
  );
};

export default EditorPick4Page;
