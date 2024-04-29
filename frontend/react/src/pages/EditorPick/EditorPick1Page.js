import React, { useState } from "react";
import Header from "../../components/Header";
import Layout from "../../components/Layout";
import { useSelector } from "react-redux";

const EditorPick1Page = () => {
  const nickname = useSelector((state) => state.user.name);

  return (
    <>
      <Header user={nickname} />
      <Layout></Layout>
      <h1 style={{ marginLeft: "350px" }}>
        너와 함께라면 추운 겨울도 견딜만해
      </h1>
    </>
  );
};

export default EditorPick1Page;
