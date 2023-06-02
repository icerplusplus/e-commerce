import React from 'react';
import Section from '../../../../components/Section';

interface Props {
  data?: string;
}

export const Description: React.FC<Props> = ({data}) => {
  return (
    <Section>
      <div className="text-[20px] text-[#333333]">Mô tả sản phẩm</div>
      <div
        className="pt-2 product__description"
        dangerouslySetInnerHTML={{
          __html: data ?? '',
        }}
      />
    </Section>
  );
};
