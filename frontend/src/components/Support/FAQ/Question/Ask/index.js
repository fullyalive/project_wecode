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
                <div className={styles.question}>
                  물어보고 싶은 것을 확실하게 말해주세요
                </div>
                <div className={styles.answer}>
                  다음과 같은 경우에는 답변율이 많이 떨어집니다.
                  <ul className={styles.ulStyle}>
                    <li className={styles.liStyle}>
                      - 어떤 오류인지 에러 코드 명시 없이 에러가 발생한 상황만을
                      물어보는 경우
                    </li>
                  </ul>
                  <ul className={styles.ulStyle}>
                    <li className={styles.liStyle}>
                      - 본인의 개발 환경에 대한 설명이 없는 경우
                      <br />
                      에러코드가 발생한 코드나, 본인이 사용하고 있는 언어와
                      프레임워크의 버전 기입등이 누락된 경우입니다.
                    </li>
                  </ul>
                  <ul className={styles.ulStyle}>
                    <li className={styles.liStyle}>
                      - 하나의 질문에 여러개의 답변사항을 요구할 경우
                      <br />
                      2개 이상, 다른 유형의 솔루션을 요구하는 질문의 경우 답변율이 낮습니다.
                    </li>
                  </ul>
                  정확히 표시 해주는 것이 중요합니다.
                </div>
              </div>
              <div className={styles.container}>
                <div className={styles.question}>
                  자신이 원하는 것이 무엇인지 정확히 말씀해주세요
                </div>
                <div className={styles.answer}>
                  가령 이 문제를 해결하기 위해 필요한 것이
                  <ul className={styles.ulStyle}>
                    <li className={styles.liStyle}>
                      - 스터디 자료의 파일이나 레퍼런스 사이트 등의 링크 인지
                    </li>
                    <li className={styles.liStyle}>
                      - 원하는 값을 도출하기 위한 코드 인지
                    </li>
                  </ul>
                  정확히 표시 해주는 것이 중요합니다.
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
