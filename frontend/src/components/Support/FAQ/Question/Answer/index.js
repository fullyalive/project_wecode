import React, { Component } from "react";
import { Collapse, Button, CardBody, Card } from "reactstrap";
import styles from "./styles.scss";

class Ask extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = { collapse: false };
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  render() {
    return (
      <div>
        <Button
          onClick={this.toggle}
          style={{
            marginBottom: "1rem",
            backgroundColor: "#3fa9f5",
            border: "0"
          }}
        >
          자세히 보기
        </Button>
        <Collapse isOpen={this.state.collapse}>
          <Card>
            <CardBody>
              <div className={styles.container}>
                다음 가이드라인을 따라 답변을 해주시면, 멘티에게 답변이
                제공됩니다.
                <div className={styles.items}>
                  <div className={styles.item}>
                    <span className={styles.title}>제목</span>
                    <div className={styles.content}>
                      답변 제목이 필요합니다.
                    </div>
                  </div>
                  <div className={styles.item}>
                    <span className={styles.title}>코드</span>
                    <div className={styles.content}>
                      하단 예시를 참고해 솔루션 코드를 작성해주세요
                      <div className={styles.imageContainer}>
                        <img
                          src={require("images/content1.png")}
                          alt={"코드설명"}
                          className={styles.contentImage}
                        />
                      </div>
                    </div>
                  </div>
                  <div className={styles.item}>
                    <span className={styles.title}>설명</span>
                    <div className={styles.content}>
                      하단 예시를 참고해 솔루션 코드의 각 요소 부분을
                      설명해주세요.
                      <div className={styles.imageContainer}>
                        <img
                          src={require("images/content2.png")}
                          alt={"코드설명"}
                          className={styles.contentImage}
                        />
                        <span className={styles.explaination}>
                          # 설명 1 : 모델 시리얼라이저를 상속 받은 클래스입니다.
                        </span>
                        <img
                          src={require("images/content3.png")}
                          alt={"코드설명"}
                          className={styles.contentImage}
                        />
                        <span className={styles.explaination}>
                          # 설명 2 : meta class에 serializer에 사용할 속성들을
                          정의합니다.
                        </span>
                        <img
                          src={require("images/content4.png")}
                          alt={"코드설명"}
                          className={styles.contentImage}
                        />
                        <span className={styles.explaination}>
                          # 설명 3 : 모델은 무엇을 쓸 것인지, 모델에서 어떤
                          속성을 쓸 건지 등등 옵션을 정해주게 됩니다.
                        </span>
                      </div>
                      스크린샷 등의 이미지 파일이나, 해당 코드의 주석 등으로
                      부분을 나눠서 설명해주시면 답변만족률이 높아집니다.
                    </div>
                  </div>
                  <div className={styles.item}>
                    <span className={styles.title}>링크</span>

                    <div className={styles.content}>
                      Meta옵션 레퍼런스 :<br />
                      <br />
                      멘티에게 추후 비슷한 오류가 발생했을 때 도움이 될 수 있는
                      문제 해결의 [키워드], <br />
                      솔루션을 알 수 있는 [사이트 링크], [자료] 등을
                      첨부해주세요.
                    </div>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </Collapse>
      </div>
    );
  }
}

export default Ask;
