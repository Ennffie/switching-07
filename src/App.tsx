import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { TransferProvider } from './context/TransferContext';
import { EnrolmentProvider } from './context/EnrolmentContext';
import MyMPFPage from './pages/MyMPFPage';
import OverviewPage from './pages/OverviewPage';
import InvestPage from './pages/InvestPage';
import SelectPlanPage from './pages/SelectPlanPage';
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
import EnrolmentIAMSmartPage from './pages/EnrolmentIAMSmartPage';
import EnrolmentIdentityPage from './pages/EnrolmentIdentityPage';

function App() {
  return (
    <TransferProvider>
      <EnrolmentProvider>
      <Router>
        <Routes>
          <Route path="/" element={<OverviewPage />} />
          <Route path="/my-mpf" element={<MyMPFPage />} />
          <Route path="/invest" element={<InvestPage />} />
          <Route path="/invest/select-plan" element={<SelectPlanPage />} />
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
          <Route path="/enrolment-confirm" element={<EnrolmentConfirmPage />} />
          <Route path="/quiz/personality" element={<PersonalityQuizPage />} />
          <Route path="/quiz/work-life" element={<WorkLifeQuizPage />} />
          <Route path="/quiz/room-cleanliness" element={<RoomCleanlinessQuizPage />} />
        </Routes>
      </Router>
      </EnrolmentProvider>
    </TransferProvider>
  );
}

export default App;
