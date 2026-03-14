import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEnrolment } from '../context/EnrolmentContext';

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
    <div className="text-[19px] leading-[1.4] text-[#1F1F1F] whitespace-pre-line">{value}</div>
  </div>
);

const EnrolmentConfirmPage = () => {
  const navigate = useNavigate();
  const [intermediary, setIntermediary] = useState<'yes' | 'no' | null>('no');
  const { mandatoryFunds, voluntaryFunds } = useEnrolment();

  const submitEnabled = intermediary !== null;

  return (
    <div className="min-h-screen bg-[#F6F5F4]">
      <div className="sticky top-0 z-20 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
        <div className="px-4 pt-4 pb-4 flex items-center justify-center relative border-b border-[#ECECEC]">
          <button onClick={() => navigate(-1)} className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center"><img src="./icons/icon-back.png" alt="返回" className="w-6 h-6 object-contain" /></button>
          <h1 className="text-[18px] font-semibold text-[#1F1F1F] tracking-[-0.01em]">申請一般僱員</h1>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-4">
            <img src="./icons/icon-save.png" alt="儲存" className="w-6 h-6 object-contain" />
            <button onClick={() => navigate('/')} className="w-5 h-5 flex items-center justify-center"><img src="./icons/icon-close.png" alt="關閉" className="w-5 h-5 object-contain" /></button>
          </div>
        </div>

        <div className="px-6 pt-4 pb-4 bg-white">
          <div className="flex items-center justify-between relative">
            <div className="absolute top-[18px] left-[40px] right-[40px] h-[2px] bg-[#F5A623]" />
            {['✓','✓','✓','4'].map((n, i) => (
              <div key={i} className="relative z-10 flex flex-col items-center">
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-[20px] font-bold bg-[#F5A623] text-white shadow-[0_2px_4px_rgba(0,0,0,0.12)]">
                  <span className="text-[20px] leading-none">{n}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="px-6 pt-8 pb-10">
        <h2 className="text-[24px] font-bold text-[#E6A23C] mb-8">確認</h2>
      </div>

      <div className="text-[18px] font-semibold text-[#1F1F1F] px-6 mb-3">第1步：選擇計劃</div>
      <SectionHeader title="選擇計劃" />
      <div className="bg-white px-6 pt-8 pb-8 border-b border-[#EAE6E6]">
        <div className="text-[20px] font-semibold text-[#1F1F1F] mb-2">友邦強積金優選計劃</div>
        <div className="text-[18px] leading-[1.45] text-[#6F6C6C]">AIA MPF - Prime Value Choice</div>
      </div>

      <div className="text-[18px] font-semibold text-[#1F1F1F] px-6 mt-8 mb-3">第2步：個人資料</div>
      <SectionHeader title="個人詳細資料" />
      <div className="bg-white px-6 pt-8 pb-2 border-b border-[#EAE6E6]">
        <LabelValue label="稱謂" value="先生" />
        <div className="grid grid-cols-2 gap-x-8">
          <LabelValue label="姓氏（英文）" value="WONG" />
          <LabelValue label="名字（英文）" value="KA MING" />
          <LabelValue label="姓氏（中文）" value="黃" />
          <LabelValue label="名字（中文）" value="家明" />
        </div>
        <LabelValue label="身份證明文件類別" value="Hong Kong身份證" />
        <LabelValue label="身分證明號碼" value="Z4382165" />
        <LabelValue label="出生日期（日／月／年）" value="17/09/1989" />
        <div className="grid grid-cols-2 gap-x-8">
          <LabelValue label="性別" value="男性" />
          <LabelValue label="職位" value="行政和商業經理" />
        </div>
      </div>
      <EditRow onClick={() => navigate('/enrolment-step-1')} />

      <SectionHeader title="聯絡資料" />
      <div className="bg-white px-6 pt-8 pb-2 border-b border-[#EAE6E6]">
        <LabelValue label="電郵地址" value="wong.kaming89@gmail.com" />
        <LabelValue label="手機號碼" value="+852 96823451" />
      </div>
      <EditRow onClick={() => navigate('/enrolment-personal-info')} />

      <SectionHeader title="地址" />
      <div className="bg-white px-6 pt-8 pb-2 border-b border-[#EAE6E6]">
        <div className="text-[22px] font-semibold text-[#1F1F1F] mb-8">住址</div>
        <LabelValue label="國家／地區" value="Hong Kong" />
        <LabelValue label="單位／室（例如：「2室」、「A室」）" value="Flat 8" />
        <LabelValue label="層數（例如：「12/F」）" value="12/F" />
        <LabelValue label="座（例如：「C座」）" value="Block B" />
        <LabelValue label="大廈" value="Mei Hong Court, South Horizons" />
        <LabelValue label="街道（街號及街道名稱）" value="8 South Horizons Drive" />
        <LabelValue label="區域" value="Ap Lei Chau" />

        <div className="text-[22px] font-semibold text-[#1F1F1F] mb-8 mt-12">通訊地址</div>
        <LabelValue label="國家／地區" value="Hong Kong" />
        <LabelValue label="單位／室（例如：「2室」、「A室」）" value="Flat 8" />
        <LabelValue label="層數（例如：「12/F」）" value="12/F" />
        <LabelValue label="座（例如：「C座」）" value="Block B" />
        <LabelValue label="大廈" value="Mei Hong Court, South Horizons" />
        <LabelValue label="街道（街號及街道名稱）" value="8 South Horizons Drive" />
        <LabelValue label="區域" value="Ap Lei Chau" />
      </div>
      <EditRow onClick={() => navigate('/enrolment-personal-info')} />

      <SectionHeader title="通訊方式" />
      <div className="bg-white px-6 pt-8 pb-2 border-b border-[#EAE6E6]">
        <LabelValue label="積金易平台有限公司直接促銷同意書：閣下同意積金易平台有限公司根據其收集個人資料聲明（eMPF.org.hk/pics）內的「直接促銷」部分，使用閣下的個人資料作直接促銷之用途。閣下在此作出之指示，將取代閣下先前可能已向積金易平台有限公司提供的任何有關選擇「直接促銷」的指示。" value="否" />
      </div>
      <EditRow onClick={() => navigate('/enrolment-personal-info')} />

      <SectionHeader title="共同匯報標準表格" />
      <div className="bg-white px-6 pt-8 pb-2 border-b border-[#EAE6E6]">
        <LabelValue label="我的稅務居住地為" value="只有Hong Kong，及沒有處於任何其他司法管轄區／國家／地區的稅務居住地，而且本人的Hong Kong身分證號碼是本人的稅務編號" />
      </div>
      <EditRow onClick={() => navigate('/enrolment-personal-info')} />

      <div className="text-[18px] font-semibold text-[#1F1F1F] px-6 mt-8 mb-3">第3步：投資選擇</div>
      <SectionHeader title="投資選擇" />
      <div className="bg-white px-6 pt-8 pb-2 border-b border-[#EAE6E6]">
        <div className="mb-10">
          <div className="text-[19px] font-semibold text-[#1F1F1F] mb-4">僱主強制性供款分配</div>
          <div className="space-y-4 text-[19px] text-[#1F1F1F]">
            {mandatoryFunds.length > 0 ? mandatoryFunds.map((fund) => (
              <div key={`m-${fund.name}`} className="flex justify-between items-start gap-4">
                <div className="leading-[1.5]">{fund.name}</div>
                <div className="font-medium">{fund.allocation}%</div>
              </div>
            )) : <div className="text-[#7E7A7A]">未有資料</div>}
          </div>
        </div>

        <div className="mb-8">
          <div className="text-[19px] font-semibold text-[#1F1F1F] mb-4">僱員自願性供款分配</div>
          <div className="space-y-4 text-[19px] text-[#1F1F1F]">
            {voluntaryFunds.length > 0 ? voluntaryFunds.map((fund) => (
              <div key={`v-${fund.name}`} className="flex justify-between items-start gap-4">
                <div className="leading-[1.5]">{fund.name}</div>
                <div className="font-medium">{fund.allocation}%</div>
              </div>
            )) : <div className="text-[#7E7A7A]">未有資料</div>}
          </div>
        </div>
      </div>
      <EditRow onClick={() => navigate('/enrolment-step-3-invest')} />

      <div className="bg-white mt-8 px-6 pt-8 pb-12">
        <div className="text-[22px] font-semibold text-[#1F1F1F] mb-8">強積金註冊中介人資料（如適用）</div>
        <div className="text-[18px] text-[#7E7A7A] mb-7">你是否需要提交中介人資料？</div>

        <button onClick={() => setIntermediary('yes')} className="flex items-center gap-4 mb-8">
          <span className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${intermediary === 'yes' ? 'border-[#F5A623]' : 'border-[#CFCACA]'}`}>
            {intermediary === 'yes' && <span className="w-4 h-4 rounded-full bg-[#F5A623]" />}
          </span>
          <span className="text-[20px] text-[#1F1F1F]">是</span>
        </button>

        <button onClick={() => setIntermediary('no')} className="flex items-center gap-4 mb-10">
          <span className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${intermediary === 'no' ? 'border-[#F5A623]' : 'border-[#CFCACA]'}`}>
            {intermediary === 'no' && <span className="w-4 h-4 rounded-full bg-[#F5A623]" />}
          </span>
          <span className="text-[20px] text-[#1F1F1F]">否</span>
        </button>

        <button onClick={() => submitEnabled && navigate('/enrolment-terms')} className={`w-full h-[58px] rounded-full text-[21px] font-semibold ${submitEnabled ? 'bg-[#19345B] text-white' : 'bg-[#E8E5E5] text-[#B7B3B3]'}`}>
          提交
        </button>
      </div>
    </div>
  );
};

export default EnrolmentConfirmPage;
