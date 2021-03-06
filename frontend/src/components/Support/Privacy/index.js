import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.scss";

const Privacy = (props, context) => (
  <div className={styles.policyContainer}>
    <div className={styles.policyTitle}>개인정보 보호정책</div>
    <p>
      개인정보 수집 및 이용 안내 위코드(이하 “회사”)는 회원님의 개인정보를
      보호하기 위해 최선을 다하고 있습니다. <br />
      이를 위해서 회사는 개인정보의 보호와 관련하여 ‘정보통신망 이용촉진 및
      정보보호 등에 관한 법률’, ‘개인정보 보호법’ 등 개인정보와 관련된 법령을
      준수하고 있습니다.
      <br />
      <br />
      1. 수집하는 개인정보의 항목 회사는 이름, 이메일, 계좌번호, 나이, 성별,
      서비스 이용기록, 결제 및 환불 기록, 생년월일, 휴대폰번호, 관심분야 등에
      관한 정보를 수집합니다. 서비스를 이용하는 과정에서 방문일시, 사용이력,
      기기정보, 접속로그, IP주소 등이 자동으로 생성·수집 될 수 있습니다.
      <br />
      <br />
      2. 개인정보의 수집 및 이용목적 회사는 회원의 식별·확인, 회원가입 의사
      확인, 중복가입 여부 확인, 만14세 미만 여부 확인, 법정대리인의 동의 처리,
      계약의 체결·이행·관리, 주문상품의 배송 상태 통지, 결제 및 환불, 통계분석,
      구매 성향 분석, 서비스 개선, 민원 기타 문의 사항 처리, 부정 이용에 대한
      조사 및 대응, 고지사항 전달, 청구서 등의 발송, 법령상 의무 이행,
      사은/판촉행사 등 각종 이벤트, 개인 맞춤형 서비스 제공, 새로운 상품 기타
      행사 관련 정보 안내 및 마케팅 활동, 이메일 초대권 활용 내역 조회, 회사 및
      제휴사 상품/서비스 안내 및 권유의 목적으로 개인정보를 이용합니다.
      <br />
      <br />
      3. 개인정보 수집 방법 회사는 홈페이지, 어플리케이션, 고객센터, 게시판,
      이벤트 참여, 제휴사로부터의 전달 등을 통해 개인정보를 수집합니다. 이용자는
      회사가 마련한 개인정보 처리 동의서에 대해 「동의」 버튼을 클릭함으로써
      개인정보 처리에 대하여 동의 여부를 표시할 수 있습니다.
      <br />
      <br />
      4. 개인정보의 보유 및 이용기간 귀하가 제공한 개인정보는 법령에서 별도로
      정하거나 귀하와 별도 합의하는 등의 특별한 사정이 없는 한 회사가 제공하는
      서비스를 받는 동안 또는 위에서 정한 목적을 달성할 때까지 회사가
      보유ㆍ이용하게 됩니다. 회사는 관련 법령(아래의 경우에 한정되지 않습니다)의
      규정에 의하여 보존하여야 하는 기록은 일정 기간 보관 후 파기합니다.
      <br />
      <br />
      가. 계약 또는 청약철회 등에 관한 기록 (보존기간 : 5년) : 전자상거래
      등에서의 소비자 보호에 관한 법률 <br />
      나. 대금결제 및 재화 등의 공급에 관한 기록 (보존기간 : 5년) : 전자상거래
      등에서의 소비자 보호에 관한 법률 <br />
      다. 소비자의 불만 또는 분쟁처리에 관한 기록 (보존기간 : 3년) : 전자상거래
      등에서의 소비자 보호에 관한 법률 <br />
      라. 홈페이지 방문에 관한 기록 (보존 기간: 3개월) : 통신비밀보호법
      <br />
      <br />
      5. 개인정보 제 3자 제공 회사는 계약의 이행을 위하여 최소한의 개인정보만
      제공하고 있으며, 개인정보를 제3자에게 제공해야 하는 경우 사전에 이용자에게
      해당 사실을 알리고 동의를 구하도록 하겠습니다. 다만 다음의 경우는 예외로
      하고 있습니다.
      <br />
      <br />
      가. 서비스 제공에 따른 요금정산을 위해 필요한 경우 <br />
      나. 법령의 규정에 의한 경우 <br />
      다. 수사 목적으로 법령에 정해진 절차와 방법에 따라 수사기관의 요구가 있는
      경우 회사는 이용자가 특정 위코드에 참여하기 위하여 결제 및 주문을 한 경우
      다음과 같이 개인정보를 거래 상대방(스터디 리더, 프로그래밍 멘토)에게
      제공합니다.
      <br />
      <br />
      개인정보를 제공받는 자 : 스터디 리더 주1), 프로그래밍 멘토 주2) 제공받는
      자의 이용목적 : <br />
      본인 확인, 스터디 준비 및 이행, 민원처리, 환불 업무 제공하는 항목 : 이름,
      질문, 연락처 등 <br />
      스터디와 질문별로 이용자가 입력하여 제공 정보 보유 및 이용기간 : 스터디
      완료 후 6개월 주1), 주2) 구체적인 스터디 리더 명칭은 ‘내활동 - 참여 스터디
      또는 질문사항 페이지에서 확인하실 수 있습니다.
      <br />
      <br />
      6. 개인정보의 처리 위탁 회사는 서비스 향상을 위해서 아래와 같이 개인정보를
      위탁하고 있으며, 관계 법령에 따라 위탁계약 시 개인정보가 안전하게 관리될
      수 있도록 필요한 사항을 규정하고 있습니다. 수탁자 및 수탁업무 내용은
      아래와 같습니다. <br />
      수탁자 : 나이스페이, 아임포트, 페이코 수탁업무 : 결제 수탁자 : SKT, KT,
      LGU+ 수탁업무 : 본인확인
      <br />
      <br />
      7. 이용자의 권리 회사는 이용자(만 14세 미만자인 경우에는 법정대리인)의
      권리를 다음과 같이 보호하고 있습니다.
      <br />
      <br />
      가. 언제든지 자신의 개인정보 또는 법정대리인의 경우 만 14세 미만자의
      개인정보를 조회하고 수정하는 등 법령이 정한 권리를 행사 할 수 있습니다.
      <br />
      나. 언제든지 개인정보 제공에 관한 동의철회/회원가입해지를 요청할 수
      있습니다. <br />
      다. 개인정보의 수정을 요청하는 경우 회사는 정확한 개인정보의 이용 및
      제공을 위해 수정이 완료될 때까지 이용자의 개인정보는 이용하거나 제공하지
      않습니다.
      <br />
      <br />
      8. 개인정보 파기절차 및 방법 고객 또는 이용자가 고객정보카드에 기재하거나,
      웹사이트 회원가입 등을 위해 입력한 정보는 목적이 달성된 후 별도의 DB로
      옮겨져(출력물의 경우 별도의 서류함) 내부 방침 및 기타 관계법령에 따라 일정
      기간 저장된 후 파기됩니다. 회사는 정보가 저장 된 유형에 따라
      완전파괴(소각·파쇄 등), 전용 소자장비를 이용한 삭제, 데이터가 복원되지
      않도록 초기화 또는 덮어쓰기 수행 등의 방법으로 파기합니다.
      <br />
      <br />
      9. 개인정보보호를 위한 기술적·관리적 조치 회사는 이용자의 개인정보를
      처리함에 있어 정보의 분실, 도난, 누출, 외부로부터의 공격, 해킹 등을
      방지하고 최상의 안전성을 확보하기 위하여 다음 각호의 방식을 포함하여
      법령에서 정한 보호조치를 취하고 있습니다.
      <br />
      <br />
      가. 이용자의 개인정보는 비밀번호에 의해 보호되며, 파일 및 전송 데이터를
      암호화하여 중요한 데이터는 별도의 보안기능을 통해 보호되고 있습니다.
      <br />
      나. 회사는 컴퓨터 바이러스에 의한 피해가 발생하지 않도록 백신프로그램을
      이용하고 있으며, 백신프로그램에 대한 주기적인 업데이트하고 있습니다.
      <br />
      다. 회사는 암호 알고리즘을 이용하여 네트워크 상의 개인정보를 안전하게
      전송할 수 있는 보안장치를 채택하고 있습니다.
      <br />
      라. 해킹 등에 의해 이용자의 개인정보가 유출되는 것을 방지하기 위해,
      외부침입을 차단하는 보안장치를 이용하고 있으며, 침입탐지시스템을 설치하여
      불법적인 침입을 감시하고 있습니다. 마. 이용자의 개인정보를 처리하는
      담당인원을 최소한으로 제한하며, 관련 직원에 대해서는 지속적인 보안교육의
      실시와 함께 본 정책의 준수여부를 수시로 점검하고 있습니다.
      <br />
      <br />
      10. 개인정보 자동 수집 장치의 설치/운영 및 거부에 관한 사항 회사는
      이용자의 정보를 자동으로 저장하고 찾아내는 ‘쿠키(cookie)’ 등을 운용합니다.
      쿠키란 웹사이트를 운영하는데 이용되는 서버가 귀하의 브라우저에 보내는 아주
      작은 텍스트 파일로서 귀하의 컴퓨터 하드디스크에 저장됩니다. <br />
      <br />
      가. 쿠키 등 사용 목적 로그인 식별/고객님의 사용 기록/기존 홈페이지 방문
      또는 앱 사용 회수 파악 등을 통한 개인 맞춤 서비스 제공 등을 위해 쿠키를
      운용합니다. 이용자는 쿠키 설치에 대한 선택권을 가지고 있습니다. <br />
      나. 쿠키 설정 거부 방법 쿠키 설정을 거부하는 방법으로는 회원님이
      사용하시는 앱이나 웹 브라우저의 옵션을 선택함으로써 모든 쿠키를 허용하거나
      쿠키를 저장할 때마다 확인을 거치거나, 모든 쿠키의 저장을 거부할 수
      있습니다. <br />
      <br />
      11. 홈페이지 개인정보 보호책임자 회사는 이용자의 개인정보에 대한 개인정보
      보호책임자를 지정하여 개인정보보호를 위해 최선을 다하겠습니다. 현재 회사의
      개인정보 보호책임자는 아래와 같습니다.
      <br />
      <br />
      성명 : 이재형 연락처 : 0l0-88l7-8674
      <br />
      <br />
      12. 개인정보처리방침의 적용 제외 회사는 이용자에게 홈페이지를 통하여 다른
      회사의 웹사이트 또는 자료에 대한 링크를 제공할 수 있습니다. 이 경우 회사는
      외부사이트 및 자료에 대하여 통제권이 없을 뿐만 아니라 이들이 개인정보를
      수집하는 행위에 대하여 회사의 '개인정보처리방침'이 적용되지 않습니다.
      따라서, 회사가 포함하고 있는 링크를 클릭하여 타 사이트의 페이지로 이동할
      경우에는 새로 방문한 사이트의 개인정보처리방침을 반드시 확인하시기
      바랍니다.
      <br />
      <br />
      13. 시행시기 - 본 개인정보처리방침은 2018년 10월 15일부터 시행됩니다.
    </p>
  </div>
);

Privacy.contextTypes = {
  t: PropTypes.func.isRequired
};

export default Privacy;
