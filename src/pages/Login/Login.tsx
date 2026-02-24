import LoginLeftPanel from './components/LoginLeftPanel';
import LoginRightPanel from './components/LoginRightPanel';

export default function Login() {
    return (
        <div className="min-h-screen flex bg-white font-sans">
            <LoginLeftPanel />
            <LoginRightPanel />
        </div>
    );
}

