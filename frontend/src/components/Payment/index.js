import React, { Component } from "react";
import jQuery from "jquery";
window.$ = window.jQuery = jQuery;

class Payment extends Component {
  constructor(props) {
    super(props);
    this._test = this._test.bind(this);
  }

  componentDidMount() {
    const IMP = window.IMP;
    IMP.init("iamport");

    this.setState({
      IMP
    });
  }
  _test() {
    console.log(this.state.IMP);
    this.state.IMP.request_pay(
      {
        pg: "html5_inicis",
        pay_method: "card",
        merchant_uid: "merchant_" + new Date().getTime(),
        name: "주문명:결제테스트",
        amount: 10,
        buyer_email: "iamport@siot.do",
        buyer_name: "구매자이름",
        buyer_tel: "010-1234-5678",
        buyer_addr: "서울특별시 강남구 삼성동",
        buyer_postcode: "123-456"
      },
      function(rsp) {
        var msg = "";
        if (rsp.success) {
          msg = "결제가 완료되었습니다.";
          msg += "고유ID : " + rsp.imp_uid;
          msg += "상점 거래ID : " + rsp.merchant_uid;
          msg += "결제 금액 : " + rsp.paid_amount;
          msg += "카드 승인번호 : " + rsp.apply_num;
        } else {
          msg = "결제에 실패하였습니다.";
          msg += "에러내용 : " + rsp.error_msg;
        }

        alert(msg);
      }
    );
  }
  render() {
    return (
      <div className="App">
        <p className="App-intro" onClick={this._test}>
          결제 테스트
        </p>
      </div>
    );
  }
}

export default Payment;
