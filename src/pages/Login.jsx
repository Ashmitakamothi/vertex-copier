import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useSearchParams } from 'react-router-dom';
import { loginUser } from '../api/authApi';
import logoLight from '../assets/logo-light.png';

const CheckIcon = () => (
  <svg className="w-3.5 h-3.5 text-[var(--color-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
  </svg>
);

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [searchParams] = useSearchParams();
  const isSetup = searchParams.get('setup') === '1';
  const { register, handleSubmit, setError, formState: { errors } } = useForm({
    mode: 'all'
  });
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      let deviceId = localStorage.getItem("deviceId");
      if (!deviceId) {
        deviceId = crypto.randomUUID ? crypto.randomUUID() : "dev-" + Date.now();
        localStorage.setItem("deviceId", deviceId);
      }

      const payload = {
        username: data.username,
        password: data.password,
        deviceId: deviceId
      };

      const response = await loginUser(payload);
      console.log('Login success:', response);
      if (response?.token) {
        localStorage.setItem('token', response.token);
      }
      // TODO: Navigate to dashboard
    } catch (err) {
      console.error('Login error:', err);
      const errorMsg = err?.message || err?.error || "Username is incorrect.";
      setError('username', { type: 'manual', message: errorMsg });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen font-sans text-[var(--color-text)]">
      {/* Left Sidebar */}
      <aside 
        className="hidden lg:flex lg:flex-col lg:w-1/2 text-[var(--color-sidebar-text)] p-0"
        style={{
          background: 'radial-gradient(700px 360px at 15% 15%, rgba(28, 127, 181, 0.35), transparent 65%), var(--color-sidebar)'
        }}
      >
        <div className="flex items-center gap-[12px] px-[56px] pt-[32px]">
          <img src={logoLight} alt="Copy Trading" className="h-[28px]" />
          <span className="text-white text-sm font-medium border-l border-[rgba(255,255,255,0.15)] pl-3">Copy Trading</span>
        </div>

        <div className="flex-1 flex flex-col justify-center max-w-[560px] px-[56px] py-[40px]">
          <span className="text-xs font-bold text-[var(--color-text-muted)] tracking-widest uppercase mb-2">Copy trading platform</span>
          <h1 className="text-5xl font-bold leading-[1.1] mb-3 text-white">
            Copy the best.<br />Trade smarter.
          </h1>
          <p className="text-[var(--color-sidebar-text)] text-lg max-w-[44ch] leading-[1.6] mb-8">
            Follow top-performing master traders and mirror their trades automatically in your trading account.
          </p>

          <ul className="space-y-5">
            <li className="flex gap-4">
              <div className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center bg-[var(--color-sidebar-hover)] mt-1">
                <CheckIcon />
              </div>
              <div>
                <h3 className="font-semibold text-white text-base">Real-time trade replication</h3>
                <p className="text-sm text-[var(--color-sidebar-text)] mt-1">Master orders are mirrored to your account within seconds of being opened.</p>
              </div>
            </li>
            <li className="flex gap-4">
              <div className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center bg-[var(--color-sidebar-hover)] mt-1">
                <CheckIcon />
              </div>
              <div>
                <h3 className="font-semibold text-white text-base">Per-subscription risk controls</h3>
                <p className="text-sm text-[var(--color-sidebar-text)] mt-1">Lot caps, daily loss limits and drawdown stops that you set yourself.</p>
              </div>
            </li>
            <li className="flex gap-4">
              <div className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center bg-[var(--color-sidebar-hover)] mt-1">
                <CheckIcon />
              </div>
              <div>
                <h3 className="font-semibold text-white text-base">Transparent performance history</h3>
                <p className="text-sm text-[var(--color-sidebar-text)] mt-1">Every copied trade, skip reason and fee recorded and searchable.</p>
              </div>
            </li>
          </ul>
        </div>

        <div className="px-[56px] pb-[40px]">
          <p className="text-sm text-[var(--color-text-subtle)]">&copy; VertexPro. All rights reserved.</p>
        </div>
      </aside>

      {/* Right Panel */}
      <main className="auth__panel flex-1 grid place-items-center bg-[#f4f6f9] px-[32px] py-[40px]">
        <form onSubmit={handleSubmit(onSubmit)} className="auth__card w-full">
          <div className="auth__card-head">
            <h2 className="text-[32px] font-bold text-[#1b2735] mb-2 tracking-tight">
              {isSetup ? 'Set up copy trading' : 'Sign in'}
            </h2>
            <p className="text-[15px] text-[#64748b]">
              {isSetup ? 'Sign in, then choose your trading account and role' : 'Enter your username and password'}
            </p>
          </div>

          <div className="field-host">
            <label className="block text-[14px] font-medium text-[#1b2735] mb-1.5 field__label">
              Username <span className="text-[#d1342f] field__required">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter your username"
              className={`form-control w-full h-[36px] px-[12px] py-0 text-[14px] rounded-[6px] border outline-none transition-colors placeholder:text-[#a0aec0] text-[#1b2735] ${errors.username ? 'border-[#d1342f] is-invalid' : 'border-[#dfe5ec] focus:border-[#0f7f8c] focus:ring-1 focus:ring-[#0f7f8c]'}`}
              {...register('username', { required: 'Username is required.' })}
            />
            {errors.username ? (
              <p className="mt-1.5 text-[13px] text-[#d1342f] field__error">{errors.username.message}</p>
            ) : (
              <p className="mt-1.5 text-[13px] text-[#8b98a9] field__hint">The username you use for your trading account.</p>
            )}
          </div>

          <div className="field-host">
            <label className="block text-[14px] font-medium text-[#1b2735] mb-1.5 field__label">
              Password <span className="text-[#d1342f] field__required">*</span>
            </label>
            <div className="relative auth__password">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className={`form-control w-full h-[36px] px-[12px] py-0 text-[14px] rounded-[6px] border outline-none transition-colors placeholder:text-[#a0aec0] text-[#1b2735] ${errors.password ? 'border-[#d1342f] is-invalid' : 'border-[#dfe5ec] focus:border-[#0f7f8c] focus:ring-1 focus:ring-[#0f7f8c]'}`}
                {...register('password', { required: 'Password is required.' })}
              />
              <button
                type="button"
                aria-label="Show password button"
                onClick={() => setShowPassword(!showPassword)}
                className="auth__eye cursor-pointer"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            {errors.password && <p className="mt-1.5 text-[13px] text-[#d1342f] field__error">{errors.password.message}</p>}
          </div>

          <div className="flex items-center justify-between auth__options">
            <label className="flex items-center gap-2 cursor-pointer checkbox">
              <input
                type="checkbox"
                className="w-4 h-4 rounded-[4px] border-[#dfe5ec] text-[#0f7f8c] focus:ring-[#0f7f8c] cursor-pointer"
                {...register('rememberMe')}
              />
              <span className="text-[14px] text-[#64748b]">Remember me</span>
            </label>
            <a href="#" className="text-[13px] text-[#2F6FB0] hover:text-[#0c6b76] hover:underline cursor-pointer" style={{ fontFamily: '"IBM Plex Sans", "Segoe UI", system-ui, sans-serif' }}>Forgot password?</a>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="btn btn--block btn--primary w-full h-[36px] bg-[#0f7f8c] hover:bg-[#0c6b76] text-white text-[15px] font-semibold rounded-[6px] transition-colors cursor-pointer"
          >
            {isLoading ? 'Signing in...' : 'Sign in'}
          </button>

          <p className="auth__footer text-center text-[12px] text-[#64748B] mt-[2px]" style={{ fontFamily: '"IBM Plex Sans", "Segoe UI", system-ui, sans-serif' }}>
            {isSetup ? (
              <>Just want to sign in? <Link to="?" className="text-[12px] text-[#2F6FB0] hover:text-[#0c6b76] hover:underline cursor-pointer" style={{ fontFamily: '"IBM Plex Sans", "Segoe UI", system-ui, sans-serif' }}>Back to sign in</Link></>
            ) : (
              <>First time here? <Link to="?setup=1" className="text-[12px] text-[#2F6FB0] hover:text-[#0c6b76] hover:underline cursor-pointer" style={{ fontFamily: '"IBM Plex Sans", "Segoe UI", system-ui, sans-serif' }}>Set up copy trading</Link></>
            )}
          </p>
        </form>
      </main>
    </div>
  );
}
