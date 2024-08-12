import { FaRegUser } from 'react-icons/fa6';
import SignInForm from './sign-in-form';

const SignIn = () => {
  return (
    <div className="w-full max-w-md space-y-6 rounded-2xl border border-[#D1E0FF] p-6">
      <div className="space-y-3">
        <div className="mx-auto flex size-12 items-center justify-center rounded-lg bg-[#F5F8FF] text-[#1F5EDD]">
          <FaRegUser className="size-4" />
        </div>
        <div className="space-y-2 text-center">
          <p className="text-sm font-medium">სახელით და პაროლით</p>
          <p className="text-sm text-gray-500">ავტორიზაციისთვის გთხოვთ გამოიყენოთ თქვენი MY.GOV.GE_ის ანგარიში</p>
        </div>
      </div>
      <SignInForm />
    </div>
  );
};

export default SignIn;
