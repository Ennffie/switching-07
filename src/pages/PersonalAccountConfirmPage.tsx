import { useNavigate } from 'react-router-dom';
import { usePersonalAccount } from '../context/PersonalAccountContext';

const SectionHeader = ({ title }: { title: string }) => (
  <div className="flex items-center justify-between px-6 py-5 border-y border-[#E8E4E4] bg-white">
    <div className="flex items-center gap-4">
      <div className="text-[#F5A623] text-[22px] font-bold">✓</div>
      <div className="text-[20px] font-medium text-[#1F1F1F]">{title}</div>
    </div>
    <div className="text-[22px] text-[#1F1F1F]">⌃</div>
  </div>
);

const EditRow = ({ onClick }: { onClick: () => void }) => (
  <button onClick={onClick} className="flex w-full items-center justify-center gap-3 py-5 border-t border-[#EAE6E6] bg-white text-[#1F1F1F]">
    <img src="./icons/icon-edit.png" alt="編輯" className="w-6 h-6 object-contain" />
    <span className="text-[18px] font-medium">編輯</span>
  </button>
);

const LabelValue = ({ label, value }: { label: string; value: string }) => (
  <div className="mb-8">
    <div className="text-[16px] text-[#9D9A9A] mb-2">{label}</div>
    <div className="text-[19px] leading-[1.4] text-[#1F1F1F] whitespace-pre-line break-words">{value}</div>
  </div>
);

const PersonalAccountConfirmPage = () => {
  const navigate = useNavigate();
  const { data } = usePersonalAccount();

  const residentialCountry = data.residentialCountry || '香港';
  const residentialUnit = data.residentialUnit || 'G/F';
  const residentialFloor = data.residentialFloor || '6A MAN SHUN LANE';
  const residentialBlock = data.residentialBlock || 'CHEUNG CHAU';
  const residentialBuilding = data.residentialBuilding || 'HONG KONG';
  const residentialStreet = data.residentialStreet || '';
  const residentialDistrict = data.residentialDistrict || '';

  const correspondenceCountry = data.correspondenceSameAsResidential ? residentialCountry : (data.correspondenceCountry || residentialCountry);
  const correspondenceUnit = data.correspondenceSameAsResidential ? residentialUnit : (data.correspondenceUnit || residentialUnit);
  const correspondenceFloor = data.correspondenceSameAsResidential ? residentialFloor : (data.correspondenceFloor || residentialFloor);
  const correspondenceBlock = data.correspondenceSameAsResidential ? residentialBlock : (data.correspondenceBlock || residentialBlock);
  const correspondenceBuilding = data.correspondenceSameAsResidential ? residentialBuilding : (data.correspondenceBuilding || residentialBuilding);
  const correspondenceStreet = data.correspondenceSameAsResidential ? residentialStreet : (data.correspondenceStreet || residentialStreet);
  const correspondenceDistrict = data.correspondenceSameAsResidential ? residentialDistrict : (data.correspondenceDistrict || residentialDistrict);

  return (
    <div className="min-h-screen bg-[#F6F5F4] pb-10">
      <div className="sticky top-0 z-20 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
        <div className="px-4 pt-4 pb-4 flex items-center justify-center relative border-b border-[#ECECEC]">
          <button onClick={() => navigate(-1)} className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center">
            <img src="./icons/icon-back.png" alt="返回" className="w-6 h-6 object-contain" />
          </button>
          <h1 className="text-[18px] font-semibold text-[#1F1F1F] tracking-[-0.01em]">確認</h1>
          <button onClick={() => navigate('/')} className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center">
            <img src="./icons/icon-close.png" alt="關閉" className="w-5 h-5 object-contain" />
          </button>
        </div>
      </div>

      <div className="px-6 pt-8 pb-6">
        <h2 className="text-[24px] font-bold text-[#E6A23C]">確認</h2>
      </div>

      <SectionHeader title="聯絡資料" />
      <div className="bg-white px-6 pt-8 pb-2 border-b border-[#EAE6E6]">
        <LabelValue label="電郵地址" value={data.email || 'enfieldlaw@yahoo.com.hk'} />
        <LabelValue label="手機號碼" value={`+852 ${data.mobileNumber || '98849795'}`} />
        <LabelValue label="第二電話號碼（可選填）" value={data.secondPhoneNumber ? `${data.secondPhoneCountryCode || '+852'} ${data.secondPhoneNumber}` : '-'} />
      </div>
      <EditRow onClick={() => navigate('/personal-account-edit')} />

      <SectionHeader title="地址" />
      <div className="bg-white px-6 pt-8 pb-2 border-b border-[#EAE6E6]">
        <div className="text-[22px] font-semibold text-[#1F1F1F] mb-8">住址</div>
        <LabelValue label="國家／地區" value={residentialCountry} />
        <LabelValue label="單位／室（例如：「2室」、「A室」）" value={residentialUnit} />
        <LabelValue label="層數（例如：「12樓」）" value={residentialFloor} />
        <LabelValue label="座（例如：「C座」）" value={residentialBlock} />
        <LabelValue label="大廈" value={residentialBuilding} />
        <LabelValue label="街道（街號及街道名稱）" value={residentialStreet || '-'} />
        <LabelValue label="區域" value={residentialDistrict || '-'} />

        <div className="text-[22px] font-semibold text-[#1F1F1F] mb-8 mt-12">通訊地址</div>
        <LabelValue label="國家／地區" value={correspondenceCountry} />
        <LabelValue label="單位／室（例如：「2室」、「A室」）" value={correspondenceUnit} />
        <LabelValue label="層數（例如：「12樓」）" value={correspondenceFloor} />
        <LabelValue label="座（例如：「C座」）" value={correspondenceBlock} />
        <LabelValue label="大廈" value={correspondenceBuilding} />
        <LabelValue label="街道（街號及街道名稱）" value={correspondenceStreet || '-'} />
        <LabelValue label="區域" value={correspondenceDistrict || '-'} />
      </div>
      <EditRow onClick={() => navigate('/personal-account-edit')} />

      <SectionHeader title="通訊方式" />
      <div className="bg-white px-6 pt-8 pb-2 border-b border-[#EAE6E6]">
        <LabelValue
          label="積金易平台有限公司直接促銷同意書：閣下同意積金易平台有限公司根據其收集個人資料聲明（eMPF.org.hk/pics）內的「直接促銷」部分，使用閣下的個人資料作直接促銷之用途。閣下在此作出之指示，將取代閣下先前可能已向積金易平台有限公司提供的任何有關選擇「直接促銷」的指示。"
          value={data.directMarketingConsent || '是'}
        />
      </div>
      <EditRow onClick={() => navigate('/personal-account-edit')} />

      <div className="bg-white mt-8 px-6 pt-8 pb-12">
        <button onClick={() => navigate('/personal-account-terms')} className="w-full h-[58px] rounded-full bg-[#19345B] text-white text-[21px] font-semibold mb-5">
          提交
        </button>
        <button onClick={() => navigate('/personal-account-edit')} className="w-full text-center text-[20px] text-[#1F1F1F] font-medium">
          返回
        </button>
      </div>
    </div>
  );
};

export default PersonalAccountConfirmPage;
