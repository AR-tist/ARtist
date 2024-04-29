import "./Footer.css";

const Footer = () => {
  return (
    <>
      <footer
        id="footer"
        role="contentinfo"
        class
        style={{
          background: "#fff",
          paddingTop: "32px",
          paddingBottom: "50px",
        }}
      >
        <div
          class="footer_inner"
          style={{ maxWidth: "1440px", padding: 0, marginLeft: "400px" }}
        >
          <div class="policy_area">
            <ul>
              <li>
                <a
                  href=""
                  class
                  target="_blank"
                  style={{
                    textDecoration: "none",
                  }}
                >
                  이용약관
                </a>
              </li>
              <li>
                <a
                  href=""
                  class
                  target="_blank"
                  style={{
                    textDecoration: "none",
                  }}
                >
                  개인정보 처리방침
                </a>
              </li>
              <li>
                <a
                  href=""
                  class
                  target="_blank"
                  style={{
                    textDecoration: "none",
                  }}
                >
                  사업자정보 확인
                </a>
              </li>
            </ul>
          </div>
          <address>
            <div class="inner" style={{ marginLeft: "-8px" }}>
              <div class="address_top">
                <span> 김지원 변상연 이아영 이준엽 정민규 </span>
              </div>
              <div class="address_bottom">
                <span> 경기도 성남시 수정구 복정동 495 </span>
              </div>
            </div>
          </address>
          <p
            class="copyright"
            style={{
              paddingTop: "16px",
              paddingBottom: "0",
              fontSize: "11px",
              color: "#8e8e93",
            }}
          >
            <span style={{ paddingRight: "10px" }}>
              가천대학교 | 소프트웨어전공
            </span>
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
