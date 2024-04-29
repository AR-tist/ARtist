import React, { useState } from "react";
import Header from "../../components/Header";
import Layout from "../../components/Layout";
import { useSelector } from "react-redux";

const EditorPick5Page = () => {
  const nickname = useSelector((state) => state.user.name);

  return (
    <>
      <Header user={nickname} />
      <Layout></Layout>
      <h1 style={{ marginLeft: "350px" }}>크리스마스 하면 떠오르는 영화 OST</h1>
    </>
  );
};

export default EditorPick5Page;
