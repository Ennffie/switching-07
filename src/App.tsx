import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import ScrollToTop from './components/ScrollToTop';
import { TransferProvider } from './context/TransferContext';
import { EnrolmentProvider } from './context/EnrolmentContext';
import { FutureInvestProvider } from './context/FutureInvestContext';
import { FutureSubmissionProvider } from './context/FutureSubmissionContext';
import MyMPFPage from './pages/MyMPFPage';
import OverviewPage from './pages/OverviewPage';
import InvestPage from './pages/InvestPage';
import InvestInfoPage from './pages/InvestInfoPage';
import InvestFutureInfoPage from './pages/InvestFutureInfoPage';
import SelectPlanPage from './pages/SelectPlanPage';
import FutureSelectPlanPage from './pages/FutureSelectPlanPage';
import FutureInvestPage from './pages/FutureInvestPage';
import FutureConfirmPage from './pages/FutureConfirmPage';
import FutureSuccessPage from './pages/FutureSuccessPage';
import FutureRecordsPage from './pages/FutureRecordsPage';
import FundTransferPage from './pages/FundTransferPage';
import ConfirmPage from './pages/ConfirmPage';
import TermsPage from './pages/TermsPage';
import SuccessPage from './pages/SuccessPage';
import RecordsPage from './pages/RecordsPage';
import PersonalityQuizPage from './pages/PersonalityQuizPage';
import WorkLifeQuizPage from './pages/WorkLifeQuizPage';
import RoomCleanlinessQuizPage from './pages/RoomCleanlinessQuizPage';
import DISInfoPage from './pages/DISInfoPage';
import TodoPage from './pages/TodoPage';
import ProfilePage from './pages/ProfilePage';
import EnrolmentInstructionPage from './pages/EnrolmentInstructionPage';
import EnrolmentStep1Page from './pages/EnrolmentStep1Page';
import EnrolmentPersonalInfoPage from './pages/EnrolmentPersonalInfoPage';
import EnrolmentStep3InvestPage from './pages/EnrolmentStep3InvestPage';
import EnrolmentTermsPage from './pages/EnrolmentTermsPage';
import EnrolmentConfirmPage from './pages/EnrolmentConfirmPage';
import EnrolmentSubmittedPage from './pages/EnrolmentSubmittedPage';
import EnrolmentIAMSmartPage from './pages/EnrolmentIAMSmartPage';
import EnrolmentIdentityPage from './pages/EnrolmentIdentityPage';
import EnrolmentDISPage from './pages/EnrolmentDISPage';
import EnrolmentRiskLevelPage from './pages/EnrolmentRiskLevelPage';

function App() {
  return (
    <TransferProvider>
      <EnrolmentProvider>
        <FutureInvestProvider>
          <FutureSubmissionProvider>
      <Router>
          <ScrollToTop />
        <Routes>
          <Route path="/" element={<OverviewPage />} />
          <Route path="/my-mpf" element={<MyMPFPage />} />
          <Route path="/invest" element={<InvestPage />} />
          <Route path="/invest/info" element={<InvestInfoPage />} />
          <Route path="/invest/future-info" element={<InvestFutureInfoPage />} />
          <Route path="/invest/select-plan" element={<SelectPlanPage />} />
          <Route path="/invest/future-select-plan" element={<FutureSelectPlanPage />} />
          <Route path="/invest/future-step-2" element={<FutureInvestPage />} />
          <Route path="/invest/future-confirm" element={<FutureConfirmPage />} />
          <Route path="/invest/future-success" element={<FutureSuccessPage />} />
          <Route path="/invest/future-records" element={<FutureRecordsPage />} />
          <Route path="/invest/fund-transfer" element={<FundTransferPage />} />
          <Route path="/invest/confirm" element={<ConfirmPage />} />
          <Route path="/invest/terms" element={<TermsPage />} />
          <Route path="/invest/success" element={<SuccessPage />} />
          <Route path="/invest/records" element={<RecordsPage />} />
          <Route path="/dis-info" element={<DISInfoPage />} />
          <Route path="/todo" element={<TodoPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/enrolment-instruction" element={<EnrolmentInstructionPage />} />
          <Route path="/enrolment-step-1" element={<EnrolmentStep1Page />} />
          <Route path="/enrolment-identity" element={<EnrolmentIdentityPage />} />
          <Route path="/enrolment-iam-smart" element={<EnrolmentIAMSmartPage />} />
          <Route path="/enrolment-personal-info" element={<EnrolmentPersonalInfoPage />} />
          <Route path="/enrolment-step-3-invest" element={<EnrolmentStep3InvestPage />} />
          <Route path="/enrolment-terms" element={<EnrolmentTermsPage />} />
            <Route path="/enrolment-dis" element={<EnrolmentDISPage />} />
            <Route path="/enrolment-risk-level" element={<EnrolmentRiskLevelPage />} />
            <Route path="/enrolment-submitted" element={<EnrolmentSubmittedPage />} />
          <Route path="/enrolment-confirm" element={<EnrolmentConfirmPage />} />
          <Route path="/quiz/personality" element={<PersonalityQuizPage />} />
          <Route path="/quiz/work-life" element={<WorkLifeQuizPage />} />
          <Route path="/quiz/room-cleanliness" element={<RoomCleanlinessQuizPage />} />
        </Routes>
      </Router>
          </FutureSubmissionProvider>
        </FutureInvestProvider>
      </EnrolmentProvider>
    </TransferProvider>
  );
}

export default App;
