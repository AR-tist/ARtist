import React, { useState } from "react";
import Header from "../../components/Header";
import Layout from "../../components/Layout";
import { useSelector } from "react-redux";

const EditorPick3Page = () => {
  const nickname = useSelector((state) => state.user.name);

  return (
    <>
      <Header user={nickname} />
      <Layout></Layout>
      <h1 style={{ marginLeft: "350px" }}>올 크리스마스에는 색다른 K-캐럴을</h1>
    </>
  );
};

export default EditorPick3Page;
