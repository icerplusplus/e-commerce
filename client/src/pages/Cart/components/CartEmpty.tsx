import Button from '../../../components/Button';
import Container from '../../../components/Container';
import Section from '../../../components/Section';
import {useAppNavigate} from '../../../hooks';

const emptyCartImg = 'https://salt.tikicdn.com/desktop/img/mascot@2x.png';

export const CartEmpty: React.FC = () => {
  const {changeToPage} = useAppNavigate();

  return (
    <Container>
      <Section className="flex flex-col justify-center items-center py-32">
        <img src={emptyCartImg} alt={emptyCartImg} className="max-w-[190px]" />
        <p className="text-sm pb-10">
          Không có sản phẩm nào trong giỏ hàng của bạn
        </p>

        <Button
          title="Tiếp tục mua sắm"
          onClick={() => changeToPage('/')}
          className="max-w-[15rem]"
        />
      </Section>
    </Container>
  );
};
