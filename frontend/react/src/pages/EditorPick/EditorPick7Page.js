import React, { useState } from "react";
import Header from "../../components/Header";
import Layout from "../../components/Layout";
import { useSelector } from "react-redux";

const EditorPick7Page = () => {
  const nickname = useSelector((state) => state.user.name);

  return (
    <>
      <Header user={nickname} />
      <Layout></Layout>
      <h1 style={{ marginLeft: "350px" }}>가을에 듣기 좋은 발라드 Top 40</h1>
    </>
  );
};

export default EditorPick7Page;
