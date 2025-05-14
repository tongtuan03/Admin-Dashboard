import { Facebook, Github } from "lucide-react";

const AuthFooter=()=>{
    return (
<div className="w-full text-center space-y-4">
                    <div className="flex items-center justify-between space-x-4">
                        <hr className="flex-grow border-t border-gray-300" />
                        <span className="text-gray-500 text-sm">OR CONTINUE WITH</span>
                        <hr className="flex-grow border-t border-gray-300" />
                    </div>

                    <div className="flex justify-center space-x-4">
                        <button className="flex items-center px-6 py-2 border cursor-pointer border-gray-300 rounded-md hover:bg-gray-50 transition text-sm">
                            <Github className="w-4 h-4 mr-2" />
                            GitHub
                        </button>
                        <button className="flex items-center px-6 py-2 border cursor-pointer border-gray-300 rounded-md hover:bg-gray-50 transition text-sm">
                            <Facebook className="w-4 h-4 mr-2" />
                            Facebook
                        </button>
                    </div>

                    {/* Terms */}
                    <p className="text-xs text-gray-500 max-w-xs mx-auto">
                        By clicking login, you agree to our{' '}
                        <a href="#" className="underline">
                            Terms of Service
                        </a>{' '}
                        and{' '}
                        <a href="#" className="underline">
                            Privacy Policy
                        </a>.
                    </p>
                </div>
    );
}
export default AuthFooter;