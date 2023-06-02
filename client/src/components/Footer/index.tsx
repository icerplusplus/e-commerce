import React from 'react';
import {Col, Row} from 'antd';
import {
  BoCT2_Icon,
  BoCT_SVG,
  Momo_Icon,
  Visa_Icon,
  ViettelMoney_Icon,
  Vnpay_Icon,
  Zalopay_Icon,
} from '../../assets';
import Container from '../Container';

interface FooterData {
  title: string;
  values: string[];
}

const footerData: FooterData[] = [
  {
    title: 'Hỗ trợ khách hàng',
    values: [
      'Hotline: 1900-6035 (1000 đ/phút, 8-21h)',
      'Các câu hỏi thường gặp',
      'Gửi yêu cầu hỗ trợ',
      'Hướng dẫn đặt hàng',
      'Phương thức vận chuyển',
      'Chính sách đổi trả',
      'Hướng dẫn trả góp',
      'Chính sách hàng nhập khẩu',
      'Hỗ trợ khách hàng: hotro@tiki.vn',
      'Báo lỗi bảo mật: security@tiki.vn',
    ],
  },
  {
    title: 'Về Tiki',
    values: [
      'Giới thiệu Tiki',
      'Tiki Blog',
      'Tuyển dụng',
      'Chính sách bảo mật thanh toán',
      'Chính sách bảo mật thông tin cá nhân',
      'Chính sách giải quyết khiếu nại',
      'Điều khoản sử dụng',
      'Gửi Astra nhận Xu mua sắm thả ga',
      'Tiếp thị liên kết cùng Tiki',
      'Điều kiện vận chuyển',
    ],
  },
  {
    title: 'Hợp tác và liên kết',
    values: ['Quy chế hoạt động Sàn GDTMĐT', 'Bán hàng cùng Tiki'],
  },
];

const Footer: React.FC = () => {
  const renderItem = (data: FooterData) =>
    data?.values?.map((value) => (
      <li className="text-gray text-xs mb-2" key={value}>
        {value}
      </li>
    ));

  return (
    <footer className="w-full mx-auto bg-white bottom-0">
      <Container>
        <Row
          gutter={[24, 8]}
          className="block w-full mx-auto py-4 space-y-4 md:flex md:space-y-0"
        >
          <Col md={{span: 6}} key={footerData[0]?.title}>
            <h1 className="font-medium text-lg text-black pb-4">
              {footerData[0]?.title}
            </h1>
            <ul>{renderItem(footerData[0])}</ul>
          </Col>
          <Col md={{span: 6}} key={footerData[1]?.title}>
            <h1 className="font-medium text-lg text-black pb-4">
              {footerData[1]?.title}
            </h1>
            <ul>{renderItem(footerData[1])}</ul>
          </Col>

          <Col md={{span: 6}} key={footerData[2]?.title}>
            <div className="space-y-4">
              <div>
                <h1 className="font-medium text-lg text-black pb-4">
                  {footerData[2]?.title}
                </h1>
                <ul>{renderItem(footerData[2])}</ul>
              </div>
              <div>
                <h1 className="font-medium text-lg text-black pb-3">
                  Chứng nhận bởi
                </h1>
                <span className="flex space-x-2">
                  <img src={BoCT2_Icon} alt="bct2" style={styles?.icon} />
                  <img src={BoCT_SVG} alt="bct" style={styles?.icon} />
                </span>
              </div>
            </div>
          </Col>

          <Col md={{span: 6}} key={'Phương thức thanh toán'}>
            <div className="space-y-4">
              <h1 className="font-medium text-lg text-black">
                Phương thức thanh toán
              </h1>

              <div className="w-[164px]">
                <Row gutter={[8, 8]}>
                  <Col span={8}>
                    <img
                      src={Momo_Icon}
                      alt="Payment_Icon"
                      style={styles?.icon}
                      width={32}
                      height={32}
                    />
                  </Col>

                  <Col span={8}>
                    <img
                      src={Vnpay_Icon}
                      alt="Payment_Icon"
                      style={styles?.lgIcon}
                      width={32}
                      height={32}
                    />
                  </Col>

                  <Col span={8}>
                    <img
                      src={ViettelMoney_Icon}
                      alt="Payment_Icon"
                      style={styles?.icon}
                      width={32}
                      height={32}
                    />
                  </Col>
                  <Col span={8}>
                    <img
                      src={Zalopay_Icon}
                      alt="Payment_Icon"
                      style={styles?.icon}
                      width={32}
                      height={32}
                    />
                  </Col>
                  <Col span={8} className="my-auto">
                    <img
                      src={Visa_Icon}
                      alt="Payment_Icon"
                      style={styles?.icon}
                      height={32}
                    />
                  </Col>
                </Row>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

const styles = {
  icon: {
    maxHeight: '2rem',
  },
  lgIcon: {
    maxHeight: '2.5rem',
  },
};

export default Footer;
