import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';

const OTPVerificationPage = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const inputRefs = useRef([]);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/[^0-9]/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace') {
      if (!otp[index] && index > 0) {
        inputRefs.current[index - 1].focus();
      } else {
        const newOtp = [...otp];
        newOtp[index] = '';
        setOtp(newOtp);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsVerifying(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsVerifying(false);
      setIsVerified(true);
    }, 1500);
  };

  return (
    <div className="bg-background text-on-background font-body min-h-screen flex flex-col overflow-x-hidden selection:bg-primary selection:text-on-primary-container">
      {/* TopAppBar */}
      <header className="fixed top-0 w-full z-50 bg-surface-variant/40 backdrop-blur-2xl shadow-[0_20px_40px_rgba(0,0,0,0.4)]">
        <div className="flex justify-between items-center h-20 px-8 w-full">
          <Link to="/" className="text-2xl font-headline font-bold tracking-widest text-primary">LandVerse</Link>
          <nav className="hidden md:flex gap-8 items-center">
            <a className="font-label text-sm uppercase tracking-widest text-on-surface-variant hover:text-primary-dim transition-colors duration-300" href="#">Market</a>
            <a className="font-label text-sm uppercase tracking-widest text-on-surface-variant hover:text-primary-dim transition-colors duration-300" href="#">Registry</a>
            <a className="font-label text-sm uppercase tracking-widest text-on-surface-variant hover:text-primary-dim transition-colors duration-300" href="#">Nodes</a>
          </nav>
          <div className="flex items-center gap-4">
            <button className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors cursor-pointer">help_outline</button>
          </div>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center px-6 pt-24 pb-12 relative">
        {/* Background Atmospheric Element */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-[20%] -right-[10%] w-[60%] h-[60%] bg-primary/5 rounded-full blur-[120px]"></div>
          <div className="absolute -bottom-[10%] -left-[10%] w-[40%] h-[40%] bg-secondary/5 rounded-full blur-[100px]"></div>
        </div>
        
        <div className="w-full max-w-lg z-10">
          {/* Asymmetric Layout Container */}
          <div className="glass-panel rounded-lg p-8 md:p-12 shadow-[0_40px_80px_rgba(0,0,0,0.5)] border border-outline-variant/15">
            
            {/* Success/Sync Indicator */}
            <div className="flex items-center gap-3 mb-8">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-tertiary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-tertiary"></span>
              </span>
              <span className="text-xs font-label tracking-widest uppercase text-tertiary/80">Secured via Ethereum L2</span>
            </div>
            
            <div className="mb-10">
              <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 tracking-tight leading-tight">
                Verify <span className="gradient-text">Identity</span>
              </h1>
              <p className="text-on-surface-variant text-lg leading-relaxed">
                We've transmitted a specialized authentication code to your registered ledger email. Please enter the 6-digit sequence to proceed.
              </p>
            </div>
            
            <form className="space-y-10" onSubmit={handleSubmit}>
              {/* OTP Input Group */}
              <div className="flex justify-between gap-2 md:gap-4">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    className="otp-input w-12 h-16 md:w-16 md:h-20 text-center text-2xl font-display font-bold bg-surface-container-lowest border border-outline-variant/20 rounded-md focus:border-primary-dim focus:ring-0 text-primary transition-all duration-300"
                    maxLength="1"
                    pattern="\d*"
                    type="text"
                    autoComplete="one-time-code"
                    value={digit}
                    onChange={(e) => handleChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                  />
                ))}
              </div>
              
              <div className="space-y-6">
                <button 
                  disabled={isVerifying || isVerified}
                  className={`w-full h-16 text-lg rounded-md font-headline font-bold flex items-center justify-center gap-3 transition-all duration-300 
                    ${isVerified 
                      ? 'bg-gradient-to-r from-tertiary to-tertiary-container text-on-tertiary' 
                      : 'bg-gradient-to-r from-primary to-primary-container text-on-primary active:scale-95 shadow-[0_10px_20px_rgba(143,245,255,0.2)] hover:shadow-[0_15px_30px_rgba(143,245,255,0.3)]'}`}
                  type="submit"
                >
                  {isVerifying ? (
                    <>
                      <span className="material-symbols-outlined animate-spin">progress_activity</span> Syncing...
                    </>
                  ) : isVerified ? (
                    <>
                      <span className="material-symbols-outlined">check_circle</span> Verified
                    </>
                  ) : (
                    <>
                      Verify OTP
                      <span className="material-symbols-outlined">verified_user</span>
                    </>
                  )}
                </button>
                
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 font-label text-sm tracking-wide">
                  <p className="text-on-surface-variant">Didn't receive the sequence?</p>
                  <button className="text-secondary font-bold hover:text-secondary-fixed transition-colors flex items-center gap-1 group" type="button">
                    Resend OTP
                    <span className="material-symbols-outlined text-sm group-hover:rotate-180 transition-transform duration-500">refresh</span>
                  </button>
                </div>
              </div>
            </form>
            
            {/* Security Meta-info */}
            <div className="mt-12 pt-8 border-t border-outline-variant/10 flex items-start gap-4">
              <span className="material-symbols-outlined text-primary/40 text-4xl">security</span>
              <p className="text-xs text-on-surface-variant font-label leading-relaxed">
                LandVerse uses end-to-end encrypted validation protocols. Your session is protected by 256-bit encryption and will expire in 10:00 minutes for your security.
              </p>
            </div>
            
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="w-full py-12 bg-surface-container-low mt-auto">
        <div className="flex flex-col md:flex-row justify-between items-center px-12 w-full max-w-7xl mx-auto space-y-4 md:space-y-0">
          <div className="font-headline text-lg text-on-surface tracking-wider">LandVerse</div>
          <div className="font-body text-sm text-on-surface-variant">© 2024 LandVerse. Built on The Ethereal Ledger.</div>
          <div className="flex gap-6">
            <a className="text-on-surface-variant hover:text-secondary transition-colors font-label text-xs uppercase tracking-widest" href="#">Protocol</a>
            <a className="text-on-surface-variant hover:text-secondary transition-colors font-label text-xs uppercase tracking-widest" href="#">Legal</a>
            <a className="text-on-surface-variant hover:text-secondary transition-colors font-label text-xs uppercase tracking-widest" href="#">Privacy</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default OTPVerificationPage;
