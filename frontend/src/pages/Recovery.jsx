import RecoveryForm from '../components/RecoveryForm';
import Logo from '../components/Logo';

function Recovery() {
    return (
        <div className="flex flex-auto items-center justify-center p-4">
            <div className="flex flex-col items-center max-w-xs">
                <Logo />
                <RecoveryForm />
            </div>
        </div>
    );
}

export default Recovery;
