const Participants = () => {
  return (
    <>
      <div style={{ marginLeft: "350px", marginTop: "50px" }}>
        <div
          style={{
            width: "400px",
            backgroundColor: "#FAFAFA",
            borderRadius: "10px",
            position: "relative",
          }}
        >
          <div style={{ display: "flex" }}>
            <img
              src="./img/프로필1.jpg"
              alt="앨범 커버"
              style={{
                float: "left",
                marginRight: "20px",
                width: "80px",
                height: "80px",
                borderRadius: "15px",
                marginTop: "10px",
                marginLeft: "10px",
              }}
            />
            <div>
              <h3>푸른고양이82</h3>
              <p style={{ color: "#BBBBBB" }}>키보드</p>
            </div>

            <button
              style={{
                width: "10px",
                height: "10px",
                backgroundColor: "#39d446",
                border: "none",
                borderRadius: "50%",
                marginTop: "10px",
                marginLeft: "150px",
                position: "absolute",
                top: "1px",
                left: "225px",
              }}
            ></button>
          </div>
        </div>
      </div>

      <div style={{ marginLeft: "350px", marginTop: "50px" }}>
        <div
          style={{
            width: "400px",
            backgroundColor: "#FAFAFA",
            borderRadius: "10px",
            position: "relative",
          }}
        >
          <div style={{ display: "flex" }}>
            <img
              src="./img/프로필2.jpg"
              alt="앨범 커버"
              style={{
                float: "left",
                marginRight: "20px",
                width: "80px",
                height: "80px",
                borderRadius: "15px",
                marginTop: "10px",
                marginLeft: "10px",
              }}
            />
            <div>
              <h3>푸른길거리</h3>
              <p style={{ color: "#BBBBBB" }}>AR Piano</p>
            </div>

            <button
              style={{
                width: "10px",
                height: "10px",
                backgroundColor: "#FE4949",
                border: "none",
                borderRadius: "50%",
                marginTop: "10px",
                marginLeft: "150px",
                position: "absolute",
                top: "1px",
                left: "225px",
              }}
            ></button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Participants;
