import React from 'react';
import {IInformation} from '../../../../types';
import {htmlFrom} from '../../../../libs';
import Section from '../../../../components/Section';

import './index.css';

interface Props {
  data?: IInformation[];
}

export const Information: React.FC<Props> = ({data}) => {
  return (
    <Section>
      <div className="tb__header-title">Thông tin sản phẩm</div>
      <div className="pt-4">
        <table>
          <tbody>
            {data?.map((info, idx) => (
              <tr key={info?.id} className="tb__row">
                <td className="tb__row-title">{info.name}</td>
                <td
                  className={`py-[10px] px-[15px] text-[#242424] leading-5 ${
                    idx % 2 > 0 ? ' bg-[#fafafa]' : ''
                  }`}
                >
                  {htmlFrom(info?.value ?? '')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Section>
  );
};
