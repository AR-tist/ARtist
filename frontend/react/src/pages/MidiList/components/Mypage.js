const Mypage = () => {
  return (
    <>
      <div
        id="wrap"
        class="wrap mypage"
        style={{
          height: "100vh",
          backgroundColor: "#ffffff",
        }}
      >
        <header
          class="header"
          role="banner"
          style={{
            position: "relative",
            display: "table-cell",
            width: "395px",
            backgroundColor: "#fff",
            boxShadow: "5px 1px 8px 0 rgba(0,0,0,.06)",
            borderLeft: "1px solid rgba(0,0,0,.08)",
            verticalAlign: "top",
            zIndex: "1",
            paddingLeft: "400px",
          }}
        >
          <div class="header_left">
            <div
              class="gnb_area"
              style={{
                paddingLeft: "20px",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <h1 style={{ paddingLeft: "20px" }}>마이페이지</h1>
            </div>
            <div
              class="profile_area"
              style={{
                display: "block",
                padding: "100px 39px 20px",
                textAlign: "center",
              }}
            >
              <div
                class="profile_inner"
                style={{ width: "100%", margin: "0 auto" }}
              >
                {/* 프로필 이미지 */}
                <img
                  className="Profile-img"
                  src="img\프로필.png"
                  alt="프로필 이미지"
                  width="40"
                  height="40"
                  style={{
                    width: "140px",
                    height: "140px",
                    borderRadius: "50%",
                    boxShadow: "0 3px 6px 0 rgba(29,34,53,.08)",
                    verticalAlign: "top",
                    border: "0",
                  }}
                />

                <div class="profile" style={{ padding: "15px 0 40px" }}>
                  <p
                    class="username"
                    style={{
                      fontSize: "30px",
                      fontWeight: "700",
                      lineHeight: "32px",
                    }}
                  >
                    닉네임
                  </p>
                  <p
                    class="usercode"
                    style={{
                      marginTop: "5px",
                      fontSize: "18px",
                      lineHeight: "19px",
                      color: "#929294",
                    }}
                  >
                    #23232323
                  </p>
                </div>
              </div>
            </div>
            <div id="header_left_inner" style={{ padding: "0 40px" }}>
              <div
                class="left_menu"
                role="menu"
                style={{
                  marginTop: "20px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              >
                <button
                  className="left-menu-button"
                  style={{
                    padding: "5px 5px 5px 5px",
                    backgroundColor: "transparent",
                    border: "none",
                    boxSahdow: "none",
                    fontSize: "18px",
                    marginBottom: "15px",
                    borderBottom: "3px solid #C2C6FF",
                  }}
                >
                  기본 정보
                </button>

                <button
                  className="left-menu-button"
                  style={{
                    padding: "5px 5px 5px 5px",
                    backgroundColor: "transparent",
                    border: "none",
                    boxSahdow: "none",
                    fontSize: "18px",
                    marginBottom: "15px",
                  }}
                >
                  뭐하지
                </button>

                <button
                  className="left-menu-button"
                  style={{
                    padding: "5px 5px 5px 5px",
                    backgroundColor: "transparent",
                    border: "none",
                    boxSahdow: "none",
                    fontSize: "18px",
                    marginBottom: "15px",
                  }}
                >
                  뭐하지
                </button>
              </div>
            </div>
          </div>
        </header>
        <div
          id="container"
          class="container"
          style={{
            display: "table-cell",
            width: "60%",
            verticalAlign: "top",
          }}
        >
          <div
            id="content"
            class="content"
            style={{
              paddingLeft: "60px",
              padding: "0 30px",
              boxSizing: "border-box",
            }}
          >
            <div class="subindex_item">
              <div
                class="subindex_purplebox"
                style={{
                  marginTop: "50px",
                  padding: "16px 17px 0",
                  borderRadius: "12px",
                  boxShadow: "2px 2px 14px 0 rgba(0, 164, 73, 0.08)",
                  border: "solid 1px #C2C6FF",
                  backgroundColor: "#fff",
                  boxSizing: "border-box",
                }}
              >
                <div class="myprofile">
                  <div
                    class="info_title"
                    style={{ position: "relative", marginBottom: "20px" }}
                  >
                    <h3
                      class="title_text"
                      style={{
                        display: "inline-block",
                        fontSize: "14px",
                        fontWeight: "700",
                        lineHeight: "17px",
                        letterSpacing: "-.4px",
                        color: "#96a1aa",
                      }}
                    >
                      기본 정보
                    </h3>
                  </div>
                  <div
                    class="myinfo_area"
                    style={{
                      width: "100%",
                      margin: "0 auto",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      marginBottom: "20px",
                    }}
                  >
                    <img
                      className="Profile-img"
                      src="img\프로필.png"
                      alt="프로필 이미지"
                      width="40"
                      height="40"
                      style={{
                        width: "80px",
                        height: "80px",
                        borderRadius: "50%",
                        boxShadow: "0 3px 6px 0 rgba(29,34,53,.08)",
                        verticalAlign: "top",
                        border: "0",
                      }}
                    />

                    <div
                      class="profile"
                      style={{
                        marginLeft: "20px",
                        padding: "15px 0 40px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <p
                        class="username"
                        style={{
                          fontSize: "26px",
                          fontWeight: "700",
                          lineHeight: "32px",
                        }}
                      >
                        닉네임
                      </p>
                      <p
                        class="usercode"
                        style={{
                          fontSize: "15px",
                          lineHeight: "19px",
                          color: "#929294",
                        }}
                      >
                        #23232323
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="subindex_purplebox"
                style={{
                  marginTop: "50px",
                  paddingTop: "16px",
                  padding: "16px 17px 0",
                  borderRadius: "12px",
                  boxShadow: "2px 2px 14px 0 rgba(0, 164, 73, 0.08)",
                  border: "solid 1px #e8e8e8",
                  backgroundColor: "#fff",
                  boxSizing: "border-box",
                }}
              >
                <div class="myprofile">
                  <div
                    class="info_title"
                    style={{ position: "relative", marginBottom: "20px" }}
                  >
                    <h3
                      class="title_text"
                      style={{
                        display: "inline-block",
                        fontSize: "14px",
                        fontWeight: "700",
                        lineHeight: "17px",
                        letterSpacing: "-.4px",
                        color: "#96a1aa",
                      }}
                    >
                      뭐하지
                    </h3>
                  </div>
                  <div
                    class="myinfo_area"
                    style={{
                      width: "100%",
                      margin: "0 auto",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      marginBottom: "20px",
                    }}
                  >
                    <div
                      class="profile"
                      style={{
                        marginLeft: "20px",
                        padding: "15px 0 40px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <p
                        class="username"
                        style={{
                          fontSize: "26px",
                          fontWeight: "700",
                          lineHeight: "32px",
                        }}
                      >
                        ...
                      </p>
                      <p
                        class="usercode"
                        style={{
                          fontSize: "15px",
                          lineHeight: "19px",
                          color: "#929294",
                        }}
                      >
                        ...
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="subindex_purplebox"
                style={{
                  marginTop: "50px",
                  paddingTop: "16px",
                  padding: "16px 17px 0",
                  borderRadius: "12px",
                  boxShadow: "2px 2px 14px 0 rgba(0, 164, 73, 0.08)",
                  border: "solid 1px #e8e8e8",
                  backgroundColor: "#fff",
                  boxSizing: "border-box",
                }}
              >
                <div class="myprofile">
                  <div
                    class="info_title"
                    style={{ position: "relative", marginBottom: "20px" }}
                  >
                    <h3
                      class="title_text"
                      style={{
                        display: "inline-block",
                        fontSize: "14px",
                        fontWeight: "700",
                        lineHeight: "17px",
                        letterSpacing: "-.4px",
                        color: "#96a1aa",
                      }}
                    >
                      뭐하지
                    </h3>
                  </div>
                  <div
                    class="myinfo_area"
                    style={{
                      width: "100%",
                      margin: "0 auto",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      marginBottom: "20px",
                    }}
                  >
                    <div
                      class="profile"
                      style={{
                        marginLeft: "20px",
                        padding: "15px 0 40px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <p
                        class="username"
                        style={{
                          fontSize: "26px",
                          fontWeight: "700",
                          lineHeight: "32px",
                        }}
                      >
                        ...
                      </p>
                      <p
                        class="usercode"
                        style={{
                          fontSize: "15px",
                          lineHeight: "19px",
                          color: "#929294",
                        }}
                      >
                        ...
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Mypage;
