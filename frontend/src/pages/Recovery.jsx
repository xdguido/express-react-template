import RecoveryForm from '../components/RecoveryForm';

function Recovery() {
    return (
        <div className="flex items-center justify-center p-4">
            <div className="flex flex-col items-center max-w-xs">
                <img
                    className="block h-8 w-auto lg:hidden"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                    alt="Your Company"
                />
                <img
                    className="hidden h-8 w-auto lg:block"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                    alt="Your Company"
                />
                <RecoveryForm />
            </div>
        </div>
    );
}

export default Recovery;
